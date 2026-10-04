import type { PortfolioCategory, PortfolioItem } from "../types";

export const categories: PortfolioCategory[] = [
  "Wedding",
  "Prenup",
  "Proposal",
  "Birthdays",
  "Portrait",
  "Island tour",
  "Family",
  "Drones",
  "Corporate",
  "Ceremony",
];

const item = (
  id: string,
  category: PortfolioCategory,
  file: string,
  title: string,
  alt: string,
): PortfolioItem => ({
  id,
  category,
  title,
  image: `/images/portfolio/${file}.webp`,
  thumb: `/images/portfolio/${file}-thumb.webp`,
  alt,
});

export const portfolio: PortfolioItem[] = [
  item("w10", "Wedding", "wedding/wedding-10", "At the altar", "Bride and groom facing each other at a gilded church altar surrounded by white flowers"),
  item("pr1", "Proposal", "proposal/proposal-01", "She said yes", "Marriage proposal under a floral arch on a white sand beach"),
  item("w5", "Wedding", "wedding/wedding-05", "Beach vows", "Bride with a long veil and groom in cream embracing on a palm-lined beach"),
  item("b1", "Birthdays", "birthdays/birthdays-01", "Little princess", "Young girl in a lilac gown and tiara among garden greenery"),
  item("pn2", "Prenup", "prenup/prenup-02", "Sunset prenup", "Couple in white on a pebbled shore with the sun setting behind the mountains"),
  item("w1", "Wedding", "wedding/wedding-01", "Getting ready", "Bride in a white satin robe standing by a bright hotel window"),
  item("pr3", "Proposal", "proposal/proposal-03", "After the yes", "Laughing couple piggybacking along the shoreline in golden light"),
  item("w6", "Wedding", "wedding/wedding-06", "The entourage", "Bridesmaids in pink gowns with white parasols gathered around the bride in a garden"),
  item("b9", "Birthdays", "birthdays/birthdays-09", "Seventh birthday", "Boy in a tan suit in front of a bright balloon arch at his birthday party"),
  item("pn1", "Prenup", "prenup/prenup-01", "Among the cliffs", "Couple holding hands beneath a tree with limestone cliffs behind them"),
  item("w15", "Wedding", "wedding/wedding-15", "The entrance", "Bride framed in a flower-covered doorway at the top of the aisle, seen past the guests"),
  item("pr4", "Proposal", "proposal/proposal-04", "Island proposal", "Man kneeling to propose inside a heart of rose petals on an island beach"),
  item("w2", "Wedding", "wedding/wedding-02", "Before the aisle", "Bride in a lace gown holding a white bouquet in soft window light"),
  item("b7", "Birthdays", "birthdays/birthdays-07", "Seaside family", "Parents and their child sitting together on a tree trunk by the sea"),
  item("w14", "Wedding", "wedding/wedding-14", "Just married", "Newlyweds standing in the church aisle behind white blossom arrangements"),
  item("pr2", "Proposal", "proposal/proposal-02", "The ring", "Man kneeling with an open ring box beneath a draped floral arch on the sand"),
  item("w7", "Wedding", "wedding/wedding-07", "Garden portrait", "Bride in a full satin gown holding a cascading bouquet under dense green trees"),
  item("b4", "Birthdays", "birthdays/birthdays-04", "Golden celebration", "Woman in a gold gown holding a white bouquet in front of a floral backdrop"),
  item("pn3", "Prenup", "prenup/prenup-03", "Garden prenup", "Couple in white standing close together on a garden lawn beside a pool"),
  item("w3", "Wedding", "wedding/wedding-03", "The ceremony", "Wide view of a church ceremony from the choir loft, guests seated along the red aisle"),
  item("pr6", "Proposal", "proposal/proposal-06", "Golden hour", "Couple embracing on an empty sandbar as the sun sets over the water"),
  item("w16", "Wedding", "wedding/wedding-16", "Colour and light", "Bride on a stone path holding a bright pastel bouquet, framed by leaves"),
  item("b2", "Birthdays", "birthdays/birthdays-02", "First birthday", "First birthday setup with pink and lilac balloons and the birthday girl in a high chair"),
  item("w8", "Wedding", "wedding/wedding-08", "The groomsmen", "Groom in dress uniform flanked by groomsmen in barong under a broad tree"),
  item("pr5", "Proposal", "proposal/proposal-05", "By the cliffs", "Couple embracing at the water's edge beside a limestone cliff"),
  item("w11", "Wedding", "wedding/wedding-11", "Afternoon light", "Bride and groom on a low wall overlooking open fields in late afternoon sun"),
  item("b6", "Birthdays", "birthdays/birthdays-06", "Family in white", "Family of three dressed in white beside a poolside venue"),
  item("w9", "Wedding", "wedding/wedding-09", "The gown", "Bride in a wide ballgown holding orchids on a garden walkway"),
  item("b8", "Birthdays", "birthdays/birthdays-08", "By the water", "Parents holding their sleeping toddler on the shoreline under a leaning tree"),
  item("w12", "Wedding", "wedding/wedding-12", "Morning of", "Bride in a sheer robe holding a white orchid bouquet in a hotel suite"),
  item("b3", "Birthdays", "birthdays/birthdays-03", "Balloons and red", "Mother carrying her daughter, both in red, holding a pink balloon outside a restaurant"),
  item("w13", "Wedding", "wedding/wedding-13", "Quiet moment", "Bride in a lace veil seated on the bed of a deep blue hotel room"),
  item("b5", "Birthdays", "birthdays/birthdays-05", "Christening day", "Baby being christened in her mother's arms as water is poured at the font"),
  item("w4", "Wedding", "wedding/wedding-04", "Portrait in blue", "Bride in an ivory beaded gown against a deep blue curtain"),
  item("pn4", "Prenup", "prenup/prenup-04", "Kiss on cheek", "After a YES a warmth kiss")
];

/** Hand-picked lead images for the home page grid. */
export const featured: PortfolioItem[] = [
  "w10",
  "pr1",
  "w5",
  "pn4",
].map((id) => portfolio.find((x) => x.id === id)!);

/**
 * Films (same-day edits, highlight reels) stream from YouTube or Vimeo so the
 * site never serves the video itself.
 *
 * To publish one, paste the id into the second argument below:
 *   YouTube https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  "dQw4w9WgXcQ"
 *   Vimeo   https://vimeo.com/76979871                   ->  "76979871"
 *
 * Entries with an empty id stay hidden everywhere, so drafts are safe to keep
 * here. The `poster` argument is the still shown on the card - the paths below
 * reuse existing photos; swap them for real 16:9 frames under
 * public/images/portfolio/films/ when they are ready.
 */
const film = (
  id: string,
  videoId: string,
  videoHost: "youtube" | "vimeo",
  poster: string,
  title: string,
  duration: string,
  alt: string,
): PortfolioItem => ({
  id,
  category: "Films",
  title,
  image: `/images/portfolio/${poster}.webp`,
  thumb: `/images/portfolio/${poster}-thumb.webp`,
  alt,
  videoId,
  videoHost,
  duration,
});

const filmDrafts: PortfolioItem[] = [
  film("f1", "", "youtube", "wedding/wedding-03", "Same-day edit", "4:30", "Still from the same-day edit: wide view of a church ceremony from the choir loft"),
  film("f2", "", "youtube", "wedding/wedding-11", "Wedding film", "3:10", "Still from the wedding film: bride and groom overlooking open fields in late afternoon sun"),
  film("f3", "", "youtube", "prenup/prenup-02", "Prenup film", "2:05", "Still from the prenup film: couple in white on a pebbled shore at sunset"),
  film("f4", "", "youtube", "birthdays/birthdays-09", "Event highlights", "2:40", "Still from the event highlights: boy in a tan suit in front of a bright balloon arch"),
];

/** Only films with a video id are live. */
export const films: PortfolioItem[] = filmDrafts.filter((f) => f.videoId !== "");

/** Films first, then photographs - used by the "All work" gallery filter. */
export const allWork: PortfolioItem[] = [...films, ...portfolio];

/** Filter buttons for the gallery. "Films" only appears once a film is live. */
export const galleryFilters: PortfolioCategory[] = films.length
  ? [...categories, "Films"]
  : categories;
