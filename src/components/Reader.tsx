import React, { useState, useEffect, useContext } from 'react';
import { Play, Pause, MessageCircle } from 'lucide-react';
import NotificationContext from '../contexts/Notification';
import commentSpeechContext from '../contexts/commentSpeech';

const TikTokLiveReader = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [comments, setComments] = useState([]);
  const [liveUrl, setLiveUrl] = useState('');
  const { setMessage } = useContext(NotificationContext);
  const { isPlaying, setMsg } = useContext(commentSpeechContext);
  const [commentIsBroadcasted, setCommentIsBroadcasted] = useState([]);
  //RESET
  useEffect(() => {
    const handleDisconnected = () => {
      setComments([]);
      setCommentIsBroadcasted([]);
      setMsg('');
    };
    window.electron?.ipcRenderer.on('tiktok-disconnected', handleDisconnected);
    return () => {
      window.electron?.ipcRenderer.removeListener(
        'tiktok-disconnected',
        handleDisconnected
      );
    };
  }, []);

  /// logic đọc bình luận chọn lọc, khi nhiều CMT quá thì đọc bước nhảy
  useEffect(() => {
    const numberCommentLimit = 5;
    if (commentIsBroadcasted.length === 0) return;
    if (isPlaying) {
      return;
    } else {
      if (setCommentIsBroadcasted.length >= numberCommentLimit) {
        setCommentIsBroadcasted([]);
        return;
      }
    }

    setMsg(commentIsBroadcasted[0]);
    return () => {
      setCommentIsBroadcasted((prev) => [
        ...prev.slice(1, commentIsBroadcasted.length),
      ]);
    };
  }, [commentIsBroadcasted]);
  // Kết nối và ngắt kết nối tới server qua IPC
  const handleConnect = () => {
    if (!isConnected && liveUrl.trim()) {
      const username = liveUrl.replace(/^.*@([^/]+).*$/, '$1');
      window.electron?.ipcRenderer.send('tiktok-connect', username);
      setIsConnected(true);
      setComments([]);
    } else if (isConnected) {
      window.electron?.ipcRenderer.send('tiktok-disconnect');
      setIsConnected(false);
      setComments([]);
    }
  };

  useEffect(() => {
    const handleConnectError = (_event, msg) => {
      setMessage(msg);
      setIsConnected(false);
    };
    window.electron?.ipcRenderer.on('tiktok-error', handleConnectError);
    return () => {
      window.electron?.ipcRenderer.removeListener(
        'tiktok-error',
        handleConnectError
      );
    };
  }, []);

  // Nhận comment từ main process
  useEffect(() => {
    const handler = (
      _event: string,
      chat: { nickname: string; comment: string }
    ) => {
      setCommentIsBroadcasted((prev) => [
        `${chat.nickname} bình luận: ${chat.comment}`,
        ...prev.slice(0, 20),
      ]);
      setComments((prev) => [
        {
          id: Date.now() + Math.random(),
          user: chat.nickname,
          text: chat.comment,
          timestamp: new Date(),
        },
        ...prev.slice(0, 20),
      ]);
    };
    window.electron?.ipcRenderer.on('tiktok-chat', handler);
    return () => {
      window.electron?.ipcRenderer.removeListener('tiktok-chat', handler);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="animate-fade-in mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 transform items-center justify-center rounded-2xl bg-black transition-transform duration-200 hover:scale-105">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">TikTok</h1>
          <p className="text-gray-600">pillrock</p>
        </div>

        {/* Connection Card */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Nickname (sau dấu @)
            </label>
            <input
              type="text"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="datthanh_369"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none"
              disabled={isConnected}
            />
          </div>

          <button
            onClick={handleConnect}
            className={`flex w-full transform items-center justify-center space-x-2 rounded-xl px-6 py-3 font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
              isConnected
                ? 'bg-red-500 text-white shadow-lg hover:bg-red-600 hover:shadow-red-200'
                : 'bg-black text-white shadow-lg hover:bg-gray-800 hover:shadow-gray-200'
            }`}
          >
            <div
              className={`transition-transform duration-200 ${isConnected ? 'animate-pulse' : ''}`}
            >
              {isConnected ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </div>
            <span>{isConnected ? 'Ngắt kết nối' : 'Kết nối'}</span>
          </button>

          {/* Connection Status */}
          {isConnected && (
            <div className="animate-fade-in mt-4 flex items-center justify-center space-x-2 text-green-600">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
              <span className="text-sm font-medium">Đang kết nối</span>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6">
            <h2 className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <MessageCircle className="h-5 w-5" />
              <span>Bình luận trực tiếp</span>
              {comments.length > 0 && (
                <span className="animate-bounce rounded-full bg-black px-2 py-1 text-xs text-white">
                  {comments.length}
                </span>
              )}
            </h2>
          </div>

          <div className="h-96 overflow-y-auto p-6">
            {!isConnected ? (
              <div className="animate-fade-in flex h-full flex-col items-center justify-center text-gray-500">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                  <MessageCircle className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-center">
                  Kết nối với live stream để xem bình luận
                </p>
              </div>
            ) : comments.length === 0 ? (
              <div className="animate-fade-in flex h-full flex-col items-center justify-center text-gray-500">
                <div className="relative">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black"></div>
                </div>
                <p className="mt-4 text-center">Đang chờ bình luận...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div
                    key={comment.id}
                    className="group animate-slide-in rounded-xl p-4 transition-all duration-200 hover:bg-gray-50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                        {comment.user[0]?.toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center space-x-2">
                          <span className="truncate font-medium text-gray-900">
                            {comment.user}
                          </span>
                          <span className="flex-shrink-0 text-xs text-gray-500">
                            {comment.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="leading-relaxed break-words text-gray-700">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TikTokLiveReader;
