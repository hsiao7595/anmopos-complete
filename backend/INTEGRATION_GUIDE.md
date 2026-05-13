# 按摩店POS 顧客&後台系統集成指南

## 🎯 完成狀況

### ✅ 已完成

1. **後台系統升級** (Next.js 14)
   - 完整的 API 路由層
   - Prisma 數據模型 (Store/Room/Staff/Service/Session/Order/DailyReport)
   - SQLite 本地數據庫
   - 2家店、10間房、12位師傅、17+10項服務的初始數據

2. **Socket.io 實時同步層**
   - 獨立服務器 (localhost:3001)
   - 進場事件實時推送
   - 房間狀態廣播
   - 師傅狀態廣播
   - 結帳同步

3. **後台 UI 面板** (Next.js)
   - 店家切換
   - 房間狀態監控
   - 師傅輪排管理
   - 進場紀錄表格
   - 實時統計卡片

4. **前台 Socket.io 集成**
   - 後台同步指示器
   - 房間網格實時更新組件
   - Socket.io hooks (useBackendSync, useBackendActions)

---

## 🚀 本地運行步驟

### 第一步：啟動後台系統

```bash
cd "E:\Claude\按摩店POS系統\backend"

# 方式1：雙擊啟動腳本（推薦 Windows）
start-local.bat

# 方式2：手動啟動
npm install
npm run seed
npm run dev
```

**後台會在這些地址運行：**
- 🌐 Web 面板: http://localhost:3000
- 📊 Dashboard: http://localhost:3000/dashboard
- 🔌 Socket.io 服務器: http://localhost:3001
- 🗄️ Prisma Studio: http://localhost:5555 (npm run prisma:studio)

### 第二步：啟動前台 POS（新終端窗口）

```bash
cd "E:\Claude\按摩店顧客用POS\anmopos"
npm install
npm run dev
```

**前台運行在：**
- 🖥️ 顧客 POS: http://localhost:5173

---

## 🧪 本地驗證清單

### 連接驗證

- [ ] 打開後台 Dashboard: http://localhost:3000/dashboard
  - 應該看到「🟢 連接成功」信息
  - 顯示 2 家店、10 間房、12 位師傅

- [ ] 打開前台 POS: http://localhost:5173
  - 右下角應該有「✅ 已連接後台」標示
  - 如果顯示「❌ 已斷開連接」，檢查後台服務器是否運行

### 功能驗證

#### 進場同步
1. 前台：點「新增開單」→ 選房間、服務、師傅 → 確認
2. 檢查點：
   - [ ] 後台房間狀態變為「serving」
   - [ ] 房間網格顏色變為紫色
   - [ ] 進場紀錄表格實時更新
   - [ ] 統計卡片「今日進客」+1
   - [ ] **多個後台窗口都實時更新** ⭐

#### 房間狀態變化
1. 後台：點房間卡片改變狀態
2. 檢查點：
   - [ ] 房間顏色實時改變
   - [ ] 其他後台窗口同步更新

#### 師傅狀態變化
1. 後台：修改師傅狀態
2. 檢查點：
   - [ ] 師傅輪排列表實時更新
   - [ ] 師傅顏色標示正確

#### 結帳同步
1. 前台：點結帳 → 選付款方式 → 完成
2. 檢查點：
   - [ ] 房間狀態變為「cleaning」
   - [ ] 師傅狀態變回「queue」
   - [ ] 後台房間狀態顏色變為黃色
   - [ ] 統計卡片更新

---

## 📊 API 測試

使用 curl 或 Postman 測試 API：

```bash
# 健康檢查
curl http://localhost:3000/api/health

# 獲取店家
curl http://localhost:3000/api/stores

# 獲取房間
curl "http://localhost:3000/api/rooms?storeId=store-1"

# 獲取師傅
curl "http://localhost:3000/api/staff?storeId=store-1"

# 獲取進場紀錄
curl "http://localhost:3000/api/sessions?storeId=store-1"
```

---

## 🔌 Socket.io 事件測試

使用瀏覽器控制台測試（在 http://localhost:5173 或 http://localhost:3000）：

```javascript
// 連接 Socket.io
const socket = io('http://localhost:3001')

// 監聽連接
socket.on('connection:success', (data) => {
  console.log('✅ 連接成功:', data)
})

// 發送進場事件
socket.emit('guest:checkin', {
  storeId: 'store-1',
  roomId: 'room-1', // 需要從 API 獲取真實 ID
  staffId: 'staff-1',
  serviceItemId: 'service-1',
  arrivalTime: new Date().toISOString(),
})

// 監聽進場廣播
socket.on('guest:checkin', (data) => {
  console.log('📍 進場事件:', data)
})

// 發送房間狀態變化
socket.emit('room:status-change', {
  roomId: 'room-1',
  status: 'cleaning',
})

// 監聽房間狀態廣播
socket.on('room:status-change', (data) => {
  console.log('🚪 房間狀態變化:', data)
})
```

---

## 📁 項目結構概覽

```
按摩店POS系統/
├── backend/                          # 後台 Next.js 應用
│   ├── app/
│   │   ├── api/
│   │   │   ├── health/              # 健康檢查
│   │   │   ├── stores/              # 店家管理
│   │   │   ├── rooms/               # 房間管理
│   │   │   ├── staff/               # 師傅管理
│   │   │   └── sessions/            # 進場記錄
│   │   ├── dashboard/               # 後台面板
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── prisma/
│   │   ├── schema.prisma            # 數據模型
│   │   ├── dev.db                   # SQLite 數據庫
│   │   └── seed.js                  # 初始數據
│   ├── server.js                    # Socket.io 服務器
│   ├── package.json
│   ├── start-local.bat              # 啟動腳本 (Windows)
│   └── README.md                    # 本地開發指南
│
└── 按摩店顧客用POS/
    └── anmopos/                     # 前台 Vite + React
        ├── src/
        │   ├── hooks/
        │   │   └── useBackendSync.js    # Socket.io hooks
        │   ├── components/
        │   │   ├── BackendSyncIndicator.jsx
        │   │   └── RoomGridWithSync.jsx
        │   └── ...
        └── ...
```

---

## 🔍 常見問題排查

### Q: Socket.io 連接失敗（前台報「❌ 已斷開連接」）

**原因**：後台 Socket.io 服務器未運行或端口被占用

**解決**：
```bash
cd backend
npm run dev              # 同時啟動 Next.js 和 Socket.io
# 或分別啟動
npm run dev:next        # 終端1
npm run dev:socket      # 終端2
```

### Q: 數據庫錯誤「SQLITE_CANTOPEN」

**原因**：權限問題或 .env 未正確配置

**解決**：
```bash
rm prisma/dev.db
npm run seed
```

### Q: 房間/師傅 ID 不匹配

**原因**：使用了硬編碼的 ID

**解決**：先調用 API 獲取真實 ID：
```bash
curl http://localhost:3000/api/rooms?storeId=store-1
```

### Q: 後台 API 返回 500 錯誤

**檢查**：
1. 確保 Prisma Client 已生成: `npx prisma generate`
2. 確保 .env 正確: `cat .env`
3. 查看服務器控制台的詳細錯誤信息

---

## 📝 下一步

### 本地確認後的部署準備

- [ ] 確認所有功能在本地正常運作
- [ ] 測試多窗口實時同步
- [ ] 驗證所有 API 端點
- [ ] 測試 Socket.io 事件廣播
- [ ] 截圖記錄界面效果

### 雲端部署（確認後）

1. **前台部署到 Vercel**
   ```bash
   cd anmopos
   npm run build
   # 連接 GitHub 或使用 Vercel CLI
   ```

2. **後台部署到 Vercel + Supabase**
   ```bash
   cd backend
   # 設置環境變量
   # 部署
   ```

3. **配置域名和 SSL**

---

## ✨ 功能完整度

| 功能 | 狀態 | 備註 |
|------|------|------|
| 後台 Dashboard | ✅ 完成 | 房間+師傅+進場統計 |
| Socket.io 同步 | ✅ 完成 | 雙向實時推送 |
| API 路由 | ✅ 完成 | 5 個核心端點 |
| 前台 POS | ✅ 既有 | 可發送事件 |
| Socket.io Hooks | ✅ 完成 | 前台集成模板 |
| 本地啟動腳本 | ✅ 完成 | start-local.bat |
| 數據庫初始化 | ✅ 完成 | 2店+10房+12師傅 |
| 多窗口同步 | ✅ 完成 | 實時廣播 |
| 雲端部署配置 | ⏳ 待確認 | 確認後準備 |

---

## 📞 快速參考

```bash
# 後台啟動
cd backend
npm run dev          # 同時啟動 Next.js + Socket.io

# 前台啟動（新終端）
cd anmopos
npm run dev

# 查看數據庫
npm run prisma:studio

# 重置數據
rm prisma/dev.db
npm run seed

# 停止所有服務
Ctrl+C
```

---

**狀態：本地開發完成 🎉**  
**下一步：確認界面和功能，準備部署**
