import { ITraceable } from '@ts-core/common';
import { Comment } from '../../comment';

export interface ICommentEditDto extends ITraceable {
    id: number;
    text: string;
}
export declare type ICommentEditDtoResponse = Comment;
