import { GameObject } from "../game-objects/game-object";
import { IGravityBehavior } from "./gravity-behavior";

export class BirdGravityBehavior implements IGravityBehavior {
    public gameObject: GameObject;
    public gravityPower: number = 0.1;
    public gravityTicker: PIXI.ticker.Ticker;

    private _velocityY: number;
    private _isHit: boolean;

    constructor(bird: GameObject, velocityY = 0, isHit = false) {
        this.gameObject = bird;
        this.velocityY = velocityY;

        this.gravityTicker = new PIXI.ticker.Ticker();
        this.gravityTicker.add(this.gravity.bind(this));
        this.gravityTicker.start();

        this._isHit = isHit;
    }

    public gravity(): void {
        if (this.velocityY < 10) {
            this.velocityY += this.gravityPower;
        }

        this.gameObject.body.y += this.velocityY;

        // bird rotation
        if (!this._isHit) {
            if (this._velocityY > 0 && this.gameObject.body.rotation < 0.5) {
                this.gameObject.body.rotation += this._velocityY / 40;
            } else if (this._velocityY < 0 && this.gameObject.body.rotation > -0.3) {
                this.gameObject.body.rotation -= 0.05;
            }
        } else {
            this.gameObject.body.rotation += 0.1;
        }
    }

    set isHit(value: boolean) {
        this._isHit = value;
    }

    get velocityY(): number {
        return this._velocityY;
    }
    set velocityY(value: number) {
        this._velocityY = value;
    }

    public dispose(): void {
        this.gameObject = null;
        this.gravityTicker.stop();
        this.gravityTicker = null;
    }
}
