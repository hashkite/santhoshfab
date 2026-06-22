const getBoundingClientRect = type =>
  document
    .querySelector(`g[vectornator\\:layername="${type}"]`)
    ?.getBoundingClientRect();

const getNavbar = () =>
  document.body.classList.contains('toolbar-horizontal') ? 110 : 0;

export const getLeft = tagTitle =>
  getBoundingClientRect(tagTitle)?.left -
  document
    .querySelector(`.${tagTitle} .footprints-carousel__item`)
    ?.getBoundingClientRect()?.width /
    2 +
  getBoundingClientRect(tagTitle)?.width / 2;

export const getTop = tagTitle =>
  getBoundingClientRect(tagTitle)?.top -
  document
    .querySelector(`.${tagTitle} .footprints-carousel__item`)
    ?.getBoundingClientRect()?.height -
  65 +
  getBoundingClientRect(tagTitle)?.height / 2 +
  window.scrollY -
  getNavbar();
