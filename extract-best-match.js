const scinamenull = ({ name, dataset }) => ({
  scientificName: null,
  taxonRemarks: `"${name}" taxon not found in dataset ${dataset}`,
});
// "Best" is currently only exact match of canonical name
export const extractBestMatch = ({
  results,
  name,
  dataset,
  nomatch = scinamenull,
}) => {
  if (results && results.length > 0) {
    const exact = dataset
      ? results.find(
        ({ canonicalName, datasetKey }) =>
          name === canonicalName && dataset === datasetKey,
      )
      : results.find(({ canonicalName }) => name === canonicalName);
    return exact ?? nomatch({ name, dataset });
  } else {
    nomatch({ name, dataset });
  }
};
