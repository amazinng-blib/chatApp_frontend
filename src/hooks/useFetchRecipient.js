import { useEffect, useState } from 'react';
import { baseUrl, getRequest } from '../utils/services';

export const useFetchRecipientUser = (chat, user) => {
  const [receipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const receipientId = chat?.members.find(
    (id) => id !== user?.userDetails?.otherDetails?._id
  );
  useEffect(() => {
    const getUser = async () => {
      if (!receipientId) return null;

      const response = await getRequest(
        `${baseUrl}/user/findUser/${receipientId}`
      );

      if (response.error) {
        return setError(response.error);
      }

      setRecipientUser(response);
    };
    getUser();
  }, [chat, user, receipientId]);

  return { receipientUser };
};
