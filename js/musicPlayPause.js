musicPlayPause('.n-bgmusic-img img', '.n-bgmusic-music');

/**
 * 主要功能：控制背景音乐动画的播放暂停的切换，以及控制音乐播放暂停。
 * 实现思路：首先设置初始状态为暂停，然后判断是否为微信内置浏览器，如果是就播放，如果不是就显示未播放按钮，引导用户点击图标从而实现播放功能。
 * @param {string} img 图片节点img
 * @param {string} music 音乐audio元素节点
 */
function musicPlayPause(img, music) {
  let imgDom = document.querySelector(img);
  let musicDom = document.querySelector(music);
  let isOpen = false;

  // 监听微信内置浏览器是否加载完成（只有微信端口才可以调用）
  document.addEventListener(
    'WeixinJSBridgeReady',
    function () {
      musicPlay();
    },
    false
  );

  // 绑定音乐图片的点击事件
  imgDom.addEventListener('click', function () {
    if (isOpen) {
      musicPause();
    } else {
      musicPlay();
    }
  });

  // 播放
  function musicPlay() {
    musicDom.play();
    imgDom.src = 'https://s3.ax1x.com/2021/02/24/yOfu3F.png';
    isOpen = true;
  }

  // 暂停
  function musicPause() {
    musicDom.pause();
    imgDom.src = 'https://s3.ax1x.com/2021/02/24/yOfKc4.png';
    isOpen = false;
  }
}