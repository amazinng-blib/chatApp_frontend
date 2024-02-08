import { createContext, useCallback, useEffect, useState } from 'react';
import { baseUrl, postRequest } from '../utils/services';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextprovider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsReisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  // TODO: Login
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  // Todo: update register info

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  // Todo: update register info

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('User');
    setUser(JSON.parse(user));
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsReisterLoading(true);
      setRegisterError(false);

      const response = await postRequest(
        `${baseUrl}/user/register`,
        JSON.stringify(registerInfo)
      );

      setIsReisterLoading(false);

      if (response.error) {
        return setRegisterError(response);
      }
      // localStorage.setItem('User', JSON.stringify(response));
      setUser(response);
      navigate('/login');
    },
    [registerInfo]
  );

  // todo: login

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);
      const response = await postRequest(
        `${baseUrl}/user/login`,
        JSON.stringify(loginInfo)
      );

      setIsLoginLoading(false);
      if (response.error) {
        return setLoginError(response);
      }
      localStorage.setItem('User', JSON.stringify(response));
      navigate('/');

      setUser(response);
    },
    [loginInfo]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('User');
    setUser(null);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        // todo: login

        loginUser,
        loginError,
        isLoginLoading,
        loginInfo,
        updateLoginInfo,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
