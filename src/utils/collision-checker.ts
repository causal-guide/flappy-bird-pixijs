import { Ground } from "../game-objects/ground";
import { PipeObstacle } from "../game-objects/pipes-obstacle";
import { Bird } from "../game-objects/bird";

export class CollisionChecker {
    // TODO: 
    // check for circle collision maybe it would be better with it
    public static pipeCollision(bird: Bird, pipeObstacle: PipeObstacle): boolean {
        const birdBottomPoint: number = bird.y + bird.texture.height;

        const xCollision: boolean =
            bird.x < pipeObstacle.x + pipeObstacle.upperPipe.width && bird.x + bird.width / 2 > pipeObstacle.x;

        const yCollision: boolean =
            (bird.y - bird.height / 2 < pipeObstacle.upperPipe.y + pipeObstacle.upperPipe.height &&
                bird.height / 2 + bird.y > pipeObstacle.upperPipe.y) ||
            (bird.y - bird.height / 2 < pipeObstacle.bottomPipe.y + pipeObstacle.bottomPipe.height &&
                bird.height / 2 + bird.y > pipeObstacle.bottomPipe.y) ||
            birdBottomPoint < 0; // when bird height is out of screen

        if (yCollision && xCollision) {
            return true;
        }

        return false;
    }
}
