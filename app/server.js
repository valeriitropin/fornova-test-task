const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const uuidv4 = require('uuid').v4;

const convertCommandsToHttpRequests = require('./utils').convertCommandsToHttpRequests;

const port = parseInt(process.env.APP_PORT) || 3000;
const RETRIES_COUNT = parseInt(process.env.RETRIES_COUNT) || 2;
const RATE_LIMIT = parseInt(process.env.RATE_LIMIT) || 1000;
const RATE_LIMIT_PERIOD = parseInt(process.env.RATE_LIMIT_PERIOD) || 60; // seconds
const STATUS_SUCCESS = 'Success';
const STATUS_FAILED = 'Failed';

const queue = [];
const requests = {};

let processingCommands = 0;

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
    const requestId = uuidv4();
    // TODO: should be moved in separate class
    const httpRequests = convertCommandsToHttpRequests(requestId, req.body.commands);
    requests[requestId] = {
        total: httpRequests.length,
        responses: [],
        res,
    };
    queue.push(...httpRequests);
});

app.listen(port, () => console.log(`Server started on ${port}`));

setInterval(() => {
    processingCommands = 0;
}, RATE_LIMIT_PERIOD * 1000);

setInterval(queueHandler, 1);

function queueHandler() {
    const batch = [];
    while (processingCommands < RATE_LIMIT) {
        let requestConfig = queue.shift();
        if (!requestConfig) {
            break;
        }
        processingCommands++;
        // TODO: modify url and data
        let promise = axios.request({
            method: requestConfig.method,
            url: requestConfig.url,
        });
        const request = requests[requestConfig.requestId];
        promise = promise
            .then(result => {
                request.responses.push({
                    requestURL: requestConfig.url,
                    status: STATUS_SUCCESS,
                    response: result.data,
                });
                checkRequestAndSendIfCompleted(request);
            })
            .catch(() => {
                // Add to the beginning of the queue otherwise save result
                if (requestConfig.retries < RETRIES_COUNT) {
                    queue.unshift(requestConfig);
                    requestConfig.retries++;
                } else {
                    request.responses.push({
                        requestURL: requestConfig.url,
                        status: STATUS_FAILED,
                        response: null,
                    });
                    checkRequestAndSendIfCompleted(request);
                }
            });
        batch.push(promise);
    }

    if (batch) {
        Promise.all(batch);
    }
}

function checkRequestAndSendIfCompleted(request) {
    if (request.total === request.responses.length) {
        request.res.json(request.responses);
        requests[request.requestId] = undefined;
    }
}
