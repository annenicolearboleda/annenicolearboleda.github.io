'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
// console.log(header);
const allSections = document.querySelectorAll('.section');
// console.log(allSections);
const ids = document.getElementById('section--1');
// console.log(ids);
const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);
// console.log(document.getElementsByClassName('btn'));
const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);
const message = document.createElement('div');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

//opens modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//closes modal window
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//attaches modal opening function to all applicable buttons
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

//attaches modal closing to x buttinn on modal window
btnCloseModal.addEventListener('click', closeModal);

//removes the modal window by clicking on the blurred background of the modal window
overlay.addEventListener('click', closeModal);

//removes the modal window by pressing the keyboard key "escape"
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// //adding the cooking message from js
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookies for improved functionality and analytics';
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// console.log(message);

// //placement of the cookies message
// header.prepend(message);
// // header.append(message.cloneNode(true));
// // header.before(message);
// // header.after(message);

// //removing the cookies message when the button "Got it" is clicked
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.remove();
//     message.parentElement.removeChild(message);
//   });

// //identifies the color for the the cookies message bar
// message.style.backgroundColor = '#E74C3C';
// message.style.color = 'white';
// //adjusts the width of the cookies message bar
// message.style.width = '170%';

//creates the height of the cookies bar
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// console.log(message.style.height);
//adds sets the ald for an image
logo.alt = 'Beautiful Minimalist logo';

//create a smooth scrolling to correct part of the website
btnScrollTo.addEventListener('click', function (e) {
  const s1cooridin = section1.getBoundingClientRect();
  console.log(s1cooridin);

  // console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   'Current height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // window.scrollTo();

  // window.scrollTo({
  //   left: s1cooridin.left + window.pageXOffset,
  //   top: s1cooridin.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// console.log(document.querySelectorAll('.nav__link'));

//scrolling to nav__link sections (no event propagation)
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Attaching Operations tab to Operations content
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  if (!clicked) return;
  //Removing the actives from all
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //adding active to tab
  clicked.classList.add('operations__tab--active');

  //adding active to conten58
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//decreasing the opacity of navigation buttons that are not hovered over
// const handleHover = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     // console.log(this, e.currentTarget);
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = this;
//     });
//     logo.style.opacity = this;
//   }
// };
// //using .bind() to pass "arguements" into handler
// nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseout', handleHover.bind(1));

//[DNU]allows the naviagtion menu to stick to the top starting from section 1
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

//[USE THIS]allows the naviagtion menu to stick to the top starting from section 1
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//message appearing upon scrolling into section effect

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  // console.log(entry.target);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.14,
});

allSections.forEach(section => {
  // console.log(section);
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//revealing background image
const allContains = document.querySelectorAll('.containback');

const revealBack = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  if (entry.target.classList.contains('c1')) {
    entry.target.classList.add('container1');
  } else if (entry.target.classList.contains('c2')) {
    entry.target.classList.add('container2');
  } else if (entry.target.classList.contains('c3')) {
    entry.target.classList.add('container3');
  } else if (entry.target.classList.contains('c4')) {
    entry.target.classList.add('container4');
  }
};

const containerObserver = new IntersectionObserver(revealBack, {
  root: null,
  threshold: 0.4,
});

allContains.forEach(contain => {
  containerObserver.observe(contain);
});

//Revealing drops

const allDroppy = document.querySelectorAll('.droppy');

const revealDroppy = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
};

const droppyObserver = new IntersectionObserver(revealDroppy, {
  root: null,
  threshold: 0.4,
});

allDroppy.forEach(droppy => {
  droppyObserver.observe(droppy);
  droppy.classList.add('section--hidden');
});

/////////REVEALING INTROS
const allIntros = document.querySelectorAll('.intros');

const revealIntro = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  if (entry.target.classList.contains('intro--r')) {
    entry.target.classList.add('intro--right');
  } else {
    entry.target.classList.add('intro--left');
  }

  observer.unobserve(entry.target);
};

const introsObserver = new IntersectionObserver(revealIntro, {
  root: null,
  threshold: 0.7,
});

allIntros.forEach(intro => {
  introsObserver.observe(intro);
  intro.classList.add('section--hidden');
});

//STOPPING THE INTRO LINE

const introLine = document.getElementById('section--2');
const line = document.querySelector('.intro--line');
// console.log(introLine);

const lineRemove = function (entries, oberver) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  line.remove();
};

const introLineObserve = new IntersectionObserver(lineRemove, {
  root: null,
  threshold: 0,
});

introLineObserve.observe(introLine);

//Lazy loading of images
const sectionImages = document.querySelectorAll('img[data-src]');

const lazyLoading = function (entries, observer) {
  const [entry] = entries;
  // console.log(entries);

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(lazyLoading, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

sectionImages.forEach(image => {
  imageObserver.observe(image);
});

//Left and Right movement of the slider using the arrow keyboard buttons and the buttons at the bottom
const slider = function () {
  const slidrBtnRight = document.querySelector('.slider__btn--right');
  const slidrBtnLeft = document.querySelector('.slider__btn--left');
  const allSlides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  let curSlide = 0;
  const maxSlide = allSlides.length;
  const dotContainer = document.querySelector('.dots');

  //functions
  const createDots = function () {
    allSlides.forEach((sl, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (sld) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(s => s.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${sld}"]`)
      .classList.add('dots__dot--active');
  };

  const moveSlide = function (curSl) {
    allSlides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - curSl)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    moveSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    moveSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    moveSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  //Event handlers
  slidrBtnRight.addEventListener('click', nextSlide);
  slidrBtnLeft.addEventListener('click', prevSlide);

  //implementing keydown for left and right arrow

  document.addEventListener('keydown', function (e) {
    e.key == 'ArrowRight' && nextSlide();
    e.key == 'ArrowLeft' && prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      moveSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// Some random colors
// const colors = ['#3CC157', '#2AA7FF', '#1B1B1B', '#FCBC0F', '#F85F36'];

// const numBalls = 50;
// const balls = [];

// for (let i = 0; i < numBalls; i++) {
//   let ball = document.createElement('div');
//   ball.classList.add('ball');
//   ball.style.background = colors[Math.floor(Math.random() * colors.length)];
//   ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
//   ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
//   ball.style.transform = `scale(${Math.random()})`;
//   ball.style.width = `${Math.random()}em`;
//   ball.style.height = ball.style.width;

//   balls.push(ball);
//   document.body.append(ball);
// }

// // Keyframes
// balls.forEach((el, i, ra) => {
//   let to = {
//     x: Math.random() * (i % 2 === 0 ? -11 : 11),
//     y: Math.random() * 12,
//   };

//   let anim = el.animate(
//     [
//       { transform: 'translate(0, 0)' },
//       { transform: `translate(${to.x}rem, ${to.y}rem)` },
//     ],
//     {
//       duration: (Math.random() + 1) * 2000, // random duration
//       direction: 'alternate',
//       fill: 'both',
//       iterations: Infinity,
//       easing: 'ease-in-out',
//     }
//   );
// });

/////////////////////////
/////////////////////////
///EXERCISES ONLY
/////////////////////////
/////////////////////////

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

////CREATE AND INSERT ELEMENTS

// .insertAdjacentHTML

// console.log(message.style.color);
// console.log(message.style.backgroundColor);
// console.log(message.style.width);
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

//changes color of the buttons
// document.documentElement.style.setProperty('--color-primary', '#9B59B6');

// console.log(logo.alt);
// console.log(logo.getAttribute('designer'));

// logo.setAttribute('designer', 'Anne Nicole');
// console.log(logo.designer);

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// console.log(logo.dataset.gandalfDumbledore);

// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c', 'j');
// logo.classList.contains('c', 'j'); // not includes like with arrays

//DON'T USE
// logo.classList = 'Nica';

// const h1 = document.querySelector('h1');

// const h1Alert = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');

//   h1.removeEventListener('mouseenter', h1Alert);
// };

// h1.addEventListener('mouseenter', h1Alert);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

// setTimeout(() => h1.removeEventListener('mouseenter', h1Alert), 10000);

////EVENT CAPTURING AND BUBBLING
//rg(255, 255, 255)

// 7, 18
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target);
//   console.log('LINK', e.currentTarget);
//   console.log(this == e.currentTarget);
// });

// document.querySelector('.nav__links').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('CONTAINER', e.target);
//     console.log('CONTAINER', e.currentTarget);
//     console.log(this == e.currentTarget);

//     //stop propagation
//     // e.stopPropagation();
//   },
//   true
// );

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target);
//   console.log('NAV', e.currentTarget);
//   console.log(this == e.currentTarget);
// });

// const h1 = document.querySelector('h1');
// console.log(h1);

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'pink';
// h1.lastElementChild.style.color = 'purple';

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--color-secondary-opacity)';

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// console.log(h1.parentElement.childNodes);
// console.log(h1.parentNode.children);
// console.log(h1.parentNode.childNodes);

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
