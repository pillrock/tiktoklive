import { MinusIcon, X } from 'lucide-react';
import Notification from './components/Notification';
import TikTokLiveReader from './components/Reader';
import { useCallback } from 'react';

export default function App() {
  const handleMinimizeWindow = useCallback(() => {
    window.electron?.ipcRenderer.send('window-control', 'minimize');
  }, []);
  const handleCloseWindow = useCallback(() => {
    window.electron?.ipcRenderer.send('window-control', 'close');
  }, []);
  return (
    <>
      <div className="header app-region-drag m-2 flex items-center justify-end gap-x-[2px]">
        <span
          className="app-region-no-drag p-2 hover:bg-gray-300 hover:opacity-80"
          onClick={handleMinimizeWindow}
        >
          <MinusIcon size={19} onClick={handleMinimizeWindow} />
        </span>
        <span
          className="app-region-no-drag p-2 hover:bg-gray-300 hover:opacity-80"
          onClick={handleCloseWindow}
        >
          <X size={19} onClick={handleCloseWindow} />
        </span>
      </div>
      <TikTokLiveReader />
      <Notification />;
    </>
  );
}
