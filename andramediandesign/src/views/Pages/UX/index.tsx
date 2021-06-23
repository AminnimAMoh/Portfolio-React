import React from 'react'
import rootStyle from '../styles';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
// const mytheme = {
//   radius: 82,
// };

const useStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '70%',
    display: 'flex',
    flexFlow: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    // transform: 'translateX(-100%)',
    transition: 'transform 1s ease-in',
    // padding: theme.spacing(0,20)
  },
  topic_grid: {

  },
}));

interface Props {

}

function UX({}: Props): React.ReactElement {
  console.clear();
  const classes = useStyle()
  const rootClasses=rootStyle();
  return (
    <div
      className={classes.root}
    >
      <Grid 
      container
      spacing={4}
      justify='space-between'
      alignItems='center'
      // alignContent='flex-start'
      className={rootClasses.topic_grid}
      style={{transform: 'translateX(0)'}}
      >
        <Grid item xs={6} className={rootClasses.topick_heading}>
          <Typography variant='h3'>User Experience Case Studies. Environmental Conservation.</Typography>
          <h3>
            Collaboration Team:
          </h3>
          <p style={{fontSize: '12px', color:'#426164'}}>User Journey Map & Documentation: Mohammad Amin Mohammadi
          </p>
          <p style={{fontSize: '12px', color:'#426164'}}>User Testings & Video: Brendan O'Reilly</p>
          <p style={{fontSize: '12px', color:'#426164'}}>Synthesizing Activity Design: Elliott Magrath</p>
          <a href="Assets/UX/Visual-Report.pdf" 
          className={rootClasses.onlineLink} 
          style={{bottom: '0px'}}>
            <h3 className={rootClasses.link_ToExternals}>Link to full report</h3>
          </a>
        </Grid >
        <Grid item xs={6} className={rootClasses.topic_pragraph}>
                <Typography variant='body1'>
                    Technology has played a significant role in increasing the world population dramatically.
                    Consequently it has increased the level of the complexity of problems. However, user research
                    methods developed around design frameworks can be a powerful tool to
                    face these complex wicked problems. since the day I was introduced to the digital world, I have
                    always been looking and thinking beyond the applications and platforms I have used. The
                    temptation to find reliable solutions to build
                    a better future for both humanity and the environment we live at.
                </Typography>
            </Grid>

      </Grid >
    </div >
  )
}

export default UX

