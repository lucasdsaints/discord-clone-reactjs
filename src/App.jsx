import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat';
import { selectUser, login, logout } from './store/userSlice';
import Login from './Login/Login';
import { auth } from './config/firebase';

function App() {
  const dispach = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispach(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }));
      } else {
        dispach(logout());
      }
    });
  }, [dispach]);

  return (
    <div className="app">
      {user
        ? (
          <>
            <Sidebar />
            <Chat />
          </>
        )
        : <Login />}
    </div>
  );
}

export default App;
