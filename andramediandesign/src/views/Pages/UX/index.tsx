import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
// const mytheme = {
//   radius: 82,
// };

const useStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexFlow: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'translateX(-100%)',
    transition: 'transform 1s ease-in',
    // padding: theme.spacing(0,20)
  },
  topic_grid:{
    position: 'relative',
    display: 'inline-grid',
    gridTemplateColumns: '35% 35%',
    gridTemplateRows: 'auto',
    gridColumnGap: '25px',
    margin: '55px',
  },
}));

interface Props {

}

function UX({ }: Props): React.ReactElement {
  console.clear();
  const classes = useStyle()
  return (
    <div
      className={classes.root}
    >
      <div className={classes.topic_grid}>
        {/* <div 
        // className={classes.topick_heading}
        >
          <h1>User Experience Case Studies. Environmental Conservation.</h1>
          <h3>
            Collaboration Team:
          </h3>
          <p style={{fontSize: '12px', color:'#426164'}}>User Journey Map & Documentation: Mohammad Amin Mohammadi
          </p>
          <p style={{fontSize: '12px', color:'#426164'}}>User Testings & Video: Brendan O'Reilly</p>
          <p style={{fontSize: '12px', color:'#426164'}}>Synthesizing Activity Design: Elliott Magrath</p>
          <a href="Assets/UX/Visual-Report.pdf" 
          className={classes.onlineLink} 
          style={{bottom: '0px'}}>
            <h3 className={classes.link_ToExternals}>Link to full report</h3>
          </a>
        </div > */}

      </div >
    </div >
  )
}

export default UX

