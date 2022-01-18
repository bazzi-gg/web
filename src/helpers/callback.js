export const CharImgErrorCallback = function (event) {
  event.target.src = require("~/static/img/unknown_character.png");
};

export const KartbodyImgErrorCallback = function (event) {
  event.target.src = require("~/static/img/unknown_kartbody.png");
};
