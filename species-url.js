import { base, version } from "./base.js";

// https://api.gbif.org/v1/species?name=Calanus&datasetKey=2d59e5db-57ad-41ff-97d6-11f5fb264527
export const speciesURL = ({
  name,
  datasetKey = "",
  language,
  offset = 0,
  limit = 10,
} = {}) => {
  const path = `${version}/species`;
  const url = new URL(path, base);
  const { searchParams } = url;
  searchParams.set("name", name);

  if (datasetKey) {
    searchParams.set("datasetKey", datasetKey);
  }
  if (language) {
    searchParams.set("language", language);
  }
  if (offset) {
    searchParams.set("offset", offset);
  }
  if (limit) {
    searchParams.set("limit", limit);
  }
  return url;
};
