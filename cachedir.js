import { base } from "./base.js";
import { cachedir as cacheroot, resolve } from "./deps.js";
import { requestEnvPermission } from "./permissions.js";

export const cachedir = () => resolve(cacheroot(), "https", new URL(base).host);

if (import.meta.main) {
  await requestEnvPermission();
  console.log(cachedir());
}
