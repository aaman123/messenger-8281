import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
    marginRight: 30
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: -17,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
    height: "50px",
    overflowY: 'auto'
  },
  messages: {
    marginRight: 5
  }
}));

const ActiveChat = (props) => {

  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages className={classes.messages} 
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
          </Box>
          <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
          />
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
