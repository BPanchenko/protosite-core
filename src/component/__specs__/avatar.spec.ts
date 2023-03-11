import AvatarElement, { AvatarMetadata } from '../avatar';

describe('AvatarElement', () => {
	const avatar = new AvatarElement();

	it('markup', () => {
		document.body.appendChild(avatar);
		expect(document.body).toMatchSnapshot();
	});
});
