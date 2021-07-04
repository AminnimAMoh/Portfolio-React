import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import { RootState } from "../../store";

interface Props {}

const randomPos = (index: number) => {
  const x = Math.random() * 30 * index;
  const y = Math.random() * 30 * index;
  return { x: x, y: y };
};

function mapMyValues(
  preMin: number,
  preMax: number,
  newMin: number,
  newMax: number,
  x: number
) {
  const offset = newMin - preMin,
    scale = (newMax - newMin) / (preMax - preMin);
  return offset + scale * x;
}
function Info({}: Props): React.ReactElement {
  const [mouseAngle, setMouseAngle]=useState(0)
  const [dataStaticPos, setDataStaticPos]=useState([{x: 0, y: 0, info:''}])
  const {
    buttonAction: { data },
  } = useSelector((state: RootState) => state);

  const handleMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
    const newMousePos = mapMyValues(0, window.innerWidth, -20, 20, e.screenX);
    setMouseAngle(newMousePos)
  };
  const classes = useStyles({myAngle: mouseAngle});

  useEffect(() => {
        [...data, ...data, ...data, ...data].map(({ info }: { info: string }, index: number) => {
            const { x, y }: { x: number; y: number } = randomPos(index);
            setDataStaticPos(presVal=>{
                return [...presVal,{x: x, y: y,info}]
            })
    })
  }, [])
  console.log(dataStaticPos);
  
  return (
    <div
      className={classes.root}
      onMouseMove={(element) => handleMove(element)}
    >
      {dataStaticPos.map(
        ({ x,y,info }: { info: string, x: number, y: number }, index: number) => {
          return (
            <div key={index} className={classes.landinginfo}>
              <Typography
                variant="h5"
                className={classes.moverText}
                style={{
                  transform: `translate(${x}%,${y}%) rotateY(${mouseAngle}deg) rotateX(${mouseAngle/2}deg)`,
                  color: "#12393D",
                  textShadow: `${mouseAngle}px 11px 7px rgba(0,0,0,0.28)`
                }}
              >
                {info}
              </Typography>
            </div>
          );
        }
      )}
    </div>
  );
}

export default Info;
