import React, { useState, useRef } from "react";
import styles from '../../themes/main.scss';
import {ChatContainer, MessageList, Message, MessageInput, MainContainer} from "@chatscope/chat-ui-kit-react"
import { Grid, Paper, IconButton, InputBase} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {Search} from '@material-ui/icons';
import BackgroundVideo from "./background/BackgroundVideo";

function Video(props) {
  const inputRef = useRef();
  const [linkID, setLinkID] = useState("xOQ2QaUuQ8U");
  const [inputMessage, setInputMessage]=useState("");
  const [messages, setMessages]=useState([]);

  const handleNewLink=()=>{
    let link = document.getElementById("query").value;
    alert(link);
    setLinkID(link);


  }

  const handleSend=(message)=>{
    setMessages([...messages, {
      message,
      direction:"outgoing",
      sender:"Me"
    }]);
    setInputMessage("");
    inputRef.current.focus();

  }
  const classes = useStyles();

  return (
      <div>
      <BackgroundVideo></BackgroundVideo>
    <Grid container direction="row" className={classes.mainBackground} >
    <Grid item>
      <Grid container direction="column">
        <Grid item className={classes.videoBox}>
          <iframe
          width="100%"
          height="100%"
          src={'https:www.youtube.com/embed/'+linkID}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypter-mdia; gyroscope; picture-in-pricture">
          </iframe>
        </Grid>
        <Grid item className={classes.searchBar}>
          <Paper component="form" className={classes.root}>
            <InputBase
                id="query"
                className={classes.input}
                placeholder="Youtube Link ..."
                inputProps={{ 'aria-label': 'Youtube Link ...' }}
            />
            <IconButton className={classes.iconButton} aria-label="search" onClick={handleNewLink}>
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
      backgroundColor:"rgba(0, 0, 0, 0.6)"
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
      </div>
  )
}


const useStyles = makeStyles({
  searchBar:{
    position:"absolute",
    bottom:0,
    left:0,
    backgroundColor:"rgba(0, 0, 0, 0.3)",

  },
  videoBox:{
    position:"absolute",
    display:"flex",
    top:0,
    left:0,
    width:"80%",
    height:"calc(100vh - 50px)",
    backgroundColor:"rgba(0, 0, 0, 0.6)",
  },
  mainBackground:{
    backgroundColor:"rgba(0, 0, 0, 0.6)",
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "79.5vw",
    backgroundColor:"rgba(0, 0, 0, 0.3)",
    border:"1px",
    borderColor:"white",
    borderStyle:"solid",
    borderRadius:"10px"
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
