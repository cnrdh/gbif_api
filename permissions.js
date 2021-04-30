import { base } from "./base.js";
const { request } = Deno.permissions;

export const requestEnvPermission = () =>
  request({
    name: "env",
  });

export const requestAPIPermission = () =>
  request({
    name: "net",
    host: new URL(base).host,
  });

export const states = async (results) =>
  (await results).map(({ state }) => state);

export const allGranted = async (all) =>
  (await all).every(({ state }) => state === "granted");

export const isGranted = async (result) => (await result).state === "granted";

export const assertGranted = async (perms, msg) => {
  if ((await isGranted(perms)) !== true) {
    throw msg;
  }
};

export const requestCachePermissions = ({ path = undefined } = {}) => {
  return Promise.all([
    request({
      name: "read",
      path,
    }),
    request({
      name: "write",
      path,
    }),
  ]);
};
