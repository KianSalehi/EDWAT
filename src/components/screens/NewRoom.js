import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import BackgroundVideo from "./background/BackgroundVideo";

function NewRoom(props) {
  const [roomInfo, setRoomInfo] = useState({
    room: "",
    user: "",
  });
  let handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(roomInfo.user, roomInfo.room);
  };
  const handleRoomChange = () => {
    setRoomInfo({
      room: document.getElementById("room").value,
      user: document.getElementById("user").value,
    });
  };

  return (
    <div>
      <BackgroundVideo></BackgroundVideo>
      <div
        style={{
          position: "absolute",
          backgroundColor: "white",
          borderRadius: "25px",
          top: "50%",
          left: "50%",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "5%",
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
            <h2 style={{ color: "primary" }}>Create or join a room</h2>
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
                  ></TextField>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Submit
                  </Button>
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
