import { speciesURL } from "./species-url.js";
import { assertEquals, test } from "./test-deps.js";

test("speciesURL({ name })", async () => {
  const input = { name: "Name"};
  const expect="https://api.gbif.org/v1/species?name=Name&limit=10";
  assertEquals(speciesURL(input) instanceof URL, true);
  assertEquals(speciesURL(input).href, expect);
});

test("speciesURL({ name, limit, offset, datasetKey, unknown })", async () => {
  const input = { name: "Name", limit:1, offset:1, datasetKey: "UUID", unknownKey: true };
  const expect="https://api.gbif.org/v1/species?name=Name&datasetKey=UUID&offset=1&limit=1";
  assertEquals(speciesURL(input).href, expect);
});
