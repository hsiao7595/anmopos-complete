# PowerShell Script to convert Excel 通訊錄 to JSON

# 設定路徑
$yushouPath = "E:\Claude\內部人員使用\業績抽成表\御手-通訊錄.xlsx"
$zubulaoPath = "E:\Claude\內部人員使用\業績抽成表\足不老師傅-通訊錄.xlsx"
$outputPath = "E:\Claude\現場櫃台使用\anmopos\src\data\staffSchedule.js"

# 讀取 Excel 的函數
function Read-ExcelFile {
    param(
        [string]$filePath,
        [string]$storeName
    )

    $excel = New-Object -ComObject Excel.Application
    $excel.Visible = $false
    
    $workbook = $excel.Workbooks.Open($filePath)
    $worksheet = $workbook.Sheets(1)
    
    $data = @()
    
    # 讀取資料（從第3列開始，直到空白行）
    $row = 3
    while ($true) {
        $staffNo = $worksheet.Cells($row, 1).Value
        if ($null -eq $staffNo -or $staffNo -eq "") {
            break
        }
        
        $name = $worksheet.Cells($row, 3).Value
        $shift = $worksheet.Cells($row, 4).Value
        
        if ($null -ne $shift -and $shift -ne "") {
            # 標準化時段格式 (移除空格)
            $shift = $shift -replace '\s+', ''
            
            $staffObj = @{
                staffNo = [string]$staffNo
                name = [string]$name
                shift = [string]$shift
            }
            
            # 足不老有額外的「孕婦」欄
            if ($storeName -eq "store-zubulao") {
                $tag = $worksheet.Cells($row, 2).Value
                if ($null -ne $tag -and $tag -ne "") {
                    $staffObj.tag = [string]$tag
                }
            }
            
            $data += $staffObj
        }
        
        $row++
    }
    
    $workbook.Close()
    $excel.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
    
    return $data
}

# 讀取兩份 Excel
Write-Host "正在讀取御手足悦通訊錄..."
$yushouData = Read-ExcelFile $yushouPath "store-main"

Write-Host "正在讀取足不老師傅通訊錄..."
$zubulaoData = Read-ExcelFile $zubulaoPath "store-zubulao"

# 轉成 JSON 並寫入檔案
$jsContent = @"
export const staffSchedule = {
  'store-main': $($yushouData | ConvertTo-Json -Depth 10),
  'store-zubulao': $($zubulaoData | ConvertTo-Json -Depth 10),
};
"@

$jsContent | Out-File -FilePath $outputPath -Encoding UTF8
Write-Host "已寫入 $outputPath"
