import { json } from './_lib/util.js';
import { getSettings } from './_lib/store.js';
import { homeMessageResponse } from './_lib/home-messages.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });
  try {
    const settings = await getSettings();
    json(res, 200, {
      botName: process.env.BOT_NAME || 'JetClicks Assistant',
      agreement: { name: settings.agreementName, url: settings.agreementUrl },
      homeMessage: homeMessageResponse(settings).activeText
    });
  } catch (error) {
    console.error('config', error);
    // The booking form must still render with its bundled placeholder agreement.
    json(res, 200, {
      botName: process.env.BOT_NAME || 'JetClicks Assistant',
      agreement: {
        name: 'JetClicks Booking Waiver & Agreement (Placeholder)',
        url: '/agreements/jetclicks-booking-waiver-placeholder.pdf'
      },
      homeMessage: homeMessageResponse({}).activeText,
      degraded: true
    });
  }
}
