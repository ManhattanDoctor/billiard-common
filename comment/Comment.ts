
import { Type } from 'class-transformer';
import { User } from '../user';

export class Comment {
    public id: number;
    public text: string;
    public targetId: number;
    public targetType: CommentTargetType;

    @Type(() => User)
    public user: User;

    @Type(() => Date)
    public created: Date;
}

export enum CommentTargetType {
    GAME = 'GAME',
    GAME_SESSION = 'GAME_SESSION',
}

export const COMMENT_TEXT_MIN_LENGTH = 1;
export const COMMENT_TEXT_MAX_LENGTH = 2048;

