import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 清空數據
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.serviceSession.deleteMany();
  await prisma.dailyReport.deleteMany();
  await prisma.member.deleteMany();
  await prisma.serviceItem.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.room.deleteMany();
  await prisma.store.deleteMany();

  // 建立店家
  const store1 = await prisma.store.create({
    data: {
      id: 'store-1',
      name: '足不老養生莊園',
      color: '#6b7f57',
      className: 'footold',
      address: 'Taiwan',
      phone: '02-xxxx-xxxx',
    },
  });

  const store2 = await prisma.store.create({
    data: {
      id: 'store-2',
      name: '御手足悦按摩養生會館',
      color: '#b99a47',
      className: 'yushou',
      address: 'Taiwan',
      phone: '02-xxxx-xxxx',
    },
  });

  // 建立房間 (每家店5間)
  for (let i = 1; i <= 5; i++) {
    await prisma.room.create({
      data: { storeId: 'store-1', number: `${i}`, status: 'idle', capacity: 1 },
    });
  }
  for (let i = 1; i <= 5; i++) {
    await prisma.room.create({
      data: { storeId: 'store-2', number: `${i}`, status: 'idle', capacity: 1 },
    });
  }

  // 足不老師傅名單
  const store1Staff = [
    { no: '1',   name: '蔡愛妮' },
    { no: '2',   name: '王玲英' },
    { no: '3',   name: '隨國明' },
    { no: '5',   name: '樊敦無' },
    { no: '6',   name: '李湘薇' },
    { no: '7',   name: '王腓力' },
    { no: '8',   name: '胡寶珍' },
    { no: '9',   name: '吳姿容' },
    { no: '11',  name: '林瑋杰' },
    { no: '12',  name: '黃秀梅' },
    { no: '13',  name: '張興和' },
    { no: '16',  name: '倪赫' },
    { no: '17',  name: '張育光' },
    { no: '18',  name: '潘楚霏' },
    { no: '19',  name: '李東昇' },
    { no: '20',  name: '黃慧敏' },
    { no: '21',  name: '陳修泉' },
    { no: '22',  name: '吳惠敏' },
    { no: '23',  name: '林姿辰' },
    { no: '26',  name: '高婷婷' },
    { no: '28',  name: '魏曼尼' },
    { no: '29',  name: '彭賢寶' },
    { no: '30',  name: '鐘梅花' },
    { no: '31',  name: '宋卉穎' },
    { no: '32',  name: '卓晏君' },
    { no: '33',  name: '顏惠林' },
    { no: '35',  name: '王耀慶' },
    { no: '36',  name: '劉俊良' },
    { no: '37',  name: '徐卉停' },
    { no: '38',  name: '邱香蓮' },
    { no: '39',  name: '劉依玲' },
    { no: '50',  name: '李育茹' },
    { no: '52',  name: '郭順昇' },
    { no: '53',  name: '張富洋' },
    { no: '55',  name: '蔡沂家' },
    { no: '56',  name: '吳君穎' },
    { no: '57',  name: '李芳品' },
    { no: '58',  name: '吳靜妍' },
    { no: '59',  name: '吳昭慧' },
    { no: '60',  name: '黃禕婷' },
    { no: '61',  name: '曾嘉慧' },
    { no: '62',  name: '陳芝翎' },
    { no: '65',  name: '陳湘芸' },
    { no: '66',  name: '陳科瑋' },
    { no: '68',  name: '劉益強' },
    { no: '69',  name: '蕭昊宇' },
    { no: '70',  name: '劉富安' },
    { no: '71',  name: '吳紫琪' },
    { no: '72',  name: '段怡萱' },
    { no: '75',  name: '游社睿' },
    { no: '77',  name: '楊汩浠' },
    { no: '78',  name: '黃妍華' },
    { no: '79',  name: '張玉美' },
    { no: '80',  name: '段宜君' },
    { no: '81',  name: '陳氏柳' },
    { no: '82',  name: '謝若慈' },
    { no: '83',  name: '周依辰' },
    { no: '85',  name: '張華雄' },
    { no: '86',  name: '許凱威' },
    { no: '87',  name: '吳妮庭' },
    { no: '88',  name: '黃最' },
    { no: '89',  name: '恩雅綾' },
    { no: '90',  name: '徐兆瑩' },
    { no: '91',  name: '蕭晨鋕' },
    { no: '92',  name: '鄒曉英' },
    { no: '93',  name: '李梓安' },
    { no: '95',  name: '陳勇吉' },
    { no: '96',  name: '阮靜怡' },
    { no: '98',  name: '羅楚甯' },
    { no: '99',  name: '城鍾佩真' },
    { no: '100', name: '張慈' },
  ];

  // 御手足悦師傅名單
  const store2Staff = [
    { no: '1',  name: '何家慶' },
    { no: '2',  name: '莊月英' },
    { no: '3',  name: '邱靖宸' },
    { no: '5',  name: '林永晉' },
    { no: '6',  name: '劉明昭' },
    { no: '7',  name: '劉秀春' },
    { no: '8',  name: '洪若馨' },
    { no: '9',  name: '曾彩萍' },
    { no: '10', name: '歐乃瑜' },
    { no: '11', name: '高詩媛' },
    { no: '12', name: '簡郁峯' },
    { no: '13', name: '陳秀雯' },
    { no: '15', name: '郭牡丹' },
    { no: '16', name: '呂芳昇' },
    { no: '17', name: '袁園' },
    { no: '18', name: '陳彬楊' },
    { no: '19', name: '黃凱銘' },
    { no: '20', name: '敖桂英' },
    { no: '21', name: '黃明凱' },
    { no: '22', name: '楊薏薇' },
    { no: '23', name: '劉秀英' },
    { no: '25', name: '吳靖雯' },
    { no: '26', name: '陳思妘' },
    { no: '27', name: '錢君' },
    { no: '28', name: '吳宇傑' },
    { no: '29', name: '卓怡瑄' },
    { no: '30', name: '江淑芬' },
    { no: '31', name: '張思瑩' },
    { no: '32', name: '陳睿均' },
    { no: '33', name: '黃筱雯' },
    { no: '35', name: '丁政雄' },
    { no: '36', name: '李崇賢' },
    { no: '37', name: '邱逸驊' },
    { no: '39', name: '閭巧' },
    { no: '50', name: '陳至輝' },
    { no: '51', name: '林晉禓' },
    { no: '52', name: '陳昱翰' },
    { no: '53', name: '黃博瑋' },
    { no: '55', name: '蘇妹屯' },
    { no: '56', name: '黎詠宸' },
    { no: '57', name: '許沐熙' },
    { no: '58', name: '李曉瑜' },
    { no: '59', name: '李育禎' },
    { no: '60', name: '伍柏慶' },
    { no: '61', name: '王惠君' },
    { no: '62', name: '張美玉' },
    { no: '63', name: '王思晨' },
    { no: '65', name: '唐凱荻' },
    { no: '66', name: '葉秋霞' },
    { no: '67', name: '黃佳子' },
    { no: '68', name: '朱玟卉' },
    { no: '69', name: '何小梅' },
    { no: '71', name: '陳啟暘' },
    { no: '72', name: '顏妙慎' },
    { no: '73', name: '劉盈盈' },
    { no: '75', name: '湯士賢' },
    { no: '77', name: '陳柏曄' },
    { no: '79', name: '游御欣' },
    { no: '80', name: '施雯心' },
    { no: '82', name: '曲晨語' },
    { no: '83', name: '王玲妹' },
    { no: '85', name: '田美月' },
    { no: '86', name: '程小妹' },
    { no: '88', name: '胡曉嫻' },
    { no: '89', name: '張媂妮' },
    { no: '90', name: '閻晶晶' },
    { no: '91', name: '張振偉' },
    { no: '92', name: '王心蘭' },
    { no: '93', name: '許翔瑋' },
    { no: '95', name: '丁汝宴' },
    { no: '96', name: '江錚瑚' },
    { no: '97', name: '林裕民' },
    { no: '98', name: '黃湘萍' },
  ];

  for (let i = 0; i < store1Staff.length; i++) {
    await prisma.staff.create({
      data: {
        storeId: 'store-1',
        employeeNo: store1Staff[i].no,
        name: store1Staff[i].name,
        status: 'queue',
        queuePosition: i,
      },
    });
  }

  for (let i = 0; i < store2Staff.length; i++) {
    await prisma.staff.create({
      data: {
        storeId: 'store-2',
        employeeNo: store2Staff[i].no,
        name: store2Staff[i].name,
        status: 'queue',
        queuePosition: i,
      },
    });
  }

  // 建立服務項目 (足不老)
  const store1Services = [
    { name: '腳底按摩 40 分', minutes: 40, amount: 650 },
    { name: '腳底按摩 60 分', minutes: 60, amount: 1000 },
    { name: '全身指壓 60 分', minutes: 60, amount: 1000 },
    { name: '全身指壓 90 分', minutes: 90, amount: 1500 },
    { name: '全身指壓 120 分', minutes: 120, amount: 1950 },
    { name: '全身油推 90 分', minutes: 90, amount: 1600 },
    { name: '全身油推 120 分', minutes: 120, amount: 1950 },
  ];

  for (const service of store1Services) {
    await prisma.serviceItem.create({
      data: { storeId: 'store-1', ...service, group: 'normal' },
    });
  }

  // 建立服務項目 (御手足悦)
  const store2Services = [
    { name: '腳底按摩 40 分', minutes: 40, amount: 650 },
    { name: '腳底按摩 60 分', minutes: 60, amount: 1000 },
    { name: '全身指壓 60 分', minutes: 60, amount: 1000 },
    { name: '全身指壓 90 分', minutes: 90, amount: 1500 },
    { name: '全身指壓 120 分', minutes: 120, amount: 1950 },
    { name: '全身油推 90 分', minutes: 90, amount: 1600 },
    { name: '全身油推 120 分', minutes: 120, amount: 1950 },
    { name: '御手組合 指壓60', minutes: 100, amount: 1888 },
    { name: '御手組合 指壓90', minutes: 130, amount: 2388 },
    { name: '御手組合 油壓90', minutes: 130, amount: 2488 },
  ];

  for (const service of store2Services) {
    await prisma.serviceItem.create({
      data: { storeId: 'store-2', ...service, group: 'normal' },
    });
  }

  console.log('✅ 種子數據導入完成！');
  console.log(`📦 店家: 2家`);
  console.log(`🚪 房間: 10間 (每家5間)`);
  console.log(`👨 師傅: ${store1Staff.length} 位 (足不老) + ${store2Staff.length} 位 (御手足悦) = ${store1Staff.length + store2Staff.length} 位`);
  console.log(`💆 服務: ${store1Services.length + store2Services.length} 項`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
