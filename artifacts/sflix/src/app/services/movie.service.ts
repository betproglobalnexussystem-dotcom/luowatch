import { Injectable } from '@angular/core';
import { Movie, MovieSection, Series, VJ, User, Transaction, Activity, HeroSlide } from '../models/movie.model';

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
        duration: '3h 0m', language: 'English', quality: 'HD', type: 'movie', vjName: 'CineVault', views: 182400
      },
      {
        id: 2, title: 'Deadpool & Wolverine', year: 2024, rating: 8.1,
        genres: ['Action', 'Comedy', 'Sci-Fi'],
        description: 'Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a reluctant Wolverine to help save his universe from extinction.',
        backdrop: TMDB_ORIG + '/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg',
        poster: TMDB + '/8cdWjvZQUExUULgtOe4OkNykPFB.jpg',
        duration: '2h 8m', language: 'English', quality: '4K', type: 'movie', vjName: 'MarvelFlix', views: 310500
      },
      {
        id: 3, title: 'House of the Dragon', year: 2022, rating: 8.4,
        genres: ['Fantasy', 'Drama', 'Action'],
        description: 'An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen. Fire and blood reign supreme.',
        backdrop: TMDB_ORIG + '/suopoADq0k8YZr4dQXcU6pToj6s.jpg',
        poster: TMDB + '/t9XkeE7HzOsdQcDDDapDYh8Rrmt.jpg',
        duration: '58m', language: 'English', quality: '4K', type: 'tv', vjName: 'DragonVJ', views: 275000
      },
      {
        id: 4, title: 'Alien: Romulus', year: 2024, rating: 7.3,
        genres: ['Sci-Fi', 'Horror', 'Action'],
        description: 'A group of young people on a distant world find themselves in a confrontation with the most terrifying life form in the universe while scavenging an abandoned space station.',
        backdrop: TMDB_ORIG + '/5vdTKHMEVXdJrNaAhG2MgxNklCw.jpg',
        poster: TMDB + '/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg',
        duration: '1h 59m', language: 'English', quality: 'HD', type: 'movie', vjName: 'SciFiHub', views: 93200
      },
      {
        id: 5, title: 'The Boys', year: 2024, rating: 8.7,
        genres: ['Action', 'Drama', 'Sci-Fi'],
        description: 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers. In a world where the powerful prey on the powerless, someone has to fight back.',
        backdrop: TMDB_ORIG + '/or4KoeNWmHAVSgfMxWDI2vzHmXD.jpg',
        poster: TMDB + '/1WkIPZ1dBbYLxE3Cl0BHWG8c3PO.jpg',
        duration: '1h', language: 'English', quality: '4K', type: 'tv', vjName: 'TVKing', views: 421000
      },
    ];
  }

  getSections(): MovieSection[] {
    return [
      {
        title: 'Trending Now', slug: 'trending',
        movies: [
          { id: 1, title: 'Oppenheimer', year: 2023, rating: 8.3, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', duration: '3h', language: 'English', quality: 'HD', type: 'movie', vjName: 'CineVault', views: 182400 },
          { id: 2, title: 'Deadpool & Wolverine', year: 2024, rating: 8.1, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/8cdWjvZQUExUULgtOe4OkNykPFB.jpg', duration: '2h 8m', language: 'English', quality: '4K', type: 'movie', vjName: 'MarvelFlix', views: 310500 },
          { id: 70, title: 'Twisters', year: 2024, rating: 7.3, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/pjnD08FlMAIXsfOLKQbIt9sXoell.jpg', duration: '2h 2m', language: 'English', quality: 'HD', type: 'movie', vjName: 'ActionZone', views: 74800 },
          { id: 5, title: 'The Boys', year: 2024, rating: 8.7, genres: ['Sci-Fi'], description: '', backdrop: '', poster: TMDB + '/1WkIPZ1dBbYLxE3Cl0BHWG8c3PO.jpg', duration: '1h', language: 'English', quality: '4K', type: 'tv', vjName: 'TVKing', views: 421000 },
          { id: 3, title: 'House of the Dragon', year: 2022, rating: 8.4, genres: ['Fantasy'], description: '', backdrop: '', poster: TMDB + '/t9XkeE7HzOsdQcDDDapDYh8Rrmt.jpg', duration: '58m', language: 'English', quality: '4K', type: 'tv', vjName: 'DragonVJ', views: 275000 },
          { id: 4, title: 'Alien: Romulus', year: 2024, rating: 7.3, genres: ['Sci-Fi'], description: '', backdrop: '', poster: TMDB + '/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg', duration: '2h', language: 'English', quality: 'HD', type: 'movie', vjName: 'SciFiHub', views: 93200 },
          { id: 10, title: 'John Wick: Chapter 4', year: 2023, rating: 7.8, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', duration: '2h 49m', language: 'English', quality: 'HD', type: 'movie', vjName: 'ActionZone', views: 156000 },
          { id: 16, title: 'Guardians Vol. 3', year: 2023, rating: 8.0, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg', duration: '2h 30m', language: 'English', quality: '4K', type: 'movie', vjName: 'MarvelFlix', views: 201000 },
          { id: 50, title: 'The Bear', year: 2022, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg', duration: '30m', language: 'English', quality: '4K', type: 'tv', vjName: 'TVKing', views: 98300 },
          { id: 51, title: 'The Last of Us', year: 2023, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg', duration: '50m', language: 'English', quality: '4K', type: 'tv', vjName: 'CineVault', views: 340200 },
        ]
      },
      {
        title: 'Action Movies', slug: 'action',
        movies: [
          { id: 10, title: 'John Wick: Chapter 4', year: 2023, rating: 7.8, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', duration: '2h 49m', language: 'English', quality: 'HD', type: 'movie', vjName: 'ActionZone', views: 156000 },
          { id: 11, title: 'Extraction 2', year: 2023, rating: 7.1, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/7GpBnzMWDBhiS5jlVCTNClzEfRI.jpg', duration: '2h 3m', language: 'English', quality: 'HD', type: 'movie', vjName: 'ActionZone', views: 87400 },
          { id: 12, title: 'Mission: Impossible', year: 2023, rating: 7.6, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/NNxYkU70HPurnNCSiCjYAmacwm.jpg', duration: '2h 43m', language: 'English', quality: 'HD', type: 'movie', vjName: 'ThrillerVJ', views: 112000 },
          { id: 13, title: 'The Equalizer 3', year: 2023, rating: 7.1, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg', duration: '1h 49m', language: 'English', quality: 'HD', type: 'movie', vjName: 'ActionZone', views: 65000 },
          { id: 14, title: 'Fast X', year: 2023, rating: 5.9, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/fiVW06jE7z9YnO4trhaMEdclSiC.jpg', duration: '2h 21m', language: 'English', quality: 'HD', type: 'movie', vjName: 'SpeedVault', views: 88000 },
          { id: 15, title: 'Aquaman 2', year: 2023, rating: 6.5, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/7lTnXOy0iNtBAdRP3TZvalpcVTX.jpg', duration: '2h 4m', language: 'English', quality: 'HD', type: 'movie', vjName: 'MarvelFlix', views: 72000 },
          { id: 16, title: 'Guardians Vol. 3', year: 2023, rating: 8.0, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg', duration: '2h 30m', language: 'English', quality: '4K', type: 'movie', vjName: 'MarvelFlix', views: 201000 },
          { id: 17, title: 'Indiana Jones 5', year: 2023, rating: 6.9, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/Af4bXE63pVsb2FtbW2eTlw5BXMN.jpg', duration: '2h 34m', language: 'English', quality: 'HD', type: 'movie', vjName: 'AdventureHD', views: 58000 },
          { id: 18, title: 'Transformers: Rise', year: 2023, rating: 6.0, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/gPbM0MK8CP8A174rmUwGsADNYKD.jpg', duration: '2h 7m', language: 'English', quality: 'HD', type: 'movie', vjName: 'ActionZone', views: 49000 },
          { id: 2, title: 'Deadpool & Wolverine', year: 2024, rating: 8.1, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/8cdWjvZQUExUULgtOe4OkNykPFB.jpg', duration: '2h 8m', language: 'English', quality: '4K', type: 'movie', vjName: 'MarvelFlix', views: 310500 },
        ]
      },
      {
        title: 'Horror Movies', slug: 'horror',
        movies: [
          { id: 30, title: 'The Nun II', year: 2023, rating: 6.2, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg', duration: '1h 50m', language: 'English', quality: 'HD', type: 'movie', vjName: 'HorrorVault', views: 91000 },
          { id: 31, title: 'Evil Dead Rise', year: 2023, rating: 7.0, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/t3iHy3Bi8GHcGC7IDbRJBnIWQyB.jpg', duration: '1h 36m', language: 'English', quality: 'HD', type: 'movie', vjName: 'HorrorVault', views: 78000 },
          { id: 32, title: 'Scream VI', year: 2023, rating: 7.0, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/wDtJQraj54eBZFhqFXoKYuaWrNZ.jpg', duration: '2h 3m', language: 'English', quality: 'HD', type: 'movie', vjName: 'ScreamFlix', views: 66000 },
          { id: 33, title: 'M3GAN', year: 2023, rating: 6.4, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/d9nBoowhjiiYc4FBNtQkPY5J1Em.jpg', duration: '1h 42m', language: 'English', quality: 'HD', type: 'movie', vjName: 'HorrorVault', views: 54000 },
          { id: 34, title: 'Insidious: Red Door', year: 2023, rating: 5.7, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/d07phJqCx6zo6ImhgkEBnJQDGU3.jpg', duration: '1h 47m', language: 'English', quality: 'HD', type: 'movie', vjName: 'ScreamFlix', views: 41000 },
          { id: 35, title: "Pope's Exorcist", year: 2023, rating: 6.5, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/dsFBFPiIAMPMFN6VGsKfXMJJIb9.jpg', duration: '1h 43m', language: 'English', quality: 'HD', type: 'movie', vjName: 'HorrorVault', views: 38000 },
          { id: 36, title: 'Knock at the Cabin', year: 2023, rating: 6.5, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/57tHDHkNcT6GlJRbDIqKMqAGAdZ.jpg', duration: '1h 40m', language: 'English', quality: 'HD', type: 'movie', vjName: 'ThrillerVJ', views: 36000 },
          { id: 37, title: 'The Menu', year: 2022, rating: 7.2, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/uT3CbVeRNJSGESnUXFoUO9OqjJP.jpg', duration: '1h 47m', language: 'English', quality: 'HD', type: 'movie', vjName: 'CineVault', views: 62000 },
          { id: 40, title: 'Talk to Me', year: 2023, rating: 7.1, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/kdPMArMBJ1gLB8VoHG8hvOGLkPR.jpg', duration: '1h 35m', language: 'English', quality: 'HD', type: 'movie', vjName: 'HorrorVault', views: 47000 },
          { id: 38, title: 'Barbarian', year: 2022, rating: 7.0, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/gg4ZfqPSatFBCHj4l1MaGPoiIaX.jpg', duration: '1h 42m', language: 'English', quality: 'HD', type: 'movie', vjName: 'ScreamFlix', views: 53000 },
        ]
      },
      {
        title: 'Hot Short TV', slug: 'tv-shows',
        movies: [
          { id: 50, title: 'The Bear', year: 2022, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg', duration: '30m', language: 'English', quality: '4K', type: 'tv', vjName: 'TVKing', views: 98300 },
          { id: 51, title: 'The Last of Us', year: 2023, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg', duration: '50m', language: 'English', quality: '4K', type: 'tv', vjName: 'CineVault', views: 340200 },
          { id: 52, title: 'Wednesday', year: 2022, rating: 8.1, genres: ['Fantasy'], description: '', backdrop: '', poster: TMDB + '/9PFonBhy4cQy7Jz20NpMygczOkv.jpg', duration: '50m', language: 'English', quality: 'HD', type: 'tv', vjName: 'TVKing', views: 180000 },
          { id: 3, title: 'House of the Dragon', year: 2022, rating: 8.4, genres: ['Fantasy'], description: '', backdrop: '', poster: TMDB + '/t9XkeE7HzOsdQcDDDapDYh8Rrmt.jpg', duration: '58m', language: 'English', quality: '4K', type: 'tv', vjName: 'DragonVJ', views: 275000 },
          { id: 53, title: 'Loki Season 2', year: 2023, rating: 7.9, genres: ['Sci-Fi'], description: '', backdrop: '', poster: TMDB + '/kEl2t3OhXc3Zb9FBh1AuYzRTCZA.jpg', duration: '46m', language: 'English', quality: 'HD', type: 'tv', vjName: 'MarvelFlix', views: 130000 },
          { id: 54, title: 'Severance', year: 2022, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/mIebPbF8lSaJBMRlF8IcUBEe6ya.jpg', duration: '52m', language: 'English', quality: '4K', type: 'tv', vjName: 'CineVault', views: 210000 },
          { id: 55, title: 'Succession', year: 2018, rating: 8.9, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/e2X8jXFZT6YDlNGVMhbXVcf3yYj.jpg', duration: '1h', language: 'English', quality: 'HD', type: 'tv', vjName: 'TVKing', views: 290000 },
          { id: 5, title: 'The Boys', year: 2024, rating: 8.7, genres: ['Sci-Fi'], description: '', backdrop: '', poster: TMDB + '/1WkIPZ1dBbYLxE3Cl0BHWG8c3PO.jpg', duration: '1h', language: 'English', quality: '4K', type: 'tv', vjName: 'TVKing', views: 421000 },
          { id: 56, title: 'Ted Lasso', year: 2020, rating: 8.8, genres: ['Comedy'], description: '', backdrop: '', poster: TMDB + '/cVsmkijISBsFpQxoSTN6q1HkjrD.jpg', duration: '30m', language: 'English', quality: 'HD', type: 'tv', vjName: 'ComedyVJ', views: 162000 },
          { id: 58, title: 'Yellowstone', year: 2018, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/1YZFPFr0boJi3oYd0Y3oBkNRuYd.jpg', duration: '1h', language: 'English', quality: 'HD', type: 'tv', vjName: 'DragonVJ', views: 198000 },
        ]
      },
      {
        title: 'New Releases', slug: 'new-releases',
        movies: [
          { id: 70, title: 'Twisters', year: 2024, rating: 7.3, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/pjnD08FlMAIXsfOLKQbIt9sXoell.jpg', duration: '2h 2m', language: 'English', quality: 'HD', type: 'movie', vjName: 'ActionZone', views: 74800 },
          { id: 71, title: 'It Ends with Us', year: 2024, rating: 7.1, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/4HodYsHHieTKmGRHMSwRbZ0Ou5Y.jpg', duration: '2h 10m', language: 'English', quality: 'HD', type: 'movie', vjName: 'DramaVJ', views: 62000 },
          { id: 72, title: 'Longlegs', year: 2024, rating: 6.5, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/rweGnUAFsKuMnuL0pOJhNjPNEr6.jpg', duration: '1h 41m', language: 'English', quality: 'HD', type: 'movie', vjName: 'HorrorVault', views: 48000 },
          { id: 73, title: 'MaXXXine', year: 2024, rating: 6.8, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/s15TgQBp6RZPHtBhpF7OFRRfEaS.jpg', duration: '1h 43m', language: 'English', quality: 'HD', type: 'movie', vjName: 'HorrorVault', views: 39000 },
          { id: 74, title: 'Trap', year: 2024, rating: 6.6, genres: ['Thriller'], description: '', backdrop: '', poster: TMDB + '/jN9y0XxkqMuV3KFMzYxq8C1eBfz.jpg', duration: '1h 45m', language: 'English', quality: 'HD', type: 'movie', vjName: 'ThrillerVJ', views: 44000 },
          { id: 2, title: 'Deadpool & Wolverine', year: 2024, rating: 8.1, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/8cdWjvZQUExUULgtOe4OkNykPFB.jpg', duration: '2h 8m', language: 'English', quality: '4K', type: 'movie', vjName: 'MarvelFlix', views: 310500 },
          { id: 4, title: 'Alien: Romulus', year: 2024, rating: 7.3, genres: ['Sci-Fi'], description: '', backdrop: '', poster: TMDB + '/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg', duration: '2h', language: 'English', quality: 'HD', type: 'movie', vjName: 'SciFiHub', views: 93200 },
          { id: 75, title: 'Cuckoo', year: 2024, rating: 6.4, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/bGriSMwEF0bSJzCOlq7r5BuCTkz.jpg', duration: '1h 42m', language: 'English', quality: 'HD', type: 'movie', vjName: 'HorrorVault', views: 31000 },
          { id: 19, title: 'The Marvels', year: 2023, rating: 5.9, genres: ['Action'], description: '', backdrop: '', poster: TMDB + '/Ag3D9qXjhJ2FUkrlJ0Cv1pgxqYy.jpg', duration: '1h 45m', language: 'English', quality: 'HD', type: 'movie', vjName: 'MarvelFlix', views: 55000 },
          { id: 76, title: 'Smile 2', year: 2024, rating: 7.0, genres: ['Horror'], description: '', backdrop: '', poster: TMDB + '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg', duration: '2h 12m', language: 'English', quality: 'HD', type: 'movie', vjName: 'HorrorVault', views: 67000 },
        ]
      },
      {
        title: 'Drama Masterpieces', slug: 'drama',
        movies: [
          { id: 50, title: 'The Bear', year: 2022, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg', duration: '30m', language: 'English', quality: '4K', type: 'tv', vjName: 'TVKing', views: 98300 },
          { id: 55, title: 'Succession', year: 2018, rating: 8.9, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/e2X8jXFZT6YDlNGVMhbXVcf3yYj.jpg', duration: '1h', language: 'English', quality: 'HD', type: 'tv', vjName: 'TVKing', views: 290000 },
          { id: 54, title: 'Severance', year: 2022, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/mIebPbF8lSaJBMRlF8IcUBEe6ya.jpg', duration: '52m', language: 'English', quality: '4K', type: 'tv', vjName: 'CineVault', views: 210000 },
          { id: 1, title: 'Oppenheimer', year: 2023, rating: 8.3, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', duration: '3h', language: 'English', quality: 'HD', type: 'movie', vjName: 'CineVault', views: 182400 },
          { id: 51, title: 'The Last of Us', year: 2023, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg', duration: '50m', language: 'English', quality: '4K', type: 'tv', vjName: 'CineVault', views: 340200 },
          { id: 58, title: 'Yellowstone', year: 2018, rating: 8.7, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/1YZFPFr0boJi3oYd0Y3oBkNRuYd.jpg', duration: '1h', language: 'English', quality: 'HD', type: 'tv', vjName: 'DragonVJ', views: 198000 },
          { id: 71, title: 'It Ends with Us', year: 2024, rating: 7.1, genres: ['Drama'], description: '', backdrop: '', poster: TMDB + '/4HodYsHHieTKmGRHMSwRbZ0Ou5Y.jpg', duration: '2h 10m', language: 'English', quality: 'HD', type: 'movie', vjName: 'DramaVJ', views: 62000 },
          { id: 56, title: 'Ted Lasso', year: 2020, rating: 8.8, genres: ['Comedy'], description: '', backdrop: '', poster: TMDB + '/cVsmkijISBsFpQxoSTN6q1HkjrD.jpg', duration: '30m', language: 'English', quality: 'HD', type: 'tv', vjName: 'ComedyVJ', views: 162000 },
          { id: 57, title: 'Foundation', year: 2021, rating: 7.5, genres: ['Sci-Fi'], description: '', backdrop: '', poster: TMDB + '/vI5oJLJTjOlWCVYvovzVTHqfYpQ.jpg', duration: '1h', language: 'English', quality: '4K', type: 'tv', vjName: 'SciFiHub', views: 88000 },
          { id: 59, title: 'Andor', year: 2022, rating: 8.4, genres: ['Sci-Fi'], description: '', backdrop: '', poster: TMDB + '/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg', duration: '40m', language: 'English', quality: '4K', type: 'tv', vjName: 'SciFiHub', views: 145000 },
        ]
      },
    ];
  }

  getMovieById(id: number): Movie | undefined {
    const featured = this.getFeatured();
    const all = this.getSections().flatMap(s => s.movies);
    return featured.find(m => m.id === id) || all.find(m => m.id === id);
  }

  getMovies(): Movie[] {
    return this.getSections()
      .flatMap(s => s.movies)
      .filter(m => m.type === 'movie')
      .filter((m, i, arr) => arr.findIndex(x => x.id === m.id) === i);
  }

  getTvShows(): Movie[] {
    return this.getSections()
      .flatMap(s => s.movies)
      .filter(m => m.type === 'tv')
      .filter((m, i, arr) => arr.findIndex(x => x.id === m.id) === i);
  }

  getAllMovies(): Movie[] {
    return this.getSections()
      .flatMap(s => s.movies)
      .filter((m, i, arr) => arr.findIndex(x => x.id === m.id) === i);
  }

  getVJs(): VJ[] {
    return [
      { id: 1, name: 'CineVault', email: 'cinevault@email.com', joinDate: '2024-01-15', totalMovies: 42, totalViews: 715600, balance: 1240.50, status: 'active' },
      { id: 2, name: 'MarvelFlix', email: 'marvelflix@email.com', joinDate: '2024-02-03', totalMovies: 28, totalViews: 894500, balance: 2180.75, status: 'active' },
      { id: 3, name: 'ActionZone', email: 'actionzone@email.com', joinDate: '2024-03-10', totalMovies: 65, totalViews: 530200, balance: 890.00, status: 'active' },
      { id: 4, name: 'DragonVJ', email: 'dragonvj@email.com', joinDate: '2024-01-28', totalMovies: 18, totalViews: 748000, balance: 1650.25, status: 'active' },
      { id: 5, name: 'HorrorVault', email: 'horrorvault@email.com', joinDate: '2024-04-05', totalMovies: 54, totalViews: 407000, balance: 620.00, status: 'active' },
      { id: 6, name: 'TVKing', email: 'tvking@email.com', joinDate: '2023-11-20', totalMovies: 83, totalViews: 1107300, balance: 3200.00, status: 'active' },
      { id: 7, name: 'SciFiHub', email: 'scifihub@email.com', joinDate: '2024-02-14', totalMovies: 31, totalViews: 381200, balance: 540.80, status: 'suspended' },
      { id: 8, name: 'ThrillerVJ', email: 'thrillervj@email.com', joinDate: '2024-05-01', totalMovies: 22, totalViews: 207000, balance: 315.00, status: 'active' },
    ];
  }

  getUsers(): User[] {
    return [
      { id: 1, name: 'Alex Johnson', email: 'alex@mail.com', joinDate: '2024-03-10', lastSeen: '2026-05-22', watchCount: 142, status: 'active' },
      { id: 2, name: 'Priya Sharma', email: 'priya@mail.com', joinDate: '2024-04-02', lastSeen: '2026-05-21', watchCount: 89, status: 'active' },
      { id: 3, name: 'Marcus Lee', email: 'marcus@mail.com', joinDate: '2024-01-18', lastSeen: '2026-05-20', watchCount: 234, status: 'active' },
      { id: 4, name: 'Fatima Al-Hassan', email: 'fatima@mail.com', joinDate: '2024-02-28', lastSeen: '2026-05-19', watchCount: 67, status: 'active' },
      { id: 5, name: 'Chukwuemeka Eze', email: 'emeka@mail.com', joinDate: '2024-05-05', lastSeen: '2026-05-22', watchCount: 31, status: 'active' },
      { id: 6, name: 'Sarah Mitchell', email: 'sarah@mail.com', joinDate: '2023-12-01', lastSeen: '2026-04-30', watchCount: 389, status: 'active' },
      { id: 7, name: 'Yusuf Diallo', email: 'yusuf@mail.com', joinDate: '2024-03-22', lastSeen: '2026-05-15', watchCount: 78, status: 'banned' },
      { id: 8, name: 'Li Wei', email: 'liwei@mail.com', joinDate: '2024-04-14', lastSeen: '2026-05-22', watchCount: 112, status: 'active' },
      { id: 9, name: 'Amara Osei', email: 'amara@mail.com', joinDate: '2024-06-01', lastSeen: '2026-05-21', watchCount: 44, status: 'active' },
      { id: 10, name: 'Daniel Brooks', email: 'daniel@mail.com', joinDate: '2024-01-05', lastSeen: '2026-05-18', watchCount: 197, status: 'active' },
    ];
  }

  getTransactions(): Transaction[] {
    return [
      { id: 1, date: '2026-05-22', type: 'earning', amount: 128.50, description: 'Views earning — CineVault (May Week 3)', status: 'completed', from: 'CineVault' },
      { id: 2, date: '2026-05-21', type: 'withdrawal', amount: 500.00, description: 'Withdrawal request — TVKing', status: 'completed', from: 'TVKing' },
      { id: 3, date: '2026-05-21', type: 'earning', amount: 245.75, description: 'Views earning — MarvelFlix (May Week 3)', status: 'completed', from: 'MarvelFlix' },
      { id: 4, date: '2026-05-20', type: 'withdrawal', amount: 300.00, description: 'Withdrawal request — DragonVJ', status: 'pending', from: 'DragonVJ' },
      { id: 5, date: '2026-05-20', type: 'earning', amount: 89.00, description: 'Views earning — HorrorVault (May Week 3)', status: 'completed', from: 'HorrorVault' },
      { id: 6, date: '2026-05-19', type: 'system', amount: 52.20, description: 'Platform fee collected', status: 'completed' },
      { id: 7, date: '2026-05-18', type: 'withdrawal', amount: 150.00, description: 'Withdrawal request — ActionZone', status: 'failed', from: 'ActionZone' },
      { id: 8, date: '2026-05-17', type: 'earning', amount: 312.40, description: 'Views earning — TVKing (May Week 2)', status: 'completed', from: 'TVKing' },
    ];
  }

  getActivities(): Activity[] {
    return [
      { id: 1, userId: 1, userName: 'Alex Johnson', action: 'Watched', target: 'Oppenheimer', date: '2026-05-22 14:32' },
      { id: 2, userId: 3, userName: 'Marcus Lee', action: 'Watched', target: 'The Boys S04E08', date: '2026-05-22 13:14' },
      { id: 3, userId: 8, userName: 'Li Wei', action: 'Watched', target: 'Deadpool & Wolverine', date: '2026-05-22 12:55' },
      { id: 4, userId: 5, userName: 'Chukwuemeka Eze', action: 'Watched', target: 'House of the Dragon', date: '2026-05-22 12:01' },
      { id: 5, userId: 2, userName: 'Priya Sharma', action: 'Searched', target: '"horror movies 2024"', date: '2026-05-22 11:48' },
      { id: 6, userId: 6, userName: 'Sarah Mitchell', action: 'Watched', target: 'Succession S04E10', date: '2026-05-22 11:20' },
      { id: 7, userId: 10, userName: 'Daniel Brooks', action: 'Watched', target: 'John Wick: Chapter 4', date: '2026-05-22 10:53' },
      { id: 8, userId: 9, userName: 'Amara Osei', action: 'Watched', target: 'The Nun II', date: '2026-05-22 10:30' },
      { id: 9, userId: 4, userName: 'Fatima Al-Hassan', action: 'Watched', target: 'Wednesday S01E04', date: '2026-05-22 09:45' },
      { id: 10, userId: 1, userName: 'Alex Johnson', action: 'Searched', target: '"Alien Romulus"', date: '2026-05-22 09:12' },
    ];
  }

  getHeroSlides(): HeroSlide[] {
    return [
      { id: 1, movieId: 1, title: 'Oppenheimer', imageUrl: TMDB_ORIG + '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg', active: true, uploadedBy: 'Admin' },
      { id: 2, movieId: 2, title: 'Deadpool & Wolverine', imageUrl: TMDB_ORIG + '/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg', active: true, uploadedBy: 'MarvelFlix' },
      { id: 3, movieId: 3, title: 'House of the Dragon', imageUrl: TMDB_ORIG + '/suopoADq0k8YZr4dQXcU6pToj6s.jpg', active: true, uploadedBy: 'DragonVJ' },
      { id: 4, movieId: 4, title: 'Alien: Romulus', imageUrl: TMDB_ORIG + '/5vdTKHMEVXdJrNaAhG2MgxNklCw.jpg', active: false, uploadedBy: 'SciFiHub' },
      { id: 5, movieId: 5, title: 'The Boys', imageUrl: TMDB_ORIG + '/or4KoeNWmHAVSgfMxWDI2vzHmXD.jpg', active: true, uploadedBy: 'TVKing' },
    ];
  }

  getSeries(): Series[] {
    return [
      {
        id: 1, title: 'House of the Dragon', year: 2022, genres: ['Fantasy', 'Drama'],
        description: 'The story of House Targaryen set 200 years before Game of Thrones.',
        poster: TMDB + '/t9XkeE7HzOsdQcDDDapDYh8Rrmt.jpg',
        backdrop: TMDB_ORIG + '/suopoADq0k8YZr4dQXcU6pToj6s.jpg',
        vjName: 'DragonVJ',
        episodes: [
          { id: 1, seriesId: 1, title: 'The Heirs of the Dragon', episode: 1, season: 1, duration: '58m', quality: '4K' },
          { id: 2, seriesId: 1, title: 'The Rogue Prince', episode: 2, season: 1, duration: '55m', quality: '4K' },
          { id: 3, seriesId: 1, title: 'Second of His Name', episode: 3, season: 1, duration: '63m', quality: '4K' },
        ]
      },
      {
        id: 2, title: 'The Boys', year: 2024, genres: ['Action', 'Sci-Fi'],
        description: 'Vigilantes vs corrupt superheroes in a dark satirical world.',
        poster: TMDB + '/1WkIPZ1dBbYLxE3Cl0BHWG8c3PO.jpg',
        backdrop: TMDB_ORIG + '/or4KoeNWmHAVSgfMxWDI2vzHmXD.jpg',
        vjName: 'TVKing',
        episodes: [
          { id: 4, seriesId: 2, title: 'Department of Dirty Tricks', episode: 1, season: 4, duration: '52m', quality: '4K' },
          { id: 5, seriesId: 2, title: 'Life Among the Septics', episode: 2, season: 4, duration: '48m', quality: '4K' },
        ]
      },
    ];
  }
}
