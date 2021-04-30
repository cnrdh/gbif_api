# gbif-species-api

A [Deno](https://deno.land) command line tool to obtain taxonomy metadata from
[GBIF Species API](https://www.gbif.org/developer/species)

## Minimal example

```sh
$ echo '"Calanus"' | gbif-species-api --worms
```

## Install

```sh
GBIF_CACHE=`deno run --allow-env cachedir.js`
deno install --quiet --unstable --allow-net=api.gbif.org --allow-env --allow-read=$GBIF_CACHE --allow-write=$GBIF_CACHE gbif-species-api.js
```
