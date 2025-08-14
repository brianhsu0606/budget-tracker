const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors()); // 跨域設定讓前端能請求
app.use(express.json()); // 解析 JSON body

app.get("/", (req, res) => {
  res.send("後端運行中");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const expenseList = [
  { date: "2025-08-10", name: "高鐵 - 桃園台北來回", category: "transportation", amount: 320 },
  { date: "2025-08-10", name: "晚餐 - 藏壽司", category: "food", amount: 170 },
  { date: "2025-08-10", name: "小米電動鼻毛刀", category: "other", amount: 325 },
  { date: "2025-08-10", name: "咖啡廳 - Cafe Parmentier", category: "food", amount: 280 },
  { date: "2025-08-10", name: "午餐 - 柑橘 鴨蔥", category: "food", amount: 335 },
  { date: "2025-08-08", name: "吉伊卡哇 - 水槍兔新品", category: "entertainment", amount: 2398 },
  { date: "2025-08-07", name: "Uber - 肚子痛", category: "transportation", amount: 76 },
  { date: "2025-08-07", name: "阿辰", category: "other", amount: 167 },
  { date: "2025-08-07", name: "晚餐 - 鐵炭魂創意料理工作室", category: "food", amount: 833 },
  { date: "2025-08-03", name: "咖啡廳 - Table 2 Coffee Roaster", category: "food", amount: 300 },
  { date: "2025-08-03", name: "午餐 - 本根咖哩", category: "food", amount: 250 },
  { date: "2025-08-02", name: "高鐵 - 桃園台北來回", category: "transportation", amount: 320 },
  { date: "2025-08-02", name: "咖啡廳 - 好啊咖啡", category: "food", amount: 290 },
  { date: "2025-08-02", name: "Uber - 圓山飯店", category: "transportation", amount: 111 },
  { date: "2025-08-01", name: "高鐵 - 桃園台北來回", category: "transportation", amount: 320 },
  { date: "2025-08-01", name: "父親節禮物 - National Geographic T", category: "shopping", amount: 2322 },
  { date: "2025-08-01", name: "晚餐 - 誠記", category: "food", amount: 210 },
  { date: "2025-08-01", name: "咖啡廳 - 豆一昌 Coffee（vegan）", category: "food", amount: 140 },
  { date: "2025-08-01", name: "集運幫運費", category: "entertainment", amount: 180 },
  { date: "2025-07-20", name: "晚餐 - 摩斯漢堡", category: "food", amount: 180 },
  { date: "2025-07-20", name: "高鐵 - 桃園台北來回", category: "transportation", amount: 320 },
  { date: "2025-07-20", name: "晚餐 - 麵屋千雲", category: "food", amount: 250 },
  { date: "2025-07-20", name: "寶雅 - 防潮包、免洗內褲", category: "other", amount: 160 },
  { date: "2025-07-20", name: "咖啡廳 - CAFE ACME mini", category: "food", amount: 150 },
  { date: "2025-07-20", name: "午餐 - 光り鮨", category: "food", amount: 465 },
  { date: "2025-07-18", name: "燙頭髮", category: "entertainment", amount: 2800 },
  { date: "2025-07-18", name: "吉伊卡哇 - 西瓜新品、善惡再販", category: "entertainment", amount: 3032 },
  { date: "2025-07-18", name: "吉伊卡哇 - 騎行再販", category: "entertainment", amount: 2725 },
  { date: "2025-07-18", name: "東京旅平險", category: "other", amount: 341 },
  { date: "2025-07-18", name: "吉伊卡哇 - 聖誕受注", category: "entertainment", amount: 1134 },
  { date: "2025-07-12", name: "高鐵 - 桃園台北來回", category: "transportation", amount: 315 },
  { date: "2025-07-12", name: "晚餐 - 全福海鮮", category: "food", amount: 437 },
  { date: "2025-07-12", name: "咖啡廳 - BEAN U Plant", category: "food", amount: 160 },
  { date: "2025-07-12", name: "午餐 - 添好運", category: "food", amount: 390 },
  { date: "2025-07-11", name: "電話費", category: "other", amount: 699 },
  { date: "2025-07-06", name: "取貨 - 討伐吉伊、小八", category: "entertainment", amount: 598 },
  { date: "2025-07-06", name: "A21 夾娃娃", category: "entertainment", amount: 50 },
  { date: "2025-07-06", name: "咖啡廳 - 迴憶", category: "food", amount: 253 },
  { date: "2025-07-06", name: "午餐 - 日落小餐館", category: "food", amount: 490 },
  { date: "2025-07-04", name: "晚餐 - Awesome Burger", category: "food", amount: 260 },
  { date: "2025-07-04", name: "咖啡廳 - Riff Coffee", category: "food", amount: 170 },
  { date: "2025-07-04", name: "高鐵 - 桃園台北來回", category: "transportation", amount: 320 },
  { date: "2025-06-30", name: "羅技 mx keys mini 鍵盤", category: "entertainment", amount: 2590 },
  { date: "2025-06-30", name: "UNIQLO x 吉伊卡哇", category: "shopping", amount: 1060 },
  { date: "2025-06-28", name: "高鐵 - 桃園台北來回", category: "transportation", amount: 320 },
  { date: "2025-06-28", name: "電影 - 名偵探柯南：獨眼的殘像", category: "entertainment", amount: 340 },
  { date: "2025-06-28", name: "午餐 - Sweet&Sour Life", category: "food", amount: 473 },
  { date: "2025-06-22", name: "高鐵 - 桃園台北來回", category: "transportation", amount: 320 },
  { date: "2025-06-21", name: "午餐 - 屋莎", category: "food", amount: 549 },
  { date: "2025-06-20", name: "吉伊卡哇官網 - 星星、杯套", category: "entertainment", amount: 2307 },
  { date: "2025-06-19", name: "晚餐 - 春水堂", category: "food", amount: 316 },
  { date: "2025-06-19", name: "星巴克", category: "food", amount: 125 },
  { date: "2025-06-15", name: "高鐵 - 桃園台北來回", category: "transportation", amount: 320 },
  { date: "2025-06-15", name: "午餐 - waku", category: "food", amount: 451 },
  { date: "2025-06-15", name: "吉伊卡哇拼圖 * 2", category: "entertainment", amount: 644 },
  { date: "2025-06-13", name: "洗加剪", category: "other", amount: 800 },
  { date: "2025-06-13", name: "韓式證件照", category: "other", amount: 800 },
  { date: "2025-06-13", name: "吉伊卡哇官網 - 麵包新品", category: "entertainment", amount: 2841 },
  { date: "2025-06-11", name: "電話費", category: "other", amount: 699 },
  { date: "2025-06-08", name: "高鐵 - 桃園台北來回", category: "transportation", amount: 320 },
  { date: "2025-06-08", name: "晚餐 - 屠夫漢堡", category: "food", amount: 390 },
  { date: "2025-06-08", name: "電影 - 黃衣小飛俠", category: "entertainment", amount: 360 },
  { date: "2025-06-08", name: "午餐 - 麒麟拉麵", category: "food", amount: 280 },
  { date: "2025-06-01", name: "高鐵 - 桃園台北來回", category: "transportation", amount: 320 },
];

// Expense
app.get("/api/expenses", async (req, res) => {
  try {
    // const expenseList = await Expense.find();

    res.json({
      code: 200,
      message: "獲取支出成功",
      result: expenseList,
    });
  } catch (error) {}
});
