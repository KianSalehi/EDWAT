import React from "react";
import { Grid, IconButton, TextField } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send'
function Chat() {
  return (
    <div>
    <Grid container spacing={1} direction="column" alignItems="center">
    <Grid item>
      <div style={{height: '90%'}}>{/* To hold the chat messages */}</div>
    </Grid>
    <Grid item>
      <div style={{height:'10%'}}>
        {/* To hold the text field and send button*/}
        <Grid container spacing={1} direction = "row" alignItems="center" justifyContent="center">
          <Grid item>
              <TextField placeholder='message...'></TextField>
          </Grid>
          <Grid item>
            <IconButton color="primary" aria-label="send button" size="medium">
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </Grid>
    </Grid>
    </div>
  );
}

export default Chat;
