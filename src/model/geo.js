import nzPolygons from '../assets/new-zealand-regional-councils.json';
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers"

export const buildGeoObject = () => {
    const geo = {};
    nzPolygons.features.forEach(feature => {
        const region = feature.properties.HASC_1;
        const name = feature.properties.NAME_1;
        const geometry = feature.geometry;
        geo[region] = {
            name,
            geometry,
            members: []
        };
    });
    return geo;
}

export const addToGeoObject = (geo, item) => {
    Object.keys(geo).forEach(region => {
        const regionGeo = geo[region];
        const turfPoint = point([item.longitude, item.latitude]);
        const isInside = booleanPointInPolygon(turfPoint, regionGeo.geometry);
        if (isInside) {
            regionGeo.members.push(item);
        }
    });
}