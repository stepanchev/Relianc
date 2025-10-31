document.addEventListener('DOMContentLoaded', function () {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((carousel) => {
    const container = carousel.parentElement;
    const prevBtn = container?.querySelector('.prev-btn');
    const nextBtn = container?.querySelector('.next-btn');
    const card = carousel.querySelector('.movie-card');
    if (!card) return;
    const cardWidth = card.offsetWidth + 15;

    nextBtn?.addEventListener('click', () => {
      carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevBtn?.addEventListener('click', () => {
      carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  });

  const subscribeBtn = document.querySelector('.subscribe-btn');
  const circles = document.querySelectorAll('.floating-circle');

  if (subscribeBtn && circles.length > 0) {
    const handleMouseEnter = () => {
      circles.forEach((circle) => circle.classList.add('enhanced'));
    };

    const handleMouseLeave = () => {
      circles.forEach((circle) => circle.classList.remove('enhanced'));
    };

    subscribeBtn.addEventListener('mouseenter', handleMouseEnter);
    subscribeBtn.addEventListener('mouseleave', handleMouseLeave);

    const subscribeLink = subscribeBtn.closest('a');
    if (subscribeLink) {
      subscribeLink.addEventListener('mouseenter', handleMouseEnter);
      subscribeLink.addEventListener('mouseleave', handleMouseLeave);
    }
  }

  const loginModal = document.getElementById('loginModal');
  const openLoginBtn = document.querySelector('.login-btn');
  const closeLoginBtn = loginModal?.querySelector('.close-btn');

  openLoginBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeLoginBtn?.addEventListener('click', () => {
    loginModal?.classList.remove('active');
    document.body.style.overflow = '';
  });

  loginModal?.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  const userTrigger = document.querySelector('.user-trigger');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const logoutBtn = document.querySelector('.logout-btn');

  userTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.style.display =
      dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!userTrigger?.contains(e.target) && !dropdownMenu?.contains(e.target)) {
      dropdownMenu.style.display = 'none';
    }
  });

  logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    const loginBtn = document.querySelector('.login-btn');
    const regBtn = document.querySelector('.reg-btn');
    const userProfile = document.querySelector('.user-profile');
    if (loginBtn) loginBtn.style.display = 'block';
    if (regBtn) regBtn.style.display = 'block';
    if (userProfile) userProfile.style.display = 'none';
    dropdownMenu.style.display = 'none';
  });

  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const loginBtn = document.querySelector('.login-btn');
    const regBtn = document.querySelector('.reg-btn');
    const userProfile = document.querySelector('.user-profile');
    const avatar = document.querySelector('.avatar');
    if (loginBtn) loginBtn.style.display = 'none';
    if (regBtn) regBtn.style.display = 'none';
    if (userProfile) userProfile.style.display = 'flex';
    if (avatar && user.avatar) avatar.src = user.avatar;
  }

  const loginForm = document.querySelector('.login-form');
  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const userData = {
      name: 'Мой аккаунт',
      avatar: 'image/avatar.jpg',
    };
    localStorage.setItem('user', JSON.stringify(userData));

    const loginBtn = document.querySelector('.login-btn');
    const regBtn = document.querySelector('.reg-btn');
    const userProfile = document.querySelector('.user-profile');
    const avatar = document.querySelector('.avatar');
    if (loginBtn) loginBtn.style.display = 'none';
    if (regBtn) regBtn.style.display = 'none';
    if (userProfile) userProfile.style.display = 'flex';
    if (avatar) avatar.src = userData.avatar;

    loginModal?.classList.remove('active');
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (loginModal?.classList.contains('active')) {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
  const movieDetailModal = document.getElementById('movieDetailModal');
  const modalPoster = document.getElementById('modalPoster');
  const modalTitle = document.getElementById('modalTitle');
  const modalYear = document.getElementById('modalYear');
  const modalDuration = document.getElementById('modalDuration');
  const modalGenre = document.getElementById('modalGenre');
  const modalRating = document.getElementById('modalRating');
  const modalDescription = document.getElementById('modalDescription');
  const modalCloseBtn = document.querySelector('.movie-modal-close');

  const movieCards = document.querySelectorAll('.movie-card');

  function openMovieModal(card) {
    const title = card.getAttribute('data-title');
    const year = card.getAttribute('data-year');
    const duration = card.getAttribute('data-duration');
    const genre = card.getAttribute('data-genre');
    const rating = card.getAttribute('data-rating');
    const description = card.getAttribute('data-description');
    const imgSrc = card.querySelector('img').src;

    modalPoster.src = imgSrc;
    modalPoster.alt = title;
    modalTitle.textContent = title;
    modalYear.textContent = year;
    modalDuration.textContent = duration;
    modalGenre.textContent = genre;
    modalRating.textContent = rating;
    modalDescription.textContent = description;

    movieDetailModal.classList.add('active');
  }

  function closeMovieModal() {
    movieDetailModal.classList.remove('active');
  }

  movieCards.forEach((card) => {
    card.addEventListener('click', function (event) {
      openMovieModal(this);
    });
  });

  modalCloseBtn.addEventListener('click', closeMovieModal);

  movieDetailModal.addEventListener('click', function (event) {
    if (event.target === movieDetailModal) {
      closeMovieModal();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (
      event.key === 'Escape' &&
      movieDetailModal.classList.contains('active')
    ) {
      closeMovieModal();
    }
  });

  function addToFavorites(movieData) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = favorites.some(
      (fav) => fav.title === movieData.title && fav.year === movieData.year
    );
  }

  function removeFromFavorites(title, year) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(
      (fav) => !(fav.title === title && fav.year === year)
    );
  }

  function loadFavoritesToModal() {
    const favoritesList = document.getElementById('favoritesList');
    if (!favoritesList) {
      console.error("Элемент с ID 'favoritesList' не найден.");
      return;
    }

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
      favoritesList.innerHTML = '<p>Избранных фильмов нет.</p>';
      return;
    }

    favorites.forEach((movie) => {
      const item = document.createElement('div');
      item.className = 'favorites-item';
      item.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <div class="favorites-item-info">
                    <div class="favorites-item-title">${movie.title}</div>
                    <div class="favorites-item-meta">
                        <span>${movie.year}</span>
                        <span>${movie.genre}</span>
                        <span>${movie.duration}</span>
                    </div>
                    <div class="movie-description">${movie.description}</div>
                </div>
                <div class="favorites-item-actions">
                    <button class="remove-favorite-btn" data-title="${movie.title}" data-year="${movie.year}">Удалить</button>
                </div>
            `;
      favoritesList.appendChild(item);
    });

    document.querySelectorAll('.remove-favorite-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const title = this.getAttribute('data-title');
        const year = this.getAttribute('data-year');
        removeFromFavorites(title, year);
        loadFavoritesToModal();
      });
    });
  }

  document
    .querySelectorAll('.favorite-btn, .movie-modal-favorite')
    .forEach((button) => {
      button.addEventListener('click', function () {
        let movieData;
        if (this.classList.contains('movie-modal-favorite')) {
          const modal = document.getElementById('movieDetailModal');
          if (modal.classList.contains('active')) {
            movieData = {
              title: document.getElementById('modalTitle').textContent,
              year: document.getElementById('modalYear').textContent,
              genre: document.getElementById('modalGenre').textContent,
              duration: document.getElementById('modalDuration').textContent,
              director: document.getElementById('modalDirector')
                ? document.getElementById('modalDirector').textContent
                : '',
              rating: document.getElementById('modalRating').textContent,
              description:
                document.getElementById('modalDescription').textContent,
              image: document.getElementById('modalPoster').src,
            };
          }
        } else {
          const movieCard = this.closest('.movie-card, .movie-detail');
          if (movieCard) {
            movieData = {
              title: movieCard.getAttribute('data-title'),
              year: movieCard.getAttribute('data-year'),
              genre: movieCard.getAttribute('data-genre'),
              duration: movieCard.getAttribute('data-duration'),
              director: movieCard.getAttribute('data-director'),
              rating: movieCard.getAttribute('data-rating'),
              description: movieCard.getAttribute('data-description'),
              image: movieCard.querySelector('img').src,
            };
          }
        }

        if (movieData) {
          addToFavorites(movieData);
          this.querySelector('i').textContent = 'favorite';
        }
      });
    });

  const favoritesBtn = document.querySelector('.favorites-btn');
  const favoritesModal = document.getElementById('favoritesModal');
  const closeFavoritesBtn = document.querySelector('.close-favorites-btn');

  if (favoritesBtn && favoritesModal) {
    favoritesBtn.addEventListener('click', function (e) {
      e.preventDefault();
      loadFavoritesToModal();
      favoritesModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeFavoritesBtn && favoritesModal) {
    closeFavoritesBtn.addEventListener('click', function () {
      favoritesModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (favoritesModal) {
    favoritesModal.addEventListener('click', function (e) {
      if (e.target === favoritesModal) {
        favoritesModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && favoritesModal.classList.contains('active')) {
      favoritesModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  // const favoritebtnmodal = this.querySelector('favorite-btn-modal');
  // if
  const form = document.getElementById('registrationForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    window.location.href = '../index.html';
  });
});
