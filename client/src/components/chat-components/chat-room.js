import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchConversation, sendReply, fetchUser, markRead, fetchConversations } from '../../actions';
import io from 'socket.io-client';
import '../../styles/chat-styles.css';


class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };


    this.onSubmit = this.onSubmit.bind(this);
    this.handleUserPhoto = this.handleUserPhoto.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentWillMount() {
      this.socket = io();
  }

  componentDidMount() {
    this.scrollToBottom();
    const id = this.props.match.params.conversationId;
    this.props.fetchConversation(id);
    this.socket.emit('enter conversation', id);
    this.props.fetchUser();
    this.scrollToBottom();
  }

  onSubmit(e) {
    e.preventDefault();

    this.socket.emit('new message', this.props.match.params.conversationId);
    const replyData = {
      body: this.state.text,
      conversationId: this.props.match.params.conversationId
    };
    this.props.sendReply(replyData);
    this.setState({text: ''});
    this.scrollToBottom();
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleUserPhoto(name, pic) {
    return pic ? <img src={pic} alt={name}/> : <p>{name.slice(0,1)}</p>;
  }


  scrollToBottom() {
    this.logEnd.scrollIntoView();
  }

  render() {

    const fetchConvoDebounced = _.debounce(() => {this.props.fetchConversations() ;}, 2000);

    const { message, name, readerId } = this.props;


    this.socket.on('refresh messages', () => {
    this.props.fetchConversation(this.props.match.params.conversationId);
    });
    const chatMessages = this.props.messages.map(message => {
      const who = name == message.author.name ? 'self' : 'friend';
      if (who === 'friend') {
        this.props.markRead(message._id);
      }
      return (
        <div className={`chat ${who}`} key={message._id}>
          <div className="user-photo">
            {this.handleUserPhoto(message.author.name, message.author.profilePic)}
          </div>
          <p className="chat-message">{message.body}</p>
        </div>
      );
    });

    return (
      <div onMouseMove={fetchConvoDebounced} className="chat-room">
        <div className="chatbox" >
          <div className="chatlogs">
            {chatMessages}
            <div style={ {float:"left", clear: "both"} } ref={(el) => {this.logEnd = el;}}></div>
          </div>

        <form className="chat-form" onSubmit={this.onSubmit}>
          <input type="text" value={this.state.text} onChange={this.handleChange} />
          <input type="submit" value="Send"/>

        </form>

        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this.socket.emit('leave conversation', this.props.match.params.conversationId);

  }
}

const mapStateToProps = state => ({
  messages: state.chat.messages,
  name: state.listings.name,
  readerId: state.listings._id
});

export default connect(mapStateToProps, { fetchConversation, sendReply, fetchUser, markRead, fetchConversations })(ChatRoom);
