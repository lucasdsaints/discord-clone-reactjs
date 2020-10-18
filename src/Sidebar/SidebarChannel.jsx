import React from 'react';
import { useDispatch } from 'react-redux';
import { setChannelInfo } from '../store/appSlice';
import './SidebarChannel.css';

export default function SidebarChannel({ id, channelName }) {
  const dispatch = useDispatch();

  const handleSelectChannel = () => {
    const payload = {
      channelId: id,
      channelName,
    };
    dispatch(setChannelInfo(payload));
  };

  return (
    <div
      className="sidebarChannel"
      onClick={handleSelectChannel}
    >
      <h4>
        <span className="sidebarChannel__hash">#</span>
        { channelName }
      </h4>
    </div>
  );
}
