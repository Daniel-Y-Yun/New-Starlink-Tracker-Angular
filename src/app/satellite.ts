import { Omm } from "./omm";
export interface Satellite {
    satname: string,
    tle?: string,
    omm?: Omm;
}
