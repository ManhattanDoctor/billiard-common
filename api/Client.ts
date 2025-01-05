import { TransportHttp, ITransportHttpSettings, LoggerLevel, ILogger, TransformUtil, ITraceable, TraceUtil } from '@ts-core/common';
import { IOAuthPopUpDto } from '@ts-core/oauth';
import { IInitDto, IInitDtoResponse, ILoginDto, ILoginDtoResponse } from './login';
import { User, USER_URL } from '../user';
import { ICommentAddDto, ICommentAddDtoResponse, ICommentEditDto, ICommentEditDtoResponse, ICommentGetDtoResponse, ICommentListDto, ICommentListDtoResponse, ICommentRemoveDtoResponse } from './comment';
import { Comment } from '../comment';
import { IPeopleListDto, IPeopleListDtoResponse } from './people';
import { IUserEditDto, IUserEditDtoResponse, IUserGetDtoResponse, IUserListDto, IUserListDtoResponse, IUserSearchDtoResponse, UserUID } from './user';
import { IStatisticsGetDtoResponse } from './statistics';
import { CoinBonusDto, CoinStatusGetDtoResponse, ICoinAccountsGetDto, ICoinBalanceEditDto, ICoinStatusGetDto } from './coin';
import { IPaymentListDto, IPaymentListDtoResponse, IPaymentTransactionListDto, IPaymentTransactionListDtoResponse } from './payment';
import { Payment, PaymentTransaction } from '../payment';
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

    public async userList(data?: IUserListDto): Promise<IUserListDtoResponse> {
        let item = await this.call<IUserListDtoResponse, IUserListDto>(USER_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(User, item.items);
        return item;
    }

    public async userSearch(value: string): Promise<IUserSearchDtoResponse> {
        let url = USER_SEARCH_URL;
        if (!_.isEmpty(value)) {
            url += `/${value}`;
        }
        let items = await this.call<IUserSearchDtoResponse>(url);
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

export const INIT_URL = PREFIX_URL + 'init';
export const LOGIN_URL = PREFIX_URL + 'login';
export const LOGOUT_URL = PREFIX_URL + 'logout';
export const LOGOUT_OTHERS_URL = PREFIX_URL + 'logoutOthers';

export const USER_SEARCH_URL = PREFIX_URL + 'userSearch';

export const OAUTH_URL = PREFIX_URL + 'oauth';
export const PEOPLE_URL = PREFIX_URL + 'people';
export const LANGUAGE_URL = PREFIX_URL + 'language';
export const STATISTICS_URL = PREFIX_URL + 'statistics';


export const COIN_URL = PREFIX_URL + 'coin';
export const COMMENT_URL = PREFIX_URL + 'comment';
export const PAYMENT_URL = PREFIX_URL + 'payment';
export const TELEGRAM_URL = PREFIX_URL + 'telegram';
export const PAYMENT_TRANSACTION_URL = PREFIX_URL + 'paymentTransaction';

export const PAYMENT_ORDER_INIT_URL = PREFIX_URL + 'payment/selfwork';
export const PAYMENT_CALLBACK_URL = PREFIX_URL + 'payment/callback/moneta';
