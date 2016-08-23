const parseDateRange = (dateRange: string) => {
	if (dateRange == null) return null;

	const [from, to] = dateRange.slice(1, -1).split(',');
	return {
		from: from.slice(1, -1),
		to: (to === 'infinity') ? to : to.slice(1, -1),
	};
};

export default (event) => {
	event.dateUncertain = parseDateRange(event.date_uncertain);
	delete event.date_uncertain;

	event.dateRange = parseDateRange(event.date_range);
	delete event.date_range;

	event.dateRangeUncertain = parseDateRange(event.date_range_uncertain);
	delete event.date_range_uncertain;

	return event;
};
