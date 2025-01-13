import { Type } from 'class-transformer';
import { GameBallTag } from './GameBall';

export class GamePattern {
    public id: number;
    public name: string;
    public type: GamePatternType;
    public status: GamePatternStatus;

    public conditions?: Array<GameBallCondition>;

    @Type(() => Date)
    public created: Date;
}

export enum GamePatternStatus {
    ACTIVE = 'ACTIVE',
    REMOVED = 'REMOVED'
}

export enum GamePatternType {
    POOL = 'POOL',
    PYRAMID_FREE = 'PYRAMID_FREE',
    PYRAMID_MOSCOW = 'PYRAMID_MOSCOW',
    PYRAMID_DYNAMIC = 'PYRAMID_DYNAMIC',
    PYRAMID_COMBINED = 'PYRAMID_COMBINED' // Московская, Сибирка
}

export class GameBallCondition {
    tags: Array<GameBallTag>;
    score: number;
}

export const GAME_PATTERN_NAME_MIN_LENGTH = 4;
export const GAME_PATTERN_NAME_MAX_LENGTH = 128;