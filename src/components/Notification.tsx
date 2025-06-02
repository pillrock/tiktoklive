import { useContext, useEffect } from 'react';
import NotificationContext from '../contexts/Notification';

function Notification() {
  const { message, setMessage } = useContext(NotificationContext);

  useEffect(() => {
    if (!message) return;
    console.log('NOTI: ', message);
    const timer = setTimeout(() => setMessage(''), 3000); // 3 giây
    return () => clearTimeout(timer);
  }, [message]);
  return (
    <div
      className={`fixed top-2 right-0 block h-auto rounded-md bg-black/50 px-5 py-3 text-white transition-all duration-200 ${message ? 'translate-x-[-10px] opacity-100' : 'translate-x-[10px] opacity-0'} `}
    >
      <h1 className="text-sm">{message.toUpperCase()}</h1>
    </div>
  );
}

export default Notification;
