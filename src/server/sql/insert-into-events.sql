INSERT INTO event_type (title) VALUES ('birth');
INSERT INTO event_type (title) VALUES ('death');
INSERT INTO event_type (title) VALUES ('sex-man');
INSERT INTO event_type (title) VALUES ('country');
INSERT INTO event_type (title) VALUES ('other');
INSERT INTO event_type (title) VALUES ('battle');
INSERT INTO event_type (title) VALUES ('land-battle');
INSERT INTO event_type (title) VALUES ('naval-battle');
INSERT INTO event_type (title) VALUES ('aerial-battle');
INSERT INTO event_type (title) VALUES ('sex-woman');
INSERT INTO event_type (title) VALUES ('sex-other');

-- 1
INSERT INTO event (slug, title, date_granularity, date_range_granularity, date_uncertain, coordinates) VALUES (
	'birth-of-vasco-da-gama',
	'Birth of Vasco da Gama',
	2,
	2,
	'[1460-01-01, 1469-12-31]',
	ST_GeographyFromText('SRID=4326;POINT(37.954722 -8.864444)')
);

-- 2
INSERT INTO event (slug, title, date_granularity, date, coordinates) VALUES (
	'death-of-vasco-da-gama',
	'Death of Vasco da Gama',
	2,
	'1524-12-24',
	ST_GeographyFromText('SRID=4326;POINT(9.97 76.28)')
);

-- 3
INSERT INTO event (slug, title, date_granularity, date_range_granularity, date_range, date_range_uncertain) VALUES (
	'vasco-da-gama',
	'Vasco da Gama',
	2,
	2,
	'[1460-01-01, 1524-12-24]',
	'[1469-01-01, 1524-12-24]'
);

-- 4
INSERT INTO event (slug, title, date_granularity, date_range_granularity, date_range, coordinates) VALUES (
	'portugal',
	'Portugal',
	2,
	2,
	'[1128-06-26, infinity)',
	ST_GeographyFromText('SRID=4326;POINT(38.7 -9.183333)')
);

-- 5
INSERT INTO event (slug, title, date_granularity, date, coordinates) VALUES (
	'battle-of-sao-mamede',
	'Battle of São Mamede',
	2,
	'1128-06-24',
	ST_GeographyFromText('SRID=4326;POINT(41.45 -8.3)')
);

-- 6
INSERT INTO event (slug, title, date_granularity, date, coordinates) VALUES (
	'birth-of-manuel-i-of-portugal',
	'Birth of Manuel I of Portugal',
	2,
	'1469-05-31',
	ST_GeographyFromText('SRID=4326;POINT(38.75 -8.966667)')
);

-- 7
INSERT INTO event (slug, title, date_granularity, date, coordinates) VALUES (
	'death-of-manuel-i-of-portugal',
	'Death of Manuel I of Portugal',
	2,
	'1521-12-13',
	ST_GeographyFromText('SRID=4326;POINT(38.713889 -9.139444)')
);

-- 8
INSERT INTO event (slug, title, date_granularity, date_range_granularity, date_range) VALUES (
	'manuel-i-of-portugal',
	'Manuel I of Portugal',
	2,
	2,
	'[1469-05-31, 1521-12-13]'
);

-- 9
INSERT INTO event (slug, title, date_granularity, date_uncertain) VALUES (
	'lisbon-capital-of-portugal',
	'Lisbon capital of Portugal',
	0,
	'[1255-01-01 00:00 +0, 1255-12-31 00:00 +0]'
);

INSERT INTO event__event (parent_event_id, child_event_id) VALUES (3, 1);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (3, 2);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (4, 3);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (4, 5);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (4, 8);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (8, 7);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (8, 6);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (4, 9);

INSERT INTO event__event_type (event_id, event_type_id) VALUES (1, 1);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (2, 2);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (3, 3);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (4, 4);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (5, 6);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (5, 7);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (6, 1);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (7, 2);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (8, 3);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (9, 5);

SELECT * FROM event;
