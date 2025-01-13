import { User } from '../user';
import { GamePartner } from './GamePartner';
import { Game } from './Game';
import { GameBallCondition, GamePatternType } from './GamePattern';
import { GameSessionPartnerDecision } from './GameSessionPartnerDecision';
import { CoinId } from '../coin';

export class GameSession {
    public id: number;
    public name: string;
    public type: GamePatternType;
    public code: string;
    public status: GameSessionStatus;

    // public decisions: Array<GameSessionPartnerDecision>;

    public user?: User;
    public games?: Array<Game>;
    public coinId?: CoinId;
    public partners?: Array<GamePartner>;
    public conditions?: Array<GameBallCondition>;
    public shuffling?: GameSessionPartnersShuffleType;
    public multiplier?: string;
    public permission?: GameSessionPermission;
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
    SEQUENTIALLY = 'SEQUENTIALLY', // последовательно
    RANDOM_WITHOUT_REPEATING = 'RANDOM_WITHOUT_REPEATING'
}

export type GameSessionPermission = Record<GameSessionPermissionType, Array<number>>;

export const GAME_SESSION_NAME_MIN_LENGTH = 3;
export const GAME_SESSION_NAME_MAX_LENGTH = 128;

export const GAME_SESSION_CODE_MIN_LENGTH = 5;
export const GAME_SESSION_CODE_MAX_LENGTH = 15;

export const GAME_SESSION_CODE_REGEXP = new RegExp(`^[A-Z]{${GAME_SESSION_CODE_MIN_LENGTH},${GAME_SESSION_CODE_MAX_LENGTH}}$`)
