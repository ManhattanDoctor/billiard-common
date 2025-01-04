
import { Type } from 'class-transformer';
import { User } from '../user';

export class Comment {
    public id: number;
    public text: string;
    public targetId: number;
    public targetType: CommentTargetType;

    @Type(() => User)
    public user: User;
    public userId: number;

    @Type(() => Date)
    public created: Date;
}

export enum CommentTargetType {

}

export const COMMENT_TEXT_MIN_LENGTH = 1;
export const COMMENT_TEXT_MAX_LENGTH = 2048;

