import React, { useEffect, useState } from 'react';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GifIcon from '@material-ui/icons/Gif';
import { useSelector } from 'react-redux';
import './Chat.css';

import ChatHeader from './ChatHeader';
import Message from './Message';
import { selectUser } from '../store/userSlice';
import { selectChannelId, selectChannelName } from '../store/appSlice';
import db, { firebase } from '../firebase';

function Chat() {
  const loggedInUser = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!channelId) {
      return;
    }

    db.collection('channels')
      .doc(channelId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, [channelId]);

  const sendMessage = (event) => {
    event.preventDefault();

    const newMessage = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: loggedInUser,
    };

    db.collection('channels')
      .doc(channelId)
      .collection('messages')
      .add(newMessage);

    setInput('');
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map(({ message, timestamp, user }) => (
          <Message
            key={timestamp}
            message={message}
            timestamp={timestamp}
            user={user}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />

        <form onSubmit={sendMessage}>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={channelId ? `Message #${channelName}` : 'Select a channel first'}
          />
          <button className="chat__inputButton" type="submit">Send Message</button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>

      </div>

    </div>
  );
}

export default Chat;
