import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

(function ($, $$) {

    gsap.to(".cover-image", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: ".cover-image",
            scrub: true
        },
    });

})((selector) => document.querySelector(selector), (selector) => Array.from(document.querySelectorAll(selector)));