
import * as _ from 'lodash';

export class ShareUtil {
    //--------------------------------------------------------------------------
    //
    // 	Static Properties
    //
    //--------------------------------------------------------------------------

    public static VK_URL = 'https://vk.com/occultdivination';
    public static VK_GROUP_ID = 213207074;
    public static VK_GROUP_URL = `https://vk.com/club${ShareUtil.VK_GROUP_ID}`;
    public static VK_GROUP_DONATER_URL = `${ShareUtil.VK_GROUP_URL}?w=donut_payment-${ShareUtil.VK_GROUP_ID}`;

    public static SITE_URL = 'https://occultist.one';
    public static ASSETS_URL = 'https://vk.occultist.one/tarot/assets';
}

export interface IShareUrl {
    vk?: string,
    web?: string,
    picture?: string,
    fragment?: string;
    application?: string,
}
