# Blossom & Oud

Standalone React + Next.js invitation recreated from https://webgencyinvitations.com/blossomoud.

## Run

```sh
npm run dev -- --port 3002
```

Open http://localhost:3002. Dependencies are installed. For production use `npm run build` and `npm start`.

Includes the gold Arabic wax-seal envelope with the reference's five-second opening sequence; palace video; Arabic invitation in an ornamental arch; countdown; scroll-following and rotating timeline flower; venue art; outfit palette; French RSVP form; embedded Beldi Country Club map; swinging chandelier; closing video and background music.

The complete invitation and envelope stay centered within 440px on desktop. Smaller screens use their available width. All images, fonts, audio and videos are saved locally in `public/`. Source URLs are recorded in `asset-sources.json`.

Edit `src/lib/wedding.ts` for names, date, venue and schedule. Edit the Arabic copy in `src/components/Invitation.tsx` and sharing metadata in `src/app/layout.tsx`. The reference's Arabic weekday is preserved in its copy; update this along with the date when personalizing the invitation.

RSVP submissions are validated and saved in `.data/rsvps.ndjson` on the Next.js server. They include name, guest count and attendance. They are not emailed. For hosting, use a persistent disk or connect a durable database; serverless temporary disks do not provide permanent storage.

Automated tests and production build are left to the user as requested.

## Pakistani market edition

The active template now uses generated Pakistani bridal/formal imagery, modest full-sleeved outfits and dupattas, family-centered Nikah/Baraat/Rukhsati wording, and Lahore demo details. The three-photo galleries are curated, not repeated Western galleries. Superseded photos and commercial music have been moved outside this project to the workspace's .original-assets backup. The Pakistani edition is quiet by default.

The sample names, 17 December 2027 date and Shahi Bagh venue are demonstration details. Replace them and the Lahore city map with the customer's real information before sending. For the first three projects edit src/lib/wedding.ts; for Dolce Vita and Sacred Garden edit public/invitation.html. Original colours, card width, decorative motifs and interactions are retained.

New assets are in public/pakistani. pk-attire.png has true transparency; the other images include their scene backgrounds. The prompt specifications and generation provenance are saved in the shared pakistani-assets folder.
