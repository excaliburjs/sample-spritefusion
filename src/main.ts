import * as ex from 'excalibur';
import { Resources, loader } from './resources';

const game = new ex.Engine({
    width: 800,
    height: 600,
    antialiasing: false
});

game.start(loader).then(() => {
    Resources.SpriteFusionMap.addToScene(game.currentScene);


   

    const playerLayer = Resources.SpriteFusionMap.layers.find(l => l.data.name === "Player");
    if (playerLayer) {

        const firstLayer = Resources.SpriteFusionMap.layers[0];
        let mapBounds: ex.BoundingBox | undefined;
        if (firstLayer) {
            mapBounds = ex.BoundingBox.fromDimension(
                Resources.SpriteFusionMap.data.mapWidth * Resources.SpriteFusionMap.data.tileSize,
                Resources.SpriteFusionMap.data.mapHeight * Resources.SpriteFusionMap.data.tileSize,
                ex.Vector.Zero, firstLayer.tilemap.pos);
        }

        const playerTile = playerLayer.data.tiles.find(t => t.id === '2');
        if (playerTile) {
            const tile = playerLayer.tilemap.getTile(playerTile.x, playerTile.y);
            const player = playerLayer.entities.find(e => e.name === 'Player');
            game.currentScene.camera.pos = tile.pos;
            game.currentScene.camera.zoom = 4;
            game.currentScene.camera.strategy.lockToActor(player as ex.Actor);
            if (mapBounds) {
                game.currentScene.camera.strategy.limitCameraBounds(mapBounds)
            }
        }
    }
});