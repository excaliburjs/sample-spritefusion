import { ImageFiltering, ImageSource, Loadable, Loader, Resource, TileMap, vec } from "excalibur";

import { Player } from "./player";
import { SpriteFusionResource } from "@excaliburjs/plugin-spritefusion";

const heroPath = './img/Solaria Demo Pack Update 03/16x16/Sprites/Hero 01.png';
export const Resources = {
    HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
    SpriteFusionMap: new SpriteFusionResource({
      mapPath: './map/map.json',
      spritesheetPath: './map/spritesheet.png',
      useTileMapCameraStrategy: true,
      entityTileIdFactories: {
        2: (props) => {
          const player = new Player(props.worldPos);
          player.z = 100;
          return player;
        }
      }
    })
}

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}