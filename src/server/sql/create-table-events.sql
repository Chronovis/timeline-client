DROP TABLE IF EXISTS event CASCADE;
DROP TABLE IF EXISTS event_type CASCADE;
DROP TABLE IF EXISTS event__event CASCADE;
DROP TABLE IF EXISTS event__event_type CASCADE;

CREATE TABLE event (
	id serial primary key,
	slug text UNIQUE,
	title text,
	body text,
	date_range tstzrange,
	date_range_uncertain tstzrange,
	date timestamp with time zone,
	date_uncertain tstzrange,
	coordinates geography(POINT,4326)
);

CREATE TABLE event_type (
	id serial primary key,
	title text UNIQUE,
	body text
);

CREATE TABLE event__event (
	parent_event_id serial,
	child_event_id serial,
	primary key (parent_event_id, child_event_id)
);

CREATE TABLE event__event_type (
	event_id serial,
	event_type_id serial,
	primary key (event_id, event_type_id)
);
