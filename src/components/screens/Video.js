import React, { useState } from "react";
import { Container } from "@material-ui/core";
import Chat from './chat/Chat'
function Video() {
  return (
    <div style={{position: "absolute", right:"0", height: "100%"}}>
      <Chat></Chat>
    </div>
  )
}

export default Video;
