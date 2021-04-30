import { base } from "./base.js";

export const fetchCache = async (
  url,
  { cache, policy, namespace, readTextFile } = {},
) => {
  let text;

  try {
    if (cache && readTextFile) {
      const { path, origin } = await cache(url, policy, namespace);
      if (path) {
        text = await readTextFile(path);
      }
    }
  } finally {
    if (!text) {
      text = await fetch(url).then((r) => r.text());
    }
  }
  return text;
};
