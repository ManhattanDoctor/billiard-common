import { Type } from 'class-transformer';
import { User } from '../user';
import { GameBall } from './GameBall';
import { GameFoul } from './GameFoul';
import { GamePartner } from './GamePartner';

export class Game {
    public id: number;
    public name: string;
    public type: GameType;
    public status: GameStatus;
    public picture: string;

    @Type(() => User)
    public creator: User;

    @Type(() => GameBall)
    public balls: Array<GameBall>;

    @Type(() => GameBall)
    public fouls: Array<GameFoul>;

    @Type(() => GamePartner)
    public partners: Array<GamePartner>;

    @Type(() => Date)
    public created: Date;
}

export enum GameType {
    POOL = 'POOL',
    PYRAMID_FREE = 'PYRAMID_FREE',
    PYRAMID_MOSCOW = 'PYRAMID_MOSCOW',
    PYRAMID_DYNAMIC = 'PYRAMID_DYNAMIC',
    PYRAMID_COMBINED = 'PYRAMID_COMBINED' // Московская, Сибирка
}

export enum GamePermissionType {
    CREATOR_ONLY = 'CREATOR_ONLY',
    PARTNERS_ALL = 'PARTNERS_ALL',
}

export enum GameStatus {
    CREATED = 'CREATED',
    FINISHED = 'FINISHED',
    IN_PROGRESS = 'IN_PROGRESS',
    REMOVED = 'REMOVED'
}

