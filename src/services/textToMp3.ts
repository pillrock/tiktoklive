import gTTS from 'node-gtts';
import { join } from 'path';
import fs from 'fs/promises';
import { app } from 'electron';

const gtts = gTTS('vi'); // Ngôn ngữ Tiếng Việt

export const textToMp3 = async (
  text: string,
  filename = 'output.mp3'
): Promise<string> => {
  // Lấy thư mục userData (ngoài app.asar, ghi được file)
  const outputDir = app.getPath('userData');
  const outputPath = join(outputDir, filename);

  try {
    // Xóa file cũ nếu tồn tại (để ghi đè)
    try {
      await fs.access(outputPath);
      await fs.unlink(outputPath);
      console.log(`♻️ Đã xóa file cũ ${filename}`);
    } catch (error) {
      // File không tồn tại, không cần xóa
    }

    // Tạo file MP3 mới
    await new Promise<void>((resolve, reject) => {
      gtts.save(outputPath, text, (err: Error | undefined) => {
        if (err) {
          reject(new Error(`Lỗi tạo MP3: ${err.message}`));
        } else {
          resolve();
        }
      });
    });

    console.log(`✅ Đã tạo file ${filename} tại: ${outputPath}`);
    return outputPath;
  } catch (error) {
    throw new Error(
      `[textToMp3] Lỗi: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
