// Simple module to generate data fot test
module.exports = {
    commands : [
        {
            verb : 'GET',
            url :
                'http://www.mocky.io/v2/5d99a2893100005d0097d991/param1/param2',
            params: [
                {
                    'param1' : '55',
                },
                {
                    'param2' : '56',
                },
            ]
        },
        {
            verb : 'POST',
            url : 'http://www.mocky.io/v2/5d99a2c6310000550097d992/param1',
            params: [
                {
                    'param1': '55',
                },
                {
                    'param1': '56',
                    'param2': 't',
                },
                {
                    'param1': '57',
                }
            ]
        },
        {
            verb : 'POST',
            url : 'http://www.mocky.io/v2/5d9c2d4931000055002fc3e5/param1/param2',
            params: [
                {
                    'param1': '55',
                },
                {
                    'param1': '56',
                    'param2': 't',
                },
                {
                    'param1': '57',
                }
            ]
        },
        {
            verb : 'GET',
            url :
                'http://www.mocky.io/v2/5d99a2893100005d0097d991',
            params: [
                {
                    'param1' : '55',
                },
                {
                    'param2' : '56',
                },
            ]
        },
        {
            verb : 'POST',
            url : 'http://www.mocky.io/v2/5d99a2c6310000550097d992',
            params: [
                {
                    'param1': '55',
                },
                {
                    'param1': '56',
                    'param2': 't',
                },
                {
                    'param1': '57',
                }
            ]
        },
        {
            verb : 'POST',
            url : 'http://www.mocky.io/v2/5d9c2d4931000055002fc3e5',
            params: [
                {
                    'param1': '55',
                },
                {
                    'param1': '56',
                    'param2': 't',
                },
                {
                    'param1': '57',
                }
            ]
        },
        {
            verb : 'GET',
            url :
                'http://www.mocky.io/v2/5d99a2893100005d0097d991',
            params: [
                {
                    'param1' : '55',
                },
                {
                    'param2' : '56',
                },
            ]
        },
        {
            verb : 'POST',
            url : 'http://www.mocky.io/v2/5d99a2c6310000550097d992',
            params: [
                {
                    'param1': '55',
                },
                {
                    'param1': '56',
                    'param2': 't',
                },
                {
                    'param1': '57',
                }
            ]
        },
        {
            verb : 'POST',
            url : 'http://www.mocky.io/v2/5d9c2d4931000055002fc3e5',
            params: [
                {
                    'param1': '55',
                },
                {
                    'param1': '56',
                    'param2': 't',
                },
                {
                    'param1': '57',
                }
            ]
        },
    ]
};

console.log(JSON.stringify(module.exports));
