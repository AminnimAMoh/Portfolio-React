import React from "react";
import useStyle from "../styles";
import { Grid, Typography, Link } from "@material-ui/core";
import YouTubeEmbed from '../YouTubeEmbed'

interface Props {}

function UX({}: Props): React.ReactElement {
  const classes = useStyle();
  const preventDefault = (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => event.preventDefault();
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
        justify="space-between"
        alignContent='flex-start'
        className={classes.topic_grid}
      >
        <Grid item lg={6} md={12} className={classes.topick_heading}>
          <Typography variant="h3">
            User Experience Case Studies. Environmental Conservation.
          </Typography>
          <Typography variant="h4">Collaboration Team:</Typography>
          <Typography
            variant="body2"
            style={{ fontSize: "12px", color: "#426164" }}
          >
            User Journey Map & Documentation: Mohammad Amin Mohammadi
          </Typography>
          <Typography
            variant="body2"
            style={{ fontSize: "12px", color: "#426164" }}
          >
            User Testings & Video: Brendan O'Reilly
          </Typography>
          <Typography
            variant="body2"
            style={{ fontSize: "12px", color: "#426164" }}
          >
            Synthesizing Activity Design: Elliott Magrath
          </Typography>
          <Link
            href="Assets/UX/Visual-Report.pdf"
            className={classes.onlineLink}
            style={{ bottom: "0px" }}
            onClick={(e) => preventDefault}
          >
            <Typography
              variant="body2"
              className={classes.link_ToExternals}
            >
              Link to full report
            </Typography>
          </Link>
        </Grid>
        <Grid item lg={6} md={12} className={classes.topic_pragraph}>
          <Typography variant="body1">
            Technology has played a significant role in increasing the world
            population dramatically. Consequently it has increased the level of
            the complexity of problems. However, user research methods developed
            around design frameworks can be a powerful tool to face these
            complex wicked problems. since the day I was introduced to the
            digital world, I have always been looking and thinking beyond the
            applications and platforms I have used. The temptation to find
            reliable solutions to build a better future for both humanity and
            the environment we live at.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <YouTubeEmbed embedID='AikAa-n8vq8'/>
        </Grid>
      </Grid>
    </div>
  );
}

export default UX;
