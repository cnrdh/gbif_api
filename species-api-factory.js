import { speciesURL } from "./species-url.js";
import { extractBestMatch } from "./extract-best-match.js";
import { fetchCache } from "./fetch-cache.js";
import { speciesDwcMap } from "./species-dwc-map.js";

export const gbifSpeciesAPIFactory = ({
  dataset,
  readTextFile,
  cache,
  dwc,
  offset,
  limit,
  debug,
  raw,
} = {}) =>
  async (inp) => {
    if ("string" === typeof inp) {
      inp = { name: inp };
    }
    let { name, scientificName, canonicalName } = inp;
    name = canonicalName || scientificName || name;
    if (!name) {
      return;
    }

    const url = speciesURL({ name, datasetKey: dataset, offset, limit });
    const text = await fetchCache(url, { cache, readTextFile });
    const { results, ...rest } = JSON.parse(text);

    if (raw) {
      const out = { ...inp, url, results, ...rest };
      return out;
    }
    const bestmatch = {
      ...inp,
      url,
      ...extractBestMatch({
        results,
        name,
        dataset,
      }),
    };
    return dwc ? speciesDwcMap(bestmatch) : bestmatch;
  };
