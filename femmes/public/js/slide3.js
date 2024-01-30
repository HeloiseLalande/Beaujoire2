"use strict";

const initSlide3 = function () {
  const drawers = document.querySelectorAll(".drawer");

  // Reset attributes
  for (let i = 0; i < drawers.length; i++) {
    drawers[i].setAttribute("style", "left: -90vw; background: #2f2f2f;");
  }

  const button = document.querySelector(".drawer-button");
  const overlay = document.querySelector(".overlay");
  button.addEventListener("click", function (event) {
    let t1 = anime.timeline({
      easing: "easeInOutQuad",
    });
    let t2 = anime.timeline({
      easing: "easeInOutQuad",
    });

    t1.add({
      targets: ".drawer",
      left: "0vw",
      backgroundColor: "#ff0000",
    })
    t2.add({
        targets: ".overlay",
        opacity: 1,
        zIndex: 10,
    });
  });

  overlay.addEventListener("click", function(event) {
    let t1 = anime.timeline({
      easing: "easeInOutQuad",
    });
    let t2 = anime.timeline({
      easing: "easeInOutQuad",
    });

    t1.add({
      targets: ".drawer",
      left: "-90vw",
      backgroundColor: "#2f2f2f",
      easing: "easeInOutQuad",
    });
    t2.add({
        targets: ".overlay",
        opacity: 0,
        zIndex: -1,
    });
  });
};
