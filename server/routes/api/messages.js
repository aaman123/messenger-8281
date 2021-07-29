const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { Op } = require("sequelize");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, messageRead ,text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, messageRead, text, conversationId });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      messageRead,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});


/*
  Author: Aman Sutariya
  Functionality: fetches and updates read status of messages for a particular conversation.
  Dependencies: Sequelize.
  Downside: None.
*/
router.post("/setMessageStatus", async(req, res, next) => {
  try {
    if(!req.user) {
      return res.sendStatus(401);
    }
    const { convoId, messageIds} = req.body;

    const messages = await Message.findAll({
      where: {
        id: {
          [Op.in]: messageIds
        },
        messageRead: {
          [Op.eq]: false
        }
      }
    })

    messages.forEach(async(message) => {
      if (message.conversationId !== convoId) {
        return res.json({
          status: false,
          status_code: 404,
          message: `Message in conversation with id = ${convoId} not found`
        });
      }

      message.messageRead = true;
      await message.save();
    })

    res.json({
      status: true,
      status_code: 201,
      data:messages,
      message: "Messages updated successfully"
    });
  }
  catch(error) {
    console.log(error);
    next(error);
  }
})

module.exports = router;
