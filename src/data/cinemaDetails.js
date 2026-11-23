// Realistic cinema details, products, film showings, images, and reviews
export const MOVIES = [
  {
    id: 'movie-1',
    title: 'Dune: Part Two',
    genre: 'Sci-Fi / Action',
    rating: 'M',
    runtime: '166 min',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
    formats: ['IMAX', 'Dolby Atmos', 'Standard'],
    showtimes: ['12:30 PM', '3:45 PM', '7:00 PM', '9:45 PM'],
  },
  {
    id: 'movie-2',
    title: 'Deadpool & Wolverine',
    genre: 'Action / Comedy',
    rating: 'MA15+',
    runtime: '128 min',
    synopsis: 'A listless Wade Wilson toils in civilian life with his days as the morally flexible mercenary Deadpool behind him.',
    poster: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=80',
    formats: ['3D', 'IMAX', 'Standard'],
    showtimes: ['1:15 PM', '4:00 PM', '6:45 PM', '9:30 PM'],
  },
  {
    id: 'movie-3',
    title: 'Inside Out 2',
    genre: 'Animation / Family',
    rating: 'PG',
    runtime: '96 min',
    synopsis: 'Follow Riley in her teenage years as new emotions appear in headquarters, starting with Anxiety.',
    poster: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=80',
    formats: ['3D', 'Standard'],
    showtimes: ['11:00 AM', '1:30 PM', '3:45 PM', '6:00 PM'],
  },
  {
    id: 'movie-4',
    title: 'Gladiator II',
    genre: 'Action / Epic',
    rating: 'MA15+',
    runtime: '148 min',
    synopsis: 'Years after witnessing the death of Maximus at the hands of his uncle, Lucius must enter the Colosseum.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
    formats: ['IMAX', 'Dolby Atmos'],
    showtimes: ['2:00 PM', '5:15 PM', '8:30 PM'],
  },
  {
    id: 'movie-5',
    title: 'Oppenheimer',
    genre: 'Biography / Drama',
    rating: 'MA15+',
    runtime: '180 min',
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format&fit=crop&q=80',
    formats: ['70mm IMAX', 'Standard'],
    showtimes: ['1:00 PM', '4:45 PM', '8:15 PM'],
  },
  {
    id: 'movie-6',
    title: 'Spider-Man: Beyond the Spider-Verse',
    genre: 'Animation / Sci-Fi',
    rating: 'PG',
    runtime: '135 min',
    synopsis: 'Miles Morales traverses the Multiverse to protect its very existence from catastrophic collapse.',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&auto=format&fit=crop&q=80',
    formats: ['IMAX', '3D', 'Standard'],
    showtimes: ['12:45 PM', '3:30 PM', '6:15 PM', '9:00 PM'],
  }
];

export const CONCESSION_ITEMS = [
  { id: 'c1', name: 'Large Popcorn & Drink Combo', price: 14.50, category: 'Combos' },
  { id: 'c2', name: 'Classic Choc Top (Boysenberry/Vanilla)', price: 7.00, category: 'Ice Cream' },
  { id: 'c3', name: 'Warm Loaded Nachos & Cheese', price: 11.50, category: 'Hot Food' },
  { id: 'c4', name: 'Giant Skittles / M&M Candy Mix', price: 8.00, category: 'Candy Bar' },
  { id: 'c5', name: 'Gourmet Hot Dog with Relish', price: 10.50, category: 'Hot Food' },
  { id: 'c6', name: 'Local Craft Beer / Wine', price: 12.00, category: 'Bar' },
];

export const CINEMA_PHOTOS = [
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80', // Theater auditorium
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80', // Cinema seats
  'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&auto=format&fit=crop&q=80', // Popcorn & concession
  'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=800&auto=format&fit=crop&q=80', // Cinema entrance
];

const SAMPLE_REVIEWS = [
  { name: 'Sarah M.', rating: 5, date: '2 days ago', comment: 'Fantastic sound and crystal-clear screen! The reclining seats in Gold Class were super comfortable.' },
  { name: 'Liam K.', rating: 4.5, date: '1 week ago', comment: 'Fresh warm popcorn and quick service at the candy bar. Great projection quality in theater 4.' },
  { name: 'Emily T.', rating: 5, date: '2 weeks ago', comment: 'Best IMAX cinema in the region! Unmatched sound immersion and great parking access.' },
  { name: 'James W.', rating: 4, date: '3 weeks ago', comment: 'Loved the movie experience here. Staff were polite, clean restrooms and good snack options.' },
  { name: 'Chloe B.', rating: 4.5, date: '1 month ago', comment: 'The sound mix for Dune was incredible. Definitely our go-to cinema for big releases.' },
];

export const ALL_PRODUCTS = [
  'Popcorn & Concessions',
  'Candy Bar',
  'IMAX',
  'Vmax / Gold Class',
  '3D Screen',
  'Dolby Atmos',
  'Licensed Bar',
  'Hot Food',
  'Luxury Recliners'
];

// Simple deterministic hash based on cinema name to produce realistic, consistent metadata
const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const enrichCinema = (cinema, index = 0) => {
  const hash = hashCode(cinema.name + (cinema.lat || 0));
  const rating = Number((3.8 + (hash % 12) * 0.1).toFixed(1));
  const reviewCount = 45 + (hash % 650);
  const baseTicketPrice = Number((14.00 + (hash % 12)).toFixed(2));

  // Determine available products deterministically
  const availableProducts = ['Popcorn & Concessions', 'Candy Bar'];
  if (cinema.franchise === 'hoyts' || cinema.franchise === 'event' || hash % 2 === 0) {
    availableProducts.push('Vmax / Gold Class');
    availableProducts.push('Luxury Recliners');
  }
  if (hash % 3 === 0) availableProducts.push('IMAX');
  if (hash % 2 === 1) availableProducts.push('3D Screen');
  if (hash % 4 === 0) availableProducts.push('Dolby Atmos');
  if (hash % 2 === 0) availableProducts.push('Licensed Bar');
  if (hash % 3 !== 1) availableProducts.push('Hot Food');

  // Select 3-4 movies for this cinema
  const movieStartIdx = hash % MOVIES.length;
  const cinemaMovies = [
    MOVIES[movieStartIdx % MOVIES.length],
    MOVIES[(movieStartIdx + 1) % MOVIES.length],
    MOVIES[(movieStartIdx + 2) % MOVIES.length],
    MOVIES[(movieStartIdx + 3) % MOVIES.length],
  ];

  // Select 2-3 reviews
  const reviewStart = hash % SAMPLE_REVIEWS.length;
  const reviews = [
    SAMPLE_REVIEWS[reviewStart % SAMPLE_REVIEWS.length],
    SAMPLE_REVIEWS[(reviewStart + 1) % SAMPLE_REVIEWS.length],
    SAMPLE_REVIEWS[(reviewStart + 2) % SAMPLE_REVIEWS.length],
  ];

  // Rotate photos
  const photoIdx = hash % CINEMA_PHOTOS.length;
  const photos = [
    CINEMA_PHOTOS[photoIdx],
    CINEMA_PHOTOS[(photoIdx + 1) % CINEMA_PHOTOS.length],
    CINEMA_PHOTOS[(photoIdx + 2) % CINEMA_PHOTOS.length],
  ];

  return {
    ...cinema,
    id: `${cinema.countryCode || 'au'}-${index}-${hash}`,
    rating,
    reviewCount,
    ticketPrice: baseTicketPrice,
    products: availableProducts,
    movies: cinemaMovies,
    reviews,
    photos,
  };
};
