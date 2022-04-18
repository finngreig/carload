import { anyOriginJsonRequest } from "../helpers/http";
import { buildGeoObject, addToGeoObject } from "./geo";

const CHARGER_LOCATION_URL = "https://api.charge.net.nz/v1/locations";

export const getChargers = async () => {
  return await anyOriginJsonRequest(CHARGER_LOCATION_URL);
};

export const calculateTotalPower = (location) => {
  const totalPower = location.chargers
    .flatMap((c) => c.outlets)
    .reduce((total, charger) => total + charger.power, 0);
  return totalPower / 1000 / 1000;
}

export const getPowerForAreas = async () => {
  const areas = buildGeoObject();
  const chargers = await getChargers();

  chargers.forEach(charger => {
    addToGeoObject(areas, charger);
  });

  return Object.values(areas).map(a => ({
    name: a.name,
    power: a.members.map(m => calculateTotalPower(m)).reduce((acc, m) => acc + m, 0)
  }));
}

export const getTotalPower = async () => {
  const areaPowers = await getPowerForAreas();
  return areaPowers.reduce((acc, cur) => acc + cur.power, 0);
}