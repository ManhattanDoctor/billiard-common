import { Type } from 'class-transformer';
import { GameType } from './Game';
import { GameBallTag } from './GameBallBase';

export class GamePattern {
    public id: number;
    public name: string;
    public type: GameType;
    public ball?: Array<IGameBallScore>;
    public foul?: Array<IGameFoulScore>;

    @Type(() => Date)
    public created: Date;
}

export interface IGameBallScore {
    tags: Array<GameBallTag>;
    score: number;
}

export interface IGameFoulScore {
    tags: Array<GameBallTag>;
    score: number;
}