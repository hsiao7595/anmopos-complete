# 按摩店POS 後台系統 - 本地開發指南

## 📦 快速開始

### 系統架構

```
前台顧客POS (Vite + React)
      ↓ Socket.io
    [localhost:3001 Socket.io服務器]
      ↓
後台進場系統 (Next.js 14)
      ↓
   Prisma + SQLite
```

### 前置要求
- Node.js 18+
- npm 或 yarn

### 一鍵啟動

```bash
# 1. 進入後台目錄
cd "E:\Claude\按摩店POS系統\backend"

# 2. 安裝依賴（如果還沒安裝）
npm install

# 3. 初始化數據庫
npm run seed

# 4. 同時啟動 Next.js 和 Socket.io 服務器
npm run dev
```

這會啟動：
- **Next.js 後台**: http://localhost:3000
- **Socket.io 服務器**: http://localhost:3001

### 前台顧客POS

```bash
# 在另一個終端
cd "E:\Claude\按摩店顧客用POS\anmopos"

# 啟動前台
npm run dev
```

前台會運行在: http://localhost:5173

---

## 🔌 Socket.io 實時同步

### 前台 → 後台 事件

#### 進場事件
```javascript
socket.emit('guest:checkin', {
  storeId: 'store-1',
  roomId: 'room-123',
  staffId: 'staff-456',
  serviceItemId: 'service-789',
  arrivalTime: new Date().toISOString(),
})
```

#### 房間狀態變化
```javascript
socket.emit('room:status-change', {
  roomId: 'room-123',
  status: 'serving' // idle, serving, cleaning, maintenance
})
```

#### 師傅狀態變化
```javascript
socket.emit('staff:status-change', {
  staffId: 'staff-456',
  status: 'serving', // queue, serving, break, leave, offduty
  queuePosition: 0
})
```

#### 結帳
```javascript
socket.emit('order:checkout', {
  sessionId: 'session-789',
  amount: 1500
})
```

### 後台 → 前台 事件

所有前台發出的事件都會被後台廣播給所有連接的客戶端。

---

## 📊 API 端點

### 獲取數據

```bash
# 店家列表
curl http://localhost:3000/api/stores

# 房間狀態 (按店家篩選)
curl "http://localhost:3000/api/rooms?storeId=store-1"

# 師傅狀態
curl "http://localhost:3000/api/staff?storeId=store-1"

# 進場紀錄
curl "http://localhost:3000/api/sessions?storeId=store-1"

# 健康檢查
curl http://localhost:3000/api/health
```

---

## 🗄️ 數據庫

### 查看數據

```bash
npm run prisma:studio
```

這會開啟 Prisma Studio，您可以在 http://localhost:5555 查看和編輯數據。

### 重置數據

```bash
# 1. 刪除數據庫
rm prisma/dev.db

# 2. 重新建立和導入
npm run seed
```

---

## 🧪 本地測試

### 測試多窗口同步

1. 打開 http://localhost:3000/dashboard (後台進場系統)
2. 在前台 (http://localhost:5173) 進行「開單」和「結帳」
3. 後台應該實時顯示房間狀態和進場紀錄的變化

### 測試實時推送

1. 打開兩個後台窗口 (http://localhost:3000/dashboard)
2. 在前台進行進場操作
3. 兩個後台窗口都應該實時更新

---

## 📁 項目結構

```
backend/
├── app/
│   ├── api/              # API 路由
│   │   ├── health/       # 健康檢查
│   │   ├── stores/       # 店家 API
│   │   ├── rooms/        # 房間 API
│   │   ├── staff/        # 師傅 API
│   │   └── sessions/     # 進場 API
│   ├── dashboard/        # 後台面板
│   ├── layout.tsx        # 全局佈局
│   ├── page.tsx          # 首頁
│   └── globals.css       # 全局樣式
├── prisma/
│   ├── schema.prisma     # 數據模型
│   └── seed.js           # 初始數據
├── server.js             # Socket.io 服務器
├── package.json
├── next.config.js
└── tsconfig.json
```

---

## 🚀 開發流程

### 新增 API 端點

1. 在 `app/api/` 下創建新目錄
2. 創建 `route.ts` 文件
3. 導出 `GET`, `POST`, `PATCH` 等函數

### 新增 Socket.io 事件

1. 在 `server.js` 的 `socket.on()` 中添加監聽器
2. 使用 `io.emit()` 廣播給所有客戶端
3. 在前台使用 `useBackendSync()` hook 接收事件

---

## 🔍 除錯

### 查看 Socket.io 日誌

後台會在控制台打印所有事件：
```
📍 新進場: {...}
🚪 房間狀態變化: {...}
👨 師傅狀態變化: {...}
💰 結帳: {...}
```

### 查看 API 日誌

在瀏覽器開發工具的 Network 標籤查看 API 調用。

### Prisma 查詢日誌

設置環境變量：
```bash
export DEBUG=prisma:*
npm run dev
```

---

## ✅ 功能檢查清單

### 後台
- [ ] Dashboard 顯示房間狀態
- [ ] Dashboard 顯示師傅輪排
- [ ] Dashboard 實時更新進場紀錄
- [ ] API 端點正常運作
- [ ] 多窗口同步房間狀態

### 前台
- [ ] 連接到後台成功
- [ ] 開單後後台房間狀態變化
- [ ] 結帳後房間狀態變為「清潔」
- [ ] 師傅狀態實時更新
- [ ] 多終端同步

---

## 📝 常見問題

**Q: Socket.io 連接失敗？**  
A: 確保後台服務器在運行 (`npm run dev`)

**Q: 數據庫被鎖定？**  
A: 使用 `npx prisma migrate resolve --rolled-back` 解決

**Q: 前台連接不到後台？**  
A: 檢查防火牆設置，確保 3001 端口開放

---

## 📞 技術棧

- **前台**: Vite + React + Zustand
- **後台**: Next.js 14 + TypeScript + Tailwind
- **實時通信**: Socket.io
- **數據庫**: Prisma + SQLite
- **部署準備**: Vercel + Supabase

---

**準備好後，在確認所有功能後可以部署到雲端！**
