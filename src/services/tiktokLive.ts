import {
  TikTokLiveConnection,
  WebcastEvent,
  WebcastChatMessage,
} from 'tiktok-live-connector';

let tiktokLiveConnection: TikTokLiveConnection | null = null;

export default async function connectToLive(
  username: string,
  onChat: (chat: {
    nickname: string;
    uniqueId: string;
    comment: string;
  }) => void
) {
  if (tiktokLiveConnection) {
    await tiktokLiveConnection.disconnect();
    tiktokLiveConnection = null;
  }
  tiktokLiveConnection = new TikTokLiveConnection(username);
  await tiktokLiveConnection.connect();
  tiktokLiveConnection.on(WebcastEvent.CHAT, (data: WebcastChatMessage) => {
    onChat({
      nickname: data.user.nickname,
      uniqueId: data.user.uniqueId,
      comment: data.comment,
    });
  });
  return tiktokLiveConnection;
}

export async function disconnectLive() {
  if (tiktokLiveConnection) {
    await tiktokLiveConnection.disconnect();
    tiktokLiveConnection = null;
  }
}
