import { anyOriginJsonRequest } from "../helpers/http";

const GRID_LOAD_URL = "https://www.transpower.co.nz/so/data/load_data_graph";

export const getGridPower = async () => {
  const response = await anyOriginJsonRequest(GRID_LOAD_URL);
  return response.data.nzPoints.pop()[1];
};
