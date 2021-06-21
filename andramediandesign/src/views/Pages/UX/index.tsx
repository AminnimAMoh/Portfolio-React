import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Container from '../../ContentContainer'
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
    // padding: theme.spacing(0,20)
  }
}));

interface Props {

}

function UX({ }: Props): React.ReactElement {
  console.clear();
  const classes = useStyle()
  return (
    <Container>
        <h1 className={classes.root}>Hello</h1>
    </Container>
  )
}

export default UX

