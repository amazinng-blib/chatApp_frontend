import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { Container, Stack } from 'react-bootstrap';
import UserChat from '../components/chat/User-Chat';
import { AuthContext } from '../context/AuthContext';
import PontentialChat from '../components/chat/Pontential-Chat';
import ChatBox from '../components/chat/ChatBox';

const Chat = () => {
  const { userChats, isUserChatLoading, userChatError, updateCurrentChat } =
    useContext(ChatContext);

  const { user } = useContext(AuthContext);

  return (
    <Container>
      <PontentialChat />
      {userChats ? (
        <Stack
          direction="horizontal"
          className="text-white align-items-start"
          gap={4}
        >
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatLoading && <p>Loading chats...</p>}

            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      ) : null}
    </Container>
  );
};

export default Chat;
