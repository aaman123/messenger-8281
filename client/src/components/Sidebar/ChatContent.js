import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  boldPreviewText: {
    fontSize: 15,
    color: "black",
    letterSpacing: -0.17,
    fontWeight: "bold",
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  notificationCount: {
		backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
		color: "white",
		borderRadius: '50%',
		justifyContent: 'center',
		height: 20,
		fontSize: 10,
		fontWeight: 700,
		display: 'flex',
		alignItems: 'center',
		width: 20,
    marginLeft: 40,
	}
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { activeConversation,conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  const getUnreadMessageCount = (conversation) => {
    let unreadCount = 0;
    conversation.messages.forEach((message) => {
      if (!message.messageRead && message.senderId === conversation.otherUser.id) {
        unreadCount += 1;
      }
    })
    return unreadCount;
  }
 
  return (
    <>
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        { getUnreadMessageCount(conversation) !== 0 ?
          <Typography className={classes.boldPreviewText}>
            {latestMessageText}
          </Typography> : 
          <Typography className={classes.previewText}>
            {latestMessageText}
          </Typography>
        }
      </Box>
    </Box>
    {
      getUnreadMessageCount(conversation) !== 0 && conversation.otherUser.username != activeConversation ? 
        <div className={classes.notificationCount}>{getUnreadMessageCount(conversation)}</div> : null
    }
    </>
  );
};

const mapStateToProps = state => ({
  activeConversation: state.activeConversation
})

export default connect(mapStateToProps)(ChatContent);
