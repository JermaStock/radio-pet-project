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

	function formValidation() {
		
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

		formValidation();

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