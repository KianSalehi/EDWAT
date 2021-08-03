import React, { useState } from 'react';
import {Container} from '@material-ui/core';
import NewRoom from './components/screens/NewRoom';
import Video from './components/screens/Video';

function App() {

  //Screen state definition
  let [view, setView] = useState({
    user: '',
    room:'',
    currentScreen: 'default',
  });

  let handleSubmit = (user, room) => {
    setView({
      user,
      room,
      currentScreen:'Video'
    });    
  }

  let screen;
  if (view.currentScreen === 'default') {
    screen = <NewRoom onSubmit={handleSubmit}></NewRoom>; //screen to see when first time opening the website
  }
  if (view.currentScreen === 'Video'){
    screen = <Video room={view.room} username={view.user}></Video>; //screen to see if there is an invitation
  }

  return (
    <Container>
      {screen}
    </Container>
  );
}

export default App;
