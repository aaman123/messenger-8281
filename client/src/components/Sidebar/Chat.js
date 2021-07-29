import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { setMessageStatus } from '../../store/utils/thunkCreators';
import { connect } from "react-redux";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  unread: {
    background: "#3A8DFF",
    color: "#FFF",
    borderRadius: 10,
    height: 20,
    padding: "0 6px",
    fontWeight: "bold",
    textAlign:"center",
  }
};

class Chat extends Component {

  handleClick = async (conversation) => {
    await this.props.setActiveChat(conversation.otherUser.username);

    if (conversation.id) {
      const filterUnreadMessages = conversation.messages.filter(message => !message.messageRead);
      if (filterUnreadMessages.length > 0) {
        this.props.setMessageStatus(conversation.id, filterUnreadMessages.map(message => message.id));
      }
    }
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;

    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation}/>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    updatedMessages: state.conversations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    setMessageStatus: (convoId, messageIds) => {
      dispatch(setMessageStatus({convoId, messageIds}))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));
