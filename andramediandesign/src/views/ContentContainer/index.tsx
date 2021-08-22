import React, { useRef, Suspense, lazy } from "react";
import useStyle from "./style";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
const UX = lazy(() => import("../Pages/UX"));
const UI = lazy(() => import("../Pages/UI"));
const CV = lazy(() => import("../Pages/CV"));
const D3 = lazy(() => import("../Pages/D3"));
const Undeveloped = lazy(() => import("../Pages/Undeveloped"));

function RenderObject(state: any): React.ReactElement {
  switch (state.state) {
    case "UX":
      return <UX />;
    case "UI":
      return <UI />;
    case "CV":
      return <CV />;
    case "D3":
      return <D3 />;
    default:
      return <Undeveloped />;
  }
}

function ContentContainer(): React.ReactElement {
  const classes = useStyle();
  const rootDetails = useRef<HTMLDivElement>(null);
  const scrollToTop = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    rootDetails.current &&
    scrollToTop.current &&
    rootDetails.current.scrollTop > 800
      ? (scrollToTop.current.style.transform =
          window.innerWidth > 1280
            ? "translateY(-15px) scale(1)"
            : "translateY(-75px) scale(1)")
      : scrollToTop.current &&
        (scrollToTop.current.style.transform =
          window.innerWidth > 1280
            ? "translateY(-15px) scale(0)"
            : "translateY(-75px) scale(1)");
  };

  const handleClick = () => {
    rootDetails.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const {
    buttonAction: { rootState, delayState, renderPage },
    screenAction: { screenState },
  } = useSelector((state: RootState) => state);

  return (
    <div
      onScroll={handleScroll}
      ref={rootDetails}
      className={
        rootState && screenState === "wide"
          ? `${classes.root} open`
          : rootState && screenState === "limited"
          ? `${classes.root} open_vertically`
          : !rootState && delayState && screenState === "wide"
          ? `${classes.root} close`
          : !rootState && delayState && screenState === "limited"
          ? `${classes.root} close_vertically`
          : screenState === "limited"
          ? `${classes.root} close_vertically`
          : classes.root
      }
      style={
        rootState && !delayState && screenState === "wide"
          ? { width: "100%" }
          : !rootState && delayState && screenState === "wide"
          ? { width: "0%" }
          : rootState && !delayState && screenState === "limited"
          ? { height: "100%" }
          : !rootState && delayState && screenState === "limited"
          ? { height: "0%" }
          : {}
      }
    >
      <Suspense fallback={"Loadding...."}>
        <div
          ref={scrollToTop}
          className={classes.scrollToTop}
          onClick={handleClick}
        >
          <div />
        </div>
        <img
          src="images/Containers/Content_Frame/Mobile.png"
          alt="content"
          className={classes.MobileFrame}
        />
        <RenderObject state={renderPage} />
      </Suspense>
    </div>
  );
}

export default ContentContainer;
