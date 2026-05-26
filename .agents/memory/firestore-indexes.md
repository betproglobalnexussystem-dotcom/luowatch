---
name: Firestore composite index avoidance
description: How to avoid "requires an index" Firebase errors in this project
---

## Rule
Never combine `where(fieldA, ...)` + `orderBy(fieldB, ...)` on **different fields** in a single Firestore query — this requires a composite index that must be manually created in Firebase Console.

## Safe patterns
- Single `orderBy('createdAt', 'desc')` alone → OK (single-field index auto-created)
- `where('type', '==', 'series')` alone (no orderBy) → OK
- Multiple `where` clauses without `orderBy` → OK (within limits)

## What we do instead
- `getFeatured()`: fetch all movies, filter `m.featured` client-side
- `getSeries()` episodes: query `where('movieId', '==', id)` only, then `.sort()` client-side
- `getComments()`: query `where('contentId') + where('contentType')`, sort client-side
- `getActivities()`: only `orderBy('createdAt', 'desc')` — no where clause — is safe

**Why:** Firebase auto-creates single-field indexes but composite ones need explicit creation. Doing sorts client-side avoids the Firebase Console step.
