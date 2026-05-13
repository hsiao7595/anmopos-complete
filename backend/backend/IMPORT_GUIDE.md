# 足不老進客數據批量導入和分析指南

## 系統概述

本系統提供了完整的進客數據管理和分析功能：

- 📤 **批量導入** - 將Excel報表轉換為JSON並批量導入
- 📊 **項目分析** - 查看各服務項目的客戶分布和營收
- 📈 **統計報表** - 每日進客數據統計和分析

## 快速開始

### 步驟1：準備數據

執行Python轉換工具將Excel報表轉為JSON：

```bash
cd E:\Claude\內部人員使用\報表
python convert_reports.py
```

**生成檔案：**
- `E:\Claude\內部人員使用\報表\足不老\imported_data.json`
- `E:\Claude\內部人員使用\報表\imported_data_zubulao.json`

### 步驟2：啟動後台系統

```bash
cd E:\Claude\內部人員使用\backend
npm install  # 首次運行
npm run dev
```

系統啟動後：
- 前端：http://localhost:3000
- Dashboard：http://localhost:3000/dashboard
- 導入頁面：http://localhost:3000/import
- 分析頁面：http://localhost:3000/analysis

### 步驟3：導入數據

1. 訪問 **http://localhost:3000/import**
2. 點擊文件區域或拖入 `imported_data.json`
3. 點擊「🚀 開始導入」按鈕
4. 等待導入完成，檢查結果

### 步驟4：查看分析

1. 訪問 **http://localhost:3000/analysis**
2. 選擇店鋪、年份、月份
3. 點擊「🔍 查詢」按鈕
4. 查看項目分析統計

## 頁面說明

### 📤 導入頁面 (/import)

**功能：**
- 上傳JSON檔案進行批量導入
- 實時顯示導入進度和結果
- 顯示失敗記錄詳情

**使用流程：**
1. 選擇JSON檔案（可拖入）
2. 點擊「開始導入」
3. 查看成功/失敗統計
4. 檢查失敗原因（如有）

**API端點：**
```
POST /api/guest-entries/batch
Content-Type: application/json

{
  "entries": [
    {
      "storeId": "store-zubulao",
      "date": "2026-04-23",
      "arrivalTime": "10:04",
      "checkoutTime": "11:30",
      "people": 1,
      "serviceType": "60",
      "minutes": 60,
      "master": "68",
      "amount": 0,
      "paymentMethod": "cash",
      "paymentStatus": "paid",
      "note": "",
      "source": "import-report",
      "externalId": "report-2026-04-23-2"
    }
  ]
}
```

### 📊 分析頁面 (/analysis)

**功能：**
- 按店鋪、年份、月份查詢
- 顯示各服務項目的統計數據
- 視覺化客戶分布圖

**顯示內容：**
1. **概覽統計**
   - 總客戶人數
   - 總進客筆數
   - 總營收
   - 服務項目種類

2. **詳細統計表**
   - 服務項目名稱
   - 進客次數
   - 客戶人數
   - 佔比百分比
   - 營收金額

3. **視覺化圖表**
   - 客戶分布進度條
   - 自動排序（按客戶人數降序）

**API端點：**
```
GET /api/analysis/service-statistics?storeId=store-1&year=2026&month=4
```

**回傳格式：**
```json
{
  "storeId": "store-1",
  "period": "2026-04",
  "totalCustomers": 45,
  "totalAmount": 50000,
  "totalEntries": 32,
  "serviceStats": [
    {
      "service": "60",
      "count": 10,
      "people": 12,
      "percentage": "26.7",
      "amount": 12000
    }
  ]
}
```

## 數據流向

```
┌─────────────────┐
│  Excel進客表     │ (11504進客表.xlsx, 11505進客表.xlsx)
└────────┬────────┘
         │
         ▼
┌──────────────────────┐
│ Python轉換工具       │ (convert_reports.py)
│ - 讀取Excel          │
│ - 驗證數據           │
│ - 生成JSON          │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  imported_data.json   │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ 導入頁面 (/import)   │
│ - 上傳JSON          │
│ - 調用batch API     │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ POST /api/guest-     │
│ entries/batch        │
│ - 驗證數據           │
│ - 批量寫入DB        │
│ - 防止重複           │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ SQLite數據庫         │
│ GuestEntry表        │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ 分析頁面 (/analysis) │
│ - 選擇條件           │
│ - 調用analysis API  │
│ - 顯示統計結果       │
└──────────────────────┘
```

## 數據庫模型

### GuestEntry 表

```
id              String (主鍵)
storeId         String (店鋪ID)
date            String (YYYY-MM-DD)
arrivalTime     String (HH:MM)
people          Int (客戶人數)
serviceType     String (服務項目編碼)
minutes         Int (服務時長)
master          String (師傅編號)
room            String (房間號)
checkoutTime    String (結帳時間)
amount          Int (金額)
paymentMethod   String (支付方式)
note            String (備註)
source          String (數據來源: manual/pos/import)
externalId      String (外部ID，用於去重)
createdAt       DateTime
updatedAt       DateTime
```

## 常見問題

### Q: 為什麼導入後看不到數據？

**A:** 檢查以下事項：
1. 確保導入顯示成功（✅）
2. 檢查店鋪ID是否正確（store-zubulao → store-1）
3. 確保數據的日期格式正確（YYYY-MM-DD）
4. 查看瀏覽器console是否有錯誤

### Q: 可以重複導入同一個月份的數據嗎？

**A:** 可以。系統使用 `externalId` 作為唯一標識，相同的 `externalId` 會更新而不是重複插入。

### Q: 如何修改導入的數據？

**A:** 目前支持三種方式：
1. 通過API直接修改 `/api/guest-entries/{id}`
2. 重新導入相同 `externalId` 的數據（會更新）
3. 刪除後重新導入

### Q: 分析頁面為什麼沒有顯示某個月份的數據？

**A:** 可能原因：
1. 該月份沒有導入過數據
2. 選擇了錯誤的店鋪
3. 日期格式不正確

## 服務編碼對照表

| Excel代碼 | 說明 | 範例 |
|----------|------|------|
| 60 | 足底按摩60分鐘 | 一般足療 |
| 指1 | 全身指壓60分鐘 | 指壓服務 |
| 指2 | 全身指壓90分鐘 | 指壓服務 |
| 油2 | 全身油推90分鐘 | 油推服務 |
| 60/60 | 足底60+指壓60 | 組合套餐 |
| 40/90指 | 足底40+指壓90 | 組合套餐 |
| 掏耳 | 掏耳服務 | 附加服務 |
| 修腳 | 修足指甲 | 附加服務 |

完整對應表見：`E:\Claude\內部人員使用\報表\README_IMPORT.md`

## 技術架構

### 後端
- **框架：** Next.js (App Router)
- **數據庫：** SQLite with Prisma ORM
- **API：** RESTful

### 前端
- **框架：** React 18
- **樣式：** Tailwind CSS
- **狀態管理：** useState

### 實時通信
- **WebSocket：** Socket.io
- **POS系統集成**（可選）

## 部署到生產環境

### 準備環境變數

編輯 `.env.production`：
```
DATABASE_URL="file:./data/prod.db"
NEXTAUTH_URL="https://your-domain.com"
```

### 構建並啟動

```bash
npm run build
npm start
```

## 故障排除

### 導入報 "externalId is already unique" 錯誤

**解決：** 某條記錄的 externalId 已存在。如要覆蓋，需要先刪除原記錄或修改 externalId。

### 查詢時返回空結果

**檢查清單：**
1. 確認數據已導入（檢查import頁面結果）
2. 檢查店鋪ID映射是否正確
3. 確認選擇的月份有數據
4. 查看 SQLite 數據庫文件是否存在

### 批量導入超時

**解決：**
1. 減少單次導入的記錄數（分次導入）
2. 檢查JSON格式是否正確
3. 查看後端server.js日誌

## 維護和監控

### 定期備份

```bash
# 備份數據庫
cp prisma/dev.db ./backups/dev_$(date +%Y%m%d).db
```

### 日誌檢查

監控 stdout/stderr 獲取：
- 導入進度
- API調用日誌
- 錯誤信息

### 性能優化

- 使用索引加速查詢：`date`, `storeId`, `serviceType`
- 定期清理舊數據（根據業務需求）

## 聯絡與支持

**文件位置：**
- 轉換工具：`E:\Claude\內部人員使用\報表\convert_reports.py`
- 批量導入API：`E:\Claude\內部人員使用\backend\app\api\guest-entries\batch\route.ts`
- 導入頁面：`E:\Claude\內部人員使用\backend\app\import\page.tsx`
- 分析頁面：`E:\Claude\內部人員使用\backend\app\analysis\page.tsx`

---

**系統版本：** 1.0  
**最後更新：** 2026-05-08  
**維護人：** Claude Code
