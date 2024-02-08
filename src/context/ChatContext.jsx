import { createContext, useCallback, useEffect, useState } from 'react';
import { baseUrl, getRequest, postRequest } from '../utils/services';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatLoading, setIsUserChatLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(false);

  const [potentialChats, setPotentialChats] = useState([]);

  const [currentChat, setCurrentChat] = useState(null);

  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);

  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    const getusers = async () => {
      const response = await getRequest(`${baseUrl}/user/users`);

      if (response.error) {
        return console.log('Error fetching users', response);
      }

      const pChats = response?.userDetails?.filter((loggedInUser) => {
        let isChatCreated = false;
        if (user?.userDetails?.otherDetails?._id === loggedInUser?._id)
          return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return (
              chat.members[0] === loggedInUser?._id ||
              chat.members[1] === loggedInUser?._id
            );
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChats);
    };
    getusers();
  }, [userChats]);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats/create-chat`,
      JSON.stringify({
        firstId,
        secondId,
      })
    );

    if (response.error) {
      return console.log('Error fetching users', response);
    }

    setUserChats((prev) => [...prev, response]);
  }, []);

  const sendTextMessage = useCallback(
    async (textMessage, sender, curentChatId, setTextMessage) => {
      if (!textMessage) return;

      const response = await postRequest(
        `${baseUrl}/messages/create-message`,
        JSON.stringify({
          chatId: curentChatId,
          senderId: sender?.userDetails?.otherDetails?._id,
          text: textMessage,
        })
      );
      if (response.error) {
        return setSendTextMessageError(response);
      }

      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage('');
    },
    []
  );

  useEffect(() => {
    const getUserChats = async () => {
      if (user) {
        setIsUserChatLoading(true);
        setUserChatError(null);
        const response = await getRequest(
          `${baseUrl}/chats/find-user-chat/${user?.userDetails?.otherDetails?._id}`
        );

        setIsUserChatLoading(false);

        if (response.error) {
          return setUserChatError(response);
        }

        setUserChats(response);
      }
    };

    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);
      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );

      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }

      setMessages(response);
    };

    getMessages();
  }, [currentChat]);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatLoading,
        userChatError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        newMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
