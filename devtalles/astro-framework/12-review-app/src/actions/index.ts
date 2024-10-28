import { getAvailability } from "./places/getAvailability.actions";
import { getPlaces } from "./places/getPlaces.actions";

export const server = {
  getPlaces,
  getAvailability,
}