import Phaser from "phaser";
import MainMenu from "./MainMenu";
import Play from "./Play";
import GameOver from './GameOver';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 480,
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: false
      }
    },
    scene: [MainMenu, Play, GameOver]
};

let game = new Phaser.Game(config);
