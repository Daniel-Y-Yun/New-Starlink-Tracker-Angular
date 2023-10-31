export interface Satellite {
    satid: string;
    satname?: string;
    tle?: string;
    satlat?: number,
    satlong?: number,
    satalt?: number,
    azimuth?: number,
    elevation?: number,
    ra?: number,
    dec?: number,
    timestamp?: number
}
