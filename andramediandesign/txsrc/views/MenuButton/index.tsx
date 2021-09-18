import React, { useState, useRef } from "react";
import { RootState } from "../../store";
import useStyle from "./style";
import useMeasure from "react-use-measure";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";

import {
  containerStateToggle,
  onDelayStateChange,
  // addButtonsPosition
} from "../../redux/slices/buttonActionSlice";
import { useMediaQuery } from "@material-ui/core";

interface mediaQueries {
  rootState: boolean;
  phase: boolean;
}

// import { Positions } from "./types";
// import { Typography } from "@material-ui/core";

const calPos = (
  index: number,
  length: number,
  size: number,
  state: boolean,
  windowState: mediaQueries
) => {
  if (windowState.rootState) {
    const inc = state ? 1.5 : 3;
    const rad = size / inc;
    const angle = ((2 * Math.PI) / length) * index;
    const x = rad * Math.cos(angle);
    const y = rad * Math.sin(angle);
    return { x, y };
  } else {
    const phase = windowState.phase ? 8 : 20;
    const inc = state ? 3 : 30;
    const angle = ((Math.PI * 2) / length + 2) * index;
    const rad = size / inc;
    const x = rad * 5 * Math.cos(angle) + 5 * (rad * Math.sin(angle)) - phase;
    const y = 0;
    return { x, y };
  }
};
function MenuButton(): React.ReactElement {
  const classes = useStyle();
  const dispatch: AppDispatch = useDispatch();
  const windowState = {
    rootState: useMediaQuery("(min-width:1280px)"),
    phase: useMediaQuery("(max-width:560px)"),
  };

  // const [showInfo, setShowInfo] = useState<boolean>(false);
  // const [buttonPositions, setButtonsPosition] = useState<Positions[]>([
  //   { x: 0, y: 0 },
  // ]);
  const parentElement = useRef<HTMLDivElement>(null);
  const {
    buttonAction: { rootState, delayState, data },
    screenAction: { screenState },
  } = useSelector((state: RootState) => state);
  const [buttonMesures, { width }] = useMeasure();
  const [powerState, setPowerState] = useState<boolean>(false);
  const buttonSizing = width;

  // useEffect(() => {
  //   buttonSizing > 0 &&
  //     data.map(
  //       ({ name, img }: { name: string; img: string }, index: number) => {
  //         // console.log(index);
  //         const { x, y } = calPos(index, data.length, buttonSizing, powerState);
  //         setButtonsPosition((preState) => {
  //           return [...preState, { x, y }];
  //         });
  //       }
  //     );
  // }, [buttonSizing]);
  // console.log(buttonPositions);

  const handlePowerClick = () => {
    const parentChilrdernLength = parentElement.current?.childElementCount;
    const prentArray = parentElement.current?.children;
    if (parentChilrdernLength && prentArray) {
      for (let i = 1; i < parentChilrdernLength; i++) {
        prentArray[i].children[0].classList.remove("focused");
      }
    }
    if (rootState) {
      dispatch(containerStateToggle("PowerButton"));
      setTimeout(() => {
        dispatch(onDelayStateChange());
      }, 500);
    } else {
      setPowerState(() => !powerState);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const payload = e.currentTarget.id;
    const parentChilrdernLength = parentElement.current?.childElementCount;
    const prentArray = parentElement.current?.children;
    if (parentChilrdernLength && prentArray) {
      for (let i = 1; i < parentChilrdernLength; i++) {
        prentArray[i].children[0].id === payload
          ? prentArray[i].children[0].classList.add("focused")
          : prentArray[i].children[0].classList.remove("focused");
      }
    }
    dispatch(containerStateToggle(payload));
  };

  return (
    <div
      className={classes.root}
      ref={parentElement}
      style={
        screenState === "wide" && !rootState && !delayState
          ? { paddingRight: 0 }
          : screenState === "limited" && !rootState
          ? { paddingTop: 0 }
          : {}
      }
    >
      <div
        className={
          powerState
            ? `${classes.powerButton} open`
            : `${classes.powerButton} close`
        }
        onClick={handlePowerClick}
        // onMouseOver={() => setShowInfo(true)}
        // onMouseOut={() => setShowInfo(false)}
      >
        <img
          ref={buttonMesures}
          src="images/Button/Menu_Trigger/Power_Button-Stoke.png"
          alt="content-asset"
        />
      </div>

      {data.map(
        (
          {
            name,
            img,
            toolKit,
            info,
          }: { name: string; img: string; toolKit: string; info: string },
          index: number
        ) => {
          const { x, y } = calPos(
            index,
            data.length,
            buttonSizing,
            powerState,
            windowState
          );
          return (
            <div
              key={name}
              className={classes.buttonContainers}
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {/* {info != "" && (
                <div className={classes.introTexts_container}>
                  <Typography
                    variant="body1"
                    className={
                      showInfo && !powerState
                        ? `${classes.introTexts_text} open`
                        : `${classes.introTexts_text} close`
                    }
                  >
                    {info}
                  </Typography>
                </div>
              )} */}
              <div
                id={name}
                className={classes.iconButtons}
                style={{
                  width: buttonSizing / 4,
                  height: buttonSizing / 4,
                  backgroundImage: `url(${img})`,
                }}
                onClick={(e) => handleClick(e)}
              ></div>
            </div>
          );
        }
      )}
    </div>
  );
}

export default MenuButton;
