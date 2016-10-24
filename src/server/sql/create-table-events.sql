CREATE EXTENSION postgis;

DROP TABLE IF EXISTS event CASCADE;
DROP TABLE IF EXISTS event_type CASCADE;
DROP TABLE IF EXISTS event__event CASCADE;
DROP TABLE IF EXISTS event__event_type CASCADE;

CREATE TABLE event (
	id SERIAL PRIMARY KEY,
	slug TEXT UNIQUE,
	title TEXT,
	body TEXT,
	date TIMESTAMP WITH TIME ZONE,
	date_granularity SMALLINT,
	date_range TSTZRANGE,
	date_range_granularity SMALLINT,
	date_range_uncertain TSTZRANGE,
	date_uncertain TSTZRANGE,
	coordinates GEOGRAPHY(POINT,4326)
);

CREATE TABLE event_type (
	id SERIAL primary key,
	title TEXT UNIQUE,
	body TEXT
);

CREATE TABLE event__event (
	parent_event_id SERIAL,
	child_event_id SERIAL,
	PRIMARY KEY (parent_event_id, child_event_id)
);

CREATE TABLE event__event_type (
	event_id SERIAL,
	event_type_id SERIAL,
	PRIMARY KEY (event_id, event_type_id)
);
