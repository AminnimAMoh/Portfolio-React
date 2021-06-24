import { makeStyles } from "@material-ui/styles";


const rootStyle = makeStyles((theme) => ({
    topic_grid: {
        transform: 'translateX(-100%)',
        transition: 'transform 1s ease-in-out',
        // maxWidth:'50%',
        color: 'white'
    },
    topick_heading: {
        color: 'white',
        '& >*:not(:first-child)':{
            paddingTop: '8px'
        }
    },
    onlineLink: {

    },
    link_ToExternals: {
        color: '#5C3B42'
    },
    topic_pragraph:{

    },
}))

export default rootStyle