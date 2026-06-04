class AssetManager {
  constructor() {
    this.assets = {};
    
    this.imagePaths = {
      BLOCK_I: '/assets/images/blocks/block_i.png',
      BLOCK_O: '/assets/images/blocks/block_o.png',
      BLOCK_T: '/assets/images/blocks/block_t.png',
      BLOCK_L: '/assets/images/blocks/block_l.png',
      BLOCK_J: '/assets/images/blocks/block_j.png',
      BLOCK_S: '/assets/images/blocks/block_s.png',
      BLOCK_Z: '/assets/images/blocks/block_z.png',
      BLOCK_GARBAGE: '/assets/images/blocks/block_garbage.png',
      BUTTON: '/assets/images/ui/button.png',
      DIALOG: '/assets/images/ui/dialog.png',
      ICON_SOUND_ON: '/assets/images/ui/icon_sound_on.png',
      ICON_SOUND_OFF: '/assets/images/ui/icon_sound_off.png',
      BTN_LEFT: '/assets/images/ui/btn_left.png',
      BTN_LEFT_PRESSED: '/assets/images/ui/btn_left_pressed.png',
      BTN_RIGHT: '/assets/images/ui/btn_right.png',
      BTN_RIGHT_PRESSED: '/assets/images/ui/btn_right_pressed.png',
      BTN_ROTATE: '/assets/images/ui/btn_rotate.png',
      BTN_ROTATE_PRESSED: '/assets/images/ui/btn_rotate_pressed.png',
      BTN_SOFT_DROP: '/assets/images/ui/btn_soft_drop.png',
      BTN_SOFT_DROP_PRESSED: '/assets/images/ui/btn_soft_drop_pressed.png',
      BTN_HARD_DROP: '/assets/images/ui/btn_hard_drop.png',
      BTN_HARD_DROP_PRESSED: '/assets/images/ui/btn_hard_drop_pressed.png',
      BTN_ATTACK: '/assets/images/ui/btn_attack.png',
      BTN_ATTACK_PRESSED: '/assets/images/ui/btn_attack_pressed.png',
      BACKGROUND_TEXTURE: '/assets/images/backgrounds/background_texture.png',
    };
    
    this.audioPaths = {
        // SFX
        MOVE: '/assets/audio/move.mp3',
        ROTATE: '/assets/audio/rotate.mp3',
        LAND: '/assets/audio/land.mp3',
        HARD_DROP: '/assets/audio/hard_drop.mp3',
        LINE_CLEAR: '/assets/audio/line_clear.mp3',
        TETRIS: '/assets/audio/tetris.mp3',
        LEVEL_UP: '/assets/audio/level_up.mp3',
        GAME_OVER: '/assets/audio/game_over.mp3',
        
        // Music
        BGM_MENU: '/assets/audio/bgm_menu.mp3',
        BGM_GAME: '/assets/audio/bgm_game.mp3',
    };

    this.assetCount = Object.keys(this.imagePaths).length + Object.keys(this.audioPaths).length;
    this.loadedCount = 0;
  }

  loadAssets() {
    const imagePromises = Object.entries(this.imagePaths).map(([key, path]) => this.loadImage(key, path));
    const audioPromises = Object.entries(this.audioPaths).map(([key, path]) => this.loadAudio(key, path));
    return Promise.all([...imagePromises, ...audioPromises]);
  }

  loadImage(key, path) {
    return new Promise((resolve, reject) => {
      const image = wx.createImage();
      image.onload = () => { this.assets[key] = image; this.loadedCount++; resolve(image); };
      image.onerror = (err) => { console.error(`Failed to load image: ${path}`, err); reject(err); };
      image.src = path;
    });
  }

  loadAudio(key, path) {
    return new Promise((resolve, reject) => {
        const audio = wx.createInnerAudioContext();
        audio.src = path;
        audio.onCanplay(() => { this.assets[key] = audio; this.loadedCount++; resolve(audio); });
        audio.onError((err) => { console.error(`Failed to load audio: ${path}`, err); reject(err); });
    });
  }

  getAsset(key) {
    const asset = this.assets[key];
    if (!asset) throw new Error(`Asset not found: ${key}`);
    return asset;
  }
}

const assetManager = new AssetManager();
export default assetManager;
