import { Type } from 'class-transformer';
import { GameType } from './Game';
import { GameBallTag } from './GameBall';

export class GamePattern {
    public id: number;
    public name: string;
    public type: GameType;

    @Type(() => GameBallScore)
    public ball?: Array<GameBallScore>;

    @Type(() => Date)
    public created: Date;
}

export class GameBallScore {
    tags: Array<GameBallTag>;
    score: string;
}