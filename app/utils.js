module.exports = {
    convertCommandsToHttpRequests,
};

function convertCommandsToHttpRequests(requestId, commands) {
    const requests = [];
    for (const command of commands) {
        if (command.params.length) {
            const url = new URL(command.url);
            for (const param of command.params) {
                requests.push({
                    requestId,
                    method: command.verb,
                    url: `${url.origin}${substituteParams(url.pathname, param)}${url.search}`,
                    retries: 0,
                });
            }
        } else {
            requests.push({
                requestId,
                method: command.verb,
                url: command.url,
                retries: 0,
            });
        }
    }

    return requests;
}

function substituteParams(path, params) {
    let _path = path;
    for (const [ key, value ] of Object.entries(params)) {
        _path = _path.replace(key, value);
    }

    return _path;
}
