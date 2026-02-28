import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Button from "@components/ui/Buttons";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.set("svg", { visibility: "visible" });

    gsap.to("#headStripe", {
      y: 0.5,
      rotation: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      duration: 1,
    });

    gsap.to("#spaceman", {
      y: 0.5,
      rotation: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      duration: 1,
    });

    gsap.to("#craterSmall", {
      x: -3,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut",
    });

    gsap.to("#craterBig", {
      x: 3,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut",
    });

    gsap.to("#planet", {
      rotation: -2,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut",
      transformOrigin: "50% 50%",
    });

    gsap.to("#starsBig g", {
      rotation: "random(-30,30)",
      transformOrigin: "50% 50%",
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    gsap.fromTo(
        "#starsSmall g",
        { scale: 0, transformOrigin: "50% 50%" },
        { scale: 1, transformOrigin: "50% 50%", yoyo: true, repeat: -1, stagger: 0.1 }
    );

    gsap.to("#circlesSmall circle", {
      y: -4,
      yoyo: true,
      duration: 1,
      ease: "sine.inOut",
      repeat: -1,
    });

    gsap.to("#circlesBig circle", {
      y: -2,
      yoyo: true,
      duration: 1,
      ease: "sine.inOut",
      repeat: -1,
    });

    gsap.set("#glassShine", { x: -68 });

    gsap.to("#glassShine", {
      x: 80,
      duration: 2,
      rotation: -30,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
      repeat: -1,
      repeatDelay: 8,
      delay: 2,
    });
  }, []);

  return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

          {/* SVG */}
          <div>
            <svg viewBox="0 0 800 600" className="w-full">
              <g>
                <defs>
                  <clipPath id="GlassClip">
                    <path d="M380.857,346.164c-1.247,4.651-4.668,8.421-9.196,10.06c-9.332,3.377-26.2,7.817-42.301,3.5s-28.485-16.599-34.877-24.192c-3.101-3.684-4.177-8.66-2.93-13.311l7.453-27.798c0.756-2.82,3.181-4.868,6.088-5.13c6.755-0.61,20.546-0.608,41.785,5.087s33.181,12.591,38.725,16.498c2.387,1.682,3.461,4.668,2.705,7.488L380.857,346.164z" />
                  </clipPath>
                  <clipPath id="cordClip">
                    <rect width="800" height="600" />
                  </clipPath>
                </defs>

                {/* PLANET */}
                <g id="planet">
                  <circle fill="none" stroke="#0E0620" strokeWidth="3" cx="572.859" cy="108.803" r="90.788" />
                  <circle id="craterBig" fill="none" stroke="#0E0620" strokeWidth="3" cx="548.891" cy="62.319" r="13.074" />
                  <circle id="craterSmall" fill="none" stroke="#0E0620" strokeWidth="3" cx="591.743" cy="158.918" r="7.989" />
                </g>

                {/* STARS */}
                <g id="starsBig">
                  <g>
                    <line stroke="#0E0620" strokeWidth="3" x1="518.07" y1="245.375" x2="518.07" y2="266.581" />
                    <line stroke="#0E0620" strokeWidth="3" x1="508.129" y1="255.978" x2="528.01" y2="255.978" />
                  </g>
                </g>

                {/* SPACEMAN */}
                <g id="spaceman">
                  <ellipse fill="#fff" stroke="#0E0620" strokeWidth="3" cx="341.295" cy="315.211" rx="60" ry="60" />
                  <path id="headStripe" fill="none" stroke="#0E0620" strokeWidth="3" d="M330.868,261.338c-7.929,1.72-15.381,5.246-21.799,10.246" />
                </g>

                {/* GLASS SHINE */}
                <g clipPath="url(#GlassClip)">
                  <polygon id="glassShine" fill="none" stroke="#0E0620" strokeWidth="3"
                           points="278.436,375.599 383.003,264.076 364.393,251.618 264.807,364.928" />
                </g>
              </g>
            </svg>
          </div>

          {/* TEXT */}
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-6xl font-bold">404</h1>
            <h2 className="text-2xl font-semibold">UH OH! You're lost.</h2>

            <p className="text-text-muted max-w-md">
              The page you are looking for does not exist. Let’s get you back home.
            </p>

            <Button variant="primary" intent="fill" onClick={() => navigate("/")}>
              Go Home
            </Button>
          </div>
        </div>
      </div>
  );
};

export default NotFoundPage;