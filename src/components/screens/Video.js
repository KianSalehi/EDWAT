import React, { useState, useRef } from "react";
import styles from '../../themes/main.scss';
import {ChatContainer, MessageList, Message, MessageInput, MainContainer} from "@chatscope/chat-ui-kit-react"
import { Grid, Paper, IconButton, InputBase} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {Search} from '@material-ui/icons';
import BackgroundVideo from "./background/BackgroundVideo";
import YouTube from 'react-youtube';
let io = require('socket.io-client');
const socketUrl = "/";
const { PLAY, PAUSE, SYNC_TIME, NEW_VIDEO, ASK_FOR_VIDEO_INFORMATION,
  SYNC_VIDEO_INFORMATION, JOIN_ROOM,SEND_MESSAGE, RECEIVED_MESSAGE,
  ASK_FOR_USERNAME, SEND_USERNAME }= require('../../constantVariables');

function Video(props) {
  // options for the youtube player
  const opts ={
    width:"100%",
    height:"100%",
    playerVars:{
      controls:1,
      rel:1,
      modestbranding:1,
      autoplay:0,
      enablejsapi:1
    }
  }

  //state variables
  const inputRef = useRef();
  const [linkID, setLinkID] = useState("");
  const [inputMessage, setInputMessage]=useState("");
  const [messages, setMessages]=useState([]);
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [player, setPlayer] = useState(null);


  // socket methods
  const onSocketMethods = (socket)=>{
    socket.on('connect', ()=>{
      socket.emit(JOIN_ROOM,{
        room: props.room,
        username: props.username
      });
      socket.emit(ASK_FOR_VIDEO_INFORMATION);
    });
    socket.on('disconnect', ()=>{
      console.log("Disconnected");
    });
    socket.on(PLAY, ()=>{
      player.playVideo();
    });
    socket.on(PAUSE,()=>{
      player.pauseVideo();
    });
    socket.on(SYNC_TIME, (currentTime)=>{
      syncTime(currentTime);
    });
    socket.on(NEW_VIDEO, (url)=>{
      player.loadVideoByUrl({
        mediaContentUrl:url,
        startSeconds:0});
      setLinkID('');
    });
    socket.on(ASK_FOR_VIDEO_INFORMATION, ()=>{
      const data = {
        mediaContentUrl: player.getVideoUrl(),
        currentTime: player.getCurrentTime()
      }
      socket.emit(SYNC_VIDEO_INFORMATION, data);
    });
    socket.on(SYNC_VIDEO_INFORMATION, (data)=>{
      player.loadVideoById({
        mediaContentUrl: data.mediaContentUrl,
        startSeconds: data.currentTime
      });
    });
    socket.on(RECEIVED_MESSAGE, (data)=>{
      setMessages([...messages, {
        message:data.message,
        direction:data.direction,
        sender:data.sender
      }]);
    });
    socket.on(ASK_FOR_USERNAME, ()=>{
      setUsers([]);
      socket.emit(SEND_USERNAME, props.username);
    });
    socket.on(SEND_USERNAME, (username)=>{
      setUsers([...users, username]);
    });

  }
  // helper functions

  const syncTime=(currentTime) =>{
    if (player.getCurrentTime() < currentTime - 0.5 || player.getCurrentTime() > currentTime + 0.5) {
      player.seekTo(currentTime);
      player.playVideo();
    }
  }


  // handler functions
  const handleNewLink=()=>{
    let link = document.getElementById("query").value;
    setLinkID(link);
    socket.emit(NEW_VIDEO, linkID);
  }

  const handleReady = (e)=>{
    setPlayer(e.target);
    const socket = io(socketUrl);
    setSocket(socket);
    onSocketMethods(socket);
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

  const handleStateChange = (e)=>{
    switch (player.getPlayerState()){
      case -1:
        socket.emit(PLAY);
        break;
      case 0:
        break;
      case 1:
        socket.emit(SYNC_TIME, player.getCurrentTime());
        socket.emit(PLAY);
        break;
      case 2:
        socket.emit(PAUSE);
        break;
      case 3:
        socket.emit(SYNC_TIME, player.getCurrentTime());
        break;
      case 5:
        break;
      default:
        break;
    }
  }
  const classes = useStyles();

  return (
      <div>
      <BackgroundVideo></BackgroundVideo>
    <Grid container direction="row" className={classes.mainBackground} >
    <Grid item>
      <Grid container direction="column">
        <Grid item className={classes.videoBox}>
          <YouTube
              className={classes.videoBox}
              opts={opts}
              videoId="xOQ2QaUuQ8U"
              onReady={handleReady}
              onStateChange={handleStateChange}
          >
          </YouTube>
        </Grid>
        <Grid item className={classes.searchBar}>
          <Paper component="form" className={classes.root} onSubmit={handleNewLink}>
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
    <div id="chatBox" style={{
      position:"fixed",
      right:"0",
      height:"100%",
      width:"20vw",
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
    width:"calc(100vw - 20vw)",
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
