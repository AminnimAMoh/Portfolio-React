import React, {useState} from "react";
import data from "./data";
import useStyle from "./style";
import { Props } from "./types";
import useMeasure from 'react-use-measure'
import { useSelector } from "react-redux";

const calPos = (index: number, length: number, size: number, state: boolean) => {
  const inc=state ? 1.5 : 2.5;
  const rad = size/inc;
  var angle = ((2 * Math.PI) / length) * index;
  const x = rad * Math.cos(angle);
  const y = rad * Math.sin(angle);
  return { x, y };
};
function MenuButton({}: Props): React.ReactElement {
  const classes = useStyle();
  const buttonState=useSelector(state=>state)
  const [buttonMesures, {width}]= useMeasure();
  const [powerState, setPowerState]=useState<boolean>(true)
  const buttonSizing=width;

  const handlePowerClick=()=>{
    setPowerState(()=>!powerState)
  }

  const handleClick=()=>{
    console.log(buttonState);
    
  }
  
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
          style={{transform: `translate(${x}px, ${y}px)`,}}
          >
            <div
              className={classes.iconButtons}
              style={{
                backgroundImage: `url(${img})`,
              }}
              onClick={handleClick}
            ></div>
          </div>
        );
      })}
    </div>
  );
}

export default MenuButton;
