import React from 'react';
import backgroundVideo from './background.mp4'

function BackgroundVideo() {
    return (
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          right: "0",
          top: "0",
          objectFit: "cover",
          zIndex: "-1",
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    );
  }
export default BackgroundVideo;