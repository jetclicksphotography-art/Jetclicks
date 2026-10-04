/**
 * Studio-approved copy options for the Home page hero paragraph.
 * The large H1 on the Home page remains fixed; only the supporting paragraph
 * can be changed from the studio console.
 */
export const DEFAULT_HOME_MESSAGE =
  "Honest, considered photography for weddings, people, events, and brands. We focus on the moments you'll want to remember—not just the ones that look good on a screen.";

export const HOME_MESSAGE_TEMPLATES = [
  {
    id: 'message-1',
    label: 'Message 1',
    text: DEFAULT_HOME_MESSAGE
  },
  {
    id: 'message-2',
    label: 'Message 2',
    text: 'We make space for the real moments—the quiet ones, the joyful ones, and the in-between. Every gallery is shaped with care so the feeling of the day stays with you long after it is over.'
  },
  {
    id: 'message-3',
    label: 'Message 3',
    text: 'From intimate portraits to full wedding days, we photograph with a calm, observant approach. The goal is simple: honest images that feel like you, not a version of you staged for the camera.'
  },
  {
    id: 'message-4',
    label: 'Message 4',
    text: 'Beautiful photographs should still feel true. We pay attention to the people, places, light, and small details that make your story yours, then turn those moments into a collection you will want to revisit.'
  },
  {
    id: 'message-5',
    label: 'Message 5',
    text: 'Your day does not need to be perfectly posed to be beautifully documented. We direct when it helps, step back when it matters, and stay ready for the moments you could never plan.'
  },
  {
    id: 'message-6',
    label: 'Message 6',
    text: 'We photograph the atmosphere as much as the people: the anticipation, the laughter, the quiet pauses, and the energy that fills a room. Thoughtful coverage, carefully edited and made to last.'
  },
  {
    id: 'message-7',
    label: 'Message 7',
    text: 'Whether you are planning a wedding, celebrating a milestone, or building a brand, we bring the same attention to every frame. Natural moments, intentional portraits, and images with a sense of place.'
  },
  {
    id: 'message-8',
    label: 'Message 8',
    text: 'We believe the best photographs happen when you are present in the moment. Our job is to notice what matters, guide you when needed, and preserve the story as it naturally unfolds.'
  },
  {
    id: 'message-9',
    label: 'Message 9',
    text: 'For the days you have planned for years and the moments you did not see coming, we are there to document them with care. Honest coverage, clean storytelling, and photographs that grow more meaningful with time.'
  },
  {
    id: 'message-10',
    label: 'Message 10',
    text: 'No two celebrations look the same, so neither should their photographs. We create room for your personalities, your people, and your pace while keeping the final collection cohesive, natural, and deeply personal.'
  },
  {
    id: 'message-11',
    label: 'Message 11',
    text: 'We look for the frame behind the frame—the glance before a smile, the hands that reach for each other, the room before it fills. Those are often the images that bring the whole day back.'
  },
  {
    id: 'message-12',
    label: 'Message 12',
    text: 'Photography can be polished without feeling staged. We combine thoughtful composition with an unobtrusive approach, creating photographs that look beautiful while still carrying the character of the people in them.'
  },
  {
    id: 'message-13',
    label: 'Message 13',
    text: 'For couples, families, graduates, and growing brands, we keep the process simple and the photographs intentional. A relaxed experience, careful observation, and a finished gallery built around what mattered most.'
  },
  {
    id: 'message-14',
    label: 'Message 14',
    text: 'The photographs you keep are rarely the ones that simply looked good. They are the ones that make you remember how the room felt, who was there, and what the moment meant. That is what we aim to preserve.'
  },
  {
    id: 'message-15',
    label: 'Message 15',
    text: 'We are here for the full story—not only the highlights. From getting ready to the last dance, from a quiet portrait to a room full of people, we document the details and emotions that make your day unmistakably yours.'
  }
];

export function parseHomeMessageConfig(settings = {}) {
  const fallback = { mode: 'default', templateId: 'message-1', customText: '' };
  let parsed = fallback;

  try {
    const value = JSON.parse(String(settings.homeMessageConfig || ''));
    if (value && typeof value === 'object') {
      parsed = {
        mode: value.mode === 'custom' || value.mode === 'template' ? value.mode : 'default',
        templateId: typeof value.templateId === 'string' ? value.templateId : fallback.templateId,
        customText: typeof value.customText === 'string' ? value.customText : ''
      };
    }
  } catch {
    // No saved Home message is the normal first-run state.
  }

  const template = HOME_MESSAGE_TEMPLATES.find((item) => item.id === parsed.templateId) || HOME_MESSAGE_TEMPLATES[0];
  const customText = parsed.customText.trim();

  if (parsed.mode === 'custom' && customText) {
    return { ...parsed, customText, activeText: customText };
  }
  if (parsed.mode === 'template') {
    return { ...parsed, activeText: template.text };
  }
  return { ...parsed, mode: 'default', activeText: DEFAULT_HOME_MESSAGE };
}

export function homeMessageResponse(settings = {}) {
  const config = parseHomeMessageConfig(settings);
  return {
    mode: config.mode,
    templateId: config.templateId,
    customText: config.customText,
    activeText: config.activeText,
    templates: HOME_MESSAGE_TEMPLATES
  };
}
