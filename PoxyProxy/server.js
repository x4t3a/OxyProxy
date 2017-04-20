'use strict';

let app = require('express')();
let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('proxies.sqlite3');
const port = process.env.POXY_PROXY_PORT || 10007;

app.get('/', function (req, res) {
    res.redirect('/get');
});

app.get('/get', function (req, res) {
    console.log('GET /get');
    let type = parseInt(req.query.type) || 2;
    let anon = parseInt(req.query.anon) || 3;
    let cntr = req.query.cntr || 'USA';
    let there = `(type=${type} AND sec_lvl=${anon})`; // AND country LIKE '%${cntr}%')`
    let query = `SELECT * FROM proxies WHERE ${there}`;
    console.log(query);
    db.all(query, function (err, rows) {
        let resp_obj = { proxies: rows };
        let response = JSON.stringify(resp_obj);
        //let response = { proxies: [{ ip: "178.32.10.165", port: 1080 }]};
        res.send(response);
    });
});

var server = app.listen(port, function () {
    console.log("localhost:%s", port)
});
