import { base } from "./base.js";
import { gbifBackboneID, wormsID } from "./dataset-ids.js";
import { gbifSpeciesAPIFactory } from "./species-api-factory.js";
import { cachedir } from "./cachedir.js";
import { helptext } from "./helptext.js";

import {
  allGranted,
  assertGranted,
  isGranted,
  requestAPIPermission,
  requestCachePermissions,
  requestEnvPermission,
} from "./permissions.js";

import {
  cache,
  generatorFactory,
  ndmapcommand,
  parseArgs,
  resolve,
} from "./deps.js";

const { exit, readTextFile, permissions } = Deno;

if (import.meta.main) {
  try {
    const args = parseArgs(Deno.args, {
      default: {
        dataset: gbifBackboneID,
        limit: 1,
        offset: 0,
      },
    });
    if (args.help) {
      console.log(helptext);
      exit(0);
    }
    await assertGranted(
      requestAPIPermission(),
      `Cannot run without permissions to access GBIF Species API ${base}`,
    );
    //--worms
    if (args.worms) {
      args.dataset = wormsID;
    }

    let grantedcache = false;
    if (await isGranted(requestEnvPermission())) {
      const path = cachedir();
      grantedcache = await allGranted(requestCachePermissions({ path }));
    }
    if (grantedcache !== true) {
      console.warn(`Missing permissions to cache GBIF API responses`);
    }

    const mapfx = gbifSpeciesAPIFactory({ ...args, cache, readTextFile });
    const generator = generatorFactory({ args });
    await ndmapcommand({ mapfx, generator });
  } catch (e) {
    console.error(e);
    exit(1);
  }
}
