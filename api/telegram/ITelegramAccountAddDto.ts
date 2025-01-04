import { ITraceable } from "@ts-core/common";
import { TgUser } from "@ts-core/oauth";
import { UserPreferences } from "../../user";

export interface ITelegramAccountAddDto extends ITraceable {
    user: TgUser;
}

export type ITelegramAccountAddDtoResponse = Partial<UserPreferences>;
