import React from "react";
import useStyle from "../styles";
import { Grid, Typography, Link } from "@material-ui/core";
import YouTubeEmbed from "../YouTubeEmbed";

interface Props { }

function UI({ }: Props): React.ReactElement {
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
                alignContent="flex-start"
                className={classes.topic_grid}
            >
                <Grid item lg={6} md={12} className={classes.topick_heading}>
                    <Typography variant="h3">
                    Figting misinformation through social media
                    </Typography>
                    <Typography variant="h4">Collaboration Team:</Typography>
                    <Typography
                        variant="body2"
                        style={{ fontSize: "12px", color: "#426164" }}
                    >
                        Developer and Video: Mohammad Amin Mohammadi
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ fontSize: "12px", color: "#426164" }}
                    >
                        UX/UI Designer and documentation: Jessica Owens
                    </Typography>
                    <Link
                        href="https://covid-19-measures-assessment.web.app/"
                        className={classes.onlineLink}
                        style={{ bottom: "0px" }}
                        onClick={(e) => preventDefault}
                    >
                        <Typography variant="body2" className={classes.link_ToExternals}>
                        Link to our high-fidelity prototype
                        </Typography>
                    </Link>
                    <Link
                        href="Assets/UI/A3 Final Report.pdf"
                        className={classes.onlineLink}
                        style={{ bottom: "0px" }}
                        onClick={(e) => preventDefault}
                    >
                        <Typography variant="body2" className={classes.link_ToExternals}>
                        Link to full report
                        </Typography>
                    </Link>
                </Grid>
                <Grid item lg={6} md={12} className={classes.topic_pragraph}>
                    <Typography variant="body1">
                        In our current state misinformation is frequently shared and 
                        whether this is intentional or inadvertent it can have catastrophic 
                        results on the spread of COVID-19. Maximising public access to 
                        balanced, reliable, and up to date information is a critical 
                        success factor for authorities worldwide. Management of highly
                         trusted information will have a vital role to play in the control 
                         of COVID-19. The COVID-19 Fact Check app has been built to 
                         facilitate an effective means of sharing information going forward.
                          The application is an informal educational tool, which encourages 
                          users to become aware of the false or misleading information that 
                          they may find themselves coming across when partaking in online
                           activity. It’s a gamified fun fact-based tool which will help the 
                           world #StopTheSpread.


                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <YouTubeEmbed embedID="aQ017METpTU" />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h5'>
                        React.js
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">
                        Currently our planet is at a critical point of animal extinction and
                        bidovirsty loss. To aid in combatting this loss we have designed the
                        Atmoscube. Through research conducted at the beginning of the design
                        process we’ve identified that people often feel unempowered in their
                        ability to help the environment. To solve this problem, we have
                        aimed to create an experience that informs and engages the user in
                        an effort to educate and empower. Empowerment provided by
                        interacting with the atomscube is designed to permeate throughout
                        the users daily life, providing them with a platform to continue
                        with environmentally positive life choices.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h5'>What is the strategy?</Typography>
                    <Typography variant='h3'>Design Solution</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='body1'>
                        Our design Solution is the Atmoscube, a cube roughly 450mm in width, height and depth.
                        Within this hologram cube we are propose a city build game. The top of the product houses a
                        touch and distance sensitive interface that along with AI voice operated system will be the way
                        in which the user engages with the product. Within the product will be a small AR city projected
                        from the base, this AR city will be built and managed by the user.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <img src='images/Pages/UX/Render.png' alt="content" />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='body1'>
                        The design process was guided by the aim of empowering people through education
                        in an effort to aid against biodiversity loss and animal extinction.
                    </Typography>
                    <br />
                    <Typography variant='body1'>
                        Stage one of the design process involved conducting research with finding key
                        insights regarding the problem space in mind.
                    </Typography>
                    <br />
                    <Typography variant='body1'>
                        Stage two of the process involved studying the research gathered, finding explicit
                        and intrinsic insights into solutions for the problem space.
                    </Typography>
                    <br />
                    <Typography variant='body1'>
                        Stage Three involved each design member submitting two idea and subsequent storyboards
                        that aided the problem space and successfully met design criteria.
                    </Typography>
                    <br />
                    <Typography variant='body1'>
                        Stage Four involved each design team members idea being inputted into a design matrix
                        created to highlight the best design and what was most suited to the tasks needs.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h5'>
                        Trial and Error
                    </Typography>
                    <Typography variant='h3'>
                        Design Process
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <img src='images/Pages/UX/Render-2.png' alt="content" />
                </Grid>
                <Grid item container
                    spacing={4}
                    justify='center'
                    alignItems="center"
                    className={classes.inner_GridContainer}
                >
                    <Grid item xs={6}>
                        To use the Atmoscube the user must connect it to its home and vehicles IoT (Internet of things),
                        the data received from the users amenities will be the core of the users experience within
                        atmoscube, the electricity, water and Co2 used by the user within their real daily lives will
                        have a direct effect to their experience within the product. An example of this is smog within
                        the user’s city from high Co2 emissions or Electricity use in real life.
                    </Grid>
                    <Grid item xs={6}>
                        <img src='images/Pages/UX/Render-3.png' alt="content" />
                    </Grid>
                    <Grid item xs={6}>
                        <img src='images/Pages/UX/Render-4.png' alt="content" />
                    </Grid>
                    <Grid item xs={6}>
                        To accompany these mechanics is the systems AI, with the gathered data from the users IoT the AI
                        will learn the user’s habits, lifestyle and how they could lower their impact on the environment.
                        These improvements will be set to the user as challenges, these challenges were designed with gamification
                        in mind, engaging the user and investing them in the experience as a whole.
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default UI;
