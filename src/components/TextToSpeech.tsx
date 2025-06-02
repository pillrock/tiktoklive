import { useContext, useEffect, useState } from 'react';
import commentSpeechContext from '../contexts/commentSpeech';
import NotificationContext from '../contexts/Notification';

export const TextToSpeech: React.FC = () => {
  const { msg, setIsPlaying } = useContext(commentSpeechContext);
  const { setMessage } = useContext(NotificationContext);
  useEffect(() => {
    if (!msg) return;
    setIsPlaying(true);
    (async () => {
      try {
        const res = await window.electron.ipcRenderer.invoke(
          'text-to-mp3',
          msg
        );
        if (!res.success) throw new Error(res.error);
        // Gọi main process phát file mp3
        const audio = new Audio(res.path + '?t=' + Date.now());
        audio.onended = () => setIsPlaying(false);
        audio.onerror = () => setIsPlaying(false);
        await audio.play();
      } catch (err) {
        setMessage('Lỗi khi tạo hoặc phát âm thanh: ' + (err as Error).message);
        setIsPlaying(false);
      }
    })();
  }, [msg]);

  return <></>;
};
