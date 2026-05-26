---
name: Firebase schema alignment
description: The exact field names and collection structure for the LUO Watch Firebase/Firestore backend
---

## Movie fields (collection: `movies`)
- `posterUrl` (not `poster`)
- `movieUrl` (not `videoUrl`)
- `genre: string` (not `genres: string[]`)
- `type: 'movie' | 'series'` (not `'tv'`)
- `year: string | number`
- `rating` is optional (`?`)
- `downloads`, `downloadUrl` also optional

## Episodes (collection: `episodes` — flat, not subcollection)
- `movieId: string` — links to parent movie/series doc id
- `season: string` — format "S01"
- `episode: string` — format "E03"
- `episodeTitle: string` (not `title`)
- `episodeUrl: string` (not `videoUrl`)

## Users/Auth (collection: `profiles`, doc ID = Firebase UID)
- `firstName`, `lastName` (not a single `name`)
- `role: 'viewer' | 'vj' | 'musician' | 'tiktoker' | 'admin'` (not `'user'`)
- Admin emails hardcoded: `luowatch0@gmail.com`, `mainplatform.nexus@gmail.com`
- `name` is computed from firstName + lastName in `AppUser` for backward compat

## Activity (collection: `activities`)
- `type: 'view' | 'download' | 'share' | 'comment' | 'like' | 'save'`
- `contentType: 'movie' | 'music' | 'tiktok' | 'channel'`
- `contentId: string`, `contentTitle: string`
- `userId: string`, `userName: string`
- `createdAt: serverTimestamp()`
- (not `action`, `target`, `date`)

## Comments (collection: `comments`)
- `contentId: string`, `contentType: string`
- `userId: string`, `userName: string` (not `uid`, `name`)

## Service mapping
- `addMovie()` / `addSeries()` / `addEpisode()` accept old field names (poster, genres, videoUrl, type 'tv') and normalize to new schema internally
- `addActivity()` accepts old `{action, target}` shape and maps to new schema

**Why:** The docs define the exact Firestore schema; Angular components had grown with old ad-hoc names.
