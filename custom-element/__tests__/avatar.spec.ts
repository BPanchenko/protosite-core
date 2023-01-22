import AvatarElement from '../avatar';

describe('Avatar', () => {
	const avatar = new AvatarElement();
	test('renders correctly', () => {
		expect(avatar).toMatchSnapshot();
	});
});
