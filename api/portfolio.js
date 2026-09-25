import { json } from './_lib/util.js';
import { getPortfolio } from './_lib/store.js';

/**
 * Public list of studio-uploaded portfolio photos. Image bytes live in Google
 * Drive; these URLs are Drive's public thumbnail endpoint, which resizes on the
 * fly so cards get a small file and the lightbox a large one from one upload.
 */
const driveImage = (id, size) => `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w${size}`;

export default async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });
  try {
    const items = await getPortfolio();
    const portfolio = items
      .filter((x) => x.driveId)
      .map((x) => ({
        id: x.id,
        category: x.category,
        title: x.caption || '',
        alt: x.alt || x.caption || 'JetClicks portfolio photograph',
        image: driveImage(x.driveId, 1600),
        thumb: driveImage(x.driveId, 600),
      }));
    return json(res, 200, { portfolio });
  } catch (error) {
    console.error('portfolio', error);
    // The gallery still has its bundled curated set; degrade quietly.
    return json(res, 200, { portfolio: [], degraded: true });
  }
}
