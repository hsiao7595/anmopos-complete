# ANMOPOS - 現場按摩 POS 系統

完整的按摩店 POS 系統，包含前台現場操作和後台內部管理。

## 📁 項目結構

```
anmopos-complete/
├── frontend/          # 現場 POS 系統 (React + Vite)
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/           # 後台管理系統 (Node.js + Express)
│   ├── app.js
│   ├── package.json
│   └── ...
└── README.md
```

## 🚀 快速開始

### 前台 POS 系統（現場用）

```bash
cd frontend
npm install
npm run dev
# 打開 http://localhost:5173
```

### 後台管理系統（內部人員用）

```bash
cd backend
npm install
npm run start
# 打開 http://localhost:3001
```

## 🔌 系統連動

- **前台** ↔ **後台**：通過 Socket.io 實時同步
- 前台操作的預約、開單、結帳等自動上傳到後台
- 後台對師傅、房間、服務項目的設定實時下推到前台

## 📋 功能清單

### 前台 POS 系統
- ✅ 現場開單（快速開單、待切單）
- ✅ 房間管理（預留、待切單、服務中、清潔中）
- ✅ 師傅輪排（狀態管理、排序優先級）
- ✅ 電話預約（預約清單、直接開單）
- ✅ 倒數計時（1秒更新流暢）
- ✅ 現場結帳

### 後台管理系統
- ✅ 師傅管理
- ✅ 服務項目設定
- ✅ 房間配置
- ✅ 營業數據統計
- ✅ 會員管理
- ✅ 預約管理

## 📱 支持的店家

- **御手足悦** - 按摩店
- **足不老** - 足療店
- **其他品牌**

## 🛠️ 技術棧

| 層級 | 技術 |
|------|------|
| 前端 | React 18 + Vite + Tailwind CSS |
| 後端 | Node.js + Express + Socket.io |
| 狀態管理 | Zustand |
| 儲存 | localStorage (前台) + 資料庫 (後台) |

## 📝 提交規範

```bash
# 前台改動
git add frontend/
git commit -m "feat(frontend): 新增預約系統"

# 後台改動
git add backend/
git commit -m "feat(backend): API 端點優化"

# 全系統改動
git add .
git commit -m "feat: 系統優化和功能升級"
```

## 🔗 相關資源

- [整合指南](./INTEGRATION_GUIDE.md)
- [數據結構](./DATA_SCHEMA.md)
- [進度追蹤](./PROGRESS.md)

---

**最後更新**：2026-05-13  
**維護者**：hsiao
