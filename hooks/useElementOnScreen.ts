import React from "react";

export default function useElementOnScreen(
  options?: IntersectionObserverInit
): [boolean, React.MutableRefObject<null>] {
  const titleRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const callbackFunction: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    const [entry] = entries;
    if (entry) {
      setIsVisible(entry.isIntersecting);
    } else {
      throw new Error("Bruh, where ur observers at?");
    }
  };
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      callbackFunction,
      options ?? observerOptions
    );
    if (titleRef.current) observer.observe(titleRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
    };
  }, [titleRef, options]);

  return [isVisible, titleRef];
}
