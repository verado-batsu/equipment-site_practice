export function findRightPath(title) {
	let path = `/${title.toLowerCase()}`

	if (title === 'Create Equipment') {
		path = '/create';
	} else if (title === 'Home') {
		path = '/'
	}

	return path;
}