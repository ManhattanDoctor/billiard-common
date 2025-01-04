
import * as _ from 'lodash';
import { IShareUrl, ShareUtil } from '../util';
import { USER_URL } from './function';

export class UserUtil {

    //--------------------------------------------------------------------------
    //
    // 	Spread Methods
    //
    //--------------------------------------------------------------------------

    public static getUrl(options: IUserUrlOptions): IShareUrl {
        let fragment = `${USER_URL}=${options.id}`
        return {
            vk: `${ShareUtil.VK_URL}#${fragment}`,
            web: !_.isEmpty(options.origin) ? `${options.origin}#${fragment}` : `${ShareUtil.SITE_URL}#${fragment}`,
            picture: options.picture,
            application: `${ShareUtil.SITE_URL}#${fragment}`,
            fragment
        }
    }
}

export interface IUserUrlOptions {
    id: number;
    picture: string;
    origin?: string;
}