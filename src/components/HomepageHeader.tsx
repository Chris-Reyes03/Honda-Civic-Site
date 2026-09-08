import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

const HomepageHeader = () => {
  useGSAP(() => {
    const headerMsgSplit = SplitText.create(".HeaderText", {
      type: "words",
    });

    // 1. PIN ONLY — just holds the section in place
    ScrollTrigger.create({
      trigger: ".HomeHeaderContent",
      start: "top top",
      end: "+=1500",
      pin: true,
      pinSpacing: true,
      markers: true,
    });

    // 2. ANIMATION ONLY — starts later, ends earlier than the pin
    gsap.to(headerMsgSplit.words, {
      color: "#ffffff",
      ease: "power1.inOut",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".HomeHeaderContent",
        start: "top 90%", // animation starts when pin starts
        end: "+=1200", // animation ends 300px before pin releases
        scrub: 1, // slight lag for smoother feel
        markers: true,
      },
    });
  });

  return (
    <section className="HomeHeaderContent">
      <h1 className="HeaderText bottom-96">YOUR CIVIC JOURNEY STARTS NOW</h1>
      <h1 className="HeaderText absolute inset-x-20 bottom-20 text-right">
        <span className="absolute -top-18 right-0 uppercase">THE</span>
        DRIVER-FOCUSED EXPERIENCE
      </h1>
    </section>
  );
};

export default HomepageHeader;
