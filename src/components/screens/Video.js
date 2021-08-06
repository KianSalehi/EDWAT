import React, { useState, useRef } from "react";
import styles from '../../themes/main.scss';
import {ChatContainer, MessageList, Message, MessageInput, MainContainer} from "@chatscope/chat-ui-kit-react"
import { Grid, Paper, IconButton, InputBase} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {Search} from '@material-ui/icons';

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

    <Grid container direction="row" className={classes.mainBackground} >
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
          <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Search Youtube"
                inputProps={{ 'aria-label': 'search YouTube' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <Search color="action"/>
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
    <div style={{
      position:"fixed",
      right:"0",
      height:"100%",
      width:"20%",
      backgroundColor:"#3d3d3d"
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
          {messages.map((m,i)=> <Message key={i} model={m}><Message.Header sender="me" sentTime="now"/></Message>)}
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
    position:"absolute",
    bottom:0,
    left:0,
    backgroundColor:"#3d3d3d",

  },
  videoBox:{
    position:"absolute",
    top:0,
    left:0,
    width:"80%",
    height:"95%",
    backgroundColor:"#3d3d3d",
  },
  mainBackground:{
    backgroundColor:"#3d3d3d",
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "79.5vw",
    backgroundColor:"#3d3d3d",
    border:"1px",
    borderColor:"white",
    borderStyle:"solid"
  },
  input: {
    flex: 1,
    color:"white",

  },
  iconButton: {
    padding: 10,
    backgroundColor:"#6FA9FF"
  },

});



export default Video;
