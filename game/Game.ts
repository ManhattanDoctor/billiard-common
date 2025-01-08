import { Type } from 'class-transformer';
import { GameBall } from './GameBall';
import { GameResult } from './GameResult';
import { GameSession } from './GameSession';
import { GamePartner } from './GamePartner';

export class Game {
    public id: number;
    public status: GameStatus;

    @Type(() => GameBall)
    public balls: Array<GameBall>;

    @Type(() => GameSession)
    public session: GameSession;

    // нужно для подсчета очков в колхозе и смены очередности игроков в рамках сессии
    @Type(() => GamePartner)
    public partners: Array<GamePartner>;

    @Type(() => GameResult)
    public result?: GameResult;

    public multiplier?: string;
}

export enum GameType {
    POOL = 'POOL',
    PYRAMID_FREE = 'PYRAMID_FREE',
    PYRAMID_MOSCOW = 'PYRAMID_MOSCOW',
    PYRAMID_DYNAMIC = 'PYRAMID_DYNAMIC',
    PYRAMID_COMBINED = 'PYRAMID_COMBINED' // Московская, Сибирка
}

export enum GameStatus {
    STARTED = 'STARTED',
    FINISHED = 'FINISHED',
    IN_PROGRESS = 'IN_PROGRESS',
    REMOVED = 'REMOVED'
}
