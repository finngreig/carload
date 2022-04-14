import { anyOriginJsonRequest } from "../helpers/http";

const CHARGER_LOCATION_URL = "https://api.charge.net.nz/v1/locations";

export const getChargerPower = async () => {
  return await anyOriginJsonRequest(CHARGER_LOCATION_URL);
};

export const getTotalChargerPower = async () => {
  const locations = await getChargerPower();
  const chargers = locations.flatMap((l) => l.chargers);
  const chargersInUse = chargers.filter((c) => c.isChargeNow === true);
  const totalPower = chargersInUse
    .flatMap((c) => c.outlets)
    .reduce((total, charger) => total + charger.power, 0);
  return totalPower / 1000 / 1000;
};
