
import { Comment } from '../comment';
import { User, UserAccountType } from '../user';
import { IUserEditDto } from '../api/user';
import * as _ from 'lodash';

export class PermissionUtil {

    //--------------------------------------------------------------------------
    //
    // 	User Methods
    //
    //--------------------------------------------------------------------------

    public static userIsCanEdit(item: User, user: User, params?: IUserEditDto): boolean {
        if (_.isNil(user) || _.isNil(params)) {
            return false;
        }
        if (PermissionUtil.userIsAdministrator(user)) {
            return true;
        }
        if (!_.isNil(params.account) || !_.isNil(params.status) || !_.isNil(params.master)) {
            return false;
        }
        return item.id === user.id;
    }

    public static userIsAdministrator(item: User): boolean {
        return !_.isNil(item) && !_.isNil(item.account) ? item.account.type === UserAccountType.ADMINISTRATOR : false;
    }

    //--------------------------------------------------------------------------
    //
    // 	Comment Methods
    //
    //--------------------------------------------------------------------------

    public static commentIsCanAdd(user: User): boolean {
        if (_.isNil(user)) {
            return false;
        }
        if (PermissionUtil.userIsAdministrator(user)) {
            return true;
        }
        return !user.account.isDisableCommentAdd;
    }

    public static commentIsCanEdit(item: Comment, user: User): boolean {
        if (_.isNil(user)) {
            return false;
        }
        return PermissionUtil.userIsAdministrator(user) || item.userId === user.id;
    }

    public static commentIsCanRemove(item: Comment, user: User): boolean {
        return PermissionUtil.commentIsCanEdit(item, user);
    }
}
