import { useState, useContext, createContext, ReactNode } from 'react';

type notiProps = {
  message: string;
  setMessage: (msg: string) => void;
};

const NotificationContext = createContext<notiProps | null>(null);
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  return (
    <NotificationContext.Provider value={{ message, setMessage }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
