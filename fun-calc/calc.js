/**
 * 基本数学运算，能够有效避免javascript精度问题。
 * @param { String | Number } num1 操作数
 * @param { String | Number } num2 被操作数
 * @param { String } type 计算类型
 * @return { Number } result 计算结果
 */
function calc(num1, num2, type) {
  const n1 = num1.toString().split(".")[1] ?? "0";
  const n2 = num2.toString().split(".")[1] ?? "0";
  const point = 10 ** (n1 > n2 ? n1.length : n2.length); // 精度
  let result = 0;
  switch (type) {
    case "+":
      result = (num1 * point + num2 * point) / point;
      break;
    case "-":
      result = (num1 * point - num2 * point) / point;
      break;
    case "*":
      result = (num1 * point * (num2 * point)) / point / point;
      break;
    case "/":
      result = (num1 * point) / (num2 * point);
      break;
  }
  return result;
}
