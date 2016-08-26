export interface Warning {
    level: string;
    title: string;
    message: string;
    beginDate: Date;
    endDate: Date;
    region: Region;
}

export interface Region {
    type: string;
    radius?: number;
    center?: LatLng;
    polygon?: LatLng[];
}

export interface LatLng {
    latitude: number;
    longitude: number;
}
