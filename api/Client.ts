import { TransportHttp, ITransportHttpSettings, LoggerLevel } from '@ts-core/common';
import { ILogger, TransformUtil, ITraceable, TraceUtil } from '@ts-core/common';
import { IInitDto, IInitDtoResponse, ILoginDto, ILoginDtoResponse } from './login';
import { User } from '../user';
import { ICommentAddDto, ICommentAddDtoResponse, ICommentEditDto, ICommentEditDtoResponse, ICommentGetDtoResponse, ICommentListDto, ICommentListDtoResponse, ICommentRemoveDtoResponse } from './comment';
import { Comment } from '../comment';
import { IPeopleListDto, IPeopleListDtoResponse } from './people';
import { IManagementCoinAccountListDto, IManagementCoinAccountListDtoResponse } from './management';
import { IUserEditDto, IUserEditDtoResponse, IUserGetDtoResponse, IUserListDto, IUserListDtoResponse, IUserMasterListDto, IUserMasterListDtoResponse, UserUID } from './user';
import { IStatisticsGetDtoResponse } from './statistics';
import { IOAuthPopUpDto } from '@ts-core/oauth';
import { CoinBonusDto, CoinStatusGetDtoResponse, ICoinAccountsGetDto, ICoinBalanceEditDto, ICoinStatusGetDto } from './coin';
import { IPaymentListDto, IPaymentListDtoResponse, IPaymentTransactionListDto, IPaymentTransactionListDtoResponse } from './payment';
import { Payment, PaymentTransaction } from '../payment';
import { CoinAccount } from '../coin';
import { ITelegramAccountAddDto, ITelegramAccountAddDtoResponse, ITelegramAccountRemoveDtoResponse } from './telegram';
import * as _ from 'lodash';

export class Client extends TransportHttp<ITransportHttpSettings> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: ILogger, url?: string, level?: LoggerLevel) {
        super(logger, { method: 'get', isHandleError: true, isHandleLoading: true, headers: {} });

        if (!_.isNil(url)) {
            this.url = url;
        }
        if (!_.isNil(level)) {
            this.level = level;
        }
    }

    // --------------------------------------------------------------------------
    //
    //  Auth Methods
    //
    // --------------------------------------------------------------------------

    public async login(data: ILoginDto): Promise<ILoginDtoResponse> {
        return this.call<ILoginDtoResponse, ILoginDto>(LOGIN_URL, { data: TraceUtil.addIfNeed(data), method: 'post' });
    }

    public async init(data?: IInitDto): Promise<IInitDtoResponse> {
        let item = await this.call<IInitDtoResponse, IInitDto>(INIT_URL, { data: TraceUtil.addIfNeed(data) });
        item.user = TransformUtil.toClass(User, item.user);
        item.bonus = TransformUtil.toClass(CoinBonusDto, item.bonus);
        return item;
    }

    public async logout(traceId?: string): Promise<void> {
        return this.call<void, ITraceable>(LOGOUT_URL, { data: TraceUtil.addIfNeed({ traceId }), method: 'post', isHandleError: false });
    }

    public async logoutOthers(traceId?: string): Promise<void> {
        return this.call<void, ITraceable>(LOGOUT_OTHERS_URL, { data: TraceUtil.addIfNeed({ traceId }), method: 'post', isHandleError: false });
    }

    // --------------------------------------------------------------------------
    //
    //  User Methods
    //
    // --------------------------------------------------------------------------

    public async userGet(uid: UserUID): Promise<IUserGetDtoResponse> {
        let item = await this.call<IUserGetDtoResponse>(`${USER_URL}/${uid}`);
        return TransformUtil.toClass(User, item);
    }

    public async userEdit(data: IUserEditDto): Promise<IUserEditDtoResponse> {
        let item = await this.call<IUserEditDtoResponse, IUserEditDto>(`${USER_URL}/${data.uid}`, { method: 'put', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(User, item);
    }

    public async userMasterList(data?: IUserMasterListDto): Promise<IUserMasterListDtoResponse> {
        let items = await this.call<IUserMasterListDtoResponse, IUserMasterListDto>(`${USER_URL}`, { data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClassMany(User, items);
    }

    // --------------------------------------------------------------------------
    //
    //  Comment Methods
    //
    // --------------------------------------------------------------------------

    public async commentAdd(data: ICommentAddDto): Promise<ICommentAddDtoResponse> {
        let item = await this.call<ICommentAddDtoResponse, ICommentAddDto>(`${COMMENT_URL}`, { method: 'post', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(Comment, item);
    }

    public async commentGet(id: number): Promise<ICommentGetDtoResponse> {
        let item = await this.call<ICommentGetDtoResponse>(`${COMMENT_URL}/${id}`);
        return TransformUtil.toClass(Comment, item);
    }

    public async commentEdit(data: ICommentEditDto): Promise<ICommentEditDtoResponse> {
        let item = await this.call<ICommentEditDtoResponse, ICommentEditDto>(`${COMMENT_URL}/${data.id}`, { data: TraceUtil.addIfNeed(data), method: 'put' });
        return TransformUtil.toClass(Comment, item);
    }

    public async commentList(data?: ICommentListDto): Promise<ICommentListDtoResponse> {
        let item = await this.call<ICommentListDtoResponse, ICommentListDto>(COMMENT_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Comment, item.items);
        return item;
    }

    public async commentRemove(id: number): Promise<ICommentRemoveDtoResponse> {
        let item = await this.call<ICommentRemoveDtoResponse>(`${COMMENT_URL}/${id}`, { method: 'delete' });
        return TransformUtil.toClass(Comment, item);
    }

    //--------------------------------------------------------------------------
    //
    // 	Coin Methods
    //
    //--------------------------------------------------------------------------

    public async coinStatusGet(data?: ICoinStatusGetDto): Promise<CoinStatusGetDtoResponse> {
        let item = await this.call<CoinStatusGetDtoResponse>(`${COIN_URL}/status`, { data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(CoinStatusGetDtoResponse, item);
    }

    public async coinAccountsGet(uid: UserUID): Promise<ICoinAccountsGetDto> {
        return this.call<ICoinAccountsGetDto>(`${COIN_URL}/${uid}/accounts`);
    }

    public async coinBalanceEdit(data: ICoinBalanceEditDto): Promise<void> {
        return this.call<void, ICoinBalanceEditDto>(`${COIN_URL}/balance`, { data: TraceUtil.addIfNeed(data), method: 'post' });
    }

    //--------------------------------------------------------------------------
    //
    // 	Payment Methods
    //
    //--------------------------------------------------------------------------

    public async paymentList(data?: IPaymentListDto): Promise<IPaymentListDtoResponse> {
        let item = await this.call<IPaymentListDtoResponse, IPaymentListDto>(PAYMENT_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Payment, item.items);
        return item;
    }

    public async paymentTransactionList(data?: IPaymentTransactionListDto): Promise<IPaymentTransactionListDtoResponse> {
        let item = await this.call<IPaymentTransactionListDtoResponse, IPaymentTransactionListDto>(PAYMENT_TRANSACTION_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(PaymentTransaction, item.items);
        return item;
    }

    //--------------------------------------------------------------------------
    //
    // 	Telegram Methods
    //
    //--------------------------------------------------------------------------

    public async telegramAccountAdd(data: ITelegramAccountAddDto): Promise<ITelegramAccountAddDtoResponse> {
        return this.call<ITelegramAccountAddDtoResponse, ITelegramAccountAddDto>(`${TELEGRAM_URL}`, { method: 'post', data: TraceUtil.addIfNeed(data) });
    }

    public async telegramAccountRemove(): Promise<ITelegramAccountRemoveDtoResponse> {
        return this.call<ITelegramAccountRemoveDtoResponse, void>(`${TELEGRAM_URL}`, { method: 'delete' });
    }

    //--------------------------------------------------------------------------
    //
    // 	Management Methods
    //
    //--------------------------------------------------------------------------

    public async managementUserList(data?: IUserListDto): Promise<IUserListDtoResponse> {
        let item = await this.call<IUserListDtoResponse, IUserListDto>(MANAGEMENT_USER_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(User, item.items);
        return item;
    }

    public async managementCoinAccountList(data?: IManagementCoinAccountListDto): Promise<IManagementCoinAccountListDtoResponse> {
        let item = await this.call<IManagementCoinAccountListDtoResponse, IManagementCoinAccountListDto>(MANAGEMENT_COIN_ACCOUNT_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(CoinAccount, item.items);
        return item;
    }

    public async managementCommentList(data?: ICommentListDto): Promise<ICommentListDtoResponse> {
        let item = await this.call<ICommentListDtoResponse, ICommentListDto>(MANAGEMENT_COMMENT_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Comment, item.items);
        return item;
    }

    public async managementPaymentList(data?: IPaymentListDto): Promise<IPaymentListDtoResponse> {
        let item = await this.call<IPaymentListDtoResponse, IPaymentListDto>(MANAGEMENT_PAYMENT_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Payment, item.items);
        return item;
    }

    // --------------------------------------------------------------------------
    //
    //  Other Methods
    //
    // --------------------------------------------------------------------------

    public async oauth(state: string): Promise<IOAuthPopUpDto> {
        return this.call<IOAuthPopUpDto>(`${OAUTH_URL}/${state}`, { data: TraceUtil.addIfNeed({}) });
    }

    public async language(project: string, locale: string, version?: string): Promise<any> {
        return this.call<any>(`${LANGUAGE_URL}/${project}/${locale}`, { data: { version } });
    }

    public async statistics(): Promise<IStatisticsGetDtoResponse> {
        return this.call<IStatisticsGetDtoResponse, void>(STATISTICS_URL);
    }

    public async peopleList(data: IPeopleListDto): Promise<IPeopleListDtoResponse> {
        let item = await this.call<IPeopleListDtoResponse, IPeopleListDto>(`${PEOPLE_URL}`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(User, item.items);
        return item;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public set sid(value: string) {
        if (!_.isNil(this.headers)) {
            this.headers.Authorization = `Bearer ${value}`;
        }
    }

    public get oauthRedirectUrl(): string {
        return `${this.url}${OAUTH_URL}`;
    }
}

export const PREFIX_URL = 'api/';
export const VK_URL = PREFIX_URL + 'vk';
export const GEO_URL = PREFIX_URL + 'geo';
export const USER_URL = PREFIX_URL + 'user';
export const INIT_URL = PREFIX_URL + 'init';
export const LOGIN_URL = PREFIX_URL + 'login';
export const LOGOUT_URL = PREFIX_URL + 'logout';
export const LOGOUT_OTHERS_URL = PREFIX_URL + 'logoutOthers';

export const OAUTH_URL = PREFIX_URL + 'oauth';
export const CLOCK_URL = PREFIX_URL + 'clock';
export const PEOPLE_URL = PREFIX_URL + 'people';
export const LANGUAGE_URL = PREFIX_URL + 'locale';
export const STATISTICS_URL = PREFIX_URL + 'statistics';

export const COIN_URL = PREFIX_URL + 'coin';
export const VOICE_URL = PREFIX_URL + 'voice';
export const COMMENT_URL = PREFIX_URL + 'comment';
export const PAYMENT_URL = PREFIX_URL + 'payment';
export const TELEGRAM_URL = PREFIX_URL + 'telegram';
export const PAYMENT_TRANSACTION_URL = PREFIX_URL + 'paymentTransaction';

export const TAROT_SPREAD_URL = PREFIX_URL + 'tarot/spread';
export const TAROT_SPREAD_URL_ID = PREFIX_URL + 'tarot/spread-id';
export const TAROT_SPREAD_DAY_URL = PREFIX_URL + 'tarot/spread-day';
export const TAROT_SPREAD_MEANING_URL = PREFIX_URL + 'tarot/spread-meaning';
export const TAROT_SPREAD_SHOWCASE_URL = PREFIX_URL + 'tarot/spread-showcase';
export const TAROT_SPREAD_MEANING_AI_URL = PREFIX_URL + 'tarot/spread-meaning-ai';

export const MANAGEMENT_USER_URL = PREFIX_URL + 'management/user';
export const MANAGEMENT_COMMENT_URL = PREFIX_URL + 'management/comment';
export const MANAGEMENT_PAYMENT_URL = PREFIX_URL + 'management/payment';
export const MANAGEMENT_COIN_ACCOUNT_URL = PREFIX_URL + 'management/coinAccount';
export const MANAGEMENT_TAROT_SPREAD_URL = PREFIX_URL + 'management/tarot/spread';
export const MANAGEMENT_TAROT_SPREAD_MEANING_URL = PREFIX_URL + 'management/tarot/spread-meaning';
export const MANAGEMENT_TAROT_SPREAD_MEANING_AI_URL = PREFIX_URL + 'management/tarot/spread-meaning-ai';

export const PAYMENT_ORDER_INIT_URL = PREFIX_URL + 'payment/selfwork';
export const PAYMENT_CALLBACK_URL = PREFIX_URL + 'payment/callback/moneta';
