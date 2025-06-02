import {
  useContext,
  createContext,
  Children,
  ReactNode,
  useState,
} from 'react';

type cmtSpeechProps = {
  msg: string;
  setMsg: (msg: string) => void;
  isPlaying: boolean;
  setIsPlaying: (status: boolean) => void;
};

const commentSpeechContext = createContext<cmtSpeechProps | null>(null);

export const CmtSpeechProvider = ({ children }: { children: ReactNode }) => {
  const [msg, setMsg] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <commentSpeechContext.Provider
      value={{ msg, setMsg, isPlaying, setIsPlaying }}
    >
      {children}
    </commentSpeechContext.Provider>
  );
};

export default commentSpeechContext;
