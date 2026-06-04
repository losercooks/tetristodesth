import BaseScene from './BaseScene.js';
import assetManager from '../../core/AssetManager.js';
import { COLORS } from '../../core/constants.js';

class LoadingScene extends BaseScene {
  constructor(sceneManager) {
    super(sceneManager);
    this.loadingText = '正在加载...';
    this.isLoaded = false;
  }

  enter() {
    console.log("进入加载场景...");
    this.isLoaded = false;

    // 开始加载资源
    assetManager.loadAssets()
      .then(() => {
        console.log("资源加载完成，切换到主菜单...");
        this.isLoaded = true;
        this.sceneManager.switchTo('menu');
      })
      .catch(error => {
        console.error("加载资源失败:", error);
        this.loadingText = '加载失败，请检查网络后重试。';
      });
  }

  draw(ctx, viewport) {
    // 绘制背景
    ctx.fillStyle = COLORS.PRIMARY_DARK; // 使用深邃蓝背景
    ctx.fillRect(0, 0, viewport.width, viewport.height);

    // 绘制加载文本
    ctx.fillStyle = COLORS.TEXT_LIGHT; // 使用幽灵白文本
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.loadingText, viewport.width / 2, viewport.height / 2);
  }

  // LoadingScene 通常不需要处理输入或更新
  update() {}
  handleEvent(event) {}
}

export default LoadingScene;