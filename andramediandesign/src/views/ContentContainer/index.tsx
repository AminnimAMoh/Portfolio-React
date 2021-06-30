import React, { useRef } from "react";
import useStyle from "./style";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import UX from "../Pages/UX";
import UI from "../Pages/UI";

function RenderObject(state: any): React.ReactElement {
  console.log(state);

  switch (state.state) {
    case "UX":
      return <UX />;
    case "UI": {
      return <UI />;
    }
    default:
      return <h1>{state.state}</h1>;
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
      ? (scrollToTop.current.style.transform = "translateY(-15px) scale(1)")
      : scrollToTop.current &&
        (scrollToTop.current.style.transform = "translateY(-15px) scale(0)");
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
    </div>
  );
}

export default ContentContainer;
