export class UserAccount {
    type: UserAccountType;
    isDisableCommentAdd?: boolean;
}

export enum UserAccountType {
    FREE = 'FREE',
    ADMINISTRATOR = 'ADMINISTRATOR'
}
