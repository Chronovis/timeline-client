#!/usr/bin/env node
"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const parse_event_1 = require('./parse-event');
const pool = new pg.Pool({
    database: 'timeline',
    idleTimeoutMillis: 3000,
    max: 10,
    password: 'docker',
    port: 5432,
    user: 'docker',
});
const sql = (event) => {
    const s = `
	SELECT childEvent.*, array_agg(event_type.title) AS types
	FROM event as childEvent, event as parentEvent, event__event, event_type, event__event_type
	WHERE event__event.parent_event_id = parentEvent.id
		AND event__event.child_event_id = childEvent.id
		AND parentEvent.slug = '${event}'
		AND event__event_type.event_id = childEvent.id
		AND event__event_type.event_type_id = event_type.id
	GROUP BY childEvent.id;
	`;
    console.log(s);
    return s;
};
const app = express();
app.use(bodyParser.json());
app.post('/events', (req, res) => {
    pool.connect((connectionError, client, releaseClient) => {
        if (connectionError)
            return console.error('Error fetching client from pool', connectionError);
        client.query(`SELECT * FROM event WHERE event.slug = '${req.body.event}'`, (queryError1, result1) => {
            if (queryError1)
                return console.error('Error querying database', queryError1);
            client.query(sql(req.body.event), (queryError2, result2) => {
                if (queryError2)
                    return console.error('Error querying database', queryError2);
                res.send({
                    events: result2.rows.map(parse_event_1.default),
                    root: parse_event_1.default(result1.rows[0]),
                });
                releaseClient();
            });
        });
    });
});
pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});
const port = 3999;
app.listen(port, () => console.log(`Listening on port ${port}!`));
