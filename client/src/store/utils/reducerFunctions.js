export const addMessageToStore = (state, payload) => {
  let userAlreadyExist = false;
  const { message, sender } = payload;

  // if sender isn't null, that means the message needs to be put in a brand new convo
  // also check if the sender is already present in the convo list
    if (sender !== null) {
      state.map((convo) => {
        if (convo.otherUser.id == sender.id) {
          userAlreadyExist = true;
        }
      })

      if (userAlreadyExist === false) {
        const newConvo = {
          id: message.conversationId,
          otherUser: sender,
          messages: [message],
        };
        newConvo.latestMessageText = message.text;
        return [newConvo, ...state];
      }
    }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;

      return convoCopy;
    } else {
      return convo;
    }
  });
};

/*
  Author: Aman Sutariya
  Type: Reducer for message update
  Functionality: Takes the previous state and update message status according to the ids in the payload
  Dependencies: Previous state and payload
  Result: New state.
*/
export const addUpdatedMessageToStore = (state,payload) => {
  const { conversationId, id } = payload;

  return state.map((convo) => {

    if (convo.id != conversationId) {
      return convo
    }
    
    const convoCopy = { ...convo };
    convoCopy.messages = convoCopy.messages.map((message) => {
      if (id.indexOf(message.id) >= 0) {
        message.messageRead = true;
      }
      return message
    })

    return convoCopy
  })
}


export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};
