type StringCaseHelper = (str: string) => string;

export const titleCase: StringCaseHelper = (str) => {
  return str.replace(/\w\S*/g, (txt: string) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};
