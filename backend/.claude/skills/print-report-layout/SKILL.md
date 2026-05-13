---
name: print-report-layout
description: Generate print-friendly CSS and layout for A4 monthly/yearly reports — no backgrounds, compact tables, page-break control
type: user-invocable
---

# Print Report Layout

You are creating or optimizing **A4 print layouts** for the massage store management reports.

## Print requirements
- Paper: A4 (210×297mm), portrait
- Margins: 15mm all sides
- Font: system-ui or serif for print
- Tables: collapse borders, 0.5px solid #999
- Remove: navigation, sidebar, buttons, shadows, rounded corners
- Keep: title, store name, date range, table data, totals, averages

## CSS print media query pattern
```css
@media print {
  .no-print { display: none !important; }
  body { font-size: 11pt; color: #000; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 0.5px solid #999; padding: 3px 6px; }
  tr.report-summary { background: #f5f5f5 !important; font-weight: bold; }
  tr.report-grand { background: #e8e8e8 !important; font-weight: bold; }
  @page { size: A4 portrait; margin: 15mm; }
}
```

## Report title format
`民國{year-1911}年{month}月 {storeName} 各班進客分析表`

## When invoked
1. Add `.no-print` class to nav/buttons
2. Apply print CSS to tables
3. Add `@page` rule
4. Test with `window.print()` — report must fit on 1–2 A4 pages
5. Ensure totals rows are visually distinct

Target file: `E:\Claude\按摩店POS系統\styles.css` and `E:\Claude\按摩店POS系統\index.html`
