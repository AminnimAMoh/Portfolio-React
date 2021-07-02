import React, { useState, useRef } from "react";
import { RootState } from "src/store";
import data from "./data";
import useStyle from "./style";
import useMeasure from "react-use-measure";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "src/store";
import {
  containerStateToggle,
  onDelayStateChange,
} from "../../redux/slices/buttonActionSlice";

const calPos = (
  index: number,
  length: number,
  size: number,
  state: boolean
) => {
  if (window.innerWidth > 1280) {
    const inc = state ? 1.5 : 3;
    const rad = size / inc;
    const angle = ((2 * Math.PI) / length) * index;
    const x = rad * Math.cos(angle);
    const y = rad * Math.sin(angle);
    return { x, y };
  } else {
    const phase = window.innerWidth < 560 ? 8 : 20;
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
  const parentElement = useRef<HTMLDivElement>(null);
  const {
    buttonAction: { rootState, delayState },
    screenAction: { screenState },
  } = useSelector((state: RootState) => state);
  const [buttonMesures, { width }] = useMeasure();
  const [powerState, setPowerState] = useState<boolean>(false);
  const buttonSizing = width;
  const path =
    "M771.8062,348.6448l.13-.1306c103.798-104.0754,272.37-104.1158,376.2175-.09l6.8143,6.8259c102.3864,102.5616,103.7173,268.2461,2.9919,372.4393l0,0c-101.9126,105.4213-269.9548,108.373-375.5069,6.5959l-6.9441-6.6957C668.5981,624.5027,666.93,453.8011,771.8062,348.6448Z";

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
      >
        <svg viewBox="0 0 555 555" className={classes.textOnPath}>
          <path id="carve" d={path} />
          <text width="500">
            <textPath xlinkHref="#carve">
              Hello!!! I am Amin. I am a React Front End Developer.
            </textPath>
          </text>
        </svg>
        <img
          ref={buttonMesures}
          src="images\Button\Menu_Trigger\Power_Button-Stoke.png"
          alt="content-asset"
        />
      </div>

      {data.map(({ name, img, toolKit }, index) => {
        const { x, y } = calPos(index, data.length, buttonSizing, powerState);
        return (
          <div
            key={name}
            className={classes.buttonContainers}
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
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
      })}
    </div>
  );
}

export default MenuButton;
