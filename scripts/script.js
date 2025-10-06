document.addEventListener('DOMContentLoaded', function() {
    // === Код для каруселей (твой старый код) ===
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const container = carousel.parentElement;
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        const cardWidth = carousel.querySelector('.movie-card').offsetWidth + 220; // ширина карточки + gap
        
        nextBtn?.addEventListener('click', () => {
            carousel.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });
        
        prevBtn?.addEventListener('click', () => {
            carousel.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });
    });

    // === Модальное окно входа ===
    const loginModal = document.getElementById('loginModal');
    const openLoginBtn = document.querySelector('.login-btn');
    const closeLoginBtn = loginModal?.querySelector('.close-btn');

    openLoginBtn?.addEventListener('click', () => {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeLoginBtn?.addEventListener('click', () => {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    loginModal?.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // === Модальное окно регистрации ===
    const registerModal = document.getElementById('registerModal');
    const openRegisterBtn = document.querySelector('.reg-btn');
    const closeRegisterBtn = registerModal?.querySelector('.close-btn');
    const showLoginLink = registerModal?.querySelector('.show-login');

    openRegisterBtn?.addEventListener('click', () => {
        registerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeRegisterBtn?.addEventListener('click', () => {
        registerModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    registerModal?.addEventListener('click', (e) => {
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    showLoginLink?.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.classList.remove('active');
        loginModal.classList.add('active');
    });

    // === Общее для обоих модальных окон ===
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (loginModal?.classList.contains('active')) {
                loginModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            if (registerModal?.classList.contains('active')) {
                registerModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // === Логика логина/регистрации ===
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.reg-btn');
    const userProfile = document.querySelector('.user-profile');
    const avatar = document.querySelector('.avatar');
    const usernameSpan = document.querySelector('.username');

    // Проверяем, есть ли пользователь в localStorage при загрузке
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        // Показываем профиль
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userProfile) userProfile.style.display = 'flex';
        if (usernameSpan) usernameSpan.textContent = user.name;
        if (avatar && user.avatar) avatar.src = user.avatar;
    }

    // Функция при успешном входе/регистрации
    window.onLoginSuccess = function(userData) {
        // Сохраняем данные пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userProfile) userProfile.style.display = 'flex';
        if (usernameSpan) usernameSpan.textContent = userData.name;
        if (avatar && userData.avatar) avatar.src = userData.avatar;

        loginModal?.classList.remove('active');
        registerModal?.classList.remove('active');
        document.body.style.overflow = '';
    };

    // выход
    window.logout = function() {
        localStorage.removeItem('user');
        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (userProfile) userProfile.style.display = 'none';
    };
const logoutBtn = document.querySelector('.logout-btn');

logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.logout(); 
});
    // вход
    const loginForm = document.querySelector('.login-form');
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');
        onLoginSuccess({
            name: 'my acc', 
            avatar: 'image/avatar.jpg'
        });
    });
logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.logout(); 
    dropdownMenu.style.display = 'none'; 
});


const userTrigger = document.querySelector('.user-trigger');
const dropdownMenu = document.querySelector('.dropdown-menu');

userTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isVisible ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
    if (!userTrigger?.contains(e.target) && !dropdownMenu?.contains(e.target)) {
        dropdownMenu.style.display = 'none';
    }
});


});
