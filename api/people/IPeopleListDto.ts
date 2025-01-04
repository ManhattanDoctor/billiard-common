import { IPaginable, IPagination, ITraceable } from "@ts-core/common";
import { User } from "../../user";

export interface IPeopleListDto extends IPaginable<void>, ITraceable { }

export interface IPeopleListDtoResponse extends IPagination<User> { }