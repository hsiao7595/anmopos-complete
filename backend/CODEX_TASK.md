# CODEX_TASK.md

## 任務
請根據本資料夾內的 `AGENTS.md` 與本文件，建立一套「御手足悦 × 足不老｜雙店營運數據管理系統」第一版 MVP。

## 目標
建立一個可以在本機或伺服器運行的雙店營運統計後台。

第一版只需要完成：
1. 登入
2. 店家切換
3. 每日營運資料輸入
4. 月報表
5. 年報表
6. Excel 匯出
7. PDF 匯出
8. 列印樣式

請不要先做完整 POS 結帳功能。
第一階段只做營運統計。

---

# 一、專案需求

## 系統名稱
正式名稱：
御手足悦 × 足不老｜雙店營運數據管理系統

內部簡稱：
雙店 POS 統計後台

第一階段模組名稱：
進客分析統計表

## 適用店家
1. 御手足悦按摩養生會館
2. 足不老養生莊園

---

# 二、角色與權限

## 角色

| 角色 | 權限 |
|---|---|
| admin | 可查看兩家店所有資料、修改資料、匯出報表 |
| manager | 只能查看與管理自己店家的資料 |
| frontdesk | 可以新增每日資料、修改當日資料 |
| accountant | 可以查看報表、匯出 Excel / PDF，不一定能修改資料 |

## 權限規則
- admin 可以切換兩家店，也可以看合併統計。
- manager 只能看到自己 store_id 的資料。
- frontdesk 可以新增與編輯資料，但不要讓他管理使用者。
- accountant 只能查詢、匯出、列印。

---

# 三、每日輸入欄位

每日櫃台需要輸入：

| 欄位 | 說明 |
|---|---|
| store_id | 店家 |
| report_date | 日期 |
| morning_customers | 早班進客數 |
| afternoon_customers | 中班進客數 |
| evening_customers | 晚班進客數 |
| working_masters | 上班師傅數 |
| idle_masters | 空班師傅數 |
| lost_customers | 流失數 |
| note | 備註 |

系統自動計算：

```ts
total_customers = morning_customers + afternoon_customers + evening_customers
average_customers_per_master = working_masters > 0 ? total_customers / working_masters : 0
lost_rate = total_customers > 0 ? lost_customers / total_customers : 0
```

---

# 四、報表統計規則

## 上半月統計
日期範圍：每月 1 日～15 日

統計欄位：
- 早班總計
- 中班總計
- 晚班總計
- 進客數總計
- 上班師傅總計
- 空班師傅總計
- 流失數總計
- 上半月平均值

## 下半月統計
日期範圍：每月 16 日～月底

統計欄位：
- 早班總計
- 中班總計
- 晚班總計
- 進客數總計
- 上班師傅總計
- 空班師傅總計
- 流失數總計
- 下半月平均值

## 全月統計
日期範圍：整個月份

統計欄位：
- 早班總計
- 中班總計
- 晚班總計
- 進客數總計
- 上班師傅總計
- 空班師傅總計
- 流失數總計
- 全月平均值

## 平均值計算
平均值以該區間「該月天數」為基準。
若該日期尚未輸入，可顯示 0，但請在統計邏輯中保留可調整成「只算已填日期」的彈性。

---

# 五、資料庫 Schema 建議

請使用 Prisma。

## Store

```prisma
model Store {
  id        Int      @id @default(autoincrement())
  name      String
  address   String?
  phone     String?
  status    String   @default("active")
  users     User[]
  reports   DailyReport[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## User

```prisma
model User {
  id           Int      @id @default(autoincrement())
  storeId      Int?
  store        Store?   @relation(fields: [storeId], references: [id])
  name         String
  email        String   @unique
  passwordHash String
  role         String
  status       String   @default("active")
  reports      DailyReport[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## DailyReport

```prisma
model DailyReport {
  id                 Int      @id @default(autoincrement())
  storeId            Int
  store              Store    @relation(fields: [storeId], references: [id])
  reportDate         DateTime
  morningCustomers   Int      @default(0)
  afternoonCustomers Int      @default(0)
  eveningCustomers   Int      @default(0)
  totalCustomers     Int      @default(0)
  workingMasters     Int      @default(0)
  idleMasters        Int      @default(0)
  lostCustomers      Int      @default(0)
  note               String?
  createdById        Int?
  createdBy          User?    @relation(fields: [createdById], references: [id])
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  @@unique([storeId, reportDate])
}
```

---

# 六、必要頁面

## `/login`
登入頁。

## `/dashboard`
登入後首頁。

顯示：
- 今日進客數
- 本月累積進客數
- 本月平均每日進客
- 今日上班師傅數
- 今日流失數
- 本月流失數
- 店家切換

## `/daily-reports`
每日資料輸入與編輯頁。

功能：
- 選擇店家
- 選擇日期
- 輸入早班、中班、晚班
- 輸入上班師傅、空班師傅、流失數
- 輸入備註
- 儲存
- 修改
- 刪除

注意：同一家店同一天只能有一筆資料。

## `/reports/monthly`
月報表。

功能：
- 選擇店家
- 選擇年份
- 選擇月份
- 顯示每日資料
- 顯示上半月總計
- 顯示上半月平均值
- 顯示下半月總計
- 顯示下半月平均值
- 顯示全月總計
- 顯示全月平均值
- 匯出 Excel
- 匯出 PDF
- 列印

## `/reports/yearly`
年度報表。

功能：
- 選擇店家
- 選擇年份
- 依照 1 月～12 月顯示統計
- 顯示年度總計
- 顯示年度平均
- 匯出 Excel
- 匯出 PDF
- 列印

## `/stores`
店家管理頁。

第一版預設兩家店即可。

## `/users`
使用者管理頁。

功能：
- 新增使用者
- 修改使用者
- 停用使用者
- 設定角色
- 設定所屬店家

---

# 七、月報表表格格式

月報表請盡量接近傳統 Excel 報表。

| 日期 | 早班 | 中班 | 晚班 | 進客數 | 上班師傅 | 空班師傅 | 流失數 |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1日 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2日 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| ... |  |  |  |  |  |  |  |
| 15日 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 上半月總計 |  |  |  |  |  |  |  |
| 上半月平均值 |  |  |  |  |  |  |  |
| 16日 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| ... |  |  |  |  |  |  |  |
| 月底 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 下半月總計 |  |  |  |  |  |  |  |
| 下半月平均值 |  |  |  |  |  |  |  |
| 全月總計 |  |  |  |  |  |  |  |
| 全月平均值 |  |  |  |  |  |  |  |

---

# 八、年度報表表格格式

| 月份 | 早班 | 中班 | 晚班 | 總進客 | 平均進客 | 上班師傅 | 空班師傅 | 流失數 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 1月 |  |  |  |  |  |  |  |  |
| 2月 |  |  |  |  |  |  |  |  |
| 3月 |  |  |  |  |  |  |  |  |
| 4月 |  |  |  |  |  |  |  |  |
| 5月 |  |  |  |  |  |  |  |  |
| 6月 |  |  |  |  |  |  |  |  |
| 7月 |  |  |  |  |  |  |  |  |
| 8月 |  |  |  |  |  |  |  |  |
| 9月 |  |  |  |  |  |  |  |  |
| 10月 |  |  |  |  |  |  |  |  |
| 11月 |  |  |  |  |  |  |  |  |
| 12月 |  |  |  |  |  |  |  |  |
| 年度總計 |  |  |  |  |  |  |  |  |
| 年度平均 |  |  |  |  |  |  |  |  |

---

# 九、API Routes 建議

請建立以下 API：

```txt
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/stores
POST   /api/stores
PATCH  /api/stores/:id
GET    /api/users
POST   /api/users
PATCH  /api/users/:id
GET    /api/daily-reports
POST   /api/daily-reports
PATCH  /api/daily-reports/:id
DELETE /api/daily-reports/:id
GET    /api/reports/monthly
GET    /api/reports/yearly
GET    /api/reports/monthly/export-excel
GET    /api/reports/monthly/export-pdf
GET    /api/reports/yearly/export-excel
GET    /api/reports/yearly/export-pdf
```

---

# 十、資料驗證

每日資料輸入需驗證：
- 日期必填
- 店家必填
- 早班、中班、晚班不可為負數
- 上班師傅不可為負數
- 空班師傅不可為負數
- 流失數不可為負數
- 空值自動轉為 0

---

# 十一、Seed Data

請建立初始店家：

```ts
[
  {
    name: "御手足悦按摩養生會館",
    status: "active"
  },
  {
    name: "足不老養生莊園",
    status: "active"
  }
]
```

請建立初始管理員：

```ts
{
  name: "系統管理員",
  email: "admin@example.com",
  password: "admin123456",
  role: "admin",
  status: "active"
}
```

密碼需 hash 後存入資料庫。

---

# 十二、第二階段預留擴充

請在架構上保留未來可以擴充以下功能：
- 服務項目管理
- 價格管理
- 結帳功能
- 現金／刷卡／轉帳／行動支付
- 會員管理
- 會員儲值
- 會員消費紀錄
- 優惠券管理
- 師傅排班
- 師傅業績
- 師傅抽成
- 月結獎金
- 客戶來源分析
- 回訪紀錄
- 兩店營收比較
- 圖表分析

但第一階段請不要實作這些功能。

---

# 十三、請先執行的工作

請 Codex 先完成以下步驟：

1. 建立 Next.js + TypeScript + Tailwind 專案。
2. 安裝 Prisma 與 SQLite。
3. 建立 Prisma schema。
4. 建立 seed script。
5. 建立登入與權限基礎架構。
6. 建立主要 layout 與 sidebar。
7. 建立 daily report CRUD。
8. 建立 monthly report 查詢與統計 utility。
9. 建立 yearly report 查詢與統計 utility。
10. 建立 Excel / PDF 匯出。
11. 建立 print CSS。
12. 更新 README，提供安裝與啟動方式。

---

# 十四、驗收標準

完成後請確認：

- `npm install` 可以安裝依賴。
- `npx prisma migrate dev` 可以建立資料庫。
- `npm run seed` 可以建立兩家店與管理員。
- `npm run dev` 可以啟動系統。
- 管理員可以登入。
- 管理員可以切換店家。
- 每日資料可以新增、修改、刪除。
- 月報表可以正確統計。
- 年報表可以正確統計。
- Excel 可以匯出。
- PDF 可以匯出。
- 列印版面可用。
