/**
 * 控制背景音乐动画的播放暂停的切换，以及控制音乐播放暂停
 * @param {string} img 图片节点img
 * @param {string} music 音乐audio元素节点
 */
function musicPlayPause(img, music) {
  let imgDom = document.querySelector(img);
  let musicDom = document.querySelector(music);
  let isOpen = true;

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

    // 监听微信内置浏览器是否加载完成
    document.addEventListener(
      'WeixinJSBridgeReady',
      function () {
        musicDom.play();
      },
      false
    );
  }

  // 暂停
  function musicPause() {
    musicDom.pause();
    imgDom.src = 'https://s3.ax1x.com/2021/02/24/yOfKc4.png';
    isOpen = false;
  }
}