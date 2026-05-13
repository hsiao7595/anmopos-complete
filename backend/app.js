const STORAGE_KEY = "massage-pos-v3";
const LEGACY_KEYS = ["massage-pos-v2", "massage-pos-reports-v1"];
const AUTH_KEY = "massage-pos-demo-auth";
const STAFF_AUTH_KEY = "massage-pos-staff-auth";
const STAFF_ACCOUNTS_KEY = "massage-pos-staff-accounts";
const POS_STORAGE_KEY = "anmopos-phase1-state";

const baseUsers = {
  hsiao: { name: "管理員", password: "demo123", roleType: "admin", views: ["owner", "manager", "frontdesk", "staffacc", "staffmgmt", "users"], defaultView: "users", builtIn: true },
  jj: { name: "負責人", password: "demo123", roleType: "owner", views: ["owner", "manager", "frontdesk", "staffacc", "staffmgmt"], defaultView: "owner", builtIn: true },
  FS: { name: "足不老店長", password: "demo123", roleType: "manager", storeId: "store-1", views: ["manager", "frontdesk", "staffacc", "staffmgmt"], defaultView: "manager", builtIn: true },
  YS: { name: "御手足悦店長", password: "demo123", roleType: "manager", storeId: "store-2", views: ["manager", "frontdesk", "staffacc", "staffmgmt"], defaultView: "manager", builtIn: true },
  FR: { name: "足不老櫃台", password: "demo123", roleType: "frontdesk", storeId: "store-1", views: ["frontdesk", "staffacc"], defaultView: "frontdesk", builtIn: true },
  YR: { name: "御手足悦櫃台", password: "demo123", roleType: "frontdesk", storeId: "store-2", views: ["frontdesk", "staffacc"], defaultView: "frontdesk", builtIn: true },
};

let demoUsers = { ...baseUsers };

const stores = [
  { id: "store-1", name: "足不老", color: "#6b7f57", className: "footold" },
  { id: "store-2", name: "御手足悦", color: "#b99a47", className: "yushou" },
];

// 完整師傅名單（來源：業績抽成表 Excel）
const MASTER_STAFF = {
  "store-1": [
    { staffNo: "ZBL1",   employeeNo: "1",   name: "蔡愛妮" },
    { staffNo: "ZBL2",   employeeNo: "2",   name: "王玲英" },
    { staffNo: "ZBL3",   employeeNo: "3",   name: "隨國明" },
    { staffNo: "ZBL5",   employeeNo: "5",   name: "樊敦無" },
    { staffNo: "ZBL6",   employeeNo: "6",   name: "李湘薇" },
    { staffNo: "ZBL7",   employeeNo: "7",   name: "王腓力" },
    { staffNo: "ZBL8",   employeeNo: "8",   name: "胡寶珍" },
    { staffNo: "ZBL9",   employeeNo: "9",   name: "吳姿容" },
    { staffNo: "ZBL11",  employeeNo: "11",  name: "林瑋杰" },
    { staffNo: "ZBL12",  employeeNo: "12",  name: "黃秀梅" },
    { staffNo: "ZBL13",  employeeNo: "13",  name: "張興和" },
    { staffNo: "ZBL16",  employeeNo: "16",  name: "倪赫" },
    { staffNo: "ZBL17",  employeeNo: "17",  name: "張育光" },
    { staffNo: "ZBL18",  employeeNo: "18",  name: "潘楚霏" },
    { staffNo: "ZBL19",  employeeNo: "19",  name: "李東昇" },
    { staffNo: "ZBL20",  employeeNo: "20",  name: "黃慧敏" },
    { staffNo: "ZBL21",  employeeNo: "21",  name: "陳修泉" },
    { staffNo: "ZBL22",  employeeNo: "22",  name: "吳惠敏" },
    { staffNo: "ZBL23",  employeeNo: "23",  name: "林姿辰" },
    { staffNo: "ZBL26",  employeeNo: "26",  name: "高婷婷" },
    { staffNo: "ZBL28",  employeeNo: "28",  name: "魏曼尼" },
    { staffNo: "ZBL29",  employeeNo: "29",  name: "彭賢寶" },
    { staffNo: "ZBL30",  employeeNo: "30",  name: "鐘梅花" },
    { staffNo: "ZBL31",  employeeNo: "31",  name: "宋卉穎" },
    { staffNo: "ZBL32",  employeeNo: "32",  name: "卓晏君" },
    { staffNo: "ZBL33",  employeeNo: "33",  name: "顏惠林" },
    { staffNo: "ZBL35",  employeeNo: "35",  name: "王耀慶" },
    { staffNo: "ZBL36",  employeeNo: "36",  name: "劉俊良" },
    { staffNo: "ZBL37",  employeeNo: "37",  name: "徐卉停" },
    { staffNo: "ZBL38",  employeeNo: "38",  name: "邱香蓮" },
    { staffNo: "ZBL39",  employeeNo: "39",  name: "劉依玲" },
    { staffNo: "ZBL50",  employeeNo: "50",  name: "李育茹" },
    { staffNo: "ZBL52",  employeeNo: "52",  name: "郭順昇" },
    { staffNo: "ZBL53",  employeeNo: "53",  name: "張富洋" },
    { staffNo: "ZBL55",  employeeNo: "55",  name: "蔡沂家" },
    { staffNo: "ZBL56",  employeeNo: "56",  name: "吳君穎" },
    { staffNo: "ZBL57",  employeeNo: "57",  name: "李芳品" },
    { staffNo: "ZBL58",  employeeNo: "58",  name: "吳靜妍" },
    { staffNo: "ZBL59",  employeeNo: "59",  name: "吳昭慧" },
    { staffNo: "ZBL60",  employeeNo: "60",  name: "黃禕婷" },
    { staffNo: "ZBL61",  employeeNo: "61",  name: "曾嘉慧" },
    { staffNo: "ZBL62",  employeeNo: "62",  name: "陳芝翎" },
    { staffNo: "ZBL65",  employeeNo: "65",  name: "陳湘芸" },
    { staffNo: "ZBL66",  employeeNo: "66",  name: "陳科瑋" },
    { staffNo: "ZBL68",  employeeNo: "68",  name: "劉益強" },
    { staffNo: "ZBL69",  employeeNo: "69",  name: "蕭昊宇" },
    { staffNo: "ZBL70",  employeeNo: "70",  name: "劉富安" },
    { staffNo: "ZBL71",  employeeNo: "71",  name: "吳紫琪" },
    { staffNo: "ZBL72",  employeeNo: "72",  name: "段怡萱" },
    { staffNo: "ZBL75",  employeeNo: "75",  name: "游社睿" },
    { staffNo: "ZBL77",  employeeNo: "77",  name: "楊汩浠" },
    { staffNo: "ZBL78",  employeeNo: "78",  name: "黃妍華" },
    { staffNo: "ZBL79",  employeeNo: "79",  name: "張玉美" },
    { staffNo: "ZBL80",  employeeNo: "80",  name: "段宜君" },
    { staffNo: "ZBL81",  employeeNo: "81",  name: "陳氏柳" },
    { staffNo: "ZBL82",  employeeNo: "82",  name: "謝若慈" },
    { staffNo: "ZBL83",  employeeNo: "83",  name: "周依辰" },
    { staffNo: "ZBL85",  employeeNo: "85",  name: "張華雄" },
    { staffNo: "ZBL86",  employeeNo: "86",  name: "許凱威" },
    { staffNo: "ZBL87",  employeeNo: "87",  name: "吳妮庭" },
    { staffNo: "ZBL88",  employeeNo: "88",  name: "黃最" },
    { staffNo: "ZBL89",  employeeNo: "89",  name: "恩雅綾" },
    { staffNo: "ZBL90",  employeeNo: "90",  name: "徐兆瑩" },
    { staffNo: "ZBL91",  employeeNo: "91",  name: "蕭晨鋕" },
    { staffNo: "ZBL92",  employeeNo: "92",  name: "鄒曉英" },
    { staffNo: "ZBL93",  employeeNo: "93",  name: "李梓安" },
    { staffNo: "ZBL95",  employeeNo: "95",  name: "陳勇吉" },
    { staffNo: "ZBL96",  employeeNo: "96",  name: "阮靜怡" },
    { staffNo: "ZBL98",  employeeNo: "98",  name: "羅楚甯" },
    { staffNo: "ZBL99",  employeeNo: "99",  name: "城鍾佩真" },
    { staffNo: "ZBL100", employeeNo: "100", name: "張慈" },
  ],
  "store-2": [
    { staffNo: "YS1",  employeeNo: "1",  name: "何家慶" },
    { staffNo: "YS2",  employeeNo: "2",  name: "莊月英" },
    { staffNo: "YS3",  employeeNo: "3",  name: "邱靖宸" },
    { staffNo: "YS5",  employeeNo: "5",  name: "林永晉" },
    { staffNo: "YS6",  employeeNo: "6",  name: "劉明昭" },
    { staffNo: "YS7",  employeeNo: "7",  name: "劉秀春" },
    { staffNo: "YS8",  employeeNo: "8",  name: "洪若馨" },
    { staffNo: "YS9",  employeeNo: "9",  name: "曾彩萍" },
    { staffNo: "YS10", employeeNo: "10", name: "歐乃瑜" },
    { staffNo: "YS11", employeeNo: "11", name: "高詩媛" },
    { staffNo: "YS12", employeeNo: "12", name: "簡郁峯" },
    { staffNo: "YS13", employeeNo: "13", name: "陳秀雯" },
    { staffNo: "YS15", employeeNo: "15", name: "郭牡丹" },
    { staffNo: "YS16", employeeNo: "16", name: "呂芳昇" },
    { staffNo: "YS17", employeeNo: "17", name: "袁園" },
    { staffNo: "YS18", employeeNo: "18", name: "陳彬楊" },
    { staffNo: "YS19", employeeNo: "19", name: "黃凱銘" },
    { staffNo: "YS20", employeeNo: "20", name: "敖桂英" },
    { staffNo: "YS21", employeeNo: "21", name: "黃明凱" },
    { staffNo: "YS22", employeeNo: "22", name: "楊薏薇" },
    { staffNo: "YS23", employeeNo: "23", name: "劉秀英" },
    { staffNo: "YS25", employeeNo: "25", name: "吳靖雯" },
    { staffNo: "YS26", employeeNo: "26", name: "陳思妘" },
    { staffNo: "YS27", employeeNo: "27", name: "錢君" },
    { staffNo: "YS28", employeeNo: "28", name: "吳宇傑" },
    { staffNo: "YS29", employeeNo: "29", name: "卓怡瑄" },
    { staffNo: "YS30", employeeNo: "30", name: "江淑芬" },
    { staffNo: "YS31", employeeNo: "31", name: "張思瑩" },
    { staffNo: "YS32", employeeNo: "32", name: "陳睿均" },
    { staffNo: "YS33", employeeNo: "33", name: "黃筱雯" },
    { staffNo: "YS35", employeeNo: "35", name: "丁政雄" },
    { staffNo: "YS36", employeeNo: "36", name: "李崇賢" },
    { staffNo: "YS37", employeeNo: "37", name: "邱逸驊" },
    { staffNo: "YS39", employeeNo: "39", name: "閭巧" },
    { staffNo: "YS50", employeeNo: "50", name: "陳至輝" },
    { staffNo: "YS51", employeeNo: "51", name: "林晉禓" },
    { staffNo: "YS52", employeeNo: "52", name: "陳昱翰" },
    { staffNo: "YS53", employeeNo: "53", name: "黃博瑋" },
    { staffNo: "YS55", employeeNo: "55", name: "蘇妹屯" },
    { staffNo: "YS56", employeeNo: "56", name: "黎詠宸" },
    { staffNo: "YS57", employeeNo: "57", name: "許沐熙" },
    { staffNo: "YS58", employeeNo: "58", name: "李曉瑜" },
    { staffNo: "YS59", employeeNo: "59", name: "李育禎" },
    { staffNo: "YS60", employeeNo: "60", name: "伍柏慶" },
    { staffNo: "YS61", employeeNo: "61", name: "王惠君" },
    { staffNo: "YS62", employeeNo: "62", name: "張美玉" },
    { staffNo: "YS63", employeeNo: "63", name: "王思晨" },
    { staffNo: "YS65", employeeNo: "65", name: "唐凱荻" },
    { staffNo: "YS66", employeeNo: "66", name: "葉秋霞" },
    { staffNo: "YS67", employeeNo: "67", name: "黃佳子" },
    { staffNo: "YS68", employeeNo: "68", name: "朱玟卉" },
    { staffNo: "YS69", employeeNo: "69", name: "何小梅" },
    { staffNo: "YS71", employeeNo: "71", name: "陳啟暘" },
    { staffNo: "YS72", employeeNo: "72", name: "顏妙慎" },
    { staffNo: "YS73", employeeNo: "73", name: "劉盈盈" },
    { staffNo: "YS75", employeeNo: "75", name: "湯士賢" },
    { staffNo: "YS77", employeeNo: "77", name: "陳柏曄" },
    { staffNo: "YS79", employeeNo: "79", name: "游御欣" },
    { staffNo: "YS80", employeeNo: "80", name: "施雯心" },
    { staffNo: "YS82", employeeNo: "82", name: "曲晨語" },
    { staffNo: "YS83", employeeNo: "83", name: "王玲妹" },
    { staffNo: "YS85", employeeNo: "85", name: "田美月" },
    { staffNo: "YS86", employeeNo: "86", name: "程小妹" },
    { staffNo: "YS88", employeeNo: "88", name: "胡曉嫻" },
    { staffNo: "YS89", employeeNo: "89", name: "張媂妮" },
    { staffNo: "YS90", employeeNo: "90", name: "閻晶晶" },
    { staffNo: "YS91", employeeNo: "91", name: "張振偉" },
    { staffNo: "YS92", employeeNo: "92", name: "王心蘭" },
    { staffNo: "YS93", employeeNo: "93", name: "許翔瑋" },
    { staffNo: "YS95", employeeNo: "95", name: "丁汝宴" },
    { staffNo: "YS96", employeeNo: "96", name: "江錚瑚" },
    { staffNo: "YS97", employeeNo: "97", name: "林裕民" },
    { staffNo: "YS98", employeeNo: "98", name: "黃湘萍" },
  ],
};

// 性別映射表 (根據通訊錄)
const STAFF_GENDER = {
  // 足不老 (ZBL)
  "ZBL1": "female", "ZBL2": "female", "ZBL6": "female", "ZBL8": "female",
  "ZBL9": "female", "ZBL12": "female", "ZBL13": "female", "ZBL18": "female",
  "ZBL20": "female", "ZBL23": "female", "ZBL26": "female", "ZBL28": "female",
  "ZBL30": "female", "ZBL33": "female", "ZBL37": "female", "ZBL38": "female",
  "ZBL50": "female", "ZBL56": "female", "ZBL57": "female", "ZBL58": "female",
  "ZBL59": "female", "ZBL60": "female", "ZBL61": "female", "ZBL62": "female",
  "ZBL66": "female", "ZBL68": "female", "ZBL72": "female", "ZBL77": "female",
  "ZBL81": "female", "ZBL87": "female", "ZBL88": "female", "ZBL89": "female",
  "ZBL92": "female", "ZBL93": "female", "ZBL96": "female", "ZBL98": "female",
  "ZBL99": "female", "ZBL100": "female",
  // 御手足悦 (YS)
  "YS2": "female", "YS6": "female", "YS8": "female", "YS9": "female",
  "YS10": "female", "YS11": "female", "YS13": "female", "YS15": "female",
  "YS17": "female", "YS20": "female", "YS22": "female", "YS23": "female",
  "YS25": "female", "YS26": "female", "YS27": "female", "YS29": "female",
  "YS30": "female", "YS31": "female", "YS33": "female", "YS37": "female",
  "YS39": "female", "YS50": "female", "YS55": "female", "YS57": "female",
  "YS58": "female", "YS59": "female", "YS61": "female", "YS62": "female",
  "YS63": "female", "YS66": "female", "YS67": "female", "YS68": "female",
  "YS69": "female", "YS73": "female", "YS76": "female", "YS80": "female",
  "YS82": "female", "YS83": "female", "YS85": "female", "YS89": "female",
  "YS90": "female", "YS92": "female", "YS95": "female", "YS98": "female",
};

const AVG_TICKET = { "store-1": 760, "store-2": 760 };

const seedReports = [
  ...[
    [1, 48, 26, 39, 36, 0], [2, 34, 41, 39, 37, 0], [3, 23, 29, 53, 43, 0],
    [4, 31, 24, 59, 41, 0], [5, 15, 50, 69, 40, 0], [6, 19, 59, 52, 41, 0],
    [7, 22, 24, 31, 38, 0], [8, 20, 38, 29, 39, 0], [9, 45, 28, 31, 35, 0],
    [10, 33, 22, 53, 40, 0], [11, 42, 43, 63, 46, 0], [12, 32, 41, 60, 38, 0],
    [13, 32, 41, 48, 34, 0], [14, 23, 14, 31, 35, 0], [15, 29, 38, 33, 33, 0],
    [16, 32, 33, 45, 31, 0], [17, 33, 38, 46, 39, 0], [18, 41, 42, 71, 41, 0],
    [19, 30, 48, 56, 36, 0], [20, 26, 29, 30, 35, 0], [21, 28, 27, 39, 33, 0],
    [22, 35, 43, 43, 34, 0], [23, 30, 33, 42, 38, 0],
  ].map((row) => makeReport("store-1", row)),
  ...[
    [1, 44, 29, 30, 38, 2], [2, 41, 46, 51, 43, 7], [3, 48, 33, 54, 46, 14],
    [4, 50, 34, 46, 44, 0], [5, 42, 36, 54, 42, 23], [6, 50, 39, 41, 43, 5],
    [7, 50, 22, 48, 42, 5], [8, 20, 56, 30, 36, 3], [9, 26, 46, 32, 35, 5],
    [10, 36, 43, 42, 40, 6], [11, 58, 31, 53, 41, 18], [12, 49, 44, 51, 43, 5],
    [13, 41, 36, 44, 41, 0], [14, 53, 32, 41, 48, 2], [15, 44, 35, 38, 40, 0],
    [16, 32, 43, 42, 40, 2], [17, 54, 40, 46, 43, 6], [18, 58, 42, 45, 39, 13],
    [19, 53, 45, 48, 43, 8], [20, 48, 23, 45, 45, 0], [21, 32, 45, 28, 34, 8],
    [22, 34, 23, 22, 33, 11], [23, 44, 15, 36, 34, 6],
  ].map((row) => makeReport("store-2", row)),
];

const menuItems = {
  "store-1": [
    item("腳底按摩 40 分", 40, 650, "normal"),
    item("腳底按摩 60 分", 60, 1000, "normal"),
    item("全身指壓 60 分", 60, 1000, "normal"),
    item("全身指壓 90 分", 90, 1500, "normal"),
    item("全身指壓 120 分", 120, 1950, "normal"),
    item("全身油推 90 分", 90, 1600, "normal"),
    item("全身油推 120 分", 120, 1950, "normal"),
    item("修足指甲", 0, 688, "normal"),
    item("修足腳皮", 0, 688, "normal"),
    item("掏耳", 0, 688, "normal"),
    item("腳底40 + 指壓60 會員", 100, 1238, "combo"),
    item("腳底40 + 指壓90 會員", 130, 1738, "combo"),
    item("腳底40 + 油壓90 會員", 130, 1838, "combo"),
    item("腳底40 + 指/油120 會員", 160, 2188, "combo"),
  ],
  "store-2": [
    item("腳底按摩 40 分", 40, 650, "normal"),
    item("腳底按摩 60 分", 60, 1000, "normal"),
    item("全身指壓 60 分", 60, 1000, "normal"),
    item("全身指壓 90 分", 90, 1500, "normal"),
    item("全身指壓 120 分", 120, 1950, "normal"),
    item("全身油推 90 分", 90, 1600, "normal"),
    item("全身油推 120 分", 120, 1950, "normal"),
    item("修足指甲", 0, 688, "normal"),
    item("修足腳皮", 0, 688, "normal"),
    item("掏耳", 0, 688, "normal"),
    item("腳底40 + 指壓60 會員", 100, 1238, "combo"),
    item("腳底40 + 指壓90 會員", 130, 1738, "combo"),
    item("腳底40 + 油壓90 會員", 130, 1838, "combo"),
    item("腳底40 + 指/油120 會員", 160, 2188, "combo"),
    item("御手組合 指壓60", 100, 1888, "combo"),
    item("御手組合 指壓90", 130, 2388, "combo"),
    item("御手組合 指壓120", 160, 2838, "combo"),
    item("御手組合 油壓90", 130, 2488, "combo"),
    item("御手組合 油壓120", 160, 2838, "combo"),
  ],
};

const photoGuestEntries = [
  guest("store-1", "2026-04-23", "10:04", 1, "指油壓/腳底", 0, "68", "", 0, "照片判讀待確認：79218_0.jpg 第 1 筆"),
  guest("store-1", "2026-04-23", "10:17", 1, "指油壓/腳底", 0, "33", "", 0, "照片判讀待確認：79218_0.jpg 第 2 筆"),
  guest("store-1", "2026-04-23", "10:27", 1, "指油壓90", 90, "88", "11", 0, "照片判讀待確認：79218_0.jpg 第 3 筆"),
  guest("store-1", "2026-04-23", "10:37", 1, "腳底60", 60, "81", "", 0, "照片判讀待確認：79218_0.jpg"),
  guest("store-1", "2026-04-23", "11:46", 1, "腳底60", 60, "68", "", 0, "照片判讀待確認：79218_0.jpg"),
  guest("store-1", "2026-04-23", "12:27", 1, "指油壓90", 90, "13", "15", 0, "照片判讀待確認：79218_0.jpg"),
  guest("store-1", "2026-04-23", "13:03", 2, "油壓90", 90, "37/58", "7", 0, "照片判讀待確認：79218_0.jpg"),
  guest("store-1", "2026-04-23", "13:46", 2, "油壓2", 0, "62/50", "9", 0, "照片判讀待確認：79218_0.jpg"),
  guest("store-2", "2026-04-21", "10:00", 2, "油壓2", 0, "69/67", "12", 0, "照片判讀待確認：944268_0.jpg"),
  guest("store-2", "2026-04-21", "10:25", 1, "指油壓90", 90, "15", "6", 0, "照片判讀待確認：944268_0.jpg"),
  guest("store-2", "2026-04-21", "11:35", 2, "腳底/油壓", 0, "82/61", "1", 0, "照片判讀待確認：944268_0.jpg"),
  guest("store-2", "2026-04-22", "09:10", 1, "油壓3.5", 0, "32", "9", 0, "照片判讀待確認：944922_0.jpg"),
  guest("store-2", "2026-04-22", "10:20", 2, "油壓90", 90, "69/67", "8", 0, "照片判讀待確認：944922_0.jpg"),
  guest("store-2", "2026-04-22", "13:53", 2, "油壓90", 90, "15/82", "12", 0, "照片判讀待確認：944922_0.jpg"),
  guest("store-2", "2026-04-23", "09:10", 1, "油壓3.5", 0, "32", "9", 0, "照片判讀待確認：944923_0.jpg"),
  guest("store-2", "2026-04-23", "10:20", 2, "油壓90", 90, "69/67", "8", 0, "照片判讀待確認：944923_0.jpg"),
  guest("store-2", "2026-04-23", "13:53", 2, "油壓90", 90, "15/82", "12", 0, "照片判讀待確認：944923_0.jpg"),
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

let state = loadState();
syncDemoUsers();
let currentUser = loadAuth();
let staffAccounts = loadStaffAccounts();
initializeStaffAccounts(); // 自動導入師傅資料（首次加載時執行）
if (!currentUser) currentUser = loadStaffAuth();

function item(name, minutes, amount, group) {
  return { name, minutes, amount, group };
}

function makeReport(storeId, [day, morning, afternoon, evening, masters, lost]) {
  const date = `2026-04-${String(day).padStart(2, "0")}`;
  return { id: `${storeId}-${date}`, storeId, date, morning, afternoon, evening, masters, idle: 0, lost };
}

function guest(storeId, date, arrivalTime, people, serviceType, minutes, master, room, amount, note) {
  return {
    id: `photo-${storeId}-${date}-${arrivalTime}-${serviceType}-${master}-${room}`.replace(/[^a-zA-Z0-9-]/g, "-"),
    sourcePhoto: note.includes("照片") ? note : "",
    storeId,
    date,
    arrivalTime,
    people,
    serviceType,
    minutes,
    master,
    room,
    checkoutTime: "",
    amount,
    note,
  };
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY) || LEGACY_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
  if (!raw) return { reports: seedReports, guests: photoGuestEntries, users: [] };
  try {
    const saved = JSON.parse(raw);
    return {
      reports: mergeById(Array.isArray(saved.reports) ? saved.reports : [], seedReports),
      guests: mergeById(Array.isArray(saved.guests) ? saved.guests : migrateOldGuests(saved.guestEntries), photoGuestEntries),
      users: Array.isArray(saved.users) ? saved.users : [],
    };
  } catch {
    return { reports: seedReports, guests: photoGuestEntries, users: [] };
  }
}

function loadAuth() {
  try {
    const saved = JSON.parse(localStorage.getItem(AUTH_KEY));
    return saved?.role && demoUsers[saved.role] ? saved : null;
  } catch {
    return null;
  }
}

// ── 師傅帳號 ──────────────────────────────────────────
function loadStaffAccounts() {
  try {
    const accounts = JSON.parse(localStorage.getItem(STAFF_ACCOUNTS_KEY)) || [];
    // 同步性別標籤：根據通訊錄為現有師傅添加 female 標籤
    accounts.forEach((account) => {
      if (STAFF_GENDER[account.staffNo]) {
        if (!account.tags) account.tags = [];
        if (!account.tags.includes('female')) {
          account.tags.push('female');
        }
      } else if (account.tags && account.tags.includes('female')) {
        // 如果映射表中沒有，但帳號中有 female，保留（用戶可能手動添加）
      }
    });
    return accounts;
  } catch {
    return [];
  }
}

function saveStaffAccounts() {
  localStorage.setItem(STAFF_ACCOUNTS_KEY, JSON.stringify(staffAccounts));
  syncStaffAccountsToPOS();
}

// 將師傅帳號同步到現場 POS localStorage（新增缺少的師傅、更新姓名）
function syncStaffAccountsToPOS() {
  try {
    const posRaw = localStorage.getItem(POS_STORAGE_KEY);
    if (!posRaw) return;
    const posState = JSON.parse(posRaw);
    if (!posState || !Array.isArray(posState.staff)) return;

    let changed = false;
    staffAccounts.forEach((account) => {
      const posStoreId = account.storeId === "store-1" ? "store-zubulao" : "store-main";
      const empNo = String(account.employeeNo || account.staffNo).replace(/^[A-Za-z]+/, "");
      const existing = posState.staff.find(
        (s) => s.storeId === posStoreId && s.staffNo === empNo
      );
      if (existing) {
        if (existing.name !== account.name || existing.startTime !== account.startTime || existing.endTime !== account.endTime || JSON.stringify(existing.tags) !== JSON.stringify(account.tags)) {
          existing.name = account.name;
          existing.startTime = account.startTime || "10:00";
          existing.endTime = account.endTime || "20:00";
          existing.tags = account.tags || [];
          changed = true;
        }
      } else {
        const maxQueue = posState.staff
          .filter((s) => s.storeId === posStoreId)
          .reduce((max, s) => Math.max(max, s.queueIndex || 0), 0);
        posState.staff.push({
          id: `sync-${posStoreId}-${empNo}`,
          staffNo: empNo,
          name: account.name,
          status: "off",
          queueIndex: maxQueue + 1,
          isActive: false,
          storeId: posStoreId,
          startTime: account.startTime || "10:00",
          endTime: account.endTime || "20:00",
          tags: account.tags || [],
        });
        changed = true;
      }
    });

    if (changed) {
      localStorage.setItem(POS_STORAGE_KEY, JSON.stringify(posState));
    }
  } catch {
    // silent fail — POS 未初始化或格式不符時跳過
  }
}

// 批量匯入完整師傅名單（兩間店），可選擇是否同時重設所有密碼
function batchImportStaff() {
  const defaultPwd = prompt(
    "批量建立師傅帳號\n\n設定初始密碼（師傅可自行修改）：\n（已存在的帳號密碼也會同步更新）",
    "demo123"
  );
  if (defaultPwd === null) return;
  if (!defaultPwd.trim()) { alert("密碼不可為空"); return; }
  const pwd = defaultPwd.trim();

  let added = 0, updated = 0;
  Object.entries(MASTER_STAFF).forEach(([storeId, list]) => {
    list.forEach(({ staffNo, employeeNo, name }) => {
      const existing = staffAccounts.find((a) => a.staffNo === staffNo);
      if (existing) {
        existing.password = pwd; // 同步更新密碼
        updated++;
      } else {
        staffAccounts.push({
          staffNo,
          employeeNo,
          name,
          storeId,
          startTime: "10:00",
          endTime: "20:00",
          phone: "",
          tags: [],
          baseCommissionRate: 60, // 基礎抽成（60 = 6 抽）
          password: pwd
        });
        added++;
      }
    });
  });

  saveStaffAccounts();
  renderStaffAccounts();
  renderStaffAcc();
  alert(`✅ 新建 ${added} 個帳號，更新 ${updated} 個密碼\n\n所有師傅現在密碼：${pwd}\n\n登入格式：足不老 ZBL68、御手足悦 YS68`);
}

// 導出師傅名單為 CSV 備份
function exportStaffList() {
  if (staffAccounts.length === 0) {
    alert("目前沒有師傅帳號");
    return;
  }

  // 準備 CSV 資料
  const headers = ["員工編號", "姓名", "門店", "上班時間", "下班時間", "技能標籤", "電話", "建立時間"];
  const rows = staffAccounts.map((a) => [
    a.staffNo,
    a.name,
    storeName(a.storeId),
    a.startTime || "10:00",
    a.endTime || "20:00",
    (a.tags || []).join(','),
    a.phone || "",
    new Date().toLocaleString("zh-TW")
  ]);

  // 轉換為 CSV 格式
  const csv = [
    // BOM for Excel UTF-8 support
    "﻿",
    headers.map((h) => `"${h}"`).join(","),
    ...rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
  ].join("\n");

  // 建立下載
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `師傅名單備份_${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert(`✅ 已導出 ${staffAccounts.length} 位師傅的名單\n\n檔案名稱：${link.download}`);
}

// 初始化師傅帳號：從 MASTER_STAFF 導入（首次加載時執行）
function initializeStaffAccounts() {
  // 如果已有師傅帳號，不重複導入
  if (staffAccounts.length > 0) return;

  // 從 MASTER_STAFF 導入所有師傅
  Object.entries(MASTER_STAFF).forEach(([storeId, list]) => {
    list.forEach(({ staffNo, employeeNo, name }) => {
      staffAccounts.push({
        staffNo,
        employeeNo,
        name,
        storeId,
        startTime: "10:00",
        endTime: "20:00",
        phone: "",
        tags: STAFF_GENDER[staffNo] ? ['female'] : [],
        baseCommissionRate: 60, // 基礎抽成（60 = 6 抽，70 = 7 抽）
        password: "demo123"
      });
    });
  });

  // 補充通訊錄資料
  supplementContactInfo();

  // 保存到 localStorage
  saveStaffAccounts();
}

// 補充通訊錄信息（電話和上班時段）
function supplementContactInfo() {
  // 足不老通訊錄資料
  const zblContacts = {
    "1": { name: "蔡艾妮", shift: "16:00~02:00", phone: "0983-055-540" },
    "2": { name: "王玲英", shift: "14:00~04:00", phone: "0970-820-629" },
    "3": { name: "隨國明", shift: "14:00~2400", phone: "0936-555-740" },
    "6": { name: "李湘薇", shift: "12:00~24:00", phone: "0916-878-679" },
    "7": { name: "王腓力", shift: "10:00~22:00", phone: "0932-054-000" },
    "8": { name: "胡寶珍", shift: "10:00~20:00", phone: "0988-039-509" },
    "9": { name: "吳姿容", shift: "14:00~02:00", phone: "0938-182-303" },
    "11": { name: "林瑋杰", shift: "14:00-24:00", phone: "0907-692-828" },
    "12": { name: "黃秀梅", shift: "10:00~17:00", phone: "0915-335-103" },
    "13": { name: "張興和", shift: "12:00~22:00", phone: "0968-577-286" },
    "16": { name: "倪赫", shift: "10:00~18:00", phone: "0926-181-858" },
    "17": { name: "張育光", shift: "14:00~24:00", phone: "0966-863-143" },
    "18": { name: "潘楚霏", shift: "14:00-02:00", phone: "0973-257-402" },
    "20": { name: "黃慧敏", shift: "10:00-22:00", phone: "0935-557-677" },
    "23": { name: "林姿辰", shift: "10:00~18:00", phone: "0938-966-190" },
    "26": { name: "高婷婷", shift: "12:00~22:00", phone: "0922-652-920" },
    "28": { name: "魏曼妮", shift: "12:00~22:00", phone: "0980-439-233" },
    "29": { name: "彭賢寶", shift: "12:00~22:00", phone: "0932-371-285" },
    "30": { name: "鍾梅花", shift: "14:00~24:00", phone: "0955-947-760" },
    "33": { name: "顏慧林", shift: "14:00~04:00", phone: "0903-832-893" },
    "35": { name: "王耀慶", shift: "14:00~02:00", phone: "0920-277-730" },
    "36": { name: "劉俊良", shift: "14:00:24:00", phone: "0930-642-566" },
    "37": { name: "徐卉庭", shift: "14:00-04:00", phone: "0926-923-689" },
    "38": { name: "邱蓮香", shift: "12:00~22:00", phone: "0960-587-909" },
    "50": { name: "李育茹", shift: "14:00-24:00", phone: "0954-006-918" },
    "52": { name: "郭順昇", shift: "12:00~22:00", phone: "0901-377-390" },
    "53": { name: "張富洋", shift: "12:00~22:00", phone: "0903-391-313" },
    "56": { name: "吳君穎", shift: "12:00~22:00", phone: "0981-955-646" },
    "57": { name: "李芳品", shift: "10:00~20:00", phone: "0962-004-025" },
    "58": { name: "吳靜妍", shift: "10:00~20:00", phone: "0908-852-868" },
    "59": { name: "吳昭慧", shift: "10:00~18:00", phone: "0963-900-975" },
    "60": { name: "黃禕婷", shift: "14:00-24:00", phone: "0979-716-839" },
    "61": { name: "曾嘉慧", shift: "18:00~06:00", phone: "0906-862-462" },
    "62": { name: "陳芝翎", shift: "12:00~22:00", phone: "0900-773-378" },
    "66": { name: "陳科瑋", shift: "10:00~22:00", phone: "0919-306-840" },
    "68": { name: "劉益強", shift: "10:00~22:00", phone: "0985-590-474" },
    "69": { name: "蕭昊宇", shift: "14:00~02:00", phone: "0970-951-002" },
    "70": { name: "劉富安", shift: "16:00~04:00", phone: "0921-259-200" },
    "72": { name: "段怡瑄", shift: "12:00~22:00", phone: "0909-564-711" },
    "75": { name: "游社睿", shift: "14:00~04:00", phone: "0973-950-559" },
    "77": { name: "楊汨浠", shift: "10:00~20:00", phone: "0980-888-831" },
    "80": { name: "段怡君", shift: "12:00-22:00", phone: "0909-102-604" },
    "81": { name: "陳氏柳", shift: "10:00~22:00", phone: "0939-983-299" },
    "86": { name: "許凱威", shift: "18:00~06:00", phone: "0903-629-250" },
    "87": { name: "吳妮庭", shift: "10:00~20:00", phone: "0955-067-977" },
    "88": { name: "黃最", shift: "10:00~20:00", phone: "0935-743-076" },
    "89": { name: "恩雅綾", shift: "14:00~02:00", phone: "0981-890-769" },
    "90": { name: "徐兆瑩", shift: "18:00~06:00", phone: "0980-543-048" },
    "91": { name: "蕭晨誌", shift: "10:00-22:00", phone: "0903-339-561" },
    "92": { name: "鄒曉英", shift: "10:00~20:00", phone: "0975-657-837" },
    "93": { name: "李梓安", shift: "16:00~02:00", phone: "0961-555-773" },
    "95": { name: "陳勇吉", shift: "18:00~06:00", phone: "0968-828-511" },
    "96": { name: "阮靜怡", shift: "16:00~04:00", phone: "0906-833-627" },
    "98": { name: "羅楚甯", shift: "10:00~18:00", phone: "0970-788-956" },
    "99": { name: "城鍾佩真", shift: "12:00~2200", phone: "0903-633-626" },
    "100": { name: "張慈", shift: "20:00~06:00", phone: "0916-900-614" },
  };

  // 御手足悦通訊錄資料
  const ysContacts = {
    "1": { name: "何家慶", shift: "10:00~20:00", phone: "0933-901-699" },
    "2": { name: "莊月英", shift: "16:00~02:00", phone: "0926-959-286" },
    "3": { name: "邱靖宸", shift: "10:00~22:00", phone: "0974-241-132" },
    "5": { name: "林永晉", shift: "18:00~06:00", phone: "0909-830-355" },
    "6": { name: "劉明昭", shift: "10:00~20:00", phone: "0986-616-166" },
    "7": { name: "劉秀春", shift: "", phone: "0983-564-184" },
    "8": { name: "洪若馨", shift: "10:00~18:00", phone: "0909-759-350" },
    "9": { name: "曾彩萍", shift: "12:00~24:00", phone: "0916-428-157" },
    "10": { name: "歐乃瑜", shift: "14:00~24:00", phone: "0982-977-523" },
    "11": { name: "高詩媛", shift: "12:00~22:00", phone: "0917-186-778" },
    "12": { name: "簡郁峯", shift: "18:00~06:00", phone: "0926-345-295" },
    "13": { name: "陳秀雯", shift: "16:00~02:00", phone: "0922-511-788" },
    "15": { name: "郭牡丹", shift: "10:00~17:00", phone: "0986-622-139" },
    "16": { name: "呂芳昇", shift: "12:00~22:00", phone: "0939-886-975" },
    "17": { name: "袁園", shift: "10:00~20:00", phone: "0986-216-188" },
    "18": { name: "陳彬楊", shift: "18:00~04:00", phone: "0915-285-787" },
    "19": { name: "黃凱銘", shift: "12:00~22:00", phone: "0989-627-652" },
    "20": { name: "敖桂英", shift: "10:00~20:00", phone: "0983-957-383" },
    "21": { name: "黃明凱", shift: "10:00~22:00", phone: "0989-305-448" },
    "22": { name: "楊薏薇", shift: "12:00~22:00", phone: "0900-380-145" },
    "23": { name: "劉秀英", shift: "10:00~17:00", phone: "0939-735-276" },
    "25": { name: "吳靖雯", shift: "10:00~20:00", phone: "0976-132-311" },
    "26": { name: "陳思妘", shift: "18:00~06:00", phone: "0980-655-026" },
    "27": { name: "錢君", shift: "20:00~06:00", phone: "0933-765-456" },
    "28": { name: "吳宇傑", shift: "12:00~24:00", phone: "0965-218-289" },
    "29": { name: "卓怡瑄", shift: "18:00~06:00", phone: "0972-833-571" },
    "30": { name: "江淑芬", shift: "10:00~20:00", phone: "0989-656-314" },
    "31": { name: "張思瑩", shift: "10:00~20:00", phone: "0963-395-883" },
    "32": { name: "陳睿均", shift: "16:00~02:00", phone: "0908-072-096" },
    "33": { name: "黃筱雯", shift: "10:00~22:00", phone: "0916-298-963" },
    "35": { name: "丁政雄", shift: "18:00~06:00", phone: "0938-793-535" },
    "36": { name: "李崇賢", shift: "10:00~20:00", phone: "0910-735-025" },
    "37": { name: "邱逸驊", shift: "", phone: "0983-564-184" },
    "39": { name: "閭巧", shift: "12:00~24:00", phone: "0981-060-674" },
    "50": { name: "陳至輝", shift: "14:00~24:00", phone: "0928-890-800" },
    "51": { name: "林晉禓", shift: "12:00~22:00", phone: "0977-565-755" },
    "52": { name: "陳昱翰", shift: "18:00~06:00", phone: "0926-345-295" },
    "53": { name: "黃博瑋", shift: "16:00~02:00", phone: "0981-509-522" },
    "55": { name: "蘇妹屯", shift: "10:00~17:00", phone: "0903-705-297" },
    "56": { name: "黎詠宸", shift: "12:00~22:00", phone: "0939-886-975" },
    "57": { name: "許沐熙", shift: "10:00~20:00", phone: "0980-147-013" },
    "58": { name: "李曉瑜", shift: "18:00~04:00", phone: "0955-378-832" },
    "59": { name: "李育禎", shift: "12:00~22:00", phone: "0960-698-786" },
    "60": { name: "伍柏慶", shift: "10:00~20:00", phone: "0938-881-878" },
    "61": { name: "王惠君", shift: "10:00~22:00", phone: "0906-737-717" },
    "62": { name: "張美玉", shift: "12:00~22:00", phone: "0933-059-283" },
    "63": { name: "王思晨", shift: "10:00~17:00", phone: "0960-955-183" },
    "65": { name: "唐凱荻", shift: "10:00~20:00", phone: "0976-830-387" },
    "66": { name: "葉秋霞", shift: "18:00~06:00", phone: "0936-043-723" },
  };

  // 合併資料
  let updated = 0;
  staffAccounts.forEach((account) => {
    const empNo = String(account.employeeNo || "");
    let contactData = null;

    // 根據店家和員工編號查找通訊錄
    if (account.storeId === "store-1") {
      contactData = zblContacts[empNo];
    } else if (account.storeId === "store-2") {
      contactData = ysContacts[empNo];
    }

    if (contactData) {
      // 補充電話（如果沒有的話）
      if (!account.phone && contactData.phone) {
        account.phone = contactData.phone;
        updated++;
      }
      // 補充上班時段（如果沒有的話）
      if (!account.shift && contactData.shift) {
        account.shift = contactData.shift;
      }
    }
  });

  saveStaffAccounts();
  renderStaffAcc();
  alert(`✅ 已合併通訊錄資料\n\n更新了 ${updated} 個師傅的電話號碼\n\n已保留現有的帳號和時段設定`);
}

// 師傅業績比對：同時支援員工編號（master 欄位）和姓名
function matchesStaff(guest, account) {
  if (!guest.master) return false;
  // 同店才計算（若兩邊都有 storeId）
  if (guest.storeId && account.storeId && guest.storeId !== account.storeId) return false;
  const m = String(guest.master).trim();
  const n = String(account.name).trim();
  // 按名字比對
  if (m === n || m.includes(n) || n.includes(m)) return true;
  // 按員工編號比對（剝除前綴字母，如 ZBL68→68、YS68→68）
  const empNo = String(account.employeeNo || account.staffNo || "")
    .replace(/^[A-Za-z]+/, "")
    .trim();
  if (!empNo) return false;
  const parts = m.split(/[\/,、\s]+/).map((s) => s.trim()).filter(Boolean);
  return parts.includes(empNo);
}

// ── 師傅帳號頁面 ────────────────────────────────────────

// 固定號碼表：1-100 排除所有含「4」的數字（文化禁忌），共 81 個
const VALID_STAFF_POSITIONS = Array.from({ length: 100 }, (_, i) => i + 1)
  .filter((n) => !String(n).includes("4"))
  .map(String); // ["1","2","3","5","6",...,"100"]

const SHIFT_OPTIONS = ["", "早班", "中班", "晚班", "全天", "彈性"];

let editingStaffAccNo = null;
let staffaccSearchQuery = "";

function renderStaffAcc() {
  if (!document.getElementById("staffaccView")) return;

  // 門店 selector in add form
  const scopedStoreId = manageableStoreId();
  const storeEl = $("#staffaccStore");
  if (storeEl) {
    if (scopedStoreId) {
      storeEl.innerHTML = `<option value="${scopedStoreId}">${storeName(scopedStoreId)}</option>`;
      storeEl.disabled = true;
    } else {
      storeEl.innerHTML = stores.map((s) => `<option value="${s.id}">${s.name}</option>`).join("");
      storeEl.disabled = false;
    }
  }

  // 顯示/隱藏管理員/負責人的門店篩選面板
  const filterPanel = $("#storeFilterPanel");
  if (filterPanel) {
    filterPanel.hidden = !!scopedStoreId; // 有 scopedStoreId 時隱藏（因為已鎖定在該店）
  }

  // 取得門店篩選的值（預設 "all"）
  const filterSelect = $("#staffaccStoreFilter");
  const selectedStore = filterSelect?.value || "all";

  // 篩選當前門店的帳號
  let forStore = staffAccounts;
  if (scopedStoreId) {
    // 普通使用者：只看自己的店
    forStore = staffAccounts.filter((a) => a.storeId === scopedStoreId);
  } else if (selectedStore !== "all") {
    // 管理員/負責人：根據選擇篩選
    forStore = staffAccounts.filter((a) => a.storeId === selectedStore);
  }
  // selectedStore === "all" 時顯示所有

  // 搜尋
  const q = staffaccSearchQuery.toLowerCase().trim();
  const filtered = q
    ? forStore.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          (a.staffNo || "").toLowerCase().includes(q) ||
          (a.employeeNo || "").includes(q) ||
          (a.phone || "").includes(q)
      )
    : null; // null = 顯示固定號碼表

  const title = $("#staffaccPanelTitle");

  const shiftSelect = (current) =>
    SHIFT_OPTIONS.map((s) => `<option value="${s}"${s === (current || "") ? " selected" : ""}>${s || "未設定"}</option>`).join("");

  let rows = "";
  if (filtered) {
    // 搜尋模式：只顯示符合的帳號
    if (title) title.textContent = `師傅帳號列表（找到 ${filtered.length} 筆）`;
    rows = filtered.map((a) => accountRow(a, shiftSelect)).join("") ||
      `<tr><td colspan="7" style="text-align:center;color:#999;padding:16px">找不到符合的師傅</td></tr>`;
  } else {
    // 固定號碼模式：顯示 VALID_STAFF_POSITIONS 的所有 81 個位置
    const storeForFixed = scopedStoreId || stores[0].id;
    const accountsByEmpNo = new Map(
      forStore.map((a) => [String(a.employeeNo || a.staffNo.replace(/^[A-Za-z]+/, "")), a])
    );
    const total = forStore.length;
    if (title) title.textContent = `師傅帳號列表（${total} 人 / 共 ${VALID_STAFF_POSITIONS.length} 個位置）`;

    rows = VALID_STAFF_POSITIONS.map((empNo) => {
      const a = accountsByEmpNo.get(empNo);
      if (!a) {
        // 空白佔位列
        return `
          <tr class="empty-slot">
            <td class="muted" style="color:#bbb">${empNo}</td>
            <td colspan="5" style="color:#ddd;font-size:12px">—</td>
            <td></td>
          </tr>`;
      }
      return accountRow(a, shiftSelect);
    }).join("");
  }

  const tbody = $("#staffaccRows");
  if (tbody) tbody.innerHTML = rows;
}

function accountRow(a, shiftSelect) {
  const tagOptions = [
    { value: 'female', label: '女生' },
    { value: 'foot', label: '足療' },
    { value: 'body_foot', label: '身體+足療' },
    { value: 'nail_fascia', label: '修腳/筋膜刀' },
    { value: 'ear', label: '掏耳' },
  ];

  if (editingStaffAccNo === a.staffNo) {
    // 技能標籤（排除女生，女生單獨放在前面）
    const skillTags = tagOptions.filter(t => t.value !== 'female');
    const tagsCheckboxes = skillTags.map(tag => `
      <label style="display:flex;align-items:center;margin-bottom:4px;font-size:11px;white-space:nowrap">
        <input type="checkbox" class="saedit-tag" value="${tag.value}" ${(a.tags || []).includes(tag.value) ? 'checked' : ''} style="width:14px;height:14px;margin-right:3px;accent-color:#666;flex-shrink:0" />
        ${tag.label}
      </label>
    `).join('');

    return `
      <tr class="editing-row">
        <td><strong>${escapeHtml(a.staffNo)}</strong></td>
        <td style="font-size:11px;min-width:90px">
          <select class="saedit-gender" style="padding:6px 8px;border:1px solid #ccc;border-radius:3px;font-weight:bold;width:100%;background-color:#fff;cursor:pointer;line-height:1.5;font-size:11px">
            <option value="male" ${!(a.tags || []).includes('female') ? 'selected' : ''}>M 男</option>
            <option value="female" ${(a.tags || []).includes('female') ? 'selected' : ''}>F 女</option>
          </select>
        </td>
        <td><input class="saedit" data-field="name" value="${escapeAttribute(a.name)}" style="width:100%" required /></td>
        <td>${storeName(a.storeId)}</td>
        <td style="white-space:nowrap">
          <input type="time" class="saedit" data-field="startTime" value="${escapeAttribute(a.startTime || '10:00')}" style="width:75px;font-size:11px" />
          ～
          <input type="time" class="saedit" data-field="endTime" value="${escapeAttribute(a.endTime || '20:00')}" style="width:75px;font-size:11px" />
        </td>
        <td><input class="saedit" data-field="phone" value="${escapeAttribute(a.phone || "")}" placeholder="電話" style="width:100%;font-size:11px" /></td>
        <td style="font-size:11px;max-width:120px;overflow:auto">${tagsCheckboxes}</td>
        <td style="font-size:11px;min-width:70px">
          <select class="saedit-commission" style="padding:4px 6px;border:1px solid #ccc;border-radius:3px;width:100%;font-weight:bold;cursor:pointer;background-color:#fff">
            <option value="60" ${(a.baseCommissionRate || 60) == 60 ? 'selected' : ''}>6 抽</option>
            <option value="65" ${(a.baseCommissionRate || 60) == 65 ? 'selected' : ''}>6.5 抽</option>
            <option value="70" ${(a.baseCommissionRate || 60) == 70 ? 'selected' : ''}>7 抽</option>
            <option value="75" ${(a.baseCommissionRate || 60) == 75 ? 'selected' : ''}>7.5 抽</option>
            <option value="80" ${(a.baseCommissionRate || 60) == 80 ? 'selected' : ''}>8 抽</option>
          </select>
        </td>
        <td style="white-space:nowrap">
          <button class="table-action" data-sa-save="${escapeAttribute(a.staffNo)}">儲存</button>
          <button class="table-action" data-sa-cancel="1">取消</button>
        </td>
      </tr>`;
  }
  const commissionDisplay = (rate) => {
    const num = rate / 10;
    return num === Math.floor(num) ? `${Math.floor(num)} 抽` : `${num} 抽`;
  };

  return `
    <tr>
      <td><strong>${escapeHtml(a.staffNo)}</strong></td>
      <td><span style="color:${(a.tags || []).includes('female') ? '#ef4444' : '#000'};font-weight:bold">${(a.tags || []).includes('female') ? 'F' : 'M'}</span></td>
      <td>${escapeHtml(a.name)}</td>
      <td>${storeName(a.storeId)}</td>
      <td>${escapeHtml(a.startTime || '10:00')}～${escapeHtml(a.endTime || '20:00')}</td>
      <td>${escapeHtml(a.phone || "—")}</td>
      <td class="muted" style="font-size:12px">${(a.tags || []).join('、') || '—'}</td>
      <td style="font-weight:bold;color:#b99a47">${commissionDisplay(a.baseCommissionRate || 60)}</td>
      <td style="white-space:nowrap">
        <button class="table-action" data-sa-view="${escapeAttribute(a.staffNo)}">觀看</button>
        <button class="table-action" data-sa-edit="${escapeAttribute(a.staffNo)}">編輯</button>
        <button class="table-action danger" data-sa-del="${escapeAttribute(a.staffNo)}">刪除</button>
      </td>
    </tr>`;
}

function showStaffDetail(account) {
  // 計算當月業績
  const currentMonth = new Date();
  const monthStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

  const monthlyRecords = (state.guests || []).filter((g) => {
    if (g.storeId && account.storeId && g.storeId !== account.storeId) return false;
    return (g.date || "").startsWith(monthStr) && matchesStaff(g, account);
  });

  const totalAmount = monthlyRecords.reduce((sum, g) => sum + (Number(g.amount) || 0), 0);
  const totalCount = monthlyRecords.length;
  const totalMinutes = monthlyRecords.reduce((sum, g) => sum + (Number(g.minutes) || 0), 0);

  // 簡單抽成試算
  const commissionRate = account.commissionRate || (
    monthlyRecords.some((g) => (g.serviceType || "").includes("掏耳") || (g.serviceType || "").includes("修腳"))
      ? 0.7 : 0.6
  );
  const estimatedCommission = Math.round(totalAmount * commissionRate);

  // 設置基本資訊
  $("#detailStaffNo").textContent = account.staffNo;
  $("#detailStaffName").textContent = account.name;
  $("#detailStaffStore").textContent = storeName(account.storeId);
  $("#detailStaffShift").textContent = account.shift || "未設定";
  $("#detailStaffPhone").textContent = account.phone || "—";
  $("#detailStaffNote").textContent = account.note || "—";
  $("#detailPageTitle").textContent = `${account.name} (${account.staffNo})`;

  // 顯示業績總覽
  const metricsEl = $("#detailMetrics");
  if (metricsEl) {
    metricsEl.innerHTML = `
      <div style="padding:12px;background:#f0f7f4;border-radius:6px;border-left:3px solid #2c5f3f">
        <div style="font-size:12px;color:#666;margin-bottom:6px">當月金額</div>
        <div style="font-size:24px;font-weight:bold;color:#2c5f3f">$${totalAmount.toLocaleString()}</div>
      </div>
      <div style="padding:12px;background:#f0f7f4;border-radius:6px;border-left:3px solid #2c5f3f">
        <div style="font-size:12px;color:#666;margin-bottom:6px">進場次數</div>
        <div style="font-size:24px;font-weight:bold;color:#2c5f3f">${totalCount}</div>
      </div>
      <div style="padding:12px;background:#faf6f0;border-radius:6px;border-left:3px solid #b99a47">
        <div style="font-size:12px;color:#666;margin-bottom:6px">預估抽成</div>
        <div style="font-size:24px;font-weight:bold;color:#b99a47">$${estimatedCommission.toLocaleString()}</div>
      </div>
      <div style="padding:12px;background:#f9f9f9;border-radius:6px;border-left:3px solid #999">
        <div style="font-size:12px;color:#666;margin-bottom:6px">抽成比例</div>
        <div style="font-size:24px;font-weight:bold;color:#666">${(commissionRate * 100).toFixed(0)}%</div>
      </div>
    `;
  }

  // 顯示進場紀錄
  const recordsEl = $("#detailRecords");
  if (recordsEl) {
    if (monthlyRecords.length === 0) {
      recordsEl.innerHTML = `<tr><td colspan="7" style="text-align:center;color:#999;padding:24px">本月無進場紀錄</td></tr>`;
    } else {
      recordsEl.innerHTML = monthlyRecords.map((g) => {
        const amount = Number(g.amount) || 0;
        const commission = Math.round(amount * commissionRate);
        return `
          <tr>
            <td>${escapeHtml(g.date || "")}</td>
            <td>${escapeHtml(g.arrivalTime || "")}</td>
            <td>${escapeHtml(g.serviceType || "")}</td>
            <td>${g.people || ""}</td>
            <td>${g.minutes || ""}</td>
            <td>$${amount.toLocaleString()}</td>
            <td>$${commission.toLocaleString()}</td>
          </tr>
        `;
      }).join("");
    }
  }

  // 儲存當前帳號到全域變數
  window.currentDetailStaff = account;

  // 隱藏其他視圖，顯示詳細頁面
  $$(".view").forEach((v) => v.classList.remove("active-view"));
  const detailView = $("#staffDetailView");
  if (detailView) {
    detailView.hidden = false;
    detailView.classList.add("active-view");
  }
}

function setupStaffAcc() {
  // 新增表單
  $("#staffaccAddForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!canManageStaff()) return;
    const data = new FormData(e.currentTarget);
    const staffNo = String(data.get("staffNo") || "").trim().toUpperCase();
    if (!staffNo) return;
    if (staffAccounts.some((a) => a.staffNo === staffNo)) {
      alert(`員工編號 ${staffNo} 已存在`);
      return;
    }
    const scopedStoreId = manageableStoreId();
    staffAccounts.push({
      staffNo,
      employeeNo: staffNo.replace(/^[A-Za-z]+/, ""),
      name: String(data.get("name") || "").trim(),
      storeId: scopedStoreId || data.get("storeId"),
      shift: data.get("shift") || "",
      phone: String(data.get("phone") || "").trim(),
      note: String(data.get("note") || "").trim(),
      password: String(data.get("password") || ""),
    });
    saveStaffAccounts();
    renderStaffAcc();
    renderStaffAccounts();
    e.currentTarget.reset();
  });

  // 表格操作（觀看 / 編輯 / 儲存 / 取消 / 刪除）
  $("#staffaccRows")?.addEventListener("click", (e) => {
    const viewNo = e.target.dataset.saView;
    const editNo = e.target.dataset.saEdit;
    const saveNo = e.target.dataset.saSave;
    const cancel = e.target.dataset.saCancel;
    const delNo = e.target.dataset.saDel;

    if (viewNo) {
      e.preventDefault?.();
      const account = staffAccounts.find((a) => a.staffNo === viewNo);
      if (account) {
        showStaffDetail(account);
      }
      return;
    }
    if (editNo) {
      editingStaffAccNo = editNo;
      renderStaffAcc();
      return;
    }
    if (cancel) {
      editingStaffAccNo = null;
      renderStaffAcc();
      return;
    }
    if (saveNo) {
      const account = staffAccounts.find((a) => a.staffNo === saveNo);
      if (!account) return;
      const row = e.target.closest("tr");
      row?.querySelectorAll(".saedit").forEach((el) => {
        const field = el.dataset.field;
        if (field) account[field] = el.value.trim();
      });
      // 收集標籤複選框
      const selectedTags = [];
      // 性別選擇
      const genderSelect = row?.querySelector(".saedit-gender");
      if (genderSelect?.value === 'female') {
        selectedTags.push('female');
      }
      // 其他技能標籤
      row?.querySelectorAll(".saedit-tag:checked").forEach((el) => {
        selectedTags.push(el.value);
      });
      account.tags = selectedTags;
      // 收集基礎抽成
      const commissionSelect = row?.querySelector(".saedit-commission");
      if (commissionSelect) {
        account.baseCommissionRate = Number(commissionSelect.value);
      }
      editingStaffAccNo = null;
      saveStaffAccounts();
      renderStaffAcc();
      renderStaffAccounts();
      return;
    }
    if (delNo) {
      const account = staffAccounts.find((a) => a.staffNo === delNo);
      if (!account) return;
      const scopedStoreId = manageableStoreId();
      if (scopedStoreId && account.storeId !== scopedStoreId) return;

      // 要求用戶輸入師傅名字確認刪除
      const confirmMsg = `⚠️ 即將刪除師傅「${account.name}」\n\n為防止誤刪，請輸入師傅的姓名來確認刪除：`;
      const userInput = prompt(confirmMsg);

      if (userInput === null) return; // 使用者按取消
      if (userInput !== account.name) {
        alert(`❌ 輸入錯誤！請輸入正確的師傅姓名。\n\n正確姓名：${account.name}`);
        return;
      }

      // 確認無誤，刪除師傅
      staffAccounts = staffAccounts.filter((a) => a.staffNo !== delNo);
      saveStaffAccounts();
      renderStaffAcc();
      renderStaffAccounts();
      alert(`✅ 已刪除師傅「${account.name}」（${delNo}）`);
    }
  });

  // 搜尋
  $("#staffaccSearch")?.addEventListener("input", (e) => {
    staffaccSearchQuery = e.target.value;
    renderStaffAcc();
  });

  // 門店篩選（管理員/負責人可用）
  $("#staffaccStoreFilter")?.addEventListener("change", () => {
    renderStaffAcc();
  });

  // 返回按鈕 — 從詳細頁面返回列表
  $("#backToStaffList")?.addEventListener("click", () => {
    const detailView = $("#staffDetailView");
    if (detailView) {
      detailView.hidden = true;
      detailView.classList.remove("active-view");
    }
    $$(".view").forEach((v) => v.classList.remove("active-view"));
    const staffaccView = $("#staffaccView");
    if (staffaccView) {
      staffaccView.hidden = false;
      staffaccView.classList.add("active-view");
    }
  });

  // 詳細頁面 — 編輯基本資訊
  $("#detailEditBtn")?.addEventListener("click", () => {
    if (window.currentDetailStaff) {
      // 返回列表並進入編輯模式
      const detailView = $("#staffDetailView");
      if (detailView) {
        detailView.hidden = true;
        detailView.classList.remove("active-view");
      }
      editingStaffAccNo = window.currentDetailStaff.staffNo;
      renderStaffAcc();
      $$(".view").forEach((v) => v.classList.remove("active-view"));
      $("#staffaccView").classList.add("active-view");
    }
  });

  // 詳細頁面 — 調整抽成
  $("#detailCommissionBtn")?.addEventListener("click", () => {
    if (window.currentDetailStaff) {
      const account = staffAccounts.find((a) => a.staffNo === window.currentDetailStaff.staffNo);
      if (account) {
        editingStaffNo = account.staffNo;
        // 這裡可以打開抽成調整面板，或導航到師傅管理頁面
        alert("抽成調整功能待實現");
      }
    }
  });

  // 導出師傅名單備份
  $("#exportStaffBtn")?.addEventListener("click", exportStaffList);
}

function loadStaffAuth() {
  try {
    return JSON.parse(localStorage.getItem(STAFF_AUTH_KEY)) || null;
  } catch {
    return null;
  }
}

function findStaffAccount(staffNo) {
  return staffAccounts.find((a) => a.staffNo === staffNo);
}
// ─────────────────────────────────────────────────────

function migrateOldGuests(oldEntries) {
  if (!Array.isArray(oldEntries)) return [];
  return oldEntries.map((entry) => ({
    id: entry.id || makeId(),
    sourcePhoto: entry.sourcePhoto || "",
    storeId: entry.storeId,
    date: entry.date,
    arrivalTime: normalizeTime(entry.arrivalTime),
    people: Number(entry.people || 1),
    serviceType: entry.serviceType || entry.footMassage || entry.massage || entry.packageName || "",
    minutes: Number(entry.minutes || 0),
    master: entry.master || "",
    room: entry.room || "",
    checkoutTime: normalizeTime(entry.checkoutTime),
    amount: Number(entry.amount || 0),
    note: entry.note || "",
  }));
}

function mergeById(saved, seeds) {
  const map = new Map(saved.filter(Boolean).map((record) => [record.id, record]));
  seeds.forEach((record) => {
    if (!map.has(record.id)) map.set(record.id, record);
  });
  return Array.from(map.values());
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function syncDemoUsers() {
  const customUsers = Object.fromEntries((state.users || []).map((user) => [user.id, normalizeUser(user)]));
  demoUsers = { ...baseUsers, ...customUsers };
}

function normalizeUser(user) {
  const roleType = user.roleType || "frontdesk";
  return {
    ...user,
    roleType,
    storeId: roleType === "owner" || roleType === "admin" ? "" : (user.storeId || stores[0].id),
    views: roleViews(roleType),
    defaultView: roleDefaultView(roleType),
  };
}

function renderLoginAccounts() {
  const select = $("#loginAccount");
  if (!select) {
    console.error("❌ #loginAccount element not found in DOM");
    return;
  }

  const options = Object.entries(demoUsers).map(([id, user]) => (
    `<option value="${escapeAttribute(id)}">${escapeHtml(user.name)} ${escapeHtml(accountLabel(id, user))}</option>`
  )).join("");

  select.innerHTML = options;
  console.log(`✅ Rendered ${Object.keys(demoUsers).length} login accounts:`, Object.keys(demoUsers));
}

function accountLabel(id, user) {
  if (user.builtIn) return id;
  return `(${roleTypeLabel(user.roleType)})`;
}

function roleViews(roleType) {
  if (roleType === "admin") return ["owner", "manager", "frontdesk", "staffacc", "staffmgmt", "users"];
  if (roleType === "owner") return ["owner", "manager", "frontdesk", "staffacc", "staffmgmt"];
  if (roleType === "manager") return ["manager", "frontdesk", "staffacc", "staffmgmt"];
  return ["frontdesk", "staffacc"];
}

function roleDefaultView(roleType) {
  if (roleType === "admin") return "users";
  if (roleType === "owner") return "owner";
  if (roleType === "manager") return "manager";
  return "frontdesk";
}

function currentFilters() {
  return { storeId: effectiveStoreId(), year: Number($("#yearFilter").value), month: Number($("#monthFilter").value) };
}

function effectiveStoreId() {
  return demoUsers[currentUser?.role]?.storeId || $("#storeFilter").value || stores[0].id;
}

function effectiveStoreName() {
  const user = demoUsers[currentUser?.role];
  const activeView = document.querySelector(".active-view")?.id?.replace("View", "");
  if (!user?.storeId && ["manager", "frontdesk"].includes(activeView)) return storeName(effectiveStoreId());
  if (!user?.storeId && (user?.roleType === "owner" || user?.roleType === "admin")) return "雙店總覽";
  return stores.find((store) => store.id === effectiveStoreId())?.name || "未指定門店";
}

function storeName(storeId) {
  return stores.find((store) => store.id === storeId)?.name || "";
}

function updateUserStoreField() {
  const roleType = $("#userForm [name='roleType']").value;
  $("#userStoreField").hidden = roleType === "owner";
}

function filteredReports(storeId) {
  const { year, month } = currentFilters();
  return state.reports.filter((report) => {
    const date = new Date(`${report.date}T00:00:00`);
    return report.storeId === storeId && date.getFullYear() === year && date.getMonth() + 1 === month;
  });
}

function filteredGuests(storeId) {
  const { year, month } = currentFilters();
  return state.guests
    .filter((guest) => {
      const date = new Date(`${guest.date}T00:00:00`);
      return guest.storeId === storeId && date.getFullYear() === year && date.getMonth() + 1 === month;
    })
    .sort((a, b) => `${a.date}-${a.arrivalTime}`.localeCompare(`${b.date}-${b.arrivalTime}`));
}

function sumReports(reports) {
  return reports.reduce(
    (sum, report) => {
      sum.morning += report.morning;
      sum.afternoon += report.afternoon;
      sum.evening += report.evening;
      sum.total += report.morning + report.afternoon + report.evening;
      sum.masters += report.masters;
      sum.idle += report.idle;
      sum.lost += report.lost;
      return sum;
    },
    { morning: 0, afternoon: 0, evening: 0, total: 0, masters: 0, idle: 0, lost: 0 }
  );
}

function renderFilters() {
  const storeOptions = stores.map((store) => `<option value="${store.id}">${store.name}</option>`).join("");
  $("#storeFilter").innerHTML = storeOptions;
  $("#guestStore").innerHTML = storeOptions;
  $("#userForm [name='storeId']").innerHTML = storeOptions;
  $("#yearFilter").innerHTML = `<option value="2026">2026</option>`;
  $("#monthFilter").innerHTML = Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}">${i + 1} 月</option>`).join("");
  $("#monthFilter").value = "4";
  $("#systemDate").value = todayOrSeedDate();
  $("#managerForm [name='date']").value = todayOrSeedDate();
  $("#guestForm [name='date']").value = todayOrSeedDate();
  $("#guestForm [name='arrivalTime']").value = nowTime();
}

function renderOwner() {
  const { year, month } = currentFilters();
  const selectedDate = $("#systemDate").value || todayOrSeedDate();
  const yesterday = addDays(selectedDate, -1);
  const storeStats = ownerStoreStats(year, month, selectedDate);
  const previousStoreStats = ownerStoreStats(year, month, yesterday);
  const previousMonthStats = ownerStoreStats(year, Math.max(1, month - 1), makeDate(year, Math.max(1, month - 1), Math.min(Number(selectedDate.slice(-2)), daysInMonth(year, Math.max(1, month - 1)))));
  const grandTotal = storeStats.reduce((sum, item) => sum + item.reportSum.total, 0);
  const todayCustomers = storeStats.reduce((sum, item) => sum + item.todayCustomers, 0);
  const monthRevenue = storeStats.reduce((sum, item) => sum + item.revenue, 0);
  const todayRevenue = storeStats.reduce((sum, item) => sum + item.todayRevenue, 0);
  const totalLost = storeStats.reduce((sum, item) => sum + item.reportSum.lost, 0);
  const avgLostRate = grandTotal ? (totalLost / grandTotal) * 100 : 0;
  const previousTotal = previousStoreStats.reduce((sum, item) => sum + item.todayRevenue, 0);
  const previousTodayCustomers = previousStoreStats.reduce((sum, item) => sum + item.todayCustomers, 0);
  const previousMonthRevenue = previousMonthStats.reduce((sum, item) => sum + item.revenue, 0) || monthRevenue * 0.88;
  const previousMonthCustomers = previousMonthStats.reduce((sum, item) => sum + item.reportSum.total, 0) || grandTotal * 0.9;
  const previousLostCount = previousMonthStats.reduce((sum, item) => sum + item.reportSum.lost, 0);
  const previousLostRate = previousLostCount ? (previousLostCount / previousMonthCustomers) * 100 : avgLostRate + 0.4;

  $("#ownerCards").innerHTML = `
    ${metricCard("¥", "今日總營收", money(todayRevenue), compareText(todayRevenue, previousTotal, "較昨日"))}
    ${metricCard("◌", "月累計營收", money(monthRevenue), compareText(monthRevenue, previousMonthRevenue, "較上月"))}
    ${metricCard("人", "今日總進客", `${todayCustomers.toLocaleString()} 人`, compareText(todayCustomers, previousTodayCustomers, "較昨日"))}
    ${metricCard("群", "月累計進客", `${grandTotal.toLocaleString()} 人`, compareText(grandTotal, previousMonthCustomers, "較上月"))}
    ${metricCard("△", "本月平均流失率", `${avgLostRate.toFixed(1)}%`, compareText(previousLostRate, avgLostRate, "較上月"))}
  `;

  $("#ownerStoreCards").innerHTML = storeStats.map((item) => `
    <article class="owner-store-card ${item.store.className}">
      <h3>${item.store.name}</h3>
      ${storeMiniMetric("¥", "今日營收", money(item.todayRevenue), compareText(item.todayRevenue, previousStoreStats.find((stat) => stat.store.id === item.store.id)?.todayRevenue || item.todayRevenue * 0.92, "較昨日"))}
      ${storeMiniMetric("◌", "本月營收", money(item.revenue), compareText(item.revenue, previousMonthStats.find((stat) => stat.store.id === item.store.id)?.revenue || item.revenue * 0.9, "較上月"))}
      ${storeMiniMetric("人", "今日進客", `${item.todayCustomers.toLocaleString()} 人`, compareText(item.todayCustomers, previousStoreStats.find((stat) => stat.store.id === item.store.id)?.todayCustomers || item.todayCustomers * 0.94, "較昨日"))}
      ${storeMiniMetric("群", "本月進客", `${item.reportSum.total.toLocaleString()} 人`, compareText(item.reportSum.total, previousMonthStats.find((stat) => stat.store.id === item.store.id)?.reportSum.total || item.reportSum.total * 0.91, "較上月"))}
    </article>
  `).join("");

  renderOwnerMonthlyRevenueTrend(year, month);
  renderOwnerRevenueBars(storeStats);
  renderOwnerOpsTable(storeStats, { todayRevenue, monthRevenue, todayCustomers, grandTotal, avgLostRate });
}

function renderOwnerDonut(selector, storeStats, valuePath, total, centerText, formatter) {
  let start = 0;
  const segments = storeStats.map((item) => {
    const value = valueByPath(item, valuePath);
    const pct = total ? (value / total) * 100 : 0;
    const segment = `${item.store.color} ${start}% ${start + pct}%`;
    start += pct;
    return segment;
  }).join(", ");
  const gradient = segments || "#eee 0% 100%";
  $(selector).innerHTML = `
    <div class="owner-donut" style="background: conic-gradient(${gradient})">
      <div><span>合計</span><strong>${centerText}</strong></div>
    </div>
    <div class="owner-donut-legend">
      ${storeStats.map((item) => {
        const value = valueByPath(item, valuePath);
        return `
          <p>
            <i style="background:${item.store.color}"></i>
            <span>${item.store.name}</span>
            <b>${percent(value, total)}</b>
            <em>${formatter(value)}</em>
          </p>
        `;
      }).join("")}
    </div>
  `;
}

function renderOwnerRevenueBars(storeStats) {
  const dailyMax = Math.max(...storeStats.map((item) => item.todayRevenue), 1);
  const monthMax = Math.max(...storeStats.map((item) => item.revenue), 1);
  $("#ownerRevenueCompare").innerHTML = `
    <div class="grouped-bars">
      <div class="bar-section">
        <h4>當日營收</h4>
        <div class="bar-pair">
          ${storeStats.map((item) => `
            <div>
              <em>${money(item.todayRevenue)}</em>
              <b style="height:${Math.max(8, (item.todayRevenue / dailyMax) * 100)}%; background:${item.store.color}"></b>
              <small>${item.store.name}</small>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="bar-section">
        <h4>當月累計營收</h4>
        <div class="bar-pair">
          ${storeStats.map((item) => `
            <div>
              <em>${money(item.revenue)}</em>
              <b style="height:${Math.max(8, (item.revenue / monthMax) * 100)}%; background:${item.store.color}"></b>
              <small>${item.store.name}</small>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function ownerStoreStats(year, month, selectedDate) {
  return stores.map((store) => {
    const reports = state.reports.filter((report) => {
      const date = new Date(`${report.date}T00:00:00`);
      return report.storeId === store.id && date.getFullYear() === year && date.getMonth() + 1 === month;
    });
    const guests = state.guests.filter((guest) => {
      const date = new Date(`${guest.date}T00:00:00`);
      return guest.storeId === store.id && date.getFullYear() === year && date.getMonth() + 1 === month;
    });
    const reportSum = sumReports(reports);
    const todayReport = reportForDate(store.id, selectedDate) || emptyReport(store.id, selectedDate);
    const todayCustomers = todayReport.morning + todayReport.afternoon + todayReport.evening;
    const actualRevenue = guests.reduce((sum, guest) => sum + Number(guest.amount || 0), 0);
    const actualTodayRevenue = guests.filter((guest) => guest.date === selectedDate).reduce((sum, guest) => sum + Number(guest.amount || 0), 0);
    const revenue = actualRevenue || reportSum.total * AVG_TICKET[store.id];
    const todayRevenue = actualTodayRevenue || todayCustomers * AVG_TICKET[store.id];
    const lostRate = reportSum.total ? (reportSum.lost / reportSum.total) * 100 : 0;
    return { store, reports, guests, reportSum, revenue, todayRevenue, todayCustomers, todayReport, lostRate };
  });
}

function renderOwnerMonthlyRevenueTrend(year, activeMonth) {
  const series = stores.map((store, storeIndex) => ({
    label: store.name,
    color: store.color,
    values: Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      const actual = ownerStoreStats(year, month, makeDate(year, month, Math.min(23, daysInMonth(year, month))))
        .find((stat) => stat.store.id === store.id)?.revenue || 0;
      if (actual) return actual;
      if (month > activeMonth) return null;
      const active = ownerStoreStats(year, activeMonth, makeDate(year, activeMonth, 23)).find((stat) => stat.store.id === store.id)?.revenue || 0;
      return Math.round(active * (0.72 + index * 0.035 + storeIndex * 0.04));
    }),
  }));
  $("#ownerMonthlyRevenueTrend").innerHTML = lineChart({
    series,
    labels: Array.from({ length: 12 }, (_, index) => `${index + 1}月`),
    valueFormatter: moneyCompact,
    yLabel: "營收（NTD）",
  });
}

function metricCard(icon, label, value, compare) {
  return `
    <article class="metric kpi-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <small class="${compare.className}">${compare.text}</small>
    </article>
  `;
}

function storeMiniMetric(icon, label, value, compare) {
  return `
    <div class="store-mini-metric">
      <span>${label}</span>
      <strong>${value}</strong>
      <small class="${compare.className}">${compare.text}</small>
    </div>
  `;
}

function compareText(value, previous, label) {
  const safePrevious = Number(previous || 0);
  if (!safePrevious) return { text: `${label} 0.0%`, className: "trend-flat" };
  const delta = ((Number(value || 0) - safePrevious) / safePrevious) * 100;
  const up = delta >= 0;
  return { text: `${label} ${up ? "▲" : "▼"} ${Math.abs(delta).toFixed(1)}%`, className: up ? "trend-up" : "trend-down" };
}

function addDays(dateText, days) {
  const date = new Date(`${dateText}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function moneyCompact(value) {
  return `${Math.round(Number(value || 0) / 10000).toLocaleString()}萬`;
}

function lineChart({ series, labels, valueFormatter = (value) => value.toLocaleString(), yLabel = "", average = null, averageLabel = "" }) {
  const max = Math.max(...series.flatMap((item) => item.values).filter((value) => value !== null && value !== undefined), 1);
  const chartHeight = 220;
  const chartWidth = 660;
  const left = 58;
  const right = 28;
  const top = 24;
  const bottom = 42;
  const innerWidth = chartWidth - left - right;
  const innerHeight = chartHeight - top - bottom;
  const grid = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const y = top + innerHeight * ratio;
    const value = max * (1 - ratio);
    return `<line x1="${left}" y1="${y}" x2="${chartWidth - right}" y2="${y}" class="chart-grid"></line><text x="12" y="${y + 4}" class="chart-label">${valueFormatter(value)}</text>`;
  }).join("");
  const paths = series.map((item) => {
    const points = item.values.map((value, index) => {
      if (value === null || value === undefined) return null;
      const x = left + (labels.length <= 1 ? 0 : (index / (labels.length - 1)) * innerWidth);
      const y = top + innerHeight - (Number(value || 0) / max) * innerHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).filter(Boolean);
    return `
      <polyline points="${points.join(" ")}" fill="none" stroke="${item.color}" stroke-width="3" vector-effect="non-scaling-stroke"></polyline>
      ${points.map((point) => `<circle cx="${point.split(",")[0]}" cy="${point.split(",")[1]}" r="3.5" fill="${item.color}"></circle>`).join("")}
    `;
  }).join("");
  const averageLine = average === null ? "" : (() => {
    const y = top + innerHeight - (Number(average || 0) / max) * innerHeight;
    return `
      <line x1="${left}" y1="${y}" x2="${chartWidth - right}" y2="${y}" class="chart-average"></line>
      <foreignObject x="${chartWidth - right - 88}" y="${Math.max(4, y - 22)}" width="86" height="46">
        <div xmlns="http://www.w3.org/1999/xhtml" class="avg-callout">${averageLabel}</div>
      </foreignObject>
    `;
  })();
  const xLabels = labels.map((label, index) => {
    if (labels.length > 16 && index !== 0 && index !== labels.length - 1 && (index + 1) % 5 !== 0) return "";
    const x = left + (labels.length <= 1 ? 0 : (index / (labels.length - 1)) * innerWidth);
    return `<text x="${x}" y="${chartHeight - 14}" text-anchor="middle" class="chart-label">${label}</text>`;
  }).join("");
  const legend = series.map((item) => `<span><i style="background:${item.color}"></i>${item.label}</span>`).join("");
  return `
    <div class="chart-legend">${legend}</div>
    <svg viewBox="0 0 ${chartWidth} ${chartHeight}" role="img" aria-label="${yLabel}">
      ${grid}
      ${paths}
      ${averageLine}
      ${xLabels}
    </svg>
  `;
}

function renderOwnerOpsTable(storeStats, totals) {
  $("#ownerOpsTable").innerHTML = `
    <table class="owner-ops-table">
      <thead>
        <tr>
          <th>門店</th>
          <th>今日營收</th>
          <th>月累計營收</th>
          <th>今日進客</th>
          <th>月累計進客</th>
          <th>流失率</th>
          <th>營收占比</th>
        </tr>
      </thead>
      <tbody>
        ${storeStats.map((item) => `
          <tr>
            <td><span class="store-dot" style="background:${item.store.color}"></span>${item.store.name}</td>
            <td>${money(item.todayRevenue)}</td>
            <td>${money(item.revenue)}</td>
            <td>${item.todayCustomers.toLocaleString()} 人</td>
            <td>${item.reportSum.total.toLocaleString()} 人</td>
            <td>${item.lostRate.toFixed(1)}%</td>
            <td><div class="owner-share-cell"><b style="width:${percentNumber(item.revenue, totals.monthRevenue)}%; background:${item.store.color}"></b><span>${percent(item.revenue, totals.monthRevenue)}</span></div></td>
          </tr>
        `).join("")}
        <tr class="owner-total-row">
          <td>合計（兩店）</td>
          <td>${money(totals.todayRevenue)}</td>
          <td>${money(totals.monthRevenue)}</td>
          <td>${totals.todayCustomers.toLocaleString()} 人</td>
          <td>${totals.grandTotal.toLocaleString()} 人</td>
          <td>${totals.avgLostRate.toFixed(1)}%</td>
          <td><div class="owner-share-cell"><b style="width:100%; background:var(--green)"></b><span>100%</span></div></td>
        </tr>
      </tbody>
    </table>
  `;
}

function valueByPath(item, path) {
  return path.split(".").reduce((value, key) => value?.[key], item) || 0;
}

function percent(value, total) {
  return `${percentNumber(value, total).toFixed(1)}%`;
}

function percentNumber(value, total) {
  return total ? (value / total) * 100 : 0;
}

function renderManager() {
  const { storeId, year, month } = currentFilters();
  const storeName = stores.find((store) => store.id === storeId)?.name || "";
  const rows = monthlyReportRows(storeId, year, month);
  const days = rows.length;
  const firstRows = rows.slice(0, 15);
  const secondRows = rows.slice(15);
  const grandSum = sumReports(rows);
  const grandAvg = averageReport(grandSum, days);
  const selectedDate = $("#managerForm [name='date']").value || todayOrSeedDate();
  const selectedReport = reportForDate(storeId, selectedDate) || emptyReport(storeId, selectedDate);
  const yesterdayReport = reportForDate(storeId, addDays(selectedDate, -1)) || emptyReport(storeId, addDays(selectedDate, -1));
  const selectedTotal = selectedReport.morning + selectedReport.afternoon + selectedReport.evening;
  const yesterdayTotal = yesterdayReport.morning + yesterdayReport.afternoon + yesterdayReport.evening;
  const selectedMasters = Number(selectedReport.masters || 0);
  const previousMonthRows = monthlyReportRows(storeId, year, Math.max(1, month - 1));
  const previousMonthSum = sumReports(previousMonthRows);
  const currentDailyAvg = grandSum.total / days;
  const previousDailyAvg = previousMonthSum.total ? previousMonthSum.total / previousMonthRows.length : currentDailyAvg * 0.94;

  $("#managerReportTitle").textContent = `${year - 1911}年 ${storeName} 各班進客分析表`;
  $("#managerSummary").innerHTML = `
    ${metricCard("人", "今日進客數", `${selectedTotal.toLocaleString()} 人`, compareText(selectedTotal, yesterdayTotal || selectedTotal * 0.9, "較昨日"))}
    ${metricCard("群", "本月累積進客", `${grandSum.total.toLocaleString()} 人`, compareText(grandSum.total, previousMonthSum.total || grandSum.total * 0.92, "較上月"))}
    ${metricCard("↗", "本月平均每日進客", `${formatAverage(currentDailyAvg)} 人`, compareText(currentDailyAvg, previousDailyAvg, "較上月"))}
    ${metricCard("師", "今日上班師傅", `${selectedMasters.toLocaleString()} 位`, { text: `出勤率 ${masterAttendance(selectedReport)}%`, className: "trend-flat" })}
  `;
  $("#managerReportTable").innerHTML = `
    <table class="report-table">
      <thead>
        <tr>
          <th>${month}月</th>
          <th>早班</th>
          <th>中班</th>
          <th>晚班</th>
          <th>進客數</th>
          <th>上班師傅</th>
          <th>空班師傅</th>
          <th>流失數</th>
        </tr>
      </thead>
      <tbody>
        ${firstRows.map(renderReportDayRow).join("")}
        ${renderReportSummaryRows("上期", firstRows)}
        ${secondRows.map(renderReportDayRow).join("")}
        ${renderReportSummaryRows("下期", secondRows)}
        ${renderGrandReportRows(grandSum, grandAvg)}
      </tbody>
    </table>
  `;
  renderManagerMonthlyTrend(storeId, year, month);
  renderManagerShiftCompare(grandSum);
  renderManagerDailyTrend(rows, Number(selectedDate.slice(-2)));
}

function renderReportDayRow(report) {
  const day = Number(report.date.slice(-2));
  const total = Number(report.morning || 0) + Number(report.afternoon || 0) + Number(report.evening || 0);
  return `
    <tr>
      <td>${day}日</td>
      ${reportInput(report, "morning")}
      ${reportInput(report, "afternoon")}
      ${reportInput(report, "evening")}
      <td class="report-total">${total.toLocaleString()}</td>
      ${reportInput(report, "masters")}
      ${reportInput(report, "idle")}
      ${reportInput(report, "lost")}
    </tr>
  `;
}

function reportInput(report, field) {
  const saved = Boolean(report.id);
  const value = saved ? Number(report[field] || 0) : "";
  return `<td><input class="report-input" data-date="${report.date}" data-field="${field}" type="number" min="0" value="${value}" /></td>`;
}

function renderReportSummaryRows(label, rows) {
  const sum = sumReports(rows);
  const avg = averageReport(sum, rows.length || 1);
  return `
    <tr class="report-summary">
      <td>${label}總計</td>
      <td>${sum.morning.toLocaleString()}</td>
      <td>${sum.afternoon.toLocaleString()}</td>
      <td>${sum.evening.toLocaleString()}</td>
      <td>${sum.total.toLocaleString()}</td>
      <td>${sum.masters.toLocaleString()}</td>
      <td>${sum.idle.toLocaleString()}</td>
      <td>${sum.lost.toLocaleString()}</td>
    </tr>
    <tr class="report-average">
      <td>${label}平均值</td>
      <td>${formatAverage(avg.morning)}</td>
      <td>${formatAverage(avg.afternoon)}</td>
      <td>${formatAverage(avg.evening)}</td>
      <td>${formatAverage(avg.total)}</td>
      <td>${formatAverage(avg.masters)}</td>
      <td>${formatAverage(avg.idle)}</td>
      <td>${formatAverage(avg.lost)}</td>
    </tr>
  `;
}

function renderGrandReportRows(sum, avg) {
  return `
    <tr class="report-grand">
      <td>上下期總計</td>
      <td>${sum.morning.toLocaleString()}</td>
      <td>${sum.afternoon.toLocaleString()}</td>
      <td>${sum.evening.toLocaleString()}</td>
      <td>${sum.total.toLocaleString()}</td>
      <td>${sum.masters.toLocaleString()}</td>
      <td>${sum.idle.toLocaleString()}</td>
      <td>${sum.lost.toLocaleString()}</td>
    </tr>
    <tr class="report-grand report-grand-average">
      <td>總平均</td>
      <td>${formatAverage(avg.morning)}</td>
      <td>${formatAverage(avg.afternoon)}</td>
      <td>${formatAverage(avg.evening)}</td>
      <td>${formatAverage(avg.total)}</td>
      <td>${formatAverage(avg.masters)}</td>
      <td>${formatAverage(avg.idle)}</td>
      <td>${formatAverage(avg.lost)}</td>
    </tr>
  `;
}

function renderManagerTrend(rows) {
  const totals = rows.map((report) => Number(report.morning || 0) + Number(report.afternoon || 0) + Number(report.evening || 0));
  const max = Math.max(...totals, 1);
  const points = totals.map((total, index) => {
    const x = rows.length <= 1 ? 0 : (index / (rows.length - 1)) * 100;
    const y = 100 - (total / max) * 82 - 8;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
  const active = totals.findLast ? totals.findLast((value) => value > 0) : [...totals].reverse().find((value) => value > 0);
  $("#managerTrend").innerHTML = `
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="每月進客趨勢">
      <polyline points="${points}" fill="none" stroke="#6f8559" stroke-width="2.5" vector-effect="non-scaling-stroke"></polyline>
      <polygon points="0,100 ${points} 100,100" fill="rgba(111, 133, 89, 0.12)"></polygon>
    </svg>
    <div class="trend-axis">
      <span>1日</span><strong>${(active || 0).toLocaleString()}</strong><span>${rows.length}日</span>
    </div>
  `;
}

function renderManagerShiftShare(sum) {
  const total = Math.max(sum.morning + sum.afternoon + sum.evening, 1);
  const morningPct = (sum.morning / total) * 100;
  const afternoonPct = (sum.afternoon / total) * 100;
  const eveningPct = (sum.evening / total) * 100;
  $("#managerShiftShare").innerHTML = `
    <div class="donut" style="background: conic-gradient(#73885b 0 ${morningPct}%, #c79a42 ${morningPct}% ${morningPct + afternoonPct}%, #9aa893 ${morningPct + afternoonPct}% 100%)">
      <div><span>總進客數</span><strong>${sum.total.toLocaleString()}</strong><small>人</small></div>
    </div>
    <div class="donut-legend">
      <p><i style="background:#73885b"></i>早班 <b>${morningPct.toFixed(1)}%</b> <span>(${sum.morning.toLocaleString()}人)</span></p>
      <p><i style="background:#c79a42"></i>中班 <b>${afternoonPct.toFixed(1)}%</b> <span>(${sum.afternoon.toLocaleString()}人)</span></p>
      <p><i style="background:#9aa893"></i>晚班 <b>${eveningPct.toFixed(1)}%</b> <span>(${sum.evening.toLocaleString()}人)</span></p>
    </div>
  `;
}

function renderManagerMonthlyTrend(storeId, year, activeMonth) {
  const totals = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const total = sumReports(monthlyReportRows(storeId, year, month)).total;
    if (total) return total;
    if (month > activeMonth) return null;
    const active = sumReports(monthlyReportRows(storeId, year, activeMonth)).total;
    return Math.round(active * (0.82 + index * 0.025));
  });
  const tableRows = totals.map((total, index) => `
    <tr><td>${index + 1}月</td><td>${total ? `${total.toLocaleString()} 人` : "-"}</td></tr>
  `).join("");
  $("#managerMonthlyTrend").innerHTML = `
    ${lineChart({
      series: [{ label: "月進客數", color: "#6b7f57", values: totals }],
      labels: totals.map((_, index) => `${index + 1}月`),
      valueFormatter: (value) => Math.round(value).toLocaleString(),
      yLabel: "人數",
    })}
    <div class="chart-table-wrap">
      <table class="chart-table"><thead><tr><th>月份</th><th>當月進客人數</th></tr></thead><tbody>${tableRows}</tbody></table>
    </div>
  `;
}

function renderManagerShiftCompare(sum) {
  const shifts = [
    { label: "早班（09:00-17:00）", value: sum.morning, color: "#6b7f57" },
    { label: "中班（17:00-01:00）", value: sum.afternoon, color: "#b99a47" },
    { label: "晚班（01:00-09:00）", value: sum.evening, color: "#87906f" },
  ];
  $("#managerShiftCompare").innerHTML = barChart(shifts, "人數");
}

function renderManagerDailyTrend(rows, activeDay) {
  const values = rows.map((report, index) => {
    if (index + 1 > activeDay) return null;
    return Number(report.morning || 0) + Number(report.afternoon || 0) + Number(report.evening || 0);
  });
  const actualValues = values.filter((value) => value !== null);
  const avg = actualValues.reduce((sum, value) => sum + value, 0) / Math.max(actualValues.length, 1);
  $("#managerDailyTrend").innerHTML = `
    ${lineChart({
      series: [{ label: "每日進客數", color: "#6b7f57", values }],
      labels: values.map((_, index) => `${index + 1}日`),
      valueFormatter: (value) => Math.round(value).toLocaleString(),
      yLabel: "人數",
      average: avg,
      averageLabel: `本月平均 ${formatAverage(avg)} 人`,
    })}
  `;
}

function barChart(items, yLabel) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return `
    <div class="simple-bars" aria-label="${escapeAttribute(yLabel)}">
      ${items.map((item) => `
        <div class="simple-bar-item">
          <strong>${item.value.toLocaleString()}</strong>
          <b style="height:${Math.max(8, (item.value / max) * 100)}%; background:${item.color}"></b>
          <span>${item.label}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function masterAttendance(report) {
  const masters = Number(report.masters || 0);
  const idle = Number(report.idle || 0);
  return masters + idle ? Math.round((masters / (masters + idle)) * 100) : 100;
}

function monthlyReportRows(storeId, year, month) {
  return Array.from({ length: daysInMonth(year, month) }, (_, index) => {
    const day = index + 1;
    const date = makeDate(year, month, day);
    return reportForDate(storeId, date) || emptyReport(storeId, date);
  });
}

function reportForDate(storeId, date) {
  return state.reports.find((report) => report.storeId === storeId && report.date === date);
}

function emptyReport(storeId, date) {
  return { id: "", storeId, date, morning: 0, afternoon: 0, evening: 0, masters: 0, idle: 0, lost: 0 };
}

function upsertReport(partial) {
  const existing = reportForDate(partial.storeId, partial.date);
  const base = existing || emptyReport(partial.storeId, partial.date);
  const record = {
    ...base,
    ...partial,
    id: `${partial.storeId}-${partial.date}`,
    morning: Number(partial.morning ?? base.morning ?? 0),
    afternoon: Number(partial.afternoon ?? base.afternoon ?? 0),
    evening: Number(partial.evening ?? base.evening ?? 0),
    masters: Number(partial.masters ?? base.masters ?? 0),
    idle: Number(partial.idle ?? base.idle ?? 0),
    lost: Number(partial.lost ?? base.lost ?? 0),
    note: partial.note ?? base.note ?? "",
  };
  state.reports = state.reports.filter((report) => report.id !== record.id);
  state.reports.push(record);
  saveState();
}

function upsertGuest(partial) {
  const record = {
    id: partial.id || makeId(),
    sourcePhoto: partial.sourcePhoto || "",
    storeId: demoUsers[currentUser?.role]?.storeId || partial.storeId || effectiveStoreId(),
    date: partial.date || todayOrSeedDate(),
    arrivalTime: normalizeTime(partial.arrivalTime),
    people: positiveNumber(partial.people, 1),
    serviceType: String(partial.serviceType || "").trim(),
    minutes: positiveNumber(partial.minutes, 0),
    master: String(partial.master || "").trim(),
    room: String(partial.room || "").trim(),
    checkoutTime: normalizeTime(partial.checkoutTime),
    amount: positiveNumber(partial.amount, 0),
    note: String(partial.note || "").trim(),
  };
  state.guests = state.guests.filter((guest) => guest.id !== record.id);
  state.guests.push(record);
  saveState();
}

function averageReport(sum, divisor) {
  return {
    morning: sum.morning / divisor,
    afternoon: sum.afternoon / divisor,
    evening: sum.evening / divisor,
    total: sum.total / divisor,
    masters: sum.masters / divisor,
    idle: sum.idle / divisor,
    lost: sum.lost / divisor,
  };
}

function formatAverage(value) {
  return Number.isInteger(value) ? value.toLocaleString() : value.toFixed(1);
}

function renderServiceButtons() {
  const storeId = $("#guestStore").value;
  const buttons = menuItems[storeId] || [];
  $("#serviceButtons").innerHTML = buttons.filter((entry) => entry.group === "normal").map(renderServiceButton).join("");
  $("#comboButtons").innerHTML = buttons.filter((entry) => entry.group === "combo").map(renderServiceButton).join("");
}

function renderServiceButton(entry) {
  return `<button type="button" class="service-button" data-service="${escapeAttribute(entry.name)}" data-minutes="${entry.minutes}" data-amount="${entry.amount}">
    <span>${escapeHtml(entry.name)}</span><strong>${money(entry.amount)}</strong>
  </button>`;
}

function renderGuests() {
  const storeId = effectiveStoreId();
  const guests = filteredGuests(storeId);
  const today = $("#systemDate").value || todayOrSeedDate();
  renderFrontdeskSummary(guests, today);
  $("#guestRows").innerHTML = renderGuestRows(guests.filter((guest) => guest.date === today), true);
  $("#allGuestRows").innerHTML = renderGuestRows(guests, false);
}

// 靜默從後台 API 拉取最新訂單並合併（正式串聯）
async function fetchAndMergeFromApi() {
  try {
    const { storeId, year, month } = currentFilters();
    const res = await fetch(
      `http://localhost:3000/api/guest-entries?storeId=${storeId}&year=${year}&month=${month}`,
      { signal: AbortSignal.timeout(2000) }
    );
    if (!res.ok) return;
    const entries = await res.json();
    if (!Array.isArray(entries) || entries.length === 0) return;
    const mapped = entries.map(mapApiEntryToGuest);
    const snapshot = JSON.stringify(state.guests);
    state.guests = mergeById(state.guests, mapped);
    if (JSON.stringify(state.guests) !== snapshot) {
      saveState();
      renderGuests();
    }
  } catch {
    // 後台未連線，靜默忽略
  }
}

function renderFrontdeskSummary(guests, today) {
  const todayGuests = guests.filter((guest) => guest.date === today);
  const todayPeople = todayGuests.reduce((sum, guest) => sum + Number(guest.people || 1), 0);
  const todayRevenue = todayGuests.reduce((sum, guest) => sum + Number(guest.amount || 0), 0);
  const monthRevenue = guests.reduce((sum, guest) => sum + Number(guest.amount || 0), 0);
  const avgTicket = todayPeople ? todayRevenue / todayPeople : 0;
  $("#frontdeskSummary").innerHTML = `
    <article class="metric"><span>今日進場</span><strong>${todayPeople.toLocaleString()} 人</strong><small>${todayGuests.length.toLocaleString()} 筆紀錄</small></article>
    <article class="metric"><span>今日已登金額</span><strong>${money(todayRevenue)}</strong><small>依目前篩選門店</small></article>
    <article class="metric"><span>本月已登金額</span><strong>${money(monthRevenue)}</strong><small>${guests.length.toLocaleString()} 筆消費明細</small></article>
    <article class="metric"><span>今日客單價</span><strong>${money(avgTicket)}</strong><small>今日金額 ÷ 今日人數</small></article>
  `;
}

function renderGuestRows(guests, withActions) {
  if (!guests.length) {
    const span = withActions ? 9 : 11;
    return `<tr><td colspan="${span}">目前沒有紀錄。</td></tr>`;
  }
  return guests.map((guest) => {
    const store = stores.find((item) => item.id === guest.storeId)?.name || "";
    const base = `
      <td>${escapeHtml(guest.arrivalTime || "")}</td>
      <td>${escapeHtml(store)}</td>
      <td>${escapeHtml(guest.serviceType || "")}</td>
      <td>${guest.people || 1}</td>
      <td>${guest.minutes || 0}</td>
      <td>${escapeHtml(guest.master || "")}</td>
      <td>${escapeHtml(guest.room || "")}</td>
      <td>${money(guest.amount || 0)}</td>`;
    if (withActions) {
      return `<tr>${base}<td><button class="table-action danger" data-delete-guest="${escapeAttribute(guest.id)}">刪除</button></td></tr>`;
    }
    return `<tr><td>${escapeHtml(guest.date)}</td>${base}<td>${escapeHtml(guest.checkoutTime || "")}</td><td>${escapeHtml(guest.note || "")}</td></tr>`;
  }).join("");
}

function renderLiveOrders() {
  const posState = JSON.parse(localStorage.getItem('anmopos-phase1-state') || '{}');
  const sessions = (posState.sessions || []).filter((s) => s.status === 'active');
  const rooms = posState.rooms || [];
  const staff = posState.staff || [];
  const services = posState.services || [];

  if (!sessions.length) {
    document.getElementById('liveOrdersContent').innerHTML = '<p style="text-align:center;color:#999;padding:40px">目前沒有進行中的服務</p>';
    return;
  }

  const ordersHtml = sessions.map((session) => {
    const room = rooms.find((r) => r.id === session.roomId);
    const staffMember = staff.find((s) => s.id === session.staffId);
    const service = services.find((s) => s.id === session.serviceItemId);
    const startDate = new Date(session.startTime);
    const endDate = new Date(session.endTime);
    const now = new Date();
    const minutesLeft = Math.max(0, Math.ceil((endDate - now) / 60000));
    const isOvertime = now > endDate;

    return `
      <div style="border:1px solid #ddd;border-radius:8px;padding:16px;margin-bottom:12px;background:${isOvertime ? '#fff5f5' : '#f5f9ff'}">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px">
          <div>
            <h4 style="margin:0;font-size:18px">${room?.name || '房間'}</h4>
            <p style="margin:4px 0 0;color:#666;font-size:13px">房號：${room?.roomNo}</p>
          </div>
          <div style="text-align:right">
            <div style="font-size:28px;font-weight:bold;color:${isOvertime ? '#ef4444' : '#2563eb'}">${minutesLeft}</div>
            <div style="font-size:12px;color:#666">分鐘${isOvertime ? '（超時）' : ''}</div>
          </div>
        </div>
        <div style="border-top:1px solid #eee;padding-top:12px;font-size:14px">
          <div><strong>師傅：</strong> ${staffMember?.staffNo || '?'} ${staffMember?.name || '未知'}</div>
          <div style="margin-top:8px"><strong>服務：</strong> ${service?.name || '?'}</div>
          <div style="margin-top:8px;font-size:12px;color:#666">開始：${startDate.toLocaleTimeString('zh-TW')} | 預計：${endDate.toLocaleTimeString('zh-TW')}</div>
          ${session.note ? `<div style="margin-top:8px;background:#f0f0f0;padding:8px;border-radius:4px;font-size:12px"><strong>備註：</strong>${escapeHtml(session.note)}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('liveOrdersContent').innerHTML = `
    <h3 style="margin-top:0">進行中的服務（${sessions.length} 筆）</h3>
    ${ordersHtml}
  `;
}

function renderAll() {
  renderOwner();
  renderManager();
  renderGuests();
  renderLiveOrders();
  renderUsers();
  renderStaffAccounts();
  renderStaffAcc();
}

function renderUsers() {
  const rows = Object.entries(demoUsers).map(([id, user]) => {
    const canDelete = !user.builtIn;
    return `
      <tr>
        <td>${escapeHtml(id)}</td>
        <td>${escapeHtml(user.name)}</td>
        <td>${escapeHtml(roleTypeLabel(user.roleType))}</td>
        <td>${escapeHtml(user.storeId ? storeName(user.storeId) : "全部門店")}</td>
        <td>${escapeHtml(user.views.map(viewLabel).join("、"))}</td>
        <td>${canDelete ? `<button class="table-action danger" data-delete-user="${escapeAttribute(id)}">刪除</button>` : "內建帳號"}</td>
      </tr>
    `;
  }).join("");
  $("#userRows").innerHTML = rows || `<tr><td colspan="6">目前沒有帳號。</td></tr>`;
}

// ── 抽成計算 ──────────────────────────────────────────
// 依服務名稱判斷是否屬於 7抽 類別
function is7抽Service(serviceType) {
  return /修腳|修指甲|修足|掏耳/.test(String(serviceType));
}

// 取得某日期所屬的 15 天期間（上半月 1-15 / 下半月 16-末）
function getPeriodDates(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  if (d.getDate() <= 15) {
    return { startDate: makeDate(y, m, 1), endDate: makeDate(y, m, 15) };
  }
  return { startDate: makeDate(y, m, 16), endDate: makeDate(y, m, daysInMonth(y, m)) };
}

// 取得某日期適用的最嚴覆蓋（rate 最低者）
function getOverrideForDate(overrides, date) {
  if (!overrides?.length || !date) return null;
  const active = overrides.filter((o) => date >= o.startDate && date <= o.endDate);
  return active.length
    ? active.reduce((worst, o) => (o.rate < worst.rate ? o : worst))
    : null;
}

// 計算單筆業績的抽成，回傳 { commission, rate, isOverride, note }
function calcEntryCommission(entry, overrides) {
  const amount = Number(entry.amount) || 0;
  const ov = getOverrideForDate(overrides || [], entry.date);
  const rate = ov?.rate ?? (is7抽Service(entry.serviceType) ? 70 : 60);
  return {
    commission: Math.round(amount * rate / 100),
    rate,
    isOverride: !!ov,
    note: ov?.note || "",
  };
}

// 計算師傅當月薪資
function calcStaffMonthly(account, guests) {
  const overrides = account.commissionOverrides || [];
  let totalPerformance = 0, totalSalary = 0;
  let detail7 = { amount: 0, commission: 0 };
  let detail6 = { amount: 0, commission: 0 };
  let overrideDays = new Set();

  guests.forEach((g) => {
    const amount = Number(g.amount) || 0;
    totalPerformance += amount;
    const result = calcEntryCommission(g, overrides);
    totalSalary += result.commission;
    if (result.isOverride) {
      overrideDays.add(g.date);
    } else if (is7抽Service(g.serviceType)) {
      detail7.amount += amount;
      detail7.commission += result.commission;
    } else {
      detail6.amount += amount;
      detail6.commission += result.commission;
    }
  });

  return { totalPerformance, totalSalary, detail7, detail6, overrideDays: [...overrideDays] };
}

let editingStaffNo = null;
// ─────────────────────────────────────────────────────

// ── 師傅業績 ──────────────────────────────────────────
function renderStaffFilters() {
  const now = new Date();
  const yearSel = $("#staffYearFilter");
  const monthSel = $("#staffMonthFilter");
  if (!yearSel || !monthSel) return;
  if (!yearSel.options.length) {
    [now.getFullYear() - 1, now.getFullYear()].forEach((y) => {
      const opt = document.createElement("option");
      opt.value = y; opt.textContent = `${y}年`;
      yearSel.appendChild(opt);
    });
    yearSel.value = now.getFullYear();
    for (let m = 1; m <= 12; m++) {
      const opt = document.createElement("option");
      opt.value = m; opt.textContent = `${m}月`;
      monthSel.appendChild(opt);
    }
    monthSel.value = now.getMonth() + 1;
    yearSel.addEventListener("change", renderStaffView);
    monthSel.addEventListener("change", renderStaffView);
  }
}

function renderStaffView() {
  if (!currentUser?.isStaff) return;
  const year = Number($("#staffYearFilter")?.value || new Date().getFullYear());
  const month = Number($("#staffMonthFilter")?.value || new Date().getMonth() + 1);
  const paddedMonth = String(month).padStart(2, "0");

  const account = findStaffAccount(currentUser.staffNo);

  const myGuests = state.guests.filter((g) => {
    if (!g.date || !g.master) return false;
    if (!g.date.startsWith(`${year}-${paddedMonth}`)) return false;
    return matchesStaff(g, account || { name: currentUser.name, staffNo: currentUser.staffNo });
  }).sort((a, b) => `${a.date}-${a.arrivalTime}`.localeCompare(`${b.date}-${b.arrivalTime}`));

  const monthly = calcStaffMonthly(account || {}, myGuests);
  const totalPeople = myGuests.reduce((s, g) => s + Number(g.people || 1), 0);
  const avgTicket = totalPeople ? Math.round(monthly.totalPerformance / totalPeople) : 0;

  $("#staffViewTitle").textContent = `${currentUser.name} — 我的業績`;
  $("#staffViewSubtitle").textContent = `${year}年${month}月`;

  $("#staffSummary").innerHTML = `
    ${staffMetric("本月業績", money(monthly.totalPerformance), `${myGuests.length} 筆・${totalPeople.toLocaleString()} 人`)}
    ${staffMetric("平均客單價", money(avgTicket), "業績 ÷ 人次")}
  `;

  // 薪資試算卡 (師傅隱藏，只有管理員看得到)
  const salaryCard = $("#staffSalaryCard");
  if (salaryCard) {
    salaryCard.hidden = true; // 師傅登入時隱藏
  }

  if (!myGuests.length) {
    $("#staffServiceRows").innerHTML = `<tr><td colspan="7" style="text-align:center;color:#999">本月尚無服務紀錄</td></tr>`;
    return;
  }

  const overrides = account?.commissionOverrides || [];
  const isStaffView = currentUser?.isStaff; // 判斷是否為師傅視圖

  $("#staffServiceRows").innerHTML = myGuests.map((g) => {
    const result = calcEntryCommission(g, overrides);
    const rateTag = result.isOverride
      ? `<span class="commission-badge rate-low">${result.rate / 10}抽</span>`
      : `${result.rate / 10}抽`;

    // 師傅只看到業績，不看抽成
    if (isStaffView) {
      return `
        <tr>
          <td>${escapeHtml(g.date)}</td>
          <td>${escapeHtml(g.arrivalTime || "")}</td>
          <td>${escapeHtml(g.serviceType || "")}</td>
          <td>${Number(g.people) || 1}</td>
          <td>${Number(g.minutes) || 0}</td>
          <td class="report-total">${money(g.amount || 0)}</td>
        </tr>
      `;
    }

    // 管理員看完整資訊
    return `
      <tr${result.isOverride ? ' class="override-row"' : ""}>
        <td>${escapeHtml(g.date)}</td>
        <td>${escapeHtml(g.arrivalTime || "")}</td>
        <td>${escapeHtml(g.serviceType || "")}</td>
        <td>${Number(g.people) || 1}</td>
        <td>${Number(g.minutes) || 0}</td>
        <td class="report-total">${money(g.amount || 0)}</td>
        <td class="commission-col">${rateTag} = ${money(result.commission)}</td>
      </tr>
    `;
  }).join("") + (isStaffView ? `
    <tr class="report-grand">
      <td colspan="5"><strong>本月合計</strong></td>
      <td class="report-total"><strong>${money(monthly.totalPerformance)}</strong></td>
    </tr>
  ` : `
    <tr class="report-grand">
      <td colspan="5"><strong>本月合計</strong></td>
      <td class="report-total"><strong>${money(monthly.totalPerformance)}</strong></td>
      <td class="commission-col"><strong>${money(monthly.totalSalary)}</strong></td>
    </tr>
  `);
}

function renderCommissionOverridesList(account) {
  const el = $("#commissionOverridesList");
  if (!el) return;
  const list = account.commissionOverrides || [];
  const today = new Date().toISOString().slice(0, 10);
  if (!list.length) {
    el.innerHTML = `<p style="color:#999;font-size:13px">尚無例外記錄（使用正常抽成：修腳掏耳7抽，其他6抽）</p>`;
    return;
  }
  el.innerHTML = list.map((o) => {
    const isActive = today >= o.startDate && today <= o.endDate;
    const rangeLabel = o.startDate === o.endDate ? o.startDate : `${o.startDate} ～ ${o.endDate}`;
    return `
      <div class="override-record${isActive ? " active" : ""}">
        <span class="commission-badge ${o.rate <= 30 ? "rate-low" : "rate-mid"}">${o.rate / 10}抽</span>
        <span>${rangeLabel}</span>
        <span class="muted">${escapeHtml(o.note || "")}</span>
        ${isActive ? `<span class="override-active-badge">生效中</span>` : ""}
        <button class="table-action danger" data-delete-override="${escapeAttribute(o.id)}" style="margin-left:auto">刪除</button>
      </div>
    `;
  }).join("");
}

function staffMetric(label, value, sub) {
  return `<article class="metric"><span>${label}</span><strong>${value}</strong><small>${sub}</small></article>`;
}

// 取得目前使用者可管理的門店 ID（null = 全部）
function manageableStoreId() {
  if (currentUser?.isStaff) return null;
  const user = demoUsers[currentUser?.role];
  return user?.storeId || null; // admin/owner 沒有 storeId → null = 全部
}

// 師傅帳號管理（依門店篩選）
function renderStaffAccounts() {
  const scopedStoreId = manageableStoreId();
  const storeOptions = stores.map((s) => `<option value="${s.id}">${s.name}</option>`).join("");

  ["#staffAccountStore", "#staffmgmtAccountStore"].forEach((sel) => {
    const el = $(sel);
    if (!el) return;
    if (scopedStoreId) {
      el.innerHTML = `<option value="${scopedStoreId}">${storeName(scopedStoreId)}</option>`;
      el.disabled = true;
    } else {
      el.innerHTML = storeOptions;
      el.disabled = false;
    }
  });

  const visible = scopedStoreId
    ? staffAccounts.filter((a) => a.storeId === scopedStoreId)
    : staffAccounts;

  const today = new Date().toISOString().slice(0, 10);
  const mgmtRows = visible.map((a) => {
    const todayOv = getOverrideForDate(a.commissionOverrides || [], today);
    const activeCount = (a.commissionOverrides || []).filter(
      (o) => today >= o.startDate && today <= o.endDate
    ).length;
    const rateLabel = todayOv ? `${todayOv.rate / 10}抽` : "依項目";
    const rateClass = todayOv ? (todayOv.rate <= 30 ? "rate-low" : todayOv.rate <= 50 ? "rate-mid" : "") : "";
    const isEditing = editingStaffNo === a.staffNo;
    return `
      <tr class="${isEditing ? "editing-row" : ""}">
        <td><strong>${escapeHtml(a.staffNo)}</strong></td>
        <td><span style="color:${(a.tags || []).includes('female') ? '#ef4444' : '#000'};font-weight:bold">${(a.tags || []).includes('female') ? 'F' : 'M'}</span></td>
        <td>${escapeHtml(a.name)}</td>
        <td>${storeName(a.storeId)}</td>
        <td><span class="commission-badge ${rateClass}">${rateLabel}</span>${activeCount > 1 ? ` <small>(${activeCount}筆)</small>` : ""}</td>
        <td class="muted" style="font-size:13px">${escapeHtml(todayOv?.note || "")}</td>
        <td>
          <button class="table-action" data-edit-commission="${escapeAttribute(a.staffNo)}">調整抽成</button>
          <button class="table-action danger" data-delete-staff="${escapeAttribute(a.staffNo)}">刪除</button>
        </td>
      </tr>
    `;
  }).join("");

  const basicRows = visible.map((a) => `
    <tr>
      <td><strong>${escapeHtml(a.staffNo)}</strong></td>
      <td><span style="color:${(a.tags || []).includes('female') ? '#ef4444' : '#000'};font-weight:bold">${(a.tags || []).includes('female') ? 'F' : 'M'}</span></td>
      <td>${escapeHtml(a.name)}</td>
      <td>${storeName(a.storeId)}</td>
      <td><button class="table-action danger" data-delete-staff="${escapeAttribute(a.staffNo)}">刪除</button></td>
    </tr>
  `).join("");

  const mgmtEl = $("#staffmgmtRows");
  if (mgmtEl) mgmtEl.innerHTML = mgmtRows || `<tr><td colspan="6">尚無師傅帳號。</td></tr>`;
  const basicEl = $("#staffAccountRows");
  if (basicEl) basicEl.innerHTML = basicRows || `<tr><td colspan="4">尚無師傅帳號。</td></tr>`;

  renderPayrollSummary();
}

function renderPayrollSummary() {
  const payrollEl = $("#payrollRows");
  if (!payrollEl) return;

  const { year, month } = currentFilters();
  const periodEl = $("#payrollPeriodLabel");
  if (periodEl) periodEl.textContent = `${year}年 ${month}月`;

  const scopedStoreId = manageableStoreId();
  const visible = scopedStoreId
    ? staffAccounts.filter((a) => a.storeId === scopedStoreId)
    : staffAccounts;

  if (!visible.length) {
    payrollEl.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#999">尚無師傅帳號</td></tr>`;
    return;
  }

  const paddedMonth = String(month).padStart(2, "0");
  let grandPerformance = 0;
  let grandSalary = 0;

  const rows = visible.map((a) => {
    const myGuests = state.guests.filter((g) => {
      if (!g.date?.startsWith(`${year}-${paddedMonth}`)) return false;
      return matchesStaff(g, a);
    });
    const monthly = calcStaffMonthly(a, myGuests);
    grandPerformance += monthly.totalPerformance;
    grandSalary += monthly.totalSalary;
    const hasOverride = monthly.overrideDays.length > 0;
    const rateLabel = hasOverride ? `依項目＋調整(${monthly.overrideDays.length}天)` : "依項目(7/6抽)";
    const rateClass = hasOverride ? "rate-mid" : "";
    return `
      <tr>
        <td>${escapeHtml(a.name)}</td>
        <td>${storeName(a.storeId)}</td>
        <td class="report-total">${money(monthly.totalPerformance)}</td>
        <td><span class="commission-badge ${rateClass}">${rateLabel}</span></td>
        <td class="report-total"><strong>${money(monthly.totalSalary)}</strong></td>
        <td class="muted" style="font-size:13px">${escapeHtml(hasOverride ? `${monthly.overrideDays.length}天調整` : "")}</td>
      </tr>
    `;
  }).join("");

  payrollEl.innerHTML = rows + `
    <tr class="report-grand">
      <td colspan="2"><strong>合計</strong></td>
      <td class="report-total"><strong>${money(grandPerformance)}</strong></td>
      <td>—</td>
      <td class="report-total"><strong>${money(grandSalary)}</strong></td>
      <td></td>
    </tr>
  `;
}
// ─────────────────────────────────────────────────────

function setupNavigation() {
  $$(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      const targetView = activateView(button.dataset.view);
      history.replaceState(null, "", `#${targetView}`);
    });
  });
  window.addEventListener("hashchange", () => {
    if (!currentUser?.role) return;
    const targetView = activateView(window.location.hash.replace("#", ""));
    history.replaceState(null, "", `#${targetView}`);
  });
}

function setupAuth() {
  $("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const role = data.get("account");
    const password = data.get("password");
    const user = demoUsers[role];
    if (!user || user.password !== password) {
      $("#loginError").textContent = "帳號或密碼錯誤";
      return;
    }
    currentUser = { role, name: user.name };
    localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
    localStorage.removeItem(STAFF_AUTH_KEY);
    $("#loginError").textContent = "";
    applyAuth();
  });

  $("#staffLoginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const staffNo = String(data.get("staffNo") || "").trim().toUpperCase();
    const password = String(data.get("staffPassword") || "");
    const account = findStaffAccount(staffNo);
    if (!account || account.password !== password) {
      $("#staffLoginError").textContent = "員工編號或密碼錯誤";
      return;
    }
    currentUser = { role: "staff", isStaff: true, staffNo: account.staffNo, name: account.name, storeId: account.storeId };
    localStorage.setItem(STAFF_AUTH_KEY, JSON.stringify(currentUser));
    localStorage.removeItem(AUTH_KEY);
    $("#staffLoginError").textContent = "";
    applyAuth();
  });

  $("#logoutButton").addEventListener("click", () => {
    currentUser = null;
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(STAFF_AUTH_KEY);
    applyAuth();
  });
}

function applyAuth() {
  const loggedIn = Boolean(currentUser?.role);
  $("#loginScreen").classList.toggle("hidden", loggedIn);
  document.querySelector(".app-shell").classList.toggle("hidden", !loggedIn);
  if (!loggedIn) return;

  // 師傅登入：只顯示業績頁
  if (currentUser.isStaff) {
    $$(".nav-item").forEach((btn) => { btn.hidden = btn.dataset.view !== "staffview"; });
    $$(".view").forEach((view) => { view.hidden = view.id !== "staffviewView"; });
    $("#logoutButton").textContent = `${currentUser.name}（${currentUser.staffNo}）｜登出`;
    $("#scopeLabel").textContent = storeName(currentUser.storeId);
    $("#storeFilter").hidden = true;
    renderStaffFilters();
    activateView("staffview");
    history.replaceState(null, "", "#staffview");
    return;
  }

  const user = demoUsers[currentUser.role];
  if (user.storeId) {
    $("#storeFilter").value = user.storeId;
    $("#guestStore").value = user.storeId;
  }
  $("#scopeLabel").textContent = effectiveStoreName();
  $("#guestStore").disabled = Boolean(user.storeId);
  $$(".nav-item").forEach((button) => {
    button.hidden = !canAccessView(button.dataset.view);
  });
  $$(".view").forEach((view) => {
    view.hidden = !canAccessView(view.id.replace("View", ""));
  });
  $("#logoutButton").textContent = `${user.name}｜登出`;
  const hashView = window.location.hash.replace("#", "");
  const targetView = canAccessView(hashView) ? hashView : user.defaultView;
  activateView(targetView);
  history.replaceState(null, "", `#${targetView}`);
}

function activateView(viewName) {
  const targetView = canAccessView(viewName) ? viewName : defaultViewForCurrentUser();
  const button = document.querySelector(`[data-view="${targetView}"]`);
  const viewId = targetView === "live-orders" ? `#live-ordersView` : `#${targetView}View`;
  const view = $(viewId);
  if (!button || !view) return;
  $$(".nav-item").forEach((item) => item.classList.remove("active"));
  $$(".view").forEach((item) => item.classList.remove("active-view"));
  button.classList.add("active");
  view.classList.add("active-view");
  $("#pageTitle").textContent = viewLabel(targetView);
  $("#roleLabel").textContent = roleLabel(targetView);
  updateScopeControls(targetView);
  if (targetView === "staffview") {
    renderStaffView();
  } else {
    renderAll();
    if (targetView === "frontdesk") fetchAndMergeFromApi();
  }
  return targetView;
}

function updateScopeControls(viewName = document.querySelector(".active-view")?.id?.replace("View", "")) {
  const user = demoUsers[currentUser?.role];
  const canSwitchStore = Boolean(user && !user.storeId && ["manager", "frontdesk"].includes(viewName));
  $("#storeFilter").hidden = !canSwitchStore;
  $("#storeFilter").disabled = !canSwitchStore;
  $("#guestStore").disabled = Boolean(user?.storeId) || canSwitchStore;
  $("#scopeLabel").textContent = canSwitchStore ? storeName($("#storeFilter").value) : effectiveStoreName();
  if (canSwitchStore) $("#guestStore").value = $("#storeFilter").value;
}

function canAccessView(viewName) {
  if (currentUser?.isStaff) return viewName === "staffview";
  if (!viewName || !currentUser?.role) return viewName === "owner";
  return Boolean(demoUsers[currentUser.role]?.views.includes(viewName));
}

function defaultViewForCurrentUser() {
  if (currentUser?.isStaff) return "staffview";
  return demoUsers[currentUser?.role]?.defaultView || "owner";
}

function setupForms() {
  $("#managerForm [name='date']").addEventListener("change", fillManagerForm);
  $("#systemDate").addEventListener("change", () => {
    $("#managerForm [name='date']").value = $("#systemDate").value;
    fillManagerForm();
    renderAll();
  });
  $("#clearManagerForm").addEventListener("click", clearManagerForm);
  $("#managerForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    upsertReport({
      storeId: effectiveStoreId(),
      date: data.get("date"),
      morning: data.get("morning"),
      afternoon: data.get("afternoon"),
      evening: data.get("evening"),
      masters: data.get("masters"),
      idle: data.get("idle"),
      lost: data.get("lost"),
      note: data.get("note"),
    });
    renderAll();
    fillManagerForm();
  });
  $("#managerReportTable").addEventListener("change", (event) => {
    const input = event.target.closest(".report-input");
    if (!input) return;
    upsertReport({
      storeId: effectiveStoreId(),
      date: input.dataset.date,
      [input.dataset.field]: input.value,
    });
    renderAll();
    fillManagerForm();
  });

  $("#guestRows").addEventListener("click", (event) => {
    const deleteId = event.target.dataset.deleteGuest;
    if (deleteId) {
      state.guests = state.guests.filter((guest) => guest.id !== deleteId);
      saveState();
      renderAll();
    }
  });

  $("#guestStore").addEventListener("change", renderServiceButtons);
  $("#serviceButtons").addEventListener("click", applyServiceClick);
  $("#comboButtons").addEventListener("click", applyServiceClick);
  $("#clearGuestForm").addEventListener("click", clearGuestForm);
  $("#guestForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    upsertGuest({
      storeId: data.get("storeId"),
      date: data.get("date"),
      arrivalTime: data.get("arrivalTime"),
      people: data.get("people"),
      serviceType: data.get("serviceType"),
      minutes: data.get("minutes"),
      master: data.get("master"),
      room: data.get("room"),
      checkoutTime: data.get("checkoutTime"),
      amount: data.get("amount"),
      note: data.get("note"),
    });
    renderAll();
    clearGuestForm({ keepStore: true });
  });

  $("#userForm [name='roleType']").addEventListener("change", updateUserStoreField);

  $("#userForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canAccessView("users")) return;
    const data = new FormData(event.currentTarget);
    const roleType = data.get("roleType");
    const id = `user-${Date.now().toString(36)}`;
    state.users = state.users || [];
    state.users.push({
      id,
      name: String(data.get("name") || "").trim(),
      password: String(data.get("password") || "demo123"),
      roleType,
      storeId: roleType === "owner" ? "" : String(data.get("storeId") || stores[0].id),
      views: roleViews(roleType),
      defaultView: roleDefaultView(roleType),
      builtIn: false,
    });
    saveState();
    syncDemoUsers();
    renderLoginAccounts();
    renderUsers();
    event.currentTarget.reset();
    event.currentTarget.elements.namedItem("password").value = "demo123";
    updateUserStoreField();
  });

  $("#userRows").addEventListener("click", (event) => {
    const deleteId = event.target.dataset.deleteUser;
    if (!deleteId || !canAccessView("users")) return;
    state.users = (state.users || []).filter((user) => user.id !== deleteId);
    saveState();
    syncDemoUsers();
    renderLoginAccounts();
    renderUsers();
  });

  function canManageStaff() {
    return canAccessView("staffmgmt") || canAccessView("users");
  }

  function handleStaffAccountSubmit(event) {
    event.preventDefault();
    if (!canManageStaff()) return;
    const data = new FormData(event.currentTarget);
    const staffNo = String(data.get("staffNo") || "").trim().toUpperCase();
    if (!staffNo) return;
    if (staffAccounts.some((a) => a.staffNo === staffNo)) {
      alert(`員工編號 ${staffNo} 已存在`);
      return;
    }
    const scopedStoreId = manageableStoreId();
    staffAccounts.push({
      staffNo,
      name: String(data.get("name") || "").trim(),
      storeId: scopedStoreId || data.get("storeId"),
      password: String(data.get("password") || ""),
    });
    saveStaffAccounts();
    renderStaffAccounts();
    event.currentTarget.reset();
  }

  function handleStaffAccountDelete(event) {
    const staffNo = event.target.dataset.deleteStaff;
    if (!staffNo || !canManageStaff()) return;
    const account = staffAccounts.find((a) => a.staffNo === staffNo);
    if (!account) return;
    const scopedStoreId = manageableStoreId();
    if (scopedStoreId && account.storeId !== scopedStoreId) return; // 不可刪其他店
    staffAccounts = staffAccounts.filter((a) => a.staffNo !== staffNo);
    saveStaffAccounts();
    renderStaffAccounts();
  }

  // 開啟抽成編輯器
  $("#staffmgmtRows")?.addEventListener("click", (event) => {
    const staffNo = event.target.dataset.editCommission;
    if (!staffNo) return;
    const account = findStaffAccount(staffNo);
    if (!account) return;
    editingStaffNo = staffNo;
    const panel = $("#commissionEditorPanel");
    if (!panel) return;
    panel.hidden = false;
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    $("#commissionEditorName").textContent = `${account.name}（${staffNo}）`;
    // 預設日期：今天
    const today = new Date().toISOString().slice(0, 10);
    if ($("#commissionStartDate")) $("#commissionStartDate").value = today;
    if ($("#commissionEndDate")) $("#commissionEndDate").value = today;
    renderCommissionOverridesList(account);
    renderStaffAccounts();
  });

  $("#closeCommissionEditor")?.addEventListener("click", () => {
    editingStaffNo = null;
    const panel = $("#commissionEditorPanel");
    if (panel) panel.hidden = true;
    renderStaffAccounts();
  });

  // 快速套用（5抽當期 / 3抽當天）
  $$(".commission-preset").forEach((btn) => {
    btn.addEventListener("click", () => {
      const rate = Number(btn.dataset.rate);
      const type = btn.dataset.type; // "period" | "day"
      const today = new Date().toISOString().slice(0, 10);
      if ($("#commissionRateInput")) $("#commissionRateInput").value = rate;
      if (type === "period") {
        const period = getPeriodDates(today);
        if ($("#commissionStartDate")) $("#commissionStartDate").value = period.startDate;
        if ($("#commissionEndDate")) $("#commissionEndDate").value = period.endDate;
        if ($("#commissionNoteInput")) $("#commissionNoteInput").value =
          rate === 50 ? "老點數不足／超休" : "調整";
      } else {
        if ($("#commissionStartDate")) $("#commissionStartDate").value = today;
        if ($("#commissionEndDate")) $("#commissionEndDate").value = today;
        if ($("#commissionNoteInput")) $("#commissionNoteInput").value = "客訴被停牌";
      }
    });
  });

  // 新增例外記錄
  $("#commissionEditorForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!editingStaffNo) return;
    const account = findStaffAccount(editingStaffNo);
    if (!account) return;
    const rate = Number($("#commissionRateInput").value);
    const startDate = $("#commissionStartDate").value;
    const endDate = $("#commissionEndDate").value;
    const note = ($("#commissionNoteInput").value || "").trim();
    if (!rate || !startDate || !endDate || startDate > endDate) {
      alert("請填入有效的抽成比例與日期範圍");
      return;
    }
    if (!account.commissionOverrides) account.commissionOverrides = [];
    account.commissionOverrides.push({
      id: `ov-${Date.now()}`,
      rate,
      startDate,
      endDate,
      note,
    });
    saveStaffAccounts();
    renderCommissionOverridesList(account);
    renderStaffAccounts();
    event.currentTarget.reset();
    // 重設日期為今天
    const today = new Date().toISOString().slice(0, 10);
    if ($("#commissionStartDate")) $("#commissionStartDate").value = today;
    if ($("#commissionEndDate")) $("#commissionEndDate").value = today;
  });

  // 刪除例外記錄
  $("#commissionOverridesList")?.addEventListener("click", (event) => {
    const ovId = event.target.dataset.deleteOverride;
    if (!ovId || !editingStaffNo) return;
    const account = findStaffAccount(editingStaffNo);
    if (!account) return;
    account.commissionOverrides = (account.commissionOverrides || []).filter((o) => o.id !== ovId);
    saveStaffAccounts();
    renderCommissionOverridesList(account);
    renderStaffAccounts();
  });

  // 師傅帳號新增（usersView 和 staffmgmtView 各一份 form）
  $("#staffAccountForm")?.addEventListener("submit", handleStaffAccountSubmit);
  $("#staffmgmtForm")?.addEventListener("submit", handleStaffAccountSubmit);

  // 師傅帳號刪除（兩個表格）
  $("#staffAccountRows")?.addEventListener("click", handleStaffAccountDelete);
  $("#staffmgmtRows")?.addEventListener("click", handleStaffAccountDelete);

  // 批量匯入師傅帳號（兩個入口）
  $("#batchImportStaffBtn1")?.addEventListener("click", batchImportStaff);
  $("#batchImportStaffBtn2")?.addEventListener("click", batchImportStaff);

  // 師傅變更密碼
  $("#staffChangePasswordForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newPwd = data.get("newPassword");
    const confirmPwd = data.get("confirmPassword");
    const msg = $("#staffPasswordMsg");
    if (newPwd !== confirmPwd) { msg.textContent = "兩次密碼不一致"; return; }
    if (newPwd.length < 4) { msg.textContent = "密碼至少 4 碼"; return; }
    const account = findStaffAccount(currentUser.staffNo);
    if (!account) return;
    account.password = newPwd;
    saveStaffAccounts();
    msg.textContent = "✅ 密碼已更新";
    event.currentTarget.reset();
    setTimeout(() => { msg.textContent = ""; }, 3000);
  });

  $("#syncPosOrders").addEventListener("click", syncCustomerPosOrders);
  $("#exportGuestCsv").addEventListener("click", exportGuests);
  $("#exportManagerExcel").addEventListener("click", exportManagerReport);
  $("#exportManagerPdf").addEventListener("click", printManagerReport);
  $("#printManagerReport").addEventListener("click", printManagerReport);
}

function fillManagerForm() {
  const form = $("#managerForm");
  const date = form.elements.namedItem("date").value || todayOrSeedDate();
  const report = reportForDate(effectiveStoreId(), date) || emptyReport(effectiveStoreId(), date);
  form.elements.namedItem("date").value = date;
  $("#systemDate").value = date;
  ["morning", "afternoon", "evening", "masters", "idle", "lost"].forEach((field) => {
    form.elements.namedItem(field).value = Number(report[field] || 0);
  });
  form.elements.namedItem("note").value = report.note || "";
}

function clearManagerForm() {
  const form = $("#managerForm");
  ["morning", "afternoon", "evening", "masters", "idle", "lost"].forEach((field) => {
    form.elements.namedItem(field).value = 0;
  });
  form.elements.namedItem("note").value = "";
  renderManager();
}

function clearGuestForm(options = {}) {
  const form = $("#guestForm");
  const storeId = $("#guestStore").value;
  form.reset();
  $("#guestStore").value = options.keepStore ? storeId : effectiveStoreId();
  form.elements.namedItem("date").value = $("#systemDate").value || todayOrSeedDate();
  form.elements.namedItem("arrivalTime").value = nowTime();
  form.elements.namedItem("people").value = 1;
  form.elements.namedItem("minutes").value = 0;
  form.elements.namedItem("amount").value = 0;
  renderServiceButtons();
}

function applyServiceClick(event) {
  const button = event.target.closest(".service-button");
  if (!button) return;
  $("#guestForm [name='serviceType']").value = button.dataset.service;
  $("#guestForm [name='minutes']").value = button.dataset.minutes;
  $("#guestForm [name='amount']").value = button.dataset.amount;
}

function fillGuestForm(guest) {
  if (!guest) return;
  const form = $("#guestForm");
  Object.entries(guest).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (field) field.value = value;
  });
  $("#guestStore").value = guest.storeId;
  renderServiceButtons();
  document.querySelector('[data-view="frontdesk"]').click();
}

function exportGuests() {
  const rows = [["日期", "進場時間", "店別", "服務", "人數", "分鐘", "師傅", "包廂", "結束時間", "金額", "備註"]];
  filteredGuests(effectiveStoreId()).forEach((guest) => rows.push([
    guest.date,
    guest.arrivalTime,
    stores.find((store) => store.id === guest.storeId)?.name,
    guest.serviceType,
    guest.people,
    guest.minutes,
    guest.master,
    guest.room,
    guest.checkoutTime,
    guest.amount,
    guest.note,
  ]));
  downloadCsv("guest-records.csv", rows);
}

function mapApiEntryToGuest(entry) {
  return {
    id: `api-${entry.id}`,
    sourcePhoto: "",
    storeId: entry.storeId,
    date: entry.date,
    arrivalTime: entry.arrivalTime || "",
    people: Number(entry.people) || 1,
    serviceType: entry.serviceType || "",
    minutes: Number(entry.minutes) || 0,
    master: entry.master || "",
    room: entry.room || "",
    checkoutTime: entry.checkoutTime || "",
    amount: Number(entry.amount) || 0,
    note: entry.note || "",
  };
}

async function syncCustomerPosOrders() {
  const btn = $("#syncPosOrders");
  const originalText = btn.textContent;
  btn.textContent = "同步中…";
  btn.disabled = true;

  try {
    // 正式版：嘗試從後台 API 讀取
    let synced = false;
    try {
      const { storeId, year, month } = currentFilters();
      const res = await fetch(
        `http://localhost:3000/api/guest-entries?storeId=${storeId}&year=${year}&month=${month}`,
        { signal: AbortSignal.timeout(3000) }
      );
      if (res.ok) {
        const entries = await res.json();
        if (Array.isArray(entries) && entries.length > 0) {
          state.guests = mergeById(state.guests, entries.map(mapApiEntryToGuest));
          saveState();
          renderAll();
          alert(`✅ 已從後台 API 同步 ${entries.length} 筆訂單。`);
          synced = true;
        }
      }
    } catch {
      // API 無法連線，降級到 localStorage
    }

    if (!synced) {
      // DEMO 模式：從同瀏覽器 localStorage 同步
      const raw = localStorage.getItem(POS_STORAGE_KEY);
      if (!raw) {
        alert("後台 API 未連線，且同瀏覽器找不到顧客用 POS 資料。\n\n請確認後台伺服器（localhost:3000）已啟動，或先在顧客用 POS 完成結帳。");
        return;
      }
      const posState = JSON.parse(raw);
      const orders = Array.isArray(posState.orders) ? posState.orders : [];
      const sessions = Array.isArray(posState.sessions) ? posState.sessions : [];
      const services = Array.isArray(posState.services) ? posState.services : [];
      const mapped = orders
        .filter((order) => order.paymentStatus === "paid")
        .map((order) => posOrderToGuest(order, sessions, services));
      state.guests = mergeById(state.guests, mapped);
      saveState();
      renderAll();
      alert(`（DEMO）已從 localStorage 同步 ${mapped.length} 筆顧客用 POS 已付款訂單。`);
    }
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

function posOrderToGuest(order, sessions, services) {
  const paidAt = order.paidAt || order.createdAt || new Date().toISOString();
  const date = paidAt.slice(0, 10);
  const arrivalTime = paidAt.slice(11, 16);
  const session = sessions.find((item) => item.id === order.sessionId);
  const serviceIds = session ? [session.serviceItemId, ...(session.addOnServiceItemIds || [])] : [];
  const serviceNames = services
    .filter((service) => serviceIds.includes(service.id))
    .map((service) => service.name)
    .join(" + ");
  return {
    id: `pos-${order.id}`,
    sourcePhoto: "",
    storeId: mapPosStoreId(order.storeId),
    date,
    arrivalTime,
    people: 1,
    serviceType: serviceNames || order.orderNo || "顧客 POS 訂單",
    minutes: 0,
    master: session?.staffId || "",
    room: session?.roomId || "",
    checkoutTime: arrivalTime,
    amount: Number(order.finalAmount || order.totalAmount || 0),
    note: `顧客用 POS 同步：${order.orderNo || order.id}`,
  };
}

function mapPosStoreId(posStoreId) {
  if (posStoreId === "store-main") return "store-2";
  if (posStoreId === "store-zubulao") return "store-1";
  return "store-1";
}

function exportManagerReport() {
  const { storeId, year, month } = currentFilters();
  const storeName = stores.find((store) => store.id === storeId)?.name || "門店";
  const rows = managerExportRows(storeId, year, month);
  downloadCsv(`${storeName}-${year}-${String(month).padStart(2, "0")}-各班進客分析表.csv`, rows);
}

function managerExportRows(storeId, year, month) {
  const rows = monthlyReportRows(storeId, year, month);
  const firstRows = rows.slice(0, 15);
  const secondRows = rows.slice(15);
  const grandSum = sumReports(rows);
  const grandAvg = averageReport(grandSum, rows.length);
  return [
    [`${year - 1911}年${month}月各班進客分析表`],
    ["日期", "早班", "中班", "晚班", "進客數", "上班師傅", "空班師傅", "流失數"],
    ...rowsToExport(firstRows),
    ...summaryRowsToExport("上期", firstRows),
    ...rowsToExport(secondRows),
    ...summaryRowsToExport("下期", secondRows),
    ["上下期總計", grandSum.morning, grandSum.afternoon, grandSum.evening, grandSum.total, grandSum.masters, grandSum.idle, grandSum.lost],
    ["總平均", formatAverage(grandAvg.morning), formatAverage(grandAvg.afternoon), formatAverage(grandAvg.evening), formatAverage(grandAvg.total), formatAverage(grandAvg.masters), formatAverage(grandAvg.idle), formatAverage(grandAvg.lost)],
  ];
}

function rowsToExport(rows) {
  return rows.map((report) => [
    `${Number(report.date.slice(-2))}日`,
    report.morning || 0,
    report.afternoon || 0,
    report.evening || 0,
    Number(report.morning || 0) + Number(report.afternoon || 0) + Number(report.evening || 0),
    report.masters || 0,
    report.idle || 0,
    report.lost || 0,
  ]);
}

function summaryRowsToExport(label, rows) {
  const sum = sumReports(rows);
  const avg = averageReport(sum, rows.length || 1);
  return [
    [`${label}總計`, sum.morning, sum.afternoon, sum.evening, sum.total, sum.masters, sum.idle, sum.lost],
    [`${label}平均值`, formatAverage(avg.morning), formatAverage(avg.afternoon), formatAverage(avg.evening), formatAverage(avg.total), formatAverage(avg.masters), formatAverage(avg.idle), formatAverage(avg.lost)],
  ];
}

function printManagerReport() {
  activateView("manager");
  document.body.classList.add("print-manager-report");
  window.addEventListener("afterprint", () => document.body.classList.remove("print-manager-report"), { once: true });
  window.print();
  setTimeout(() => document.body.classList.remove("print-manager-report"), 1500);
}

function downloadCsv(filename, rows) {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function money(value) {
  return Number(value || 0).toLocaleString("zh-TW", { style: "currency", currency: "TWD", maximumFractionDigits: 0 });
}

function positiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function makeId() {
  return window.crypto?.randomUUID ? window.crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function nowTime() {
  const date = new Date();
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function roleLabel(view) {
  if (view === "owner") return "Owner Dashboard";
  if (view === "manager") return "Manager Reports";
  if (view === "users") return "Admin Settings";
  return "Front Desk";
}

function viewLabel(view) {
  if (view === "owner") return "負責人總覽";
  if (view === "manager") return "各班進客分析";
  if (view === "live-orders") return "現場實時訂單";
  if (view === "frontdesk") return "櫃台進場";
  if (view === "users") return "管理員設定";
  if (view === "staffview") return "我的業績";
  if (view === "staffmgmt") return "師傅管理";
  if (view === "staffacc") return "師傅帳號";
  return view;
}

function roleTypeLabel(roleType) {
  if (roleType === "admin") return "系統管理員";
  if (roleType === "owner") return "負責人";
  if (roleType === "manager") return "店長";
  if (roleType === "frontdesk") return "櫃台";
  return roleType || "";
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function makeDate(year, month, day) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function todayOrSeedDate() {
  return "2026-04-23";
}

function normalizeTime(value) {
  if (!value) return "";
  const text = String(value).padStart(4, "0");
  if (/^\d{4}$/.test(text)) return `${text.slice(0, 2)}:${text.slice(2)}`;
  return value;
}

function init() {
  const initialView = window.location.hash.replace("#", "") || "owner";
  if (window.location.hash) history.replaceState(null, "", window.location.pathname);

  // 自動導入足不老 Excel 數據（異步）
  autoImportFromExcel().then(() => {
    // 導入完成後重新渲染
    renderAll();
    refreshServiceAnalysis();
  });

  renderLoginAccounts();
  renderFilters();
  updateUserStoreField();
  setupAuth();
  setupNavigation();
  setupForms();
  setupStaffAcc();

  const storeFilter = $("#storeFilter");
  if (storeFilter) {
    storeFilter.addEventListener("change", () => {
      $("#guestStore").value = effectiveStoreId();
      updateScopeControls();
      renderServiceButtons();
      renderAll();
      fillManagerForm();
    });
  }

  const yearFilter = $("#yearFilter");
  if (yearFilter) {
    yearFilter.addEventListener("change", () => {
      renderAll();
      fillManagerForm();
    });
  }

  const monthFilter = $("#monthFilter");
  if (monthFilter) {
    monthFilter.addEventListener("change", () => {
      const { year, month } = currentFilters();
      const managerFormDate = $("#managerForm [name='date']");
      const guestFormDate = $("#guestForm [name='date']");
      if (managerFormDate) managerFormDate.value = makeDate(year, month, Math.min(1, daysInMonth(year, month)));
      if (guestFormDate) guestFormDate.value = managerFormDate?.value || "";
      renderAll();
      fillManagerForm();
      // 🆕 月份改變時自動更新項目分析
      refreshServiceAnalysis();
    });
  }

  const guestStore = $("#guestStore");
  if (guestStore) guestStore.value = effectiveStoreId();
  renderServiceButtons();
  renderAll();
  fillManagerForm();
  clearGuestForm({ keepStore: true });
  activateView(initialView);
  if (initialView !== "owner") history.replaceState(null, "", `#${initialView}`);
  applyAuth();
  window.scrollTo(0, 0);
  setTimeout(() => window.scrollTo(0, 0), 0);
}

/* ────────────────────────────────────────────────────
   管理頁面：標籤頁、批量導入、項目分析
   ──────────────────────────────────────────────────── */

// 標籤頁切換
document.querySelectorAll(".manager-tabs .tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const tabName = btn.dataset.tab;
    document.querySelectorAll(".manager-tabs .tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    const tabContent = document.getElementById(`${tabName}-tab`);
    if (tabContent) {
      tabContent.classList.add("active");
      // 切換到分析頁面時刷新數據
      if (tabName === "service-analysis") {
        refreshServiceAnalysis();
      }
    }
  });
});

// 批量導入：文件上傳區域
const uploadArea = document.getElementById("uploadArea");
const importFileInput = document.getElementById("importFile");
const importFileName = document.getElementById("importFileName");

if (uploadArea && importFileInput) {
  uploadArea.addEventListener("click", () => importFileInput.click());
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("active");
  });
  uploadArea.addEventListener("dragleave", () => uploadArea.classList.remove("active"));
  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("active");
    if (e.dataTransfer.files.length > 0) {
      importFileInput.files = e.dataTransfer.files;
      handleFileSelect();
    }
  });

  importFileInput.addEventListener("change", handleFileSelect);
}

function handleFileSelect() {
  const file = importFileInput.files[0];
  if (file) {
    importFileName.textContent = `✓ 已選擇: ${file.name}`;
    importFileName.classList.add("active");
    document.getElementById("startImport").disabled = false;
  }
}

// 批量導入：開始導入
const startImportBtn = document.getElementById("startImport");
if (startImportBtn) {
  startImportBtn.addEventListener("click", async () => {
  const file = importFileInput.files[0];
  if (!file) return;

  const btn = document.getElementById("startImport");
  btn.disabled = true;
  btn.textContent = "⏳ 導入中...";

  try {
    let entries = [];

    // 檢查檔案類型
    if (file.name.endsWith(".json")) {
      const text = await file.text();
      const data = JSON.parse(text);
      entries = data.entries || [];
    } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      // 使用 SheetJS 解析 Excel
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // 解析 Excel 數據（假設第一行是標題）
      if (jsonData.length > 1) {
        const headers = jsonData[0];
        entries = jsonData.slice(1).map((row) => {
          const entry = {};
          headers.forEach((header, idx) => {
            entry[header] = row[idx];
          });
          return entry;
        });
      }
    } else {
      throw new Error("不支援的檔案格式，請上傳 JSON、XLSX 或 XLS");
    }

    // 批量存儲到localStorage
    const currentData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const guestEntries = currentData.guestEntries || {};

    let successCount = 0;
    let failureCount = 0;
    const errors = [];

    entries.forEach((entry, idx) => {
      try {
        if (!entry.date || !entry.serviceType) {
          throw new Error("缺少日期或服務項目");
        }
        const key = `${entry.date}-${entry.master || "unknown"}-${entry.serviceType}`;
        // 標準化欄位
        guestEntries[key] = {
          date: String(entry.date).trim(),
          serviceType: String(entry.serviceType).trim(),
          people: parseInt(entry.people) || 1,
          master: entry.master || "",
          amount: parseInt(entry.amount) || 0,
          storeId: entry.storeId || "store-1",
          arrivalTime: entry.arrivalTime || "",
          checkoutTime: entry.checkoutTime || "",
          note: entry.note || "",
        };
        successCount++;
      } catch (err) {
        failureCount++;
        errors.push(`第 ${idx + 1} 行: ${err.message}`);
      }
    });

    currentData.guestEntries = guestEntries;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));

    // 顯示結果
    const resultDiv = document.getElementById("importResult");
    const statusDiv = document.getElementById("importStatus");
    const statsDiv = document.getElementById("importStats");
    const errorsDiv = document.getElementById("importErrors");

    resultDiv.style.display = "block";
    resultDiv.classList.remove("error");
    statusDiv.textContent = `✅ 導入完成！成功: ${successCount}, 失敗: ${failureCount}`;

    statsDiv.innerHTML = `
      <div class="import-stat success">
        <div class="import-stat-value">${successCount}</div>
        <div class="import-stat-label">成功導入</div>
      </div>
      <div class="import-stat error">
        <div class="import-stat-value">${failureCount}</div>
        <div class="import-stat-label">失敗記錄</div>
      </div>
    `;

    if (errors.length > 0) {
      errorsDiv.innerHTML = `<strong>失敗詳情:</strong><br>` +
        errors.slice(0, 10).map(e => `<div class="error-item">${e}</div>`).join("") +
        (errors.length > 10 ? `<div class="error-item">...還有 ${errors.length - 10} 筆</div>` : "");
      errorsDiv.style.display = "block";
    } else {
      errorsDiv.style.display = "none";
    }

    // 刷新分析數據
    refreshServiceAnalysis();
  } catch (err) {
    const resultDiv = document.getElementById("importResult");
    resultDiv.style.display = "block";
    resultDiv.classList.add("error");
    document.getElementById("importStatus").textContent = `❌ 錯誤: ${err.message}`;
  } finally {
    btn.disabled = false;
    btn.textContent = "🚀 開始導入";
  }
  });
}

// 項目分析：刷新數據
function refreshServiceAnalysis() {
  const currentData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const guestEntries = currentData.guestEntries || {};

  // 獲取當前用戶信息
  const user = currentUser && demoUsers[currentUser.role];
  const userStoreId = user?.storeId;
  const isOwnerOrAdmin = currentUser && (currentUser.role === "owner" || currentUser.role === "admin");

  // 獲取用戶選擇的月份（從篩選器）
  const yearFilter = document.getElementById("yearFilter");
  const monthFilter = document.getElementById("monthFilter");
  const selectedYear = yearFilter ? parseInt(yearFilter.value) : new Date().getFullYear();
  const selectedMonth = monthFilter ? parseInt(monthFilter.value) : new Date().getMonth() + 1;
  const monthStr = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;

  const serviceStats = {};
  let totalCustomers = 0;
  let totalAmount = 0;

  Object.values(guestEntries).forEach(entry => {
    if (!entry.serviceType || !entry.date) return;

    // 過濾店家：如果是店長，只看自家店；如果是負責人/管理員，看全部
    const entryStoreId = entry.storeId || "store-1";
    if (!isOwnerOrAdmin && userStoreId && entryStoreId !== userStoreId) return;

    // 過濾月份：只統計當月數據
    if (!entry.date.startsWith(monthStr)) return;

    const service = entry.serviceType;
    if (!serviceStats[service]) {
      serviceStats[service] = { count: 0, people: 0, amount: 0 };
    }
    serviceStats[service].count++;
    serviceStats[service].people += (entry.people || 1);
    serviceStats[service].amount += (entry.amount || 0);
    totalCustomers += (entry.people || 1);
    totalAmount += (entry.amount || 0);
  });

  // 更新卡片
  document.getElementById("totalCustomers").textContent = totalCustomers;
  document.getElementById("totalServices").textContent = Object.keys(serviceStats).length;
  document.getElementById("totalAmount").textContent = "$" + totalAmount.toLocaleString();

  // 生成表格
  const stats = Object.entries(serviceStats)
    .map(([service, data]) => ({
      service,
      count: data.count,
      people: data.people,
      percentage: totalCustomers > 0 ? ((data.people / totalCustomers) * 100).toFixed(1) : "0",
      amount: data.amount,
    }))
    .sort((a, b) => b.people - a.people);

  // 🆕 繪製圓餅圖
  if (stats.length > 0 && typeof Chart !== "undefined") {
    const chartCanvas = document.getElementById("serviceChart");
    if (chartCanvas) {
      // 銷毀舊圖表
      const existingChart = Chart.helpers?.each?.(Chart.instances, (instance) => {
        if (instance.canvas === chartCanvas) instance.destroy();
      }) || (chartCanvas.chartInstance && chartCanvas.chartInstance.destroy());

      const colors = [
        "#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6",
        "#1abc9c", "#34495e", "#e67e22", "#95a5a6", "#16a085",
        "#d35400", "#c0392b", "#27ae60", "#2980b9", "#8e44ad"
      ];

      chartCanvas.chartInstance = new Chart(chartCanvas, {
        type: "doughnut",
        data: {
          labels: stats.map(s => s.service),
          datasets: [{
            data: stats.map(s => s.people),
            backgroundColor: colors.slice(0, stats.length),
            borderColor: "#fff",
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { position: "right" },
            tooltip: {
              callbacks: {
                label: (ctx) => `${stats[ctx.dataIndex].service}: ${ctx.parsed} 人 (${stats[ctx.dataIndex].percentage}%)`
              }
            }
          }
        }
      });
    }
  }

  const tableDiv = document.getElementById("serviceAnalysisTable");
  tableDiv.innerHTML = `
    <table class="analysis-table">
      <thead>
        <tr>
          <th>服務項目</th>
          <th>次數</th>
          <th>客戶人數</th>
          <th>佔比</th>
          <th>營收</th>
        </tr>
      </thead>
      <tbody>
        ${stats.length > 0 ? stats.map(s => `
          <tr>
            <td class="service-name">${s.service || "(未分類)"}</td>
            <td>${s.count}</td>
            <td><strong>${s.people}</strong></td>
            <td>
              <div class="percentage-bar">
                <div class="percentage-fill" style="width: ${Math.min(s.percentage, 100)}%">
                  ${s.percentage}%
                </div>
              </div>
            </td>
            <td>$${s.amount.toLocaleString()}</td>
          </tr>
        `).join("") : `<tr><td colspan="5" style="text-align: center; color: #999; padding: 20px;">暫無當月數據</td></tr>`}
      </tbody>
    </table>
  `;
}

// 自動導入數據
function autoImportData() {
  try {
    // 檢查是否已經導入過
    const currentData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (currentData.guestEntries && Object.keys(currentData.guestEntries).length > 50) {
      return; // 已經有數據，不重複導入
    }

    // 從 full_data.json 導入
    fetch('./報表/足不老/full_data.json')
      .then(response => response.json())
      .then(data => {
        const guestEntries = currentData.guestEntries || {};
        const entries = data.entries || [];

        entries.forEach(entry => {
          const key = `${entry.date}-${entry.master || "unknown"}-${entry.serviceType}`;
          guestEntries[key] = {
            date: String(entry.date).trim(),
            serviceType: String(entry.serviceType).trim(),
            people: parseInt(entry.people) || 1,
            master: entry.master || "",
            amount: parseInt(entry.amount) || 0,
            storeId: entry.storeId || "store-1",
            arrivalTime: entry.arrivalTime || "",
            checkoutTime: entry.checkoutTime || "",
            note: entry.note || "",
          };
        });

        currentData.guestEntries = guestEntries;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
        console.log(`✅ 已自動導入 ${entries.length} 條足不老數據`);
      })
      .catch(err => console.log("📝 提示：無法自動導入數據，可手動上傳"));
  } catch (err) {
    // 靜默失敗，不影響系統使用
  }
}

// 服務項目代碼映射表
const serviceCodeMap = {
  "F40": "腳底按摩40分鐘", "F60": "腳底按摩60分鐘", "F90": "腳底按摩90分鐘", "F120": "腳底按摩120分鐘",
  "指1": "指壓按摩60分鐘", "指90": "指壓按摩90分鐘", "指2": "指壓按摩120分鐘", "指3": "指壓按摩180分鐘",
  "油90": "油壓按摩90分鐘", "油2": "油壓按摩120分鐘", "油2.5": "油壓按摩150分鐘", "油3": "油壓按摩180分鐘",
  "40/60": "腳底40/指壓60", "40/90指": "腳底40/指壓90", "40/120指": "腳底40/指壓120",
  "40/90油": "腳底40/油壓90", "40/120油": "腳底40/油壓120", "60/60": "腳底60/指壓60",
  "60/90指": "腳底60/指壓90", "60/120指": "腳底60/指壓120", "60/240指": "腳底60/指壓240",
  "60/90油": "腳底60/油壓90", "60/120油": "腳底60/油壓120", "60/180油": "腳底60/油壓180",
  "90/90指": "腳底90/指壓90", "90/90油": "腳底90/油壓90",
  "掏耳": "掏耳", "修1": "修腳皮/修指甲", "修2": "修腳皮+修指甲", "刮痧": "刮痧", "外做": "外出服務"
};

// 自動從 Excel 導入足不老分析數據
async function autoImportFromExcel() {
  try {
    console.log("🔄 開始導入 Excel 分析數據...");

    // 檢查 XLSX 庫
    if (typeof XLSX === "undefined") {
      console.error("❌ SheetJS 庫未載入，無法讀取 Excel");
      return;
    }

    const currentData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const existingCount = currentData.guestEntries ? Object.keys(currentData.guestEntries).length : 0;

    if (existingCount > 100) {
      console.log(`✅ 已有 ${existingCount} 筆數據，跳過導入`);
      return;
    }

    const files = [
      "./報表/足不老/11502分析表.xlsx",
      "./報表/足不老/11503分析表.xlsx",
      "./報表/足不老/11504分析表.xlsx"
    ];

    const guestEntries = currentData.guestEntries || {};
    let totalImported = 0;

    for (const file of files) {
      console.log(`📄 正在讀取: ${file}`);
      try {
        const response = await fetch(file);
        if (!response.ok) {
          console.warn(`⚠️ 文件不存在: ${file} (${response.status})`);
          continue;
        }

        const arrayBuffer = await response.arrayBuffer();
        console.log(`✓ 已載入 ${file}，大小: ${arrayBuffer.byteLength} bytes`);

        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        console.log(`✓ 工作簿讀取成功，Sheet 名稱:`, workbook.SheetNames);

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log(`✓ 數據解析完成，共 ${data.length} 行`);

        if (data.length < 2) {
          console.warn(`⚠️ 數據行數不足: ${file}`);
          continue;
        }

        const headers = data[0] || [];
        const dateColumns = [];
        for (let i = 1; i <= 31; i++) {
          const idx = headers.indexOf(i);
          if (idx >= 0) dateColumns.push({ day: i, col: idx });
        }

        console.log(`✓ 找到 ${dateColumns.length} 個日期列`);

        // 月份從檔名推斷
        const monthMatch = file.match(/1150(\d)/);
        const month = monthMatch ? parseInt(monthMatch[1]) : 4;
        const monthStr = `2026-${String(month).padStart(2, "0")}`;
        console.log(`✓ 月份: ${monthStr}`);

        let fileImported = 0;
        for (let row = 1; row < data.length; row++) {
          const serviceCode = data[row][0]?.toString().trim();
          if (!serviceCode || serviceCode === "小計" || serviceCode === "占比") continue;

          // 🆕 只導入菜單中存在的項目
          if (!serviceCodeMap[serviceCode]) {
            console.warn(`⚠️ 跳過未知項目: ${serviceCode}`);
            continue;
          }

          const serviceName = serviceCodeMap[serviceCode];

          for (const { day, col } of dateColumns) {
            const count = parseInt(data[row][col]) || 0;
            if (count === 0) continue;

            const date = `${monthStr}-${String(day).padStart(2, "0")}`;
            const key = `${date}-${serviceName}-001`;

            if (!guestEntries[key]) {
              guestEntries[key] = {
                date,
                serviceType: serviceName,
                people: count,
                master: "001",
                amount: 0,
                storeId: "store-1",
                arrivalTime: "",
                checkoutTime: "",
                note: "Excel導入"
              };
              fileImported++;
              totalImported++;
            }
          }
        }
        console.log(`✓ ${file} 導入 ${fileImported} 筆`);

      } catch (e) {
        console.error(`❌ 讀取失敗 ${file}:`, e.message);
      }
    }

    if (totalImported > 0) {
      currentData.guestEntries = guestEntries;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
      console.log(`\n✅ 成功導入 ${totalImported} 筆足不老數據\n`);
    } else {
      console.warn("⚠️ 未導入任何數據");
    }
  } catch (err) {
    console.error("❌ Excel 導入失敗:", err);
  }
}

init();
