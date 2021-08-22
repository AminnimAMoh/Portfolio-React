import React from "react";
import useStyle from "../styles";
import { Grid, Link, Typography, Divider } from "@material-ui/core";
import { containerStateToggle } from "../../../redux/slices/buttonActionSlice";
import { useDispatch } from "react-redux";

const reesbyResponsibilities = [
  "Leading the Front-End team.",
  "Developed Axios Interceptor and API calls.",
  "Developed Redux state management.",
  "Developed main project login and register page.",
  "Developed main project landing page (React Web Application) individually. ",
  "UX/UI Design for the new platform. ",
];
const freeLanceResponsibilities = [
  "Communicating with clients.",
  "Iterative progress.",
  "Data visualization.",
  "Web format Portfolio development HTML/CSS/JS.",
  "User Interaction Design.",
  "React.js development.",
];
const mentoringResponsibilities = [
  "Organizing teaching material.",
  "Explaining material in simple and small projects.",
  "Designing small projects for homework practices. ",
];
function CV(): React.ReactElement {
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    linkName: string
  ) => {
    e.preventDefault();
    dispatch(containerStateToggle(linkName));
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        alignContent="flex-start"
        className={classes.topic_grid}
      >
        <Grid item lg={6} md={12} className={classes.topick_heading}>
          <Typography variant="h3">Mohammad Amin Mohammadi</Typography>
          <Typography variant="h4">React.js Developer</Typography>
          <Typography variant="h4">Front-End Developer</Typography>
          <Typography
            variant="body2"
            style={{ fontSize: "12px", color: "#426164" }}
          >
            Top Skills:
          </Typography>
          <Typography
            variant="body2"
            style={{ fontSize: "12px", color: "#426164" }}
          >
            React.js, React-Redux, Redux ToolKit, React Hooks, React
            Functions,TypeScript, Axios, D3.js, JavaScript Vanilla, JSX, HTML,
            CSS, Material-UI.
          </Typography>
        </Grid>
        <Grid item lg={6} md={12} className={classes.topic_pragraph}>
          <Typography variant="body1">
            I am graduated from the University of Sydney Bachelor of Design
            Computing that empowers me with knowledge and experience in User
            Experience Design and User Interaction Design alongside my
            speciality in React.js Front-End Development. After mastering skills
            in CSS, HTML, JavaScript, D3.js, P5.js, P3 Processing Java I fell in
            love with React.js and have developed several projects in React.js
            and TypeScripts. After puting my skills in to a real-world test I
            have mastered React Hooks, React-Redux, Redux ToolKir, TypeScript,
            Axios Interceptors, Restful API, and Authentication.
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          spacing={4}
          justify="space-between"
          alignContent="flex-start"
        >
          <Grid item xs={12}>
            <Typography variant="h3">Education</Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            spacing={4}
            justify="space-between"
            alignContent="flex-start"
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="h4">Bachelor of Design Computing</Typography>
              <Typography variant="body1">University of Sydney</Typography>
              <Typography variant="body1">Jul 2017 — Dec 2020</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                Certified skills in User Experience Design, User Interaction
                Design, and Front-End Development. Mastering programming skills
                in React.js, React-Redux, Redux ToolKit, Axios, Material-UI,
                D3.js, JavaScript Vanilla, JSX, HTML & CSS.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">Achivements</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                University of Sydney hackathon Coding Fest 2020 Disaster
                Prevention Project Award.
              </Typography>
              <Link href="" onClick={(e) => handleLinkClick(e, "D3")}>
                Bangladesh Rainfall Visualization.
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                Fighting misinformation through social media around the Covid-19
                news.
              </Typography>
              <Link href="" onClick={(e) => handleLinkClick(e, "UI")}>
                Covid Fact Check App-Developed in React.js.
              </Link>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={12}
          spacing={4}
          justify="space-between"
          alignContent="flex-start"
        >
          <Grid item xs={12}>
            <Typography variant="h3">Experience</Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            spacing={4}
            justify="space-between"
            alignContent="flex-start"
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" style={{ color: "#9C3C41" }}>
                React Developer
              </Typography>
              <Typography variant="body1">Reesby</Typography>
              <Typography variant="body1">Mar 2021 — Present</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                React Front-End Developer in Reesby. Leader of Front-End
                development team. Developed Reesby main project landing page
                using React, React-Redux, React-Spring and Material-UI.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">Responsibilities</Typography>
            </Grid>
            {reesbyResponsibilities.map((data) => {
              return (
                <Grid item xs={12} sm={4} key={data}>
                  <Typography variant="body1">{data}</Typography>
                </Grid>
              );
            })}

            <Grid item xs={12}>
              <Typography variant="h4">Achivements</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                Three times nominated as the team member of the CRM team for
                dedication and hard work resulted in great outcomes.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid
            item
            container
            xs={12}
            spacing={4}
            justify="space-between"
            alignContent="flex-start"
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" style={{ color: "#9C3C41" }}>
                Freelance Front End Development
              </Typography>
              <Typography variant="body1">Freelance</Typography>
              <Typography variant="body1">2019 — Present</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                Working from home on projects involve JavaScript programming and
                UI design.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">Responsibilities</Typography>
            </Grid>
            {freeLanceResponsibilities.map((data) => {
              return (
                <Grid item xs={12} sm={4} key={data}>
                  <Typography variant="body1">{data}</Typography>
                </Grid>
              );
            })}
          </Grid>
          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>
          <Grid
            item
            container
            xs={12}
            spacing={4}
            justify="space-between"
            alignContent="flex-start"
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" style={{ color: "#9C3C41" }}>
                Mentoring Class Mates
              </Typography>
              <Typography variant="body1">University of Sydney</Typography>
              <Typography variant="body1">Feb 2019 — Dec 2019</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                Mentoring classmates to learn HTML/CSS/JavaScripts and P5.js.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">Responsibilities</Typography>
            </Grid>
            {mentoringResponsibilities.map((data) => {
              return (
                <Grid item xs={12} sm={4} key={data}>
                  <Typography variant="body1">{data}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CV;
