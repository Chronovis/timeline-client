INSERT INTO event_type (title) VALUES ('birth');
INSERT INTO event_type (title) VALUES ('death');
INSERT INTO event_type (title) VALUES ('person');
INSERT INTO event_type (title) VALUES ('country');
INSERT INTO event_type (title) VALUES ('other');
INSERT INTO event_type (title) VALUES ('battle');
INSERT INTO event_type (title) VALUES ('land battle');
INSERT INTO event_type (title) VALUES ('naval battle');
INSERT INTO event_type (title) VALUES ('aerial battle');


INSERT INTO event (slug, title, date_uncertain, coordinates) VALUES (
	'birth-of-vasco-da-gama',
	'Birth of Vasco da Gama',
	'[1460-01-01, 1469-12-31]',
	ST_GeographyFromText('SRID=4326;POINT(37.954722 -8.864444)')
);

INSERT INTO event (slug, title, date, coordinates) VALUES (
	'death-of-vasco-da-gama',
	'Death of Vasco da Gama',
	'1524-12-24',
	ST_GeographyFromText('SRID=4326;POINT(9.97 76.28)')
);

INSERT INTO event (slug, title, date_range, date_range_uncertain) VALUES (
	'vasco-da-gama',
	'Vasco da Gama',
	'[1460-01-01, 1524-12-24]',
	'[1469-01-01, 1524-12-24]'
);

INSERT INTO event (slug, title, date_range, coordinates) VALUES (
	'portugal',
	'Portugal',
	'[1128-06-26, infinity)',
	ST_GeographyFromText('SRID=4326;POINT(38.7 -9.183333)')
);

INSERT INTO event (slug, title, date, coordinates) VALUES (
	'battle-of-sao-mamede',
	'Battle of São Mamede',
	'1128-06-24',
	ST_GeographyFromText('SRID=4326;POINT(41.45 -8.3)')
);

INSERT INTO event__event (parent_event_id, child_event_id) VALUES (3, 1);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (3, 2);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (4, 3);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (4, 5);

INSERT INTO event__event_type (event_id, event_type_id) VALUES (1, 1);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (2, 2);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (3, 3);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (4, 4);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (5, 6);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (5, 7);

SELECT * FROM event;
