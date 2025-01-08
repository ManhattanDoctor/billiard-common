import { CoinId } from "../coin";
import { GamePartner } from "./GamePartner";

export class GameResult {
    public id: number;
}

export class GamePartnerResult extends GameResult {
    public score: GamePartnerResultScore;
    public partner: GamePartner;
    public balance?: GamePartnerResultScore;
}

export class GamePartnerResultScore {
    value: string; // относительное
    amount: string; // абсолютное
    coinId: CoinId;
}
