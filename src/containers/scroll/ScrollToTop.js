import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="relative">
      <div className="absolute bottom-0 right-0">
        {isVisible && (
          <div onClick={scrollToTop}>
            <Player
              autoplay
              loop
              src="https://assets3.lottiefiles.com/packages/lf20_2ylbszmp.json"
              style={{ height: "90px", width: "90px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
