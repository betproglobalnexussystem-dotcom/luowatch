import { Injectable } from '@angular/core';
import { Movie, MovieSection } from '../models/movie.model';

const TMDB = 'https://image.tmdb.org/t/p/w300';
const TMDB_ORIG = 'https://image.tmdb.org/t/p/original';

@Injectable({ providedIn: 'root' })
export class MovieService {

  getFeatured(): Movie[] {
    return [
      {
        id: 1, title: 'Oppenheimer', year: 2023, rating: 8.3,
        genres: ['Drama', 'History', 'Thriller'],
        description: 'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb during World War II. The triumph, the hubris, and the ultimate tragedy of the American Prometheus.',
        backdrop: TMDB_ORIG + '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
        poster: TMDB + '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        duration: '3h 0m', language: 'English', quality: 'HD', type: 'movie'
      },
      {
        id: 2, title: 'Deadpool & Wolverine', year: 2024, rating: 8.1,
        genres: ['Action', 'Comedy', 'Sci-Fi'],
        description: 'Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a reluctant Wolverine to help save his universe from extinction.',
        backdrop: TMDB_ORIG + '/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg',
        poster: TMDB + '/8cdWjvZQUExUULgtOe4OkNykPFB.jpg',
        duration: '2h 8m', language: 'English', quality: '4K', type: 'movie'
      },
      {
        id: 3, title: 'House of the Dragon', year: 2022, rating: 8.4,
        genres: ['Fantasy', 'Drama', 'Action'],
        description: 'An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen. Fire and blood reign supreme.',
        backdrop: TMDB_ORIG + '/suopoADq0k8YZr4dQXcU6pToj6s.jpg',
        poster: TMDB + '/t9XkeE7HzOsdQcDDDapDYh8Rrmt.jpg',
        duration: '58m', language: 'English', quality: '4K', type: 'tv'
      },
      {
        id: 4, title: 'Alien: Romulus', year: 2024, rating: 7.3,
        genres: ['Sci-Fi', 'Horror', 'Action'],
        description: 'A group of young people on a distant world find themselves in a confrontation with the most terrifying life form in the universe while scavenging an abandoned space station.',
        backdrop: TMDB_ORIG + '/5vdTKHMEVXdJrNaAhG2MgxNklCw.jpg',
        poster: TMDB + '/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg',
        duration: '1h 59m', language: 'English', quality: 'HD', type: 'movie'
      },
      {
        id: 5, title: 'The Boys', year: 2024, rating: 8.7,
        genres: ['Action', 'Drama', 'Sci-Fi'],
        description: 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers. In a world where the powerful prey on the powerless, someone has to fight back.',
        backdrop: TMDB_ORIG + '/or4KoeNWmHAVSgfMxWDI2vzHmXD.jpg',
        poster: TMDB + '/1WkIPZ1dBbYLxE3Cl0BHWG8c3PO.jpg',
        duration: '1h', language: 'English', quality: '4K', type: 'tv'
      },
    ];
  }

  getSections(): MovieSection[] {
    return [
      {
        title: 'Trending Now',
        slug: 'trending',
        movies: [
          { id: 1, title: 'Oppenheimer', year: 2023, rating: 8.3, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', duration: '3h', language: 'English', quality: 'HD', type: 'movie' },
          { id: 2, title: 'Deadpool & Wolverine', year: 2024, rating: 8.1, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/8cdWjvZQUExUULgtOe4OkNykPFB.jpg', duration: '2h 8m', language: 'English', quality: '4K', type: 'movie' },
          { id: 70, title: 'Twisters', year: 2024, rating: 7.3, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/pjnD08FlMAIXsfOLKQbIt9sXoell.jpg', duration: '2h 2m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 5, title: 'The Boys', year: 2024, rating: 8.7, genres: ['Sci-Fi'], description: '', backdrop: '', poster: TMDB + '/1WkIPZ1dBbYLxE3Cl0BHWG8c3PO.jpg', duration: '1h', language: 'English', quality: '4K', type: 'tv' },
          { id: 3, title: 'House of the Dragon', year: 2022, rating: 8.4, genres: ['Fantasy'], description: '', backdrop: '', poster: TMDB + '/t9XkeE7HzOsdQcDDDapDYh8Rrmt.jpg', duration: '58m', language: 'English', quality: '4K', type: 'tv' },
          { id: 4, title: 'Alien: Romulus', year: 2024, rating: 7.3, genres: ['Sci-Fi'], description: '', backdrop: '', poster: TMDB + '/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg', duration: '2h', language: 'English', quality: 'HD', type: 'movie' },
          { id: 10, title: 'John Wick: Chapter 4', year: 2023, rating: 7.8, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', duration: '2h 49m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 16, title: 'Guardians of the Galaxy Vol. 3', year: 2023, rating: 8.0, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg', duration: '2h 30m', language: 'English', quality: '4K', type: 'movie' },
          { id: 50, title: 'The Bear', year: 2022, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg', duration: '30m', language: 'English', quality: '4K', type: 'tv' },
          { id: 51, title: 'The Last of Us', year: 2023, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg', duration: '50m', language: 'English', quality: '4K', type: 'tv' },
        ]
      },
      {
        title: 'Action Movies',
        slug: 'action',
        movies: [
          { id: 10, title: 'John Wick: Chapter 4', year: 2023, rating: 7.8, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', duration: '2h 49m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 11, title: 'Extraction 2', year: 2023, rating: 7.1, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/7GpBnzMWDBhiS5jlVCTNClzEfRI.jpg', duration: '2h 3m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 12, title: 'Mission: Impossible', year: 2023, rating: 7.6, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/NNxYkU70HPurnNCSiCjYAmacwm.jpg', duration: '2h 43m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 13, title: 'The Equalizer 3', year: 2023, rating: 7.1, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg', duration: '1h 49m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 14, title: 'Fast X', year: 2023, rating: 5.9, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/fiVW06jE7z9YnO4trhaMEdclSiC.jpg', duration: '2h 21m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 15, title: 'Aquaman 2', year: 2023, rating: 6.5, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/7lTnXOy0iNtBAdRP3TZvalpcVTX.jpg', duration: '2h 4m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 16, title: 'Guardians Vol. 3', year: 2023, rating: 8.0, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg', duration: '2h 30m', language: 'English', quality: '4K', type: 'movie' },
          { id: 17, title: 'Indiana Jones 5', year: 2023, rating: 6.9, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/Af4bXE63pVsb2FtbW2eTlw5BXMN.jpg', duration: '2h 34m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 18, title: 'Transformers: Rise of the Beasts', year: 2023, rating: 6.0, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/gPbM0MK8CP8A174rmUwGsADNYKD.jpg', duration: '2h 7m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 2, title: 'Deadpool & Wolverine', year: 2024, rating: 8.1, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/8cdWjvZQUExUULgtOe4OkNykPFB.jpg', duration: '2h 8m', language: 'English', quality: '4K', type: 'movie' },
        ]
      },
      {
        title: 'Horror Movies',
        slug: 'horror',
        movies: [
          { id: 30, title: 'The Nun II', year: 2023, rating: 6.2, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg', duration: '1h 50m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 31, title: 'Evil Dead Rise', year: 2023, rating: 7.0, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/t3iHy3Bi8GHcGC7IDbRJBnIWQyB.jpg', duration: '1h 36m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 32, title: 'Scream VI', year: 2023, rating: 7.0, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/wDtJQraj54eBZFhqFXoKYuaWrNZ.jpg', duration: '2h 3m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 33, title: 'M3GAN', year: 2023, rating: 6.4, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/d9nBoowhjiiYc4FBNtQkPY5J1Em.jpg', duration: '1h 42m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 34, title: 'Insidious: The Red Door', year: 2023, rating: 5.7, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/d07phJqCx6zo6ImhgkEBnJQDGU3.jpg', duration: '1h 47m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 35, title: "The Pope's Exorcist", year: 2023, rating: 6.5, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/dsFBFPiIAMPMFN6VGsKfXMJJIb9.jpg', duration: '1h 43m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 36, title: 'Knock at the Cabin', year: 2023, rating: 6.5, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/57tHDHkNcT6GlJRbDIqKMqAGAdZ.jpg', duration: '1h 40m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 37, title: 'The Menu', year: 2022, rating: 7.2, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/uT3CbVeRNJSGESnUXFoUO9OqjJP.jpg', duration: '1h 47m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 40, title: 'Talk to Me', year: 2023, rating: 7.1, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/kdPMArMBJ1gLB8VoHG8hvOGLkPR.jpg', duration: '1h 35m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 38, title: 'Barbarian', year: 2022, rating: 7.0, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/gg4ZfqPSatFBCHj4l1MaGPoiIaX.jpg', duration: '1h 42m', language: 'English', quality: 'HD', type: 'movie' },
        ]
      },
      {
        title: 'Hot Short TV',
        slug: 'tv-shows',
        movies: [
          { id: 50, title: 'The Bear', year: 2022, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg', duration: '30m', language: 'English', quality: '4K', type: 'tv' },
          { id: 51, title: 'The Last of Us', year: 2023, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg', duration: '50m', language: 'English', quality: '4K', type: 'tv' },
          { id: 52, title: 'Wednesday', year: 2022, rating: 8.1, genres: ['Fantasy'], description: '', backdrop: '', poster: TMDB + '/9PFonBhy4cQy7Jz20NpMygczOkv.jpg', duration: '50m', language: 'English', quality: 'HD', type: 'tv' },
          { id: 3, title: 'House of the Dragon', year: 2022, rating: 8.4, genres: ['Fantasy'], description: '', backdrop: '', poster: TMDB + '/t9XkeE7HzOsdQcDDDapDYh8Rrmt.jpg', duration: '58m', language: 'English', quality: '4K', type: 'tv' },
          { id: 53, title: 'Loki Season 2', year: 2023, rating: 7.9, genres: ['Sci-Fi'], description: '', backdrop: '', poster: TMDB + '/kEl2t3OhXc3Zb9FBh1AuYzRTCZA.jpg', duration: '46m', language: 'English', quality: 'HD', type: 'tv' },
          { id: 54, title: 'Severance', year: 2022, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/mIebPbF8lSaJBMRlF8IcUBEe6ya.jpg', duration: '52m', language: 'English', quality: '4K', type: 'tv' },
          { id: 55, title: 'Succession', year: 2018, rating: 8.9, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/e2X8jXFZT6YDlNGVMhbXVcf3yYj.jpg', duration: '1h', language: 'English', quality: 'HD', type: 'tv' },
          { id: 5, title: 'The Boys', year: 2024, rating: 8.7, genres: ['Sci-Fi'], description: '', backdrop: '', poster: TMDB + '/1WkIPZ1dBbYLxE3Cl0BHWG8c3PO.jpg', duration: '1h', language: 'English', quality: '4K', type: 'tv' },
          { id: 56, title: 'Ted Lasso', year: 2020, rating: 8.8, genres: ['Comedy'], description: '', backdrop: '', poster: TMDB + '/cVsmkijISBsFpQxoSTN6q1HkjrD.jpg', duration: '30m', language: 'English', quality: 'HD', type: 'tv' },
          { id: 58, title: 'Yellowstone', year: 2018, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/1YZFPFr0boJi3oYd0Y3oBkNRuYd.jpg', duration: '1h', language: 'English', quality: 'HD', type: 'tv' },
        ]
      },
      {
        title: 'New Releases',
        slug: 'new-releases',
        movies: [
          { id: 70, title: 'Twisters', year: 2024, rating: 7.3, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/pjnD08FlMAIXsfOLKQbIt9sXoell.jpg', duration: '2h 2m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 71, title: 'It Ends with Us', year: 2024, rating: 7.1, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/4HodYsHHieTKmGRHMSwRbZ0Ou5Y.jpg', duration: '2h 10m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 72, title: 'Longlegs', year: 2024, rating: 6.5, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/rweGnUAFsKuMnuL0pOJhNjPNEr6.jpg', duration: '1h 41m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 73, title: 'MaXXXine', year: 2024, rating: 6.8, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/s15TgQBp6RZPHtBhpF7OFRRfEaS.jpg', duration: '1h 43m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 74, title: 'Trap', year: 2024, rating: 6.6, genres: ['Thriller'], description: '', backdrop: '', poster: TMDB + '/jN9y0XxkqMuV3KFMzYxq8C1eBfz.jpg', duration: '1h 45m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 2, title: 'Deadpool & Wolverine', year: 2024, rating: 8.1, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/8cdWjvZQUExUULgtOe4OkNykPFB.jpg', duration: '2h 8m', language: 'English', quality: '4K', type: 'movie' },
          { id: 4, title: 'Alien: Romulus', year: 2024, rating: 7.3, genres: ['Sci-Fi'], description: '', backdrop: '', poster: TMDB + '/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg', duration: '2h', language: 'English', quality: 'HD', type: 'movie' },
          { id: 75, title: 'Cuckoo', year: 2024, rating: 6.4, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/bGriSMwEF0bSJzCOlq7r5BuCTkz.jpg', duration: '1h 42m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 19, title: 'The Marvels', year: 2023, rating: 5.9, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/Ag3D9qXjhJ2FUkrlJ0Cv1pgxqYy.jpg', duration: '1h 45m', language: 'English', quality: 'HD', type: 'movie' },
          { id: 76, title: 'Smile 2', year: 2024, rating: 7.0, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg', duration: '2h 12m', language: 'English', quality: 'HD', type: 'movie' },
        ]
      },
      {
        title: 'Drama Masterpieces',
        slug: 'drama',
        movies: [
          { id: 50, title: 'The Bear', year: 2022, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg', duration: '30m', language: 'English', quality: '4K', type: 'tv' },
          { id: 55, title: 'Succession', year: 2018, rating: 8.9, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/e2X8jXFZT6YDlNGVMhbXVcf3yYj.jpg', duration: '1h', language: 'English', quality: 'HD', type: 'tv' },
          { id: 54, title: 'Severance', year: 2022, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/mIebPbF8lSaJBMRlF8IcUBEe6ya.jpg', duration: '52m', language: 'English', quality: '4K', type: 'tv' },
          { id: 1, title: 'Oppenheimer', year: 2023, rating: 8.3, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', duration: '3h', language: 'English', quality: 'HD', type: 'movie' },
          { id: 51, title: 'The Last of Us', year: 2023, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg', duration: '50m', language: 'English', quality: '4K', type: 'tv' },
          { id: 58, title: 'Yellowstone', year: 2018, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/1YZFPFr0boJi3oYd0Y3oBkNRuYd.jpg', duration: '1h', language: 'English', quality: 'HD', type: 'tv' },
          { id: 56, title: 'Ted Lasso', year: 2020, rating: 8.8, genres: ['Comedy'], description: '', backdrop: '', poster: TMDB + '/cVsmkijISBsFpQxoSTN6q1HkjrD.jpg', duration: '30m', language: 'English', quality: 'HD', type: 'tv' },
          { id: 57, title: 'Foundation', year: 2021, rating: 7.5, genres: ['Sci-Fi'], description: '', backdrop: '', poster: TMDB + '/vI5oJLJTjOlWCVYvovzVTHqfYpQ.jpg', duration: '1h', language: 'English', quality: '4K', type: 'tv' },
          { id: 59, title: 'Andor', year: 2022, rating: 8.4, genres: ['Sci-Fi'], description: '', backdrop: '', poster: TMDB + '/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg', duration: '40m', language: 'English', quality: '4K', type: 'tv' },
          { id: 71, title: 'It Ends with Us', year: 2024, rating: 7.1, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/4HodYsHHieTKmGRHMSwRbZ0Ou5Y.jpg', duration: '2h 10m', language: 'English', quality: 'HD', type: 'movie' },
        ]
      },
    ];
  }

  getMovieById(id: number): Movie | undefined {
    const all = this.getFeatured();
    return all.find(m => m.id === id);
  }

  getMovies(): Movie[] {
    return this.getSections()
      .filter(s => s.slug === 'action' || s.slug === 'trending')
      .flatMap(s => s.movies)
      .filter((m, i, arr) => arr.findIndex(x => x.id === m.id) === i);
  }

  getTvShows(): Movie[] {
    return this.getSections()
      .filter(s => s.slug === 'tv-shows' || s.slug === 'drama')
      .flatMap(s => s.movies)
      .filter((m, i, arr) => arr.findIndex(x => x.id === m.id) === i)
      .filter(m => m.type === 'tv');
  }
}
