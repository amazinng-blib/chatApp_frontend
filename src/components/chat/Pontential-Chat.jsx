import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const PontentialChat = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats?.map((pUser, index) => {
            return (
              <div
                className="single-user"
                key={index}
                onClick={() =>
                  createChat(user?.userDetails?.otherDetails?._id, pUser?._id)
                }
              >
                {pUser?.name}
                <span className="user-online"></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PontentialChat;
