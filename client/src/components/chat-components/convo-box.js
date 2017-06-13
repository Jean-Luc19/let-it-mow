import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import '../../styles/chat-styles.css';


const ConvoBox = props => {
  const { listing, message, userId } = props;

  const lastMessage = message.body.slice(0,20).concat('...');
  const time = message.createdAt;
  const sent = moment(time).fromNow();
  const read = !message.read && message.author._id !== userId ? 'unread' : 'read';

  return (
    <div className={`col-8 convo-container`}>
    <Link to={`/chat/${message.conversationId}`}>
      <div className={`convo-box ${read}`} key={message.conversationId}>
          <div className="convo-details">
            <p>Listing: {listing.title}</p>
            <p>Last Message: {lastMessage}</p>
            <p>By {message.author.name}, {sent}</p>
          </div>
          <div className="user-photo">
            <img src={`http://res.cloudinary.com/letitmow/image/upload/w_80,h_80/${listing.images[0]}.jpg`} alt={listing.title}/>
          </div>
      </div>
    </Link>
  </div>
  );


};

export default ConvoBox;
