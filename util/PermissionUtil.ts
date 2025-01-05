
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

    public static userIsUser(item: User | number, user: User): boolean {
        if (_.isObject(item)) {
            item = item.id;
        }
        return item === user?.id;
    }

    public static userIsCanEdit(item: User, user: User, params?: IUserEditDto): boolean {
        if (PermissionUtil.userIsAdministrator(user)) {
            return true;
        }
        if (!_.isNil(params?.account) || !_.isNil(params?.status)) {
            return false;
        }
        return PermissionUtil.userIsUser(item, user);
    }

    public static userIsAdministrator(item: User): boolean {
        return item?.account?.type === UserAccountType.ADMINISTRATOR;
    }

    public static userIsCanCoinAccountsGet(item: User, user: User): boolean {
        if (PermissionUtil.userIsAdministrator(user)) {
            return true;
        }
        return PermissionUtil.userIsUser(item, user);
    }

    //--------------------------------------------------------------------------
    //
    // 	Comment Methods
    //
    //--------------------------------------------------------------------------

    public static commentIsCanAdd(user: User): boolean {
        if (PermissionUtil.userIsAdministrator(user)) {
            return true;
        }
        return PermissionUtil.userIsAdministrator(user) || !user?.account?.isDisableCommentAdd;
    }

    public static commentIsCanEdit(item: Comment, user: User): boolean {
        return PermissionUtil.userIsAdministrator(user) || PermissionUtil.userIsUser(item.userId, user);
    }

    public static commentIsCanRemove(item: Comment, user: User): boolean {
        return PermissionUtil.commentIsCanEdit(item, user);
    }
}
