import { fetchTailwindColorPaletteFromExternalAPI } from '$color';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { color } = req.query as { color: string };
  console.log('([color]) color: ', color);
  if (req.method === 'GET') {
    const newPalette = await fetchTailwindColorPaletteFromExternalAPI(color);
    res.status(200).json(newPalette);
  }
};

export default handler;
