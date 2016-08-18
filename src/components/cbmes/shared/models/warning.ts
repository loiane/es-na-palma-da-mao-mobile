export interface Warning {
    title: string;
    description: string;
    level: string;
    region: Region;
}

export interface Region {
    name: string;
    location: LatLng;
    polygon: LatLng[];
    radius: number;
}

export interface LatLng {
    latitude: number;
    longitude: number;
}