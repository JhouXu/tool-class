/**
 * 实现背景音乐的播放暂停以及相对应的动画显示。(必要库：微信JSdk)
 * @param {string} btnId 显示image的id或者class名（需要前缀#/.）
 * @param {string} audioId audio控件id名称、class（需要前缀#/.）
 * @param {string} playImgUrl 播放图片路径
 * @param {string} pauseImgUrl 暂停图片路径
 */
class bgmOperation {
  constructor(btnId, audioId, playImgUrl, pauseImgUrl) {
    this.btnDOM = this.$(btnId);
    this.audioDOM = this.$(audioId);
    this.playImgUrl = playImgUrl;
    this.pauseImgUrl = pauseImgUrl;
    this.isOpen = false; // 音乐播放判断条件

    this.init();
    this.event();
  }

  init() {
    const _this = this;
    const { btnDOM } = this;
    btnDOM.style.animationPlayState = "paused"; // 初始化状态，默认暂停

    wx.config({
      // 配置信息, 即使不正确也能使用 wx.ready
      debug: false,
      appId: "",
      timestamp: 1,
      nonceStr: "",
      signature: "",
      jsApiList: [],
    });
    // 微信环境，自动播放
    wx.ready(function () {
      _this.musicPlay();
    });
  }

  event() {
    const _this = this;
    const { btnDOM } = this;
    btnDOM.addEventListener("click", function (e) {
      if (_this.isOpen) {
        _this.musicPause();
      } else {
        _this.musicPlay();
      }
    });
  }

  musicPlay() {
    const { btnDOM, audioDOM, playImgUrl } = this;

    // 选用任一种方式即可「推荐方法一：这样可以通过button标签触发，避免 Uncaught (in promise) DOMException: play() failed because the user didn‘t interact with the document」
    // 「方法一」此处前端使用background-image方式显示图片，所以通过style方法修改
    btnDOM.style.backgroundImage = `url(${playImgUrl})`;
    // 「方法二」亦可通过img标签进行展示，然后修改img:src属性即可实现切换功能
    // btnDOM.setAttribute('src', playImgUrl);

    btnDOM.style.animationPlayState = "running";
    audioDOM.play();
    this.isOpen = true;
  }

  musicPause() {
    const { btnDOM, audioDOM, pauseImgUrl } = this;
    // 「方法一」同上
    btnDOM.style.backgroundImage = `url(${pauseImgUrl})`;
    // 「方法二」同上
    // btnDOM.setAttribute('src', pauseImgUrl);
    btnDOM.style.animationPlayState = "paused";
    audioDOM.pause();
    this.isOpen = false;
  }

  $(key) {
    const domArr = document.querySelectorAll(key);
    if (domArr.length === 1) {
      return domArr[0];
    } else {
      return domArr;
    }
  }
}
