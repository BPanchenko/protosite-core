import AvatarElement, { AvatarMetadata } from '../avatar';

describe('AvatarElement', () => {
	const avatar = new AvatarElement();
	document.body.appendChild(avatar);

	it('markup', () => {
		expect(document.body).toMatchSnapshot();
	});

	it('references', () => {
		expect(avatar.$refs).toMatchSnapshot();
	});

	it('metadata', () => {
		expect(AvatarMetadata).toMatchSnapshot();
	});
});
