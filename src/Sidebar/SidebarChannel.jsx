import React from 'react'
import './SidebarChannel.css';

export default function SidebarChannel({ id, channel }) {
  return (
    <div className="sidebarChannel">
      <h4>
        <span className="sidebarChannel__hash">#</span>
        YouTube
      </h4>
    </div>
  )
}
