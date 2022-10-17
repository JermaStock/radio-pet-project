(function() {
	function togglePlayButton(buttonsList, playButtonIcoClass, stopButtonIcoClass, toggleBtnClass) {
		document.querySelectorAll(`.${buttonsList}`).forEach(btn => {
			btn.addEventListener('click', function () {
				this.querySelector(`.${playButtonIcoClass}`).classList.toggle(`${toggleBtnClass}`);
				this.querySelector(`.${stopButtonIcoClass}`).classList.toggle(`${toggleBtnClass}`);
			})
		})
	}

	function searchMenuInit() {
		const searchOpen = document.querySelector('.search-btn');
		const searchMenu = document.querySelector('.search-form');
		const searchMenuCloseBtn = document.querySelector('.search-form__close');
		const searchMenuActiveClass = 'search-form--dropdown';
		const searchMenuCLoseBtnActiveClass = 'search-form__close--up';

		searchOpen.addEventListener('click', () => {
			searchMenu.classList.add(searchMenuActiveClass);
			searchMenuCloseBtn.classList.add(searchMenuCLoseBtnActiveClass);

			searchMenuCloseBtn.addEventListener('click', function (e) {
				e.preventDefault();
				this.classList.remove(searchMenuCLoseBtnActiveClass);
				searchMenu.classList.remove(searchMenuActiveClass);
			})
		})
	}

	function modalLoginInit() {
		const openModalButton = document.querySelector('.header__auth');
		const modalWindow = document.querySelector('.auth-modal');
		const modalRegLink = document.querySelector('.auth-modal__link');
		const modalSocialsButtons = document.querySelectorAll('.auth-modal__social');
		const modalCloseButton = document.querySelector('.auth-modal__close');
		const modalWindowActiveClass = 'auth-modal--acitve';

		openModalButton.addEventListener('click', () => {
			modalWindow.classList.add(modalWindowActiveClass);

			modalCloseButton.addEventListener('click', () => {
				modalWindow.classList.remove(modalWindowActiveClass);
			});
			modalRegLink.addEventListener('click', () => {
				modalWindow.classList.remove(modalWindowActiveClass);
			});
			modalSocialsButtons.forEach(button => {
				button.addEventListener('click', () => {
					modalWindow.classList.remove(modalWindowActiveClass);
				});
			});
		})
	}

	function podcastShowMore() { 
		const podcastItem = document.querySelectorAll('[data-cast-hidden-lg]');
		const showMoreButton = document.querySelector('.podcasts__show-more');
		const showMoreButtonWrapper = document.querySelector('.podcasts__show-more');

		showMoreButton.addEventListener('click', () => {
			podcastItem.forEach(item => {
				item.classList.add('podcasts__item-visible');
				showMoreButtonWrapper.remove();
			});
		});
	}

	function formValidation(formSelector, inputSelector, errorClass) {
		const form = document.querySelector(formSelector);
		const inputs = document.querySelectorAll(inputSelector);
		const invalidMessages = {
			authlogin: 'Поле логина обязательно для заполнения!',
			authpass: 'Пароль является обязательным!',
			authloginShort: 'Мин. длина логина 4 символа.',
			authpassShort: 'Пароль слишком короткий.',
			aboutname: 'Поле обязательно для заполнения!',
			aboutnameShort: 'Мин. длина поля 2 символа',
			aboutmail: 'Некорректный E-mail!',
			aboutmailSymbol: 'E-mail должен содержать символы: "@", "."',
			aboutcheck: 'Необходимо Ваше согласие.',
		};

		const createErrorField = (input) => {
			if (!input.value.trim()) {
				input.classList.add('input-error');
				let error = document.createElement('span');
				error.classList.add(errorClass, 'error');
				error.textContent = invalidMessages[input.id];
				input.parentElement.append(error);
			} else if (input.id === 'authlogin') {
				input.classList.add('input-error');
					let error = document.createElement('span');
					error.classList.add(errorClass, 'error');
					error.textContent = invalidMessages[`${input.id}Short`];
					input.parentElement.append(error);
			} else if (input.id === 'authpass') {
				input.classList.add('input-error');
					let error = document.createElement('span');
					error.classList.add(errorClass, 'error');
					error.textContent = invalidMessages[`${input.id}Short`];
					input.parentElement.append(error);
			} else if (input.id === 'aboutname') {
				input.classList.add('input-error');
					let error = document.createElement('span');
					error.classList.add(errorClass, 'error');
					error.textContent = invalidMessages[`${input.id}Short`];
					input.parentElement.append(error);
			}	else if (input.id === 'aboutmail') {
				input.classList.add('input-error');
					let error = document.createElement('span');
					error.classList.add(errorClass, 'error');
					error.textContent = invalidMessages[`${input.id}Symbol`];
					input.parentElement.append(error);
			} else if (input.id === 'aboutcheck') {
				input.classList.add('input-error');
					let error = document.createElement('span');
					error.classList.add(errorClass, 'error');
					error.textContent = invalidMessages[`${input.id}`];
					input.parentElement.append(error);
			}
		};

			form.addEventListener('submit', (e) => {
				const checkInputFields = (item) => {
					if (!item.value.trim() ||
						(item.id === 'authpass' && item.value.length < 4) ||
						(item.id === 'authlogin' && item.value.length < 4) ||
						(item.id === 'aboutname' && item.value.length < 2) ||
						(item.id === 'aboutmail') && !item.value.includes("@" && '.') ||
						(item.id === 'aboutcheck' && !item.checked)) {
							e.preventDefault();
							if (item.parentElement.querySelector(`.${errorClass}`)) {
								item.parentElement.querySelector(`.${errorClass}`).remove();
							}
							createErrorField(item);
						} else {
							if (item.parentElement.querySelector(`.${errorClass}`)) {
								item.parentElement.querySelector(`.${errorClass}`).remove();
							}
							item.classList.remove('input-error');
							}
				}

				inputs.forEach(item => {
					item.addEventListener('input', () => {
						checkInputFields(item);
					});

					checkInputFields(item)
				})
			})
	}

	function burgerMenuInit() {
		const burger = document.querySelector('.burger');
		const menu = document.querySelector('.header__nav');
		const menuItem = document.querySelectorAll('.nav__link');
		const burgerActiveClass = 'burger-active';
		const menuActiveClass = 'header__nav-active';
		const subMenu = document.querySelector('.menu');
		const subMenuActiveClass = 'menu-active';
		const stopScrollClass = 'stop-scroll';

		burger.addEventListener('click', function() {
			burger.classList.toggle(burgerActiveClass);
			menu.classList.toggle(menuActiveClass);
			subMenu.classList.toggle(subMenuActiveClass);
			document.body.classList.toggle(stopScrollClass);
				
			menuItem.forEach(item => {
				item.addEventListener('click', () => {
					burger.classList.remove(burgerActiveClass);
					menu.classList.remove(menuActiveClass);
					subMenu.classList.remove(subMenuActiveClass);
					document.body.classList.remove(stopScrollClass);
				})
			})
		});
	}

	function showCastInfoInit() {
		const showMoreBtn = document.querySelector('.cast-showcase');
		const castList = document.querySelector('.cast__list');
		const castIco = document.querySelector('.cast-showcase__ico');
		const castListActiveClass = 'cast__list-active';
		const castIcoActiveClass = 'cast-showcase__ico-acitve';

		showMoreBtn.addEventListener('click', () => {
			castIco.classList.toggle(castIcoActiveClass);
			castList.classList.toggle(castListActiveClass);
		});
	}

	function guestsTabsInit() {
		document.querySelectorAll(".guests-body__link").forEach(tabsLink => {
			tabsLink.addEventListener("click", function (e) {
        const path = e.currentTarget.dataset.path;

        document.querySelectorAll(".guests-info__item").forEach((card) => {
          card.classList.remove("guests-info__item-current");
        });
        document.querySelectorAll(".guests-body__link").forEach((link) => {
          link.classList.remove("guests-body__link-active");
        });

        this.classList.add("guests-body__link-active");
        document
          .querySelector(`[data-target="${path}"]`)
          .classList.add("guests-info__item-current");

        if (window.matchMedia("(max-width: 768px)").matches) {
          tabsLink.dataset["path"] === "dummy"
            ? tabsLink.setAttribute("href", "#guests-dummy")
            : tabsLink.setAttribute("href", "#guests-author");
        } else {
          e.preventDefault();
        }
      });
		})
	}

	document.addEventListener('DOMContentLoaded', function () {
		togglePlayButton('cast__btn', 'cast__ico--play', 'cast__ico--stop', 'cast__ico');
		togglePlayButton('podcasts__btn', 'podcasts__ico-btn--play', 'podcasts__ico-btn--stop', 'podcasts__ico-btn');

		searchMenuInit();

		modalLoginInit();

		burgerMenuInit();

		showCastInfoInit();

		podcastShowMore();

		new Choices('.shows-select', {
			searchEnabled: false,
			itemSelectText: '',
			allowHTML: false,
			shouldSort: false,
			position: 'bottom',
		});

		new Accordion('.accordion-list', {
			elementClass: 'accordion',
			triggerClass: 'accordion__control',
			panelClass: 'accordion__content',
			activeClass: 'accordion--active',
		});

		guestsTabsInit()

		formValidation('.auth-modal__form', '.auth-modal__input', 'error-modal');
		formValidation('.about-form', '.about-form__input-field', 'error-about');

		const playListSwiper = () => {
			let init = false;

			function playListSwiperInit() {
				if (window.innerWidth <= 650) {
					if (!init) {
						init = true;
						document.querySelector('.playlist-form').classList.add('swiper')
						document.querySelector('.playlist-form__list').classList.add('swiper-wrapper');
						document.querySelectorAll('.playlist-form__item').forEach(el => {
							el.classList.add('swiper-slide');
						})
						swiper = new Swiper(".playlist-form", {
							direction: "horizontal",
							slidesPerView: 'auto',
							spaceBetween: 15,
							breakpoints: {
								360: {
									spaceBetween: 30,
								}
							}
						});
						function activePlaylistBtn() {
							const genreButton  = document.querySelectorAll('.playlist-checkbox');
							genreButton.forEach(btn => {
								btn.addEventListener('click', function() {
									genreButton.forEach(btn => {
										btn.classList.remove('playlist-checkbox--active');
									})
									this.classList.add('playlist-checkbox--active');
								})
							});
						}
						activePlaylistBtn();
					}
				} else if (init) {
					document.querySelector('.playlist-form').classList.remove('swiper')
					document.querySelector('.playlist-form__list').classList.remove('swiper-wrapper');
					document.querySelectorAll('.playlist-form__item').forEach(el => {
						el.classList.remove('swiper-slide');
					})
					swiper.destroy();
					init = false;
				}
			}

			playListSwiperInit();
			window.addEventListener("resize", playListSwiperInit);
		}

		playListSwiper();

		new Swiper(".about-swiper", {
			direction: "horizontal",
			loop: true,
			slidesPerView: 2.28,
			spaceBetween: 20,
			navigation: {
				nextEl: '.about-swiper-button-next',
				prevEl: '.about-swiper-button-prev',
			},
			breakpoints: {
				526: {
					slidesPerView: 2.18,
					spaceBetween: 30,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
				1025: {
					slidesPerView: 4,
					spaceBetween: 30,
				}
			}
		});
	})
})();