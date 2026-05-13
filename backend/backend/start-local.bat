@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo 🚀 按摩店POS 本地開發環境啟動
echo ==================================
echo.

REM 檢查 Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安裝
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js 版本: %NODE_VERSION%
echo.

REM 檢查並安裝依賴
if not exist "node_modules" (
    echo 📦 安裝依賴中...
    call npm install
    echo.
)

REM 檢查並初始化數據庫
if not exist "prisma\dev.db" (
    echo 🗄️ 初始化數據庫...
    call npm run seed
    echo.
)

REM 啟動服務
echo 🌐 啟動服務...
echo.
echo 後台進場系統: http://localhost:3000
echo Socket.io 服務器: http://localhost:3001
echo Prisma Studio: npm run prisma:studio
echo.
echo 按 Ctrl+C 停止
echo.

call npm run dev

pause
