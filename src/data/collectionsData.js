// Sample collections data with internet image URLs and years

export const collectionsData = {
  books: [
    { 
      id: 1, 
      title: 'Atomic Habits', 
      creator: 'James Clear', 
      coverImage: 'https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg', 
      year: '2023',
      category: 'books',
      pages: 320,
      genre: 'Self-Help',
      rating: 4.5,
      description: 'A proven framework for improving every day through tiny changes in behavior.'
    },
    { 
      id: 2, 
      title: 'Sapiens', 
      creator: 'Yuval Noah Harari', 
      coverImage: 'https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg', 
      year: '2022',
      category: 'books',
      pages: 464,
      genre: 'History',
      rating: 4.7,
      description: 'A brief history of humankind, exploring the ways in which biology and history have defined us.'
    },
    { 
      id: 3, 
      title: 'Thinking, Fast and Slow', 
      creator: 'Daniel Kahneman', 
      coverImage: 'https://m.media-amazon.com/images/I/61fdrEuPJwL._AC_UF1000,1000_QL80_.jpg', 
      year: '2021',
      category: 'books',
      pages: 499,
      genre: 'Psychology',
      rating: 4.6,
      description: 'An exploration of the two systems that drive the way we think and make choices.'
    },
    {
      id: 4,
      title: 'The Alchemist',
      creator: 'Paulo Coelho',
      coverImage: 'https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg',
      year: '2022',
      category: 'books',
      pages: 197,
      genre: 'Fiction',
      rating: 4.7,
      description: 'A fable about following your dreams and listening to your heart.'
    },
    {
      id: 5,
      title: 'Dune',
      creator: 'Frank Herbert',
      coverImage: 'https://m.media-amazon.com/images/I/91KP35vI3HL._AC_UF1000,1000_QL80_.jpg',
      year: '2021',
      category: 'books',
      pages: 688,
      genre: 'Science Fiction',
      rating: 4.7,
      description: 'Set on the desert planet Arrakis, a stunning blend of adventure and mysticism.'
    }
  ],
  movies: [
    { 
      id: 1, 
      title: 'Inception', 
      creator: 'Christopher Nolan', 
      coverImage: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', 
      year: '2023',
      category: 'movies'
    },
    { 
      id: 2, 
      title: 'Parasite', 
      creator: 'Bong Joon-ho', 
      coverImage: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg', 
      year: '2022',
      category: 'movies'
    },
    { 
      id: 3, 
      title: 'The Shawshank Redemption', 
      creator: 'Frank Darabont', 
      coverImage: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg', 
      year: '2021',
      category: 'movies'
    },
  ],
  shows: [
    { 
      id: 1, 
      title: 'Breaking Bad', 
      creator: 'Vince Gilligan', 
      coverImage: 'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg', 
      year: '2023',
      category: 'shows'
    },
    { 
      id: 2, 
      title: 'Stranger Things', 
      creator: 'The Duffer Brothers', 
      coverImage: 'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg', 
      year: '2022',
      category: 'shows'
    },
  ],
  anime: [
    { 
      id: 1, 
      title: 'Attack on Titan', 
      creator: 'Hajime Isayama', 
      coverImage: 'https://m.media-amazon.com/images/M/MV5BNDFjYTIxMjctYTQ2ZC00OGQ4LWE3OGYtNDdiMzNiNDZlMDAwXkEyXkFqcGdeQXVyNzI3NjY3NjQ@._V1_FMjpg_UX1000_.jpg', 
      year: '2022',
      category: 'anime'
    },
    { 
      id: 2, 
      title: 'Demon Slayer', 
      creator: 'Koyoharu Gotouge', 
      coverImage: 'https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg', 
      year: '2023',
      category: 'anime'
    },
  ],
  experiences: [
    { 
      id: 1, 
      title: 'Rock Climbing', 
      creator: 'First attempt', 
      coverImage: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 
      year: '2023',
      category: 'experiences'
    },
    { 
      id: 2, 
      title: 'Pottery Workshop', 
      creator: 'Weekend class', 
      coverImage: 'https://images.unsplash.com/photo-1565122256258-8827f448ddb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 
      year: '2022',
      category: 'experiences'
    },
  ],
  travel: [
    { 
      id: 1, 
      title: 'Tokyo', 
      creator: 'Japan', 
      coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 
      year: '2022',
      category: 'travel'
    },
    { 
      id: 2, 
      title: 'Santorini', 
      creator: 'Greece', 
      coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 
      year: '2021',
      category: 'travel'
    },
  ],
};

// Category labels with emojis
export const categoryLabels = {
  books: '📚 Books',
  movies: '🎬 Movies',
  shows: '📺 TV Shows',
  anime: '🎭 Anime',
  experiences: '🎨 New Things',
  travel: '🚀 Travel',
};

// Helper function to get icon by category
export const getCategoryIcon = (category) => {
  switch(category) {
    case 'books': return '📚';
    case 'movies': return '🎬';
    case 'shows': return '📺';
    case 'anime': return '🎭';
    case 'experiences': return '🎨';
    case 'travel': return '🚀';
    default: return '📌';
  }
};
