# AnMoPOS｜給 Codex 的初版開發指令

> 使用方式：把整份內容貼給 Codex，並一起附上目前的 ZIP 專案檔。  
> 目標：先用 `AnMoPOS` 當作按摩店 POS 系統初版，不把公司流程寫死，先做出可展示、可操作、可調整的版本。

---

## 0. 專案背景

我要製作一套按摩店使用的 POS / 現場營運管理系統，暫定名稱為 **AnMoPOS**。

目前這個 ZIP 內已經有一個初版 React 原型，請以它作為 UI 與功能概念的基礎。系統未來會給公司討論，所以第一階段不要把流程寫死，要讓功能、欄位、輪牌規則、服務項目、價格、房間數都可以後續調整。

初期適用兩家店：

1. 御手足悦按摩養生會館
2. 足不老養生莊園

---

## 1. 現有 ZIP 原型內容

目前 ZIP 裡有以下檔案：

```txt
README.md
logic/RotationAlgorithm.js
src/components/Dashboard.jsx
src/components/RoomGrid.jsx
src/components/StaffQueue.jsx
src/components/Sidebar.jsx
```

現有功能概念：

- `Dashboard.jsx`：主控台畫面，包含房態、師傅輪牌、右側功能選單、今日統計。
- `RoomGrid.jsx`：房態卡片，包含空房、服務中、清消中、剩餘 10 分鐘警示。
- `StaffQueue.jsx`：師傅大輪待命區、服務中區、指名標記。
- `Sidebar.jsx`：快速開單、輪牌管理、會員儲值核銷、跨店報表、換房 / 換師傅、結帳與發票。
- `RotationAlgorithm.js`：輪牌邏輯雛形。

請保留現有視覺方向：深色後台、房態清楚、按鈕大顆、適合櫃台現場操作。

---

## 2. 第一階段技術方向

請先用快速可展示的技術架構：

```txt
Vite + React + Tailwind CSS
狀態管理：Zustand 或 React Context
資料：mock data + localStorage
```

第一階段不需要正式後端，但請把資料層與邏輯層獨立出來，之後要接 Node.js / API / PostgreSQL / Prisma 時，不需要重寫整個前端。

---

## 3. 請整理成以下專案架構

```txt
anmopos/
├─ README.md
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ index.html
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ styles/
│  │  └─ globals.css
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ AppHeader.jsx
│  │  │  ├─ Sidebar.jsx
│  │  │  └─ MainLayout.jsx
│  │  ├─ dashboard/
│  │  │  ├─ Dashboard.jsx
│  │  │  ├─ RoomGrid.jsx
│  │  │  ├─ RoomCard.jsx
│  │  │  ├─ StaffQueue.jsx
│  │  │  └─ TodayStats.jsx
│  │  ├─ orders/
│  │  │  ├─ QuickOrderModal.jsx
│  │  │  ├─ ServiceSelector.jsx
│  │  │  └─ CheckoutModal.jsx
│  │  ├─ members/
│  │  │  ├─ MemberSearch.jsx
│  │  │  └─ MemberProfile.jsx
│  │  └─ common/
│  │     ├─ Button.jsx
│  │     ├─ Badge.jsx
│  │     └─ Modal.jsx
│  ├─ data/
│  │  ├─ mockStores.js
│  │  ├─ mockRooms.js
│  │  ├─ mockStaff.js
│  │  ├─ mockServices.js
│  │  └─ mockMembers.js
│  ├─ logic/
│  │  ├─ rotationLogic.js
│  │  ├─ roomStatusLogic.js
│  │  ├─ checkoutLogic.js
│  │  └─ reportLogic.js
│  ├─ store/
│  │  ├─ useAppStore.js
│  │  ├─ useRoomStore.js
│  │  ├─ useStaffStore.js
│  │  └─ useOrderStore.js
│  └─ utils/
│     ├─ formatCurrency.js
│     ├─ formatTime.js
│     └─ idGenerator.js
└─ docs/
   ├─ POS_REQUIREMENTS.md
   ├─ DATA_SCHEMA.md
   ├─ ROTATION_RULES.md
   └─ FUTURE_BACKEND_PLAN.md
```

---

## 4. Phase 1 必做功能

請先只完成 Phase 1，不要一次做太大。

### 4.1 主控台 Dashboard

主控台需包含：

- 上方統計列
- 中間房態看板
- 右側功能選單
- 下方師傅輪牌

上方統計列顯示：

```txt
今日營收
今日開單數
待命師傅
服務中師傅
空房數
服務中房數
清消中房數
```

### 4.2 房態看板

每個房間卡片顯示：

```txt
房號
狀態：空房 / 服務中 / 清消中 / 維修中
服務項目
師傅編號
會員 / 客人名稱，可選
開始時間
剩餘時間
10 分鐘內提醒
逾時提醒
詳情按鈕
```

顏色：

```txt
空房：綠色
服務中：藍色
剩餘 10 分鐘內：紅色閃爍
清消中：橘色
維修中：灰色
```

### 4.3 快速開單 Modal

點擊「快速開單 / 接客」後開啟 Modal。

欄位：

```txt
店別
房號
客人類型：一般 / 會員
會員搜尋，可先 mock
服務項目
服務時間
師傅選擇：依大輪 / 指名 / 指派
付款狀態：未付款 / 已付款 / 儲值扣款
備註
```

開單後：

- 房間狀態改為服務中
- 師傅狀態改為服務中
- 建立 ServiceSession
- 建立 Order
- 開始倒數
- 今日開單數更新

### 4.4 結帳 Modal

欄位：

```txt
訂單編號
房號
服務項目
服務時間
師傅
原價
折扣
付款方式：現金 / 信用卡 / LINE Pay / 轉帳 / 儲值扣款 / 其他
實收金額
找零
備註
```

結帳後：

- 訂單狀態改為已結帳
- 今日營收更新
- 房間進入清消中
- 師傅依輪牌規則回到隊列

### 4.5 師傅輪牌

師傅狀態至少包含：

```txt
待命 waiting
服務中 busy
休息 resting
外出 out
請假 leave
下班 off
```

輪牌基本規則：

1. 一般客依大輪第一位派工。
2. 指名客不影響大輪順位，先以 `isRequested: true` 記錄。
3. 一般服務完成後，師傅移到隊伍最後。
4. 休息 / 外出 / 請假 / 下班者不參與大輪。
5. 所有輪牌邏輯請放在 `src/logic/rotationLogic.js`，不要寫死在畫面元件。

---

## 5. 初版資料模型

請先使用 JS object / mock data 建立以下資料，不必先接資料庫。

### Store

```ts
type Store = {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
};
```

### Room

```ts
type Room = {
  id: string;
  storeId: string;
  roomNo: string;
  name: string;
  status: 'empty' | 'busy' | 'cleaning' | 'maintenance';
  currentSessionId?: string | null;
};
```

### Staff

```ts
type Staff = {
  id: string;
  storeId: string;
  staffNo: string;
  name: string;
  status: 'waiting' | 'busy' | 'resting' | 'out' | 'leave' | 'off';
  queueIndex: number;
  isActive: boolean;
};
```

### ServiceItem

```ts
type ServiceItem = {
  id: string;
  storeId: string;
  name: string;
  durationMinutes: number;
  price: number;
  isActive: boolean;
};
```

### Member

```ts
type Member = {
  id: string;
  storeId?: string;
  name: string;
  phone: string;
  balance: number;
  note?: string;
  createdAt: string;
};
```

### ServiceSession

```ts
type ServiceSession = {
  id: string;
  storeId: string;
  roomId: string;
  staffId: string;
  memberId?: string | null;
  serviceItemId: string;
  startTime: string;
  endTime: string;
  actualEndTime?: string | null;
  status: 'active' | 'completed' | 'cancelled';
  isRequested: boolean;
  note?: string;
};
```

### Order

```ts
type Order = {
  id: string;
  storeId: string;
  sessionId: string;
  orderNo: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: 'cash' | 'credit_card' | 'line_pay' | 'transfer' | 'member_balance' | 'other';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  createdAt: string;
  paidAt?: string | null;
};
```

---

## 6. 先不要做死的部分

以下內容先用 mock / 可設定形式，不要寫死：

```txt
房間數量
師傅數量
服務項目
服務價格
服務時間
輪牌細則
指名規則
清消時間
付款方式
店別設定
會員制度
折扣規則
報表格式
```

---

## 7. Phase 1 驗收條件

完成後應該可以做到：

```txt
可以 npm install / npm run dev 啟動
可以看到 AnMoPOS 主控台
可以切換或顯示兩家店資料概念
可以看到房態卡片
可以看到師傅輪牌
可以快速開單
開單後房間變服務中
開單後師傅變服務中
房間倒數會跑
剩下 10 分鐘會紅色提醒
可以結帳
結帳後房間進入清消中
結帳後師傅回到輪牌
今日營收會更新
資料可先保存到 localStorage
```

---

## 8. 請 Codex 第一輪實作內容

請先完成以下任務：

```txt
你是一位資深全端工程師。請根據目前 ZIP 原型與本文件，建立 AnMoPOS 初版按摩店 POS 系統。

第一輪只做 Phase 1：
1. 建立可啟動的 Vite + React + Tailwind 專案。
2. 重構目前的 Dashboard、RoomGrid、StaffQueue、Sidebar。
3. 建立 mockStores、mockRooms、mockStaff、mockServices、mockMembers。
4. 建立 Zustand 或 React Context 狀態管理。
5. 完成快速開單 Modal。
6. 完成結帳 Modal。
7. 完成房間倒數與 10 分鐘警示。
8. 完成一般派工與結帳後輪牌移動。
9. 今日營收與今日開單數要會更新。
10. README 補上啟動方式與目前功能說明。

請避免過度工程化，第一階段重點是能展示、能操作、能讓公司討論流程。
```
