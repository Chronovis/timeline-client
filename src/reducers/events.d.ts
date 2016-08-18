interface IEvent {
	body: string;
	coordinates: Array<any>;
	title: string;
	slug: string;
}

interface IDefaultState {
	events: IEvent[];
	root: IEvent;
}
