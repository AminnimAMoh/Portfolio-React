import React, { useState } from "react";
import { RootState } from "src/store";
import data from "./data";
import useStyle from "./style";
import { Props } from "./types";
import useMeasure from "react-use-measure";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "src/store";
import { containerStateToggle } from "../../redux/slices/buttonActionSlice";

const calPos = (
  index: number,
  length: number,
  size: number,
  state: boolean
) => {
  const inc = state ? 1.5 : 3;
  const rad = size / inc;
  var angle = ((2 * Math.PI) / length) * index;
  const x = rad * Math.cos(angle);
  const y = rad * Math.sin(angle);
  return { x, y };
};
function MenuButton({}: Props): React.ReactElement {
  const classes = useStyle();
  const dispatch: AppDispatch = useDispatch();
  const buttonsActive: boolean = useSelector(
    (state: RootState) => state.buttonAction.containerState
  );
  const [buttonMesures, { width }] = useMeasure();
  const [powerState, setPowerState] = useState<boolean>(false);
  const buttonSizing = width;

  const handlePowerClick = () => {
    buttonsActive
      ? dispatch(containerStateToggle("PowerButton"))
      : setPowerState(() => !powerState);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const payload = e.currentTarget.id;
    dispatch(containerStateToggle(payload));
  };

  return (
    <div className={classes.root}>
      <img
        ref={buttonMesures}
        src="images\Button\Menu_Trigger\Power_Button-Stoke.png"
        alt="content-asset"
        className={classes.powerButton}
        onClick={handlePowerClick}
      />
      {data.map(({ name, img, toolKit, width }, index) => {
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
