import { colorPalettes } from '$color/constants';
import { findItemWithId } from '$entity-helpers';

const getSampleColorFromPaletteId = (paletteId: string): string => {
  const matchingPaletteScale = findItemWithId(colorPalettes, paletteId);

  if (!matchingPaletteScale) throw Error('No color palette found');

  return matchingPaletteScale.values[5].value;
};

export default getSampleColorFromPaletteId;
