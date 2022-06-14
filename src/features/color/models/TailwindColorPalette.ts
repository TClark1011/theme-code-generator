export type TailwindShade =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type TailwindColorPalette = Record<TailwindShade, string>;

export default TailwindColorPalette;
