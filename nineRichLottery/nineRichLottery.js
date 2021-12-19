/**
 * 实现九宫格抽奖效果，根据指定下标实现精准停止，timing: ease-in，内置rule，支持自定义动画显示位置以及显示顺序
 *
 * 说明： Math.max(this.rule) < this.domArr.length
 */

class nineRichLottery {
  /**
   * nineRichLottery 构造函数
   * @param {HTMLElement} domArr 九宫格数组
   * @param {Number} targetIndex 指定将要停止的下标
   * @param {String} className 需要添加样式的类名
   * @param {Function} callback 回调函数
   */
  constructor(domArr, targetIndex, className = "active", callback = null) {
    this.domArr = domArr;
    this.targetIndex = targetIndex;
    this.className = className;
    this.callback = callback;
    this.time = 500; // 初始动画间隔时间，单位：ms
    this.rule = [0, 1, 2, 5, 8, 7, 6, 3];
    this._min = 2;
    this._max = 4;
    this._index = 0; // 九宫格的起始下标，[0, 8]
    this._active = false; // 当前状态，false 未运行，true 正运行
  }

  init() {
    if (this._active) return; // 防止上一次抽奖未结束

    this._loop = this.getRandom(this._min, this._max); // 循环层数
    this._count = this._loop * this.rule.length + this.targetIndex - this._index; // 总共需要执行的次数

    this.lotteryAni();
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getAvg(min, max) {
    return Math.round((min + max) / 2);
  }

  lotteryAni() {
    const _this = this;
    let { domArr, className, time, rule, _min, _max, _index, _count } = this;
    let avg = this.getAvg(_min, _max);
    let t = (time / (_count + avg)) * avg; // 速度控制

    // 清除上一次的class样式
    for (let i = 0; i < domArr.length; i++) {
      domArr[i].setAttribute("class", "");
    }

    domArr[rule[_index]].setAttribute("class", "active");
    // 递归
    if (_count > 0) {
      window.setTimeout(function () {
        _this.lotteryAni();
      }, t);
    } else {
      this._active = false;
      this.callback ? this.callback() : "";
      return;
    }

    this._index = _index + 1 > this.rule.length - 1 ? 0 : ++_index;
    this._count = --_count;
    this._active = true;
  }
}
