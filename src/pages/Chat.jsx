import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { Container, Stack } from 'react-bootstrap';
import UserChat from '../components/chat/User-Chat';
import { AuthContext } from '../context/AuthContext';

const Chat = () => {
  const { userChats, isUserChatLoading, userChatError } =
    useContext(ChatContext);

  const { user } = useContext(AuthContext);

  return (
    <Container>
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
                <div key={index}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <p>ChatBox</p>
        </Stack>
      ) : null}
    </Container>
  );
};

export default Chat;
