import assetManager from './AssetManager.js';

class AudioManager {
  constructor() {
    this.isMuted = false;
    this.currentMusic = null;
  }

  /**
   * Play a one-shot sound effect.
   * @param {string} key - The key of the sound effect asset defined in AssetManager.
   */
  playSfx(key) {
    if (this.isMuted) return;

    try {
      const sfx = assetManager.getAsset(key);
      sfx.stop(); // Stop any previous instance of the same SFX that might be playing
      sfx.play();
    } catch (e) {
      console.error(`Failed to play SFX: ${key}`, e.message);
    }
  }

  /**
   * Play background music, automatically looped.
   * @param {string} key - The key of the music asset defined in AssetManager.
   */
  playMusic(key) {
    if (this.currentMusic && this.currentMusic.key === key) {
        // If the requested music is already playing, do nothing
        if (!this.currentMusic.paused) return;
    }

    this.stopMusic();

    try {
      const music = assetManager.getAsset(key);
      music.loop = true;
      music.key = key; // Attach a key for future identification
      
      this.currentMusic = music;
      
      if (!this.isMuted) {
        this.currentMusic.play();
      }

    } catch (e) {
      console.error(`Failed to play music: ${key}`, e.message);
    }
  }

  /**
   * Stop the currently playing background music.
   */
  stopMusic() {
    if (this.currentMusic) {
      this.currentMusic.stop();
      this.currentMusic = null;
    }
  }

  /**
   * Toggle the global mute state.
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    console.log(`Audio muted state: ${this.isMuted}`);

    if (this.isMuted) {
      // If muted, stop all music
      this.stopMusic();
    } else {
      // If unmuted, and there was a "current" music, replay it
      if (this.currentMusic) {
        this.currentMusic.play();
      }
    }
  }
}

// Singleton pattern
const audioManager = new AudioManager();
export default audioManager;
