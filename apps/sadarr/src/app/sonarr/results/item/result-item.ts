import { Season } from "../../model/series";

export interface ResultItemFormValue {
    all: boolean;
    seasons: Season[];
    profileId: number;
}