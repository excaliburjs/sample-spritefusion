import { ImageFiltering, ImageSource, Loadable, Loader, Resource, TileMap } from "excalibur";

// Import paths to work with Parcel
import heroPath from '../img/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Sprites/Hero 01.png';
import mapPath from '../map/map.json';
import spritesheetPath from '../map/spritesheet.png';
import { Player } from "./player";
import { SpriteFusionResource } from "@excaliburjs/plugin-spritefusion";

export const Resources = {
    HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
    SpriteFusionMap: new SpriteFusionResource({
      mapPath,
      spritesheetPath,
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