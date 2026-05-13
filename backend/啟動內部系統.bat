@echo off
chcp 65001 >nul
title 內部管理系統

echo.
echo  ==============================
echo   內部管理系統 啟動中...
echo  ==============================
echo.

cd /d "%~dp0backend"

if not exist "node_modules" (
    echo  正在安裝必要套件，請稍候...
    call npm install --legacy-peer-deps
    echo.
)

echo  啟動成功！請在瀏覽器開啟：
echo.
echo    管理後台 API：  http://localhost:3000
echo    即時監控面板：  http://localhost:3000/dashboard
echo.
echo  同時請用瀏覽器直接開啟：
echo    %~dp0index.html
echo.
echo  關閉此視窗即可停止系統。
echo  ==============================
echo.

start "" "http://localhost:3000/dashboard"
start "" "%~dp0index.html"
call npm run dev
