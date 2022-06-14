import TailwindColorPalette from '$color/models/TailwindColorPalette';
import tailwindShadesAPI from '$color/logic/tailwindShadesAPI';
import { D, S } from '@mobily/ts-belt';
import api from '$api';

const removeHashFromHexColor = S.remove('#');
export const fetchTailwindColorPaletteFromExternalAPI = (
  hexColor: string
): Promise<TailwindColorPalette> => {
  const colorWithoutHash = removeHashFromHexColor(hexColor);

  return tailwindShadesAPI
    .get<{ custom: TailwindColorPalette }>(`/custom/${colorWithoutHash}`)
    .then((d) => d.data.custom);
};

const fetchTailwindColorPalette = (customColor: string) =>
  api
    .get<TailwindColorPalette>(`/custom-color/${S.remove(customColor, '#')}`)
    .then(D.getUnsafe('data'));

export default fetchTailwindColorPalette;
