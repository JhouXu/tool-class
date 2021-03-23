/**
 * 实现音乐audio控件的播放暂停以及对应的动画显示。(必要库： jquery、微信jsdk)
 * @param {string} audioId audio控件id名称、class（需要前缀#/.）
 * @param {string} musicSrc 音乐文件路径
 * @param {string} imageId 显示image的id或者class名（需要前缀#/.）
 * @param {string} playImageUrl 播放图片路径
 * @param {string} pauseImageUrl 暂停图片路径
 *
 * HTML页面结构（如下）
 * <div class="music">
 *   <audio src="./music/bgm.mp3" id="music-id" autoplay="autoplay" preload loop="loop"></audio>
 *   <img src="./images/ru.png" id="image-id" />
 * </div>
 */
function music(audioId, musicSrc, imageId, playImageUrl, pauseImageUrl) {
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var preload = new createjs.LoadQueue(); // 新建loading对象，preload预加载
  var isOpen = false; // 音乐播放判断条件

  preload.installPlugin(createjs.Sound); // 加载音乐插件
  // 需要预加载的文件
  preload.loadManifest([
    playImageUrl,
    pauseImageUrl,
    {
      id: audioId,
      src: musicSrc,
    },
  ]);

  // 加载过程执行
  preload.on('progress', loadProgress);
  // 加载完成执行
  preload.on('complete', loadComplete);

  // 加载过程执行 的回调函数
  function loadProgress() {}
  // 加载完成执行 的回调函数
  function loadComplete() {}

  $(imageId).click(function () {
    if (isOpen) {
      $(this).attr('src', playImageUrl); // 播放图片切换
      $(this).css('animation-play-state', 'running'); // 动画播放
      playFun(audioId); // 播放音乐
      isOpen = false;
    } else {
      $(this).attr('src', pauseImageUrl);
      $(this).css('animation-play-state', 'paused');
      pauseFun(audioId); // 暂停音乐
      isOpen = true;
    }
  });

  // 在微信中使用 audio播放音频和视频（首次）
  if (isiOS || isAndroid) {
    document.addEventListener(
      'WeixinJSBridgeReady',
      function () {
        $(audioId)[0].play();
      },
      false
    );
  }

  // 播放音乐函数
  function playFun(audioId) {
    let audioDom = $(audioId)[0]; // audio控件节点
    wx.config({
      // 配置信息, 即使不正确也能使用 wx.ready
      debug: false,
      appId: '',
      timestamp: 1,
      nonceStr: '',
      signature: '',
      jsApiList: [],
    });
    wx.ready(function () {
      audioDom.muted = false;
      audioDom.play();
    });
    audioDom.muted = false;
    audioDom.play();
    audioDom.addEventListener('canplay', function () {
      this.play();
    });
  }
  // 暂停音乐的函数
  function pauseFun(audioId) {
    let audioDom = $(audioId)[0];
    wx.ready(function () {
      audioDom.muted = false;
      audioDom.pause();
    });
    audioDom.muted = false;
    audioDom.pause();
    audioDom.addEventListener('canplay', function () {
      this.pause();
    });
  }
}