INSERT INTO event_type (title) VALUES ('birth'); -- 1
INSERT INTO event_type (title) VALUES ('death'); -- 2
INSERT INTO event_type (title) VALUES ('sex-man'); -- 3
INSERT INTO event_type (title) VALUES ('country'); -- 4
INSERT INTO event_type (title) VALUES ('other'); -- 5
INSERT INTO event_type (title) VALUES ('battle'); -- 6
INSERT INTO event_type (title) VALUES ('land-battle'); -- 7
INSERT INTO event_type (title) VALUES ('naval-battle'); -- 8
INSERT INTO event_type (title) VALUES ('aerial-battle'); -- 9
INSERT INTO event_type (title) VALUES ('sex-woman'); -- 10
INSERT INTO event_type (title) VALUES ('sex-other'); -- 11
INSERT INTO event_type (title) VALUES ('expedition'); -- 12

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
	'[1460-01-01, 1525-12-31]',
	'[1469-01-01, 1525-12-31]'
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

-- 10
INSERT INTO event (slug, title, date_granularity, date_range_granularity, date_range, date_range_uncertain) VALUES (
	'vasco-da-gama-s-first-voyage',
	'Vasco da Gama''s first voyage',
	2,
	2,
	'[1497-07-08 00:00 +0, 1499-09-18 00:00 +0]',
	'[1497-07-08 00:00 +0, 1499-08-29 00:00 +0]'
);

-- 11
INSERT INTO event (slug, title, date_granularity, date_range_granularity, date_range, date_range_uncertain) VALUES (
	'vasco-da-gama-s-second-voyage',
	'Vasco da Gama''s second voyage',
	2,
	2,
	'[1502-02-12 00:00 +0, 1503-09-30 00:00 +0]',
	'[1502-02-12 00:00 +0, 1503-09-01 00:00 +0]'
);

-- 12
INSERT INTO event (slug, title, date_granularity, date_range_granularity, date_range, date_range_uncertain) VALUES (
	'vasco-da-gama-s-third-voyage',
	'Vasco da Gama''s third voyage',
	2,
	2,
	'[1524-04-01 00:00 +0, 1525-12-31 00:00 +0]',
	'[1524-04-30 00:00 +0, 1525-04-01 00:00 +0]'
);

-- 13
INSERT INTO event (slug, title, date_granularity, date, coordinates) VALUES (
	'vasco-da-gama-lands-at-calicut--india-',
	'Vasco da Gama lands at Calicut (India)',
	2,
	'1498-05-20 00:00 +0',
	ST_GeographyFromText('SRID=4326;POINT(11.25 75.77)')
);

INSERT INTO event__event (parent_event_id, child_event_id) VALUES (3, 1);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (3, 2);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (4, 3);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (4, 5);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (4, 8);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (8, 7);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (8, 6);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (4, 9);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (3, 10);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (3, 11);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (3, 12);
INSERT INTO event__event (parent_event_id, child_event_id) VALUES (10, 13);

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
INSERT INTO event__event_type (event_id, event_type_id) VALUES (10, 12);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (11, 12);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (12, 12);
INSERT INTO event__event_type (event_id, event_type_id) VALUES (13, 5);

SELECT * FROM event;
