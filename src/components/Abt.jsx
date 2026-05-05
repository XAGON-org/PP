import React from "react";
import SplitText from "./SplitText";

export const Abt = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  return (
    <div className="abt">
    <SplitText
      text="About US"
      className="text-4xl font-semibold text-center"
      delay={50}
      duration={1.25}
      ease="power3.out"
      splitType="chars"
      from={{ opacity: 0, y: 40 }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.1}
      rootMargin="-100px"
      textAlign="center"
      onLetterAnimationComplete={handleAnimationComplete}
      showCallback
    />
    <SplitText
      text="We are a creative digital agency focused on building scalable web applications, intuitive UI/UX designs, and growth-driven marketing solutions. We help businesses improve visibility through SEO, optimize performance with data-driven strategies, and create engaging digital experiences that drive conversions, strengthen brand presence, and deliver measurable results."
      className="text-2xl font-regular text-center"
      delay={50}
      duration={1.25}
      ease="power3.out"
      splitType="words"
      from={{ opacity: 0, y: 40 }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.1}
      rootMargin="-100px"
      textAlign="center"
      onLetterAnimationComplete={handleAnimationComplete}
      showCallback
    />
    </div>
  );
};
