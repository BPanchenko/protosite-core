import AvatarElement from '../avatar';

describe('AvatarElement', () => {
	const avatar = new AvatarElement();

	test('renders correctly', () => {
		document.body.appendChild(avatar);
		expect(document.body).toMatchSnapshot();
	});
});
