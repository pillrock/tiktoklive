# ElectronForgeViteTypeScript-TailwindCss-React--QuickStart

ElectronForgeViteTypeScript-TailwindCss-React--QuickStart là một dự án **Electron** kết hợp với **React**, **Tailwind CSS**, và **Vite** để xây dựng một ứng dụng desktop hiện đại. Dự án hỗ trợ các tính năng nổi bật như **tự động cập nhật**, **định dạng mã nguồn với Prettier**, và tích hợp **Tailwind CSS** để xây dựng giao diện nhanh chóng.

---

## 🛠️ Công nghệ sử dụng

### 1. **Electron**

- Electron là nền tảng chính để xây dựng ứng dụng desktop đa nền tảng.
- Hỗ trợ tự động cập nhật thông qua **update-electron-app** **RELEASES GITHUB**.

### 2. **React**

- React được sử dụng để xây dựng giao diện người dùng (UI) linh hoạt và hiện đại.

### 3. **Tailwind CSS**

- Tailwind CSS giúp xây dựng giao diện nhanh chóng với các lớp tiện ích (utility-first CSS).
- Được tích hợp với **Prettier** để tự động sắp xếp các lớp CSS.

### 4. **Vite**

- Vite được sử dụng làm công cụ build nhanh chóng cho cả **renderer process** và **main process**.

### 5. **Prettier**

- Prettier được cấu hình để định dạng mã nguồn tự động, đảm bảo tính nhất quán trong dự án.
- Hỗ trợ plugin **prettier-plugin-tailwindcss** để sắp xếp các lớp Tailwind CSS.

### 6. **Tự động cập nhật**

- Sử dụng **update-electron-app** để kiểm tra và tải xuống các bản cập nhật từ GitHub Releases.

---

## 🚀 Cách chạy dự án

### 1. **Cài đặt**

Đảm bảo bạn đã cài đặt **Node.js** (phiên bản >= 16) trên máy tính của mình.

```bash
git clone https://github.com/pillrock/ElectronForgeViteTypeScript-TailwindCss-React--QuickStart .
npm install
```

### 2. **Tạo file `.env`**

Trước khi chạy dự án, bạn cần tạo file `.env` trong thư mục gốc của dự án với nội dung sau:

```properties
GITHUB_REPO = "username/name-repo"
GITHUB_TOKEN = "github_pat_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

- **`GITHUB_REPO`**: Đường dẫn đến repository GitHub của bạn theo định dạng `username/name-repo`.
- **`GITHUB_TOKEN`**: Token GitHub của bạn để xác thực. Token này cần quyền `repo` để tạo bản phát hành và tải lên các file.

> **Lưu ý**: Không chia sẻ token GitHub của bạn công khai.

### 3. **Chạy dự án**

Chạy ứng dụng trong chế độ phát triển:

```bash
npm run start
```

### 4. **Đóng gói ứng dụng**

Để đóng gói ứng dụng thành file cài đặt:

```bash
npm run make
```

### 5. **Publish lên GitHub**

Để phát hành ứng dụng lên GitHub Releases:

```bash
npm run publish
```

---

## 📂 Cấu trúc thư mục

```plaintext
(root)/
├── src/
│   ├── App.tsx          # Thành phần React chính
│   ├── main.ts          # Main process của Electron
│   ├── preload.ts       # Preload script
│   └── index.css        # File CSS chính (Tailwind)
├── forge.config.ts      # Cấu hình Electron Forge
├── tailwind.config.js   # Cấu hình Tailwind CSS
├── postcss.config.js    # Cấu hình PostCSS
├── package.json         # Thông tin dự án và dependencies
├── .env                 # File cấu hình môi trường
└── README.md            # Tài liệu dự án
```

---

## ✨ Tính năng nổi bật

1. **Tự động cập nhật**:

   - Ứng dụng tự động kiểm tra và tải xuống các bản cập nhật từ GitHub Releases.

2. **Giao diện hiện đại với Tailwind CSS**:

   - Sử dụng Tailwind CSS để xây dựng giao diện nhanh chóng và dễ dàng.

3. **Định dạng mã nguồn với Prettier**:

   - Prettier được tích hợp để tự động định dạng mã nguồn, đảm bảo tính nhất quán.

4. **Đóng gói đa nền tảng**:
   - Hỗ trợ đóng gói ứng dụng cho Windows, macOS, và Linux.

---

## 🛠️ Các lệnh hữu ích

- **Chạy ứng dụng**:

  ```bash
  npm run start
  ```

- **Đóng gói ứng dụng**:

  ```bash
  npm run make
  ```

- **Phát hành ứng dụng lên GitHub**:

  ```bash
  npm run publish
  ```

- **Kiểm tra lỗi với ESLint**:
  ```bash
  npm run lint
  ```

---

## 📧 Liên hệ

- **Tác giả**: pillrock06
- **GitHub**: [pillrock](https://github.com/pillrock)

---

## 📜 Giấy phép

Dự án này được phát hành dưới giấy phép **MIT**.
