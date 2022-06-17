const surround = (text: string, surroundWith: string) => `${surroundWith}${text}${surroundWith}`;

export const _surround = (surroundWith: string) => (text: string) => surround(text, surroundWith);

export default surround;
