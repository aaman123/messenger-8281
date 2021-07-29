import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import DoneAllIcon from '@material-ui/icons/DoneAll';

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  },
  tickerBlue: {
    color:'blue',
    fontSize: 15
  },
  tickerGrey: {
    fontSize: 15
  },
  checker: {
    width: 20,
    height: 20,
    border: '1px solid black',
    borderRadius: 50,
    backgroundImage: props => `url(${props.otherUser.photoUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    margin: '5px 5px 0px 0px'
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles(props);
  const { time, text,otherUser } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      
      {
        otherUser.online === true ?
        <div className={classes.checker}></div> : null
      }
      {/* {
        otherUser.online === true ?
        <DoneAllIcon className={classes.tickerBlue}/> : <DoneAllIcon className={classes.tickerGrey}/>
      } */}
    </Box>
  );
};

export default SenderBubble;
