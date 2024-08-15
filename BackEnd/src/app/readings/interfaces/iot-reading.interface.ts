export interface IIotRequest{
    iotId: string;
    assetTag: string;
    readings: IIotReading[]
}

export interface IIotReading{
    date?: Date;
    type: string;
    tag: string;
    value: number;
    unit: string;
}