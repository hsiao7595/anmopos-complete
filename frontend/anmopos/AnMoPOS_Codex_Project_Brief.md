# AnMoPOS 初版 POS 系統｜Codex 開發任務包

> 用途：本文件可直接貼給 Codex / Claude Code，作為「御手足悦 × 足不老」按摩店 POS 系統的初版開發規格。  
> 初版方向：先以目前 ZIP 內的 `Massage_POS_Prototype_Default` 作為 UI / 功能原型，名稱暫稱 **AnMoPOS**。後續再依公司實際作業流程調整。

---

## 1. 專案目標

請以目前提供的 React 原型為基礎，開發一套按摩店專用 POS / 現場營運管理系統。

此系統初期服務兩家按摩品牌：

1. **御手足悦按摩養生會館**
2. **足不老養生莊園**

初版不需要一次做到完整商業系統，但架構必須預留未來擴充：

- 多店別管理
- 房態看板
- 師傅輪牌
- 快速開單
- 服務倒數與提醒
- 會員儲值 / 核銷
- 結帳 / 付款紀錄
- 每日 / 每月 / 每年統計
- 後台登入與權限管理
- 跨店報表

---

## 2. 目前 ZIP 原型內容

目前 ZIP 檔案內容如下：

```txt
README.md
logic/RotationAlgorithm.js
src/components/Dashboard.jsx
src/components/RoomGrid.jsx
src/components/Sidebar.jsx
src/components/StaffQueue.jsx
```

### 目前已具備的概念

- `Dashboard.jsx`：主控台畫面，包含房態、側邊功能選單、師傅輪牌區。
- `RoomGrid.jsx`：房間狀態卡片，支援：服務中、空房、清消中、10 分鐘內紅色警示。
- `StaffQueue.jsx`：師傅大輪待命區與忙碌區。
- `Sidebar.jsx`：快速開單、輪牌管理、會員儲值核銷、跨店報表、換房 / 換師傅、結帳與發票。
- `RotationAlgorithm.js`：輪牌初步邏輯。

---

## 3. 技術方向

請優先使用以下架構：

```txt
Frontend: React + Tailwind CSS
State: 先用 React state / Zustand，後續可接 API
Backend: Node.js / Express 或 Next.js API Routes
Database: PostgreSQL / SQLite / Prisma ORM
Auth: Admin / 店長 / 櫃台 / 師傅 權限
Deployment: 後續可依公司環境調整
```

若要快速原型，可以先做：

```txt
Vite + React + Tailwind + Zustand + localStorage mock data
```

但請保留資料層抽象，未來可以改接正式資料庫。

---

## 4. 建議專案目錄

請將目前原型整理成以下結構：

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
│  │  │  └─ CheckoutPanel.jsx
│  │  ├─ members/
│  │  │  ├─ MemberSearch.jsx
│  │  │  └─ MemberProfile.jsx
│  │  └─ common/
│  │     ├─ Button.jsx
│  │     ├─ Badge.jsx
│  │     └─ Modal.jsx
│  ├─ data/
│  │  ├─ mockRooms.js
│  │  ├─ mockStaff.js
│  │  ├─ mockServices.js
│  │  └─ mockStores.js
│  ├─ logic/
│  │  ├─ rotationLogic.js
│  │  ├─ roomStatusLogic.js
│  │  ├─ checkoutLogic.js
│  │  └─ reportLogic.js
│  ├─ store/
│  │  ├─ useRoomStore.js
│  │  ├─ useStaffStore.js
│  │  ├─ useOrderStore.js
│  │  └─ useAuthStore.js
│  ├─ pages/
│  │  ├─ DashboardPage.jsx
│  │  ├─ ReportsPage.jsx
│  │  ├─ MembersPage.jsx
│  │  ├─ StaffPage.jsx
│  │  ├─ SettingsPage.jsx
│  │  └─ LoginPage.jsx
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

## 5. 初版核心畫面

### 5.1 登入頁

角色先分為：

- Super Admin：最高管理者，可看全部店別與全部報表。
- Store Admin：店長 / 管理者，只看指定店。
- Counter Staff：櫃台，可開單、結帳、換房、輪牌。
- Therapist：師傅，可看自己排班、狀態、服務紀錄。

初版可先使用 mock login，不必接正式會員系統。

---

### 5.2 主控台 Dashboard

主控台需延續目前原型風格：

- 深色背景
- 房態卡片清楚
- 右側功能按鈕
- 下方師傅輪牌
- 上方統計列

主控台上方統計：

```txt
今日營收
今日開單數
待命師傅
服務中師傅
空房數
服務中房數
清消中房數
```

---

### 5.3 房態看板

每個房間卡片需顯示：

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

狀態顏色建議：

```txt
空房：綠色
服務中：藍色
剩餘 10 分鐘內：紅色閃爍
清消中：橘色
維修中：灰色
```

---

### 5.4 快速開單

點擊「快速開單 / 接客」後，開啟 Modal。

欄位：

```txt
店別
房號
客人類型：一般 / 會員
會員搜尋
服務項目
服務時間
師傅選擇：依大輪 / 指名 / 指派
付款狀態：未付款 / 已付款 / 儲值扣款
備註
```

開單完成後：

- 房間狀態改為服務中
- 師傅狀態改為服務中
- 建立 Order / ServiceSession
- 開始倒數
- 若不是指名，師傅完成後移到輪牌最後
- 若是指名，依規則回到原位或不影響大輪

---

### 5.5 師傅輪牌

目前原型已經有：

```txt
大輪待命區
服務中 Busy
指名標記
```

請擴充成：

```txt
待命
服務中
休息
外出
請假
下班
指名
跳過
鎖定順位
```

輪牌基本規則：

1. 一般客依大輪第一位派工。
2. 指名客不影響大輪順位，或依公司後續規則調整。
3. 一般服務完成後，師傅移到隊伍最後。
4. 若師傅休息 / 外出 / 請假，不參與大輪。
5. 可由管理者手動調整順位。
6. 所有輪牌異動需保留紀錄，方便查詢。

---

### 5.6 換房 / 換師傅

功能需求：

```txt
選擇目前房間
選擇新房間
可保留原本倒數時間
可更換師傅
可輸入原因
保留操作紀錄
```

---

### 5.7 結帳

結帳欄位：

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

結帳完成後：

- 訂單狀態改為已結帳
- 房間進入清消中
- 師傅依輪牌規則回到隊列
- 寫入營收報表

---

### 5.8 會員儲值 / 核銷

初版可先支援基本會員資料：

```txt
會員編號
姓名
手機
儲值餘額
消費紀錄
儲值紀錄
核銷紀錄
備註
```

會員操作：

```txt
新增會員
搜尋會員
儲值
扣款
查看紀錄
```

---

### 5.9 報表統計

初版至少要有：

```txt
今日營收
每日營收
每月營收
每年營收
店別營收比較
服務項目統計
師傅業績統計
付款方式統計
會員儲值統計
```

後台可依：

```txt
日期區間
店別
師傅
服務項目
付款方式
```

進行篩選。

---

## 6. 資料模型初版

### Store

```ts
type Store = {
  id: string;
  name: string;
  code: string;
  address?: string;
  phone?: string;
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
  cleanUntil?: string | null;
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

### RotationLog

```ts
type RotationLog = {
  id: string;
  storeId: string;
  staffId: string;
  action: 'assign' | 'complete' | 'skip' | 'manual_move' | 'rest' | 'back_to_queue';
  beforeIndex?: number;
  afterIndex?: number;
  reason?: string;
  createdAt: string;
  operatorId: string;
};
```

---

## 7. 開發優先順序

請依照以下順序開發：

### Phase 1：可操作原型

- 建立 Vite React 專案
- 接上 Tailwind
- 重構目前 Dashboard / RoomGrid / StaffQueue / Sidebar
- 加入 mock data
- 房間倒數每分鐘更新
- 10 分鐘提醒
- 快速開單 Modal
- 結帳 Modal
- 師傅輪牌基本移動

### Phase 2：營運資料完整化

- 會員資料
- 儲值 / 核銷
- 每日營收統計
- 師傅業績
- 付款方式統計
- localStorage 保存資料

### Phase 3：後台與資料庫

- 登入權限
- PostgreSQL / Prisma
- API routes
- 多店別資料隔離
- 報表查詢
- 操作紀錄

### Phase 4：公司流程調整

- 依公司實際輪牌規則調整
- 依現場房間數調整
- 依服務項目與價格調整
- 依會員制度調整
- 依付款 / 發票 / 報表需求調整

---

## 8. UI 風格規範

請延續目前原型：

```txt
整體：深色後台系統
主色：emerald / slate
警示：red / amber
資訊：blue
字體：清楚、數字可讀性高
按鈕：大顆、方便櫃台快速操作
版面：房態為主，師傅輪牌固定在下方
```

避免過度花俏，重點是現場櫃台能快速看懂。

---

## 9. Codex 開始執行指令

請 Codex 依照以下方式執行：

```txt
你是一位資深全端工程師，請根據本文件建立 AnMoPOS 初版按摩店 POS 系統。

請先完成 Phase 1：
1. 使用 Vite + React + Tailwind 建立專案。
2. 將目前 ZIP 內的 Dashboard、RoomGrid、StaffQueue、Sidebar 重構成正式結構。
3. 加入 mock data，資料放在 src/data。
4. 加入 Zustand 或 React Context 管理房態、師傅、訂單狀態。
5. 完成快速開單 Modal。
6. 完成結帳 Modal。
7. 完成房間倒數與 10 分鐘警示。
8. 完成一般派工與服務完成後輪牌移動。
9. 所有程式碼需保持可讀、可擴充，並在 README 說明如何啟動。

請不要一次做太大，先讓系統可以啟動、可以操作、可以展示給公司看。
```

---

## 10. 初版驗收條件

Phase 1 完成後，系統應能做到：

```txt
可以啟動前端畫面
可以看到兩家店的 POS 主控台概念
可以看到房態卡片
可以看到師傅輪牌
可以快速開單
開單後房間變成服務中
開單後師傅變成服務中
房間倒數會跑
剩下 10 分鐘會紅色提醒
可以結帳
結帳後房間進入清消中
結帳後師傅回到輪牌
今日營收會更新
```

---

## 11. 注意事項

- 初版先不要把需求做死，因為公司後續會調整流程。
- 所有資料欄位要可擴充。
- 所有輪牌規則要獨立放在 `logic/rotationLogic.js`，不要寫死在畫面元件裡。
- 報表邏輯要獨立放在 `logic/reportLogic.js`。
- 會員儲值與消費紀錄未來可能會變複雜，資料結構要保留交易紀錄概念。
- UI 要以櫃台現場好操作為第一優先。
- 暫時不處理醫療、療效、推拿功效等文案，只作為內部營運 POS 系統。

---

## 12. 後續待公司確認事項

以下內容先保留，等公司確認後再修改：

```txt
實際店別數量
實際房間數量
房號命名規則
師傅編號規則
輪牌規則
指名是否影響大輪
清消時間
服務項目
價格表
會員儲值方案
折扣規則
付款方式
報表格式
權限角色
是否需要發票串接
是否需要 LINE / 簡訊通知
是否需要雲端同步
是否需要平板 / 手機版
```
