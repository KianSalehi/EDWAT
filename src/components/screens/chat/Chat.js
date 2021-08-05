import React from "react";
import { Grid, IconButton, TextField, Paper } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send'
function Chat() {
  return (
      <Grid container spacing={5} direction="column">
        <div style={{width:"18%",height:"90%", right:0, top:0, position:"absolute", backgroundColor:"black"}}>
        <Grid item>
          <Paper></Paper>
        </Grid>
        </div>
        <Grid item>
          <div style={{width:"18%", position:"absolute", right:0, bottom:0}}>
            {/* To hold the text field and send button*/}
            <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center">
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
  );
}

export default Chat;
