/*
 Is child el a descendant of parent el?
 http://stackoverflow.com/questions/2234979/how-to-check-in-javascript-if-one-element-is-a-child-of-another
 */
export const hasDescendant = (el: HTMLElement, child: HTMLElement): boolean => {
	let node = child.parentNode;

	while (node != null) {
		if (node === el) {
			return true;
		}

		node = node.parentNode;
	}

	return false;
};
