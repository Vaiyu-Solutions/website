import { getCollection, type CollectionEntry } from 'astro:content';

export type Announcement = CollectionEntry<'announcements'>;

/** Public URL. Always the filename minus `.md` — nothing to override. */
export const announcementHref = (a: Announcement) => `/announcements/${a.id}/`;

/**
 * Newest first. Drafts render in `pnpm dev` so they can be previewed, and are
 * dropped from production builds.
 */
export async function getAnnouncements(): Promise<Announcement[]> {
  const all = await getCollection(
    'announcements',
    ({ data }) => import.meta.env.DEV || !data.draft
  );
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// Dates are authored as bare `YYYY-MM-DD` and parsed as UTC midnight — format in
// UTC too, or a build machine west of Greenwich prints the previous day.
const long = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export const formatDate = (d: Date) => long.format(d);
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
