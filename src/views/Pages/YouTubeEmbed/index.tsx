import React from 'react'
import useStyle from '../styles'
import useMeasure from "react-use-measure";

interface Props {
  embedID: string
}

function YouTubeEmbed({ embedID }: Props): React.ReactElement {
  const classes = useStyle();
  const [videoContainer, {width}]=useMeasure();
  return (
    <div className={classes.video_container} ref={videoContainer}>
      <div className={classes.video_root}>
        <div className={classes.video_responsive}>
          <iframe
            width="100%"
            height= {width/2}
            src={`https://www.youtube.com/embed/${embedID}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </div>
    </div>
  )
}

export default YouTubeEmbed
