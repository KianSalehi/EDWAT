import React, { useState, useRef } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {ChatContainer, MessageList, Message, MessageInput, MainContainer} from "@chatscope/chat-ui-kit-react"
import chatBackgroundVideo from './background/chatBackground.mp4';
import { Grid, TextField, Button} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

function Video(props) {
  const inputRef = useRef();
  const [inputMessage, setInputMessage]=useState("");
  const [messages, setMessages]=useState([]);
  const handleSend=(message)=>{
    setMessages([...messages, {
      message,
      direction:"outgoing",
      sender:"Me"
    }]);
    setInputMessage("");
    inputRef.current.focus();

  }
  const embedID="xOQ2QaUuQ8U"
  const classes = useStyles();

  return (
    <Grid container direction="row">
    <Grid item>
      <Grid container direction="column">
        <Grid item className={classes.videoBox}>
          <iframe
          width="100%"
          height="100%"
          src={'https:www.youtube.com/embed/'+embedID}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypter-mdia; gyroscope; picture-in-pricture">
          </iframe>
        </Grid>
        <Grid item className={classes.searchBar}>
          <Grid container direction="row" >
            <Grid item>
              <TextField variant="filled" className={classes.queryBox}></TextField>
            </Grid>
            <Grid item>
              <Button variant="contained" label="please put the link here" placeholder="Please put the link here" color="primary" className={classes.queryButton}>Search</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
    <div style={{
      position:"fixed",
      right:"0",
      height:"100%",
      width:"20%",
    }}>
      <MainContainer>
      <ChatContainer>
        <MessageList>
          <Message
          model={{
            message: "Your room ID is: "+props.room,
            sentTime: "just now",
            direction:"incoming",
            sender: "Kian",
          }}
          />
          {messages.map((m,i)=> <Message key={i} model={m}/>)}
        </MessageList>
        <MessageInput placeholder="Type message here" onSend={handleSend} onChange={setInputMessage} value={inputMessage} ref={inputRef}/>
      </ChatContainer>
      </MainContainer>
    </div>
    </Grid>
    </Grid>
  )
}


const useStyles = makeStyles({
  searchBar:{
    position:"fixed",
    bottom:0,
    left:0,
  },
  queryBox:{
    width:"75vw",
    height:"3vw"
  },
  queryButton:{
    height:"3vw",
    width:"5vw"
  },
  videoBox:{
    position:"fixed",
    top:0,
    left:0,
    width:"80%",
    height:"94%"
  }
});



export default Video;
