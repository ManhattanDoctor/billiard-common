import { Type } from 'class-transformer';
import { User } from '../user';
import { GamePartner } from './GamePartner';
import { Game, GameType } from './Game';
import { GameBallScore } from './GamePattern';
import { GameSessionUserDecision } from './GameSessionUserDecision';
import { CoinId } from '../coin';

export class GameSession {
    public id: number;
    public name: string;
    public type: GameType;
    public code: string;
    public status: GameSessionStatus;

    public coinId?: CoinId;
    public multiplier?: string;

    @Type(() => GameBallScore)
    public ball?: Array<GameBallScore>;

    @Type(() => GameBallScore)
    public foul?: Array<GameBallScore>;

    @Type(() => Game)
    public games?: Array<Game>;

    public shuffling?: GameSessionPartnersShuffleType;
    public permission?: GameSessionPermission;

    @Type(() => User)
    public creator: User;

    @Type(() => GamePartner)
    public partners: Array<GamePartner>;

    @Type(() => GameSessionUserDecision)
    public decisions: Array<GameSessionUserDecision>;

    @Type(() => Date)
    public created: Date;

    @Type(() => Date)
    public started: Date;

    @Type(() => Date)
    public finished: Date;
}

export enum GameSessionStatus {
    CREATED = 'CREATED',
    FINISHED = 'FINISHED',
    PENDING = 'PENDING', // ожидание следующей игры
    IN_PROGRESS = 'IN_PROGRESS',

    REMOVED = 'REMOVED'
}

export enum GameSessionPermissionType {
    CHANGE = 'CHANGE',
    GAME_BALL_CHANGE = 'GAME_BALL_CHANGE'
}
export enum GameSessionPartnersShuffleType {
    RANDOM = 'RANDOM',
    sequentially = 'sequentially', // последовательно
    RANDOM_WITHOUT_REPEATING = 'RANDOM_WITHOUT_REPEATING'
}
export type GameSessionPermission = Record<GameSessionPermissionType, Array<number>>;
