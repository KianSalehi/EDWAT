import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import BackgroundVideo from "./background/BackgroundVideo";

function NewRoom(props) {
  // state to hold the information needed for the room creation
  const [roomInfo, setRoomInfo] = useState({
    room: "",
    user: "",
  });

  //Function to handle submit of the NewRoom form
  let handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(roomInfo.user, roomInfo.room);
  };

  // Function to apply changes of the text fields to the states in the parent function
  const handleRoomChange = () => {
    setRoomInfo({
      room: document.getElementById("room").value,
      user: document.getElementById("user").value,
    });
  };

  const handleRandomID = () => {
    let id = "";
    let random = "abcdefghijklmnopqrstuv123456789";
    for (let i = 0; i < 20; i++) {
      id= id + random.charAt(Math.floor(Math.random() * 30));
    }
    setRoomInfo({
      room: id,
      user: document.getElementById("user").value
    })
  }

  return (
    <div>
      <BackgroundVideo></BackgroundVideo>
      <div
        style={{
          position: "absolute",
          backgroundColor:"rgba(0, 0, 0, 0.6)",
          boxShadow:"0 5px 15px rgba(0,0,0,0.9)",
          borderRadius: "25px",
          top: "50%",
          left: "50%",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "4%",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <h2 style={{ color: "white" }}>Create or join a room</h2>
          </Grid>
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                direction="column"
                spacing={4}
                alignItems="center"
              >
                <Grid item>
                  <TextField
                    label="Room ID"
                    placeholder=""
                    required
                    value={roomInfo.room}
                    onChange={handleRoomChange}
                    id="room"
                    variant="outlined"
                    style={{backgroundColor: '#FFFFFF',
                    borderRadius:"10px"}}
                  ></TextField>
                </Grid>
                <Grid item>
                  <TextField
                    label="Username"
                    placeholder=""
                    required
                    value={roomInfo.user}
                    onChange={handleRoomChange}
                    id="user"
                    variant="outlined"
                    style={{backgroundColor: '#FFFFFF',
                    borderRadius:"10px"}}
                  ></TextField>
                </Grid>
                <Grid item>
                <Grid container direction="row" justifyContent="center" spacing={2}>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={handleRandomID}>
                    Generate ID
                  </Button>
                </Grid>
                </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default NewRoom;
