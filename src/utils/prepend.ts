const prepend = (str: string, textToPrepend: string): string => `${textToPrepend}${str}`;

export const _prepend =
  (textToPrepend: string) =>
  (str: string): string =>
    prepend(str, textToPrepend);

export default prepend;
