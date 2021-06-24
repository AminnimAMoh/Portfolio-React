import React from 'react'

interface Props {
    embedID: string
}

function YouTubeEmbed({embedID}: Props): React.ReactElement {
    return (
<div className="video-responsive">
    <iframe
      width="100%"
      height="480"
      src={`https://www.youtube.com/embed/${embedID}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
    )
}

export default YouTubeEmbed
