const { fromEntries, entries } = Object;

export const speciesDwcMap = (d = {}) => {
  const {
    scientificName, // with authorship
    canonicalName,
    rank,
    accepted,
    authorship,
    accordingTo,
    publishedIn,
    exactMatch,
    name,
    ...rest
  } = d;
  const t = fromEntries(
    entries(rest).filter(
      ([k, v]) => !/([Kk]ey|origin|numDescendants|parent)/.test(k),
    ),
  );

  const taxonRank = rank ? rank.toLowerCase() : undefined;
  t.nameAccordingTo = accordingTo;
  t.namePublishedIn = publishedIn;
  t.scientificNameAuthorship = authorship;
  t.acceptedNameUsage = accepted;

  return { scientificName, taxonRank, canonicalName, ...t };
};
