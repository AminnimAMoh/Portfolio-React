import React from "react";
import data from "./data";
import useStyle from "./style";
import { Props } from "./types";

const calPos=(index: number, length: number)=>{
    const rad = 200;
    var angle =((2 * Math.PI)/length) * index;
    const x = (rad*Math.cos(angle)*2);
    const y = (rad*Math.sin(angle)*2);
    
    return {x,y}
}
function MenuButton({}: Props): React.ReactElement {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <img
        src="images\Button\Menu_Trigger\Power_Button-Stoke.png"
        alt="content-asset"
      />
      <div className={classes.menuButtons}>
        {data.map(({ name, img, toolKit, width }, index) => {
          const {x,y}=calPos(index,data.length)
          return (
            <div
              key={name}
              className={classes.iconButtons}
              style={{
                backgroundImage: `url(${img})`,
                transform: `translate(${x}%, ${y}%)`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default MenuButton;
