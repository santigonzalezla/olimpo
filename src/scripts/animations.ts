import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ease = "power3.out";

gsap.timeline({ defaults: { ease, duration: 0.7 } })
  .from(".nav",          { opacity: 0, y: -30, duration: 0.6 })
  .from(".heroLocation", { opacity: 0, y: 20,  duration: 0.5 }, "-=0.2")
  .from(".heroTitle",    { opacity: 0, y: 50,  duration: 0.9 }, "-=0.3")
  .from(".heroSubtitle", { opacity: 0, y: 30,  duration: 0.6 }, "-=0.5")
  .from(".heroCtas",     { opacity: 0, y: 20,  duration: 0.5 }, "-=0.4")
  .from(".stat",         { opacity: 0, y: 20,  duration: 0.5, stagger: 0.15 }, "-=0.3");

function onScroll(
  targets: string,
  trigger: string,
  vars: gsap.TweenVars = {}
) {
  gsap.from(targets, {
    scrollTrigger: { trigger, start: "top 75%", once: true },
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease,
    ...vars,
  });
}

onScroll(".problemTitle", ".problem");
onScroll(".problemBody p", ".problem", { stagger: 0.12, delay: 0.1 });
onScroll(".problemCta",    ".problem", { delay: 0.25 });
onScroll(".problemTagline",".problem", { delay: 0.35 });
onScroll(".problemImages", ".problem", { x: 60, y: 0, delay: 0.1 });

onScroll(".unitsTitle", ".units");
gsap.from(".unitCard", {
  scrollTrigger: { trigger: ".units", start: "top 70%", once: true },
  opacity: 0, y: 60, duration: 0.7, stagger: 0.2, ease, delay: 0.15,
});

onScroll(".benefitsTitle", ".benefits");
gsap.from(".benefitsItem", {
  scrollTrigger: { trigger: ".benefits", start: "top 70%", once: true },
  opacity: 0, y: 50, duration: 0.6, stagger: 0.1, ease, delay: 0.1,
});

gsap.from(".aboutLeft", {
  scrollTrigger: { trigger: ".about", start: "top 70%", once: true },
  opacity: 0, x: -60, duration: 0.8, ease,
});
onScroll(".aboutTitle", ".about", { delay: 0.15 });
onScroll(".aboutDesc",  ".about", { delay: 0.3 });
onScroll(".aboutCta",   ".about", { delay: 0.45 });

gsap.from(".contactMap", {
  scrollTrigger: { trigger: ".contact", start: "top 70%", once: true },
  opacity: 0, x: -60, duration: 0.8, ease,
});
onScroll(".contactTitle", ".contact", { delay: 0.1 });
onScroll(".contactDesc",  ".contact", { delay: 0.2 });
onScroll(".contactForm",  ".contact", { delay: 0.3 });
