import AvatarElement, { AvatarMetadata } from '../avatar';

console.log(AvatarMetadata);
console.log(AvatarElement);

describe('AvatarElement', () => {
	const avatar = document.createElement('abbr');

	console.log(avatar);

	it('markup', () => {
		document.body.appendChild(avatar);
		expect(document.body).toMatchSnapshot();
	});
});
