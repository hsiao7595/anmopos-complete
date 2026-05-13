# 登入系統設置指南

## 快速開始

### 1️⃣ 更新數據庫

```bash
cd E:\Claude\內部人員使用\backend

# 生成新的migration
npx prisma migrate dev --name add_accounts

# 初始化預設帳號
curl -X PUT http://localhost:3000/api/auth/accounts
```

### 2️⃣ 訪問登入頁面

```
http://localhost:3000/login
```

### 3️⃣ 預設帳號

**帳號：** admin  
**密碼：** demo123

## 系統功能

### 登入頁面 (`/login`)

- 選擇店鋪
- 輸入帳號和密碼
- 自動初始化預設帳號
- 保存登入信息到localStorage

### 認證API

#### POST `/api/auth/login`
```json
{
  "username": "admin",
  "password": "demo123",
  "storeId": "store-1"
}
```

**回傳：**
```json
{
  "success": true,
  "accountId": "...",
  "username": "admin",
  "fullName": "管理員",
  "role": "admin",
  "store": {
    "id": "store-1",
    "name": "足不老"
  }
}
```

#### GET `/api/auth/accounts?storeId=store-1`
獲取該店鋪的所有帳號列表

#### POST `/api/auth/accounts`
建立新帳號

```json
{
  "storeId": "store-1",
  "username": "user1",
  "password": "password123",
  "fullName": "使用者名稱",
  "employeeNo": "YS001",
  "role": "staff"
}
```

#### POST `/api/auth/logout`
登出（清除cookie和session）

#### PUT `/api/auth/accounts`
初始化所有店鋪的預設帳號

## 帳號管理

### 建立新帳號

```bash
curl -X POST http://localhost:3000/api/auth/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "storeId": "store-1",
    "username": "user1",
    "password": "mypassword",
    "fullName": "使用者一號",
    "employeeNo": "YS001",
    "role": "staff"
  }'
```

### 帳號角色

- **admin** - 管理員，全部權限
- **manager** - 經理，報表和分析權限
- **staff** - 員工，只能查看自己的數據

### 帳號狀態

- **active** - 可用
- **inactive** - 停用（無法登入）
- **locked** - 鎖定（被系統鎖定，需管理員解除）

## 後續步驟

### 1. 修改預設密碼

登入後應該立即修改密碼（需要建立密碼修改API）

### 2. 創建其他帳號

為每個員工建立獨立帳號

### 3. 保護受限頁面

在dashboard等頁面添加認證檢查

### 4. 使用bcrypt加密密碼

生產環境中應使用bcrypt而不是明文儲存

## 故障排除

### 預設帳號初始化失敗

**解決：**
```bash
# 手動執行初始化
curl -X PUT http://localhost:3000/api/auth/accounts

# 或在Prisma Studio中手動建立
npx prisma studio
```

### 無法登入

1. 確認帳號狀態不是 locked 或 inactive
2. 確認密碼正確
3. 檢查store-id是否正確
4. 查看server日誌

### 忘記密碼

**臨時解決方案：**

在Prisma Studio中修改：
```bash
npx prisma studio
```

或使用API更新（需要先實現）

## 數據庫

### Account 表結構

| 欄位 | 類型 | 說明 |
|-----|------|------|
| id | String | 主鍵 |
| storeId | String | 所屬店鋪 |
| username | String | 帳號（全系統唯一） |
| password | String | 密碼（應使用bcrypt加密） |
| employeeNo | String | 員工編號 |
| fullName | String | 全名 |
| role | String | 角色（admin/manager/staff） |
| status | String | 狀態（active/inactive/locked） |
| lastLogin | DateTime | 最後登入時間 |
| createdAt | DateTime | 建立時間 |
| updatedAt | DateTime | 更新時間 |

## 下一步計畫

- [ ] 建立密碼修改API
- [ ] 實現密碼重置功能
- [ ] 使用bcrypt加密密碼
- [ ] 實現登入日誌記錄
- [ ] 添加二次認證（OTP）
- [ ] 實現角色權限控制
- [ ] 建立帳號管理頁面

---

**系統版本：** 1.0  
**最後更新：** 2026-05-08
