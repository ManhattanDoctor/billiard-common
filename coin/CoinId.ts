export enum CoinId {
    RUB = 'RUB',
    USD = 'USD',
    TOKEN = 'TOKEN',
}

export interface ICoinAmount {
    amount: string;
    coinId: CoinId;
}
