export enum CoinId {
    RUB = 'RUB',
    USD = 'USD',
}

export interface ICoinAmount {
    amount: string;
    coinId: CoinId;
}
