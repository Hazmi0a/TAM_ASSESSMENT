import { randomBytes, createHash } from "crypto";

export const capitalizeFirstLetter = (string: string): string => {
  return string.replace(/^./, string[0].toUpperCase());
};

export const compareValues = (oldValues: any, newValues: any) => {
  const keys = Object.keys(oldValues);
  let updateValues: any = {};
  // let notSameObj = false;
  // compare if objs are the same
  // NOT IMPLEMENTED YET

  // compare obj values
  for (let key of keys) {
    if (oldValues[key] !== newValues[key]) {
      updateValues[key] = newValues[key];
    }
  }
  return updateValues;
};

// return obj ready for patch request
export const patchObj = (data: any) => {
  const keys = Object.keys(data);
  let patchData = [];

  for (let key of keys) {
    let obj = { op: "replace", path: "/" + key, value: data[key] };
    patchData.push(obj);
  }

  return patchData;
};
/**
 * Checks if token is expired.
 *
 * @param {number}   expireDate   the expriration time for token.
 *
 * @return {boolean} returns False if not expired.
 */
export const checkJWTexp = (expireDate: number) => {
  var currentDateInMilisec = new Date().getTime();
  var expireDateInMilisec = new Date(expireDate * 1000).getTime();
  // if not expired return false
  if (expireDateInMilisec >= currentDateInMilisec) return false;
  return true;
};

// generate salt to hash with password
const generateSalt = (rounds: number) => {
  if (rounds >= 15) {
    throw new Error(`${rounds} is greater than 15,Must be less that 15`);
  }
  if (typeof rounds !== "number") {
    throw new Error("rounds param must be a number");
  }
  if (rounds == null) {
    rounds = 12;
  }
  return randomBytes(Math.ceil(rounds / 2))
    .toString("base64")
    .slice(0, rounds);
};

export const passwordHasher = (password: string) => {
  let hash = createHash("sha512");
  hash.update(password);
  let value = hash.digest("base64");
  return value;
};
