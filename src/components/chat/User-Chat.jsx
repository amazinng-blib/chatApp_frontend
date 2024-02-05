import React from 'react';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import { Stack } from 'react-bootstrap';
import Avatar from '../../assets/avartar_svg.svg';

const UserChat = ({ chat, user }) => {
  const { receipientUser } = useFetchRecipientUser(chat, user);
  // console.log({ receipientUser });
  return (
    <Stack
      direction="horizontal"
      gap={3}
      role="button"
      className="user-card align-items-center p-2 justify-content-between"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={Avatar} alt="placeholder image" height={35} />
        </div>
        <div className="text-content">
          <div className="name">{receipientUser?.otherDetails?.name}</div>
          <div className="text">Text message</div>
        </div>

        <div className="d-flex flex-column align-items-end">
          <div className="date">12/12/2022</div>
          <div className="this-user-notifications">2</div>
          <span className="user-online"></span>
        </div>
      </div>
    </Stack>
  );
};

export default UserChat;
