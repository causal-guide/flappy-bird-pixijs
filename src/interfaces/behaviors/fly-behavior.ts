import * as PIXI from "pixi.js";

import { IGameObject } from "../game-object";

export interface IFlyBehavior {
    gameObject: IGameObject;

    fly(): void;
    dispose(): void;
}
