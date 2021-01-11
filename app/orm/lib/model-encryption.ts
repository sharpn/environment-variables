import * as uuid from 'uuid';
const Cryptr = require('cryptr');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
if (!ENCRYPTION_KEY) {
  // don't support missing ENCRYPTION_KEY
  throw new Error(`Missing env var ENCRYPTION_KEY`);
}

function encryptStringValue(input: string, salt: string): string {
  if (!input) return input;

  const cryptr = new Cryptr(`${ENCRYPTION_KEY}${salt}`);
  return cryptr.encrypt(input);
}

function decryptStringValue(input: string, salt: string): string {
  if (!input) return input;

  const cryptr = new Cryptr(`${ENCRYPTION_KEY}${salt}`);
  return cryptr.decrypt(input);
}

export function generateSalt(): string {
  return uuid.v4().replace(/-/g, '');
}

function alreadyEncrypted(value: string) {
  return value && value.slice(0, 4) === '$en.';
}

function tagEncrypted(value: string) {
  return `$en.${value}`;
}

function removeEncryptedTag(value: string) {
  return value.slice(4);
}

export function getSalt(defaultSalt): [string, boolean] {
  if (defaultSalt) {
    return [defaultSalt, false];
  }

  return [generateSalt(), true];
}

export function processFieldEncryption(
  startingValue: string,
  salt: string,
): string {
  if (alreadyEncrypted(startingValue)) {
    return startingValue;
  }

  if (startingValue === null) {
    return startingValue;
  }

  const value = encryptStringValue(startingValue, salt);
  return tagEncrypted(value);
}

export function decryptFieldIfRequired(input: string, salt: string) {
  if (alreadyEncrypted(input)) {
    return decryptStringValue(removeEncryptedTag(input), salt);
  }

  return input;
}

export function getDecryptedVersion<T>(
  inputRecord: T,
  fields: string[],
  salt: string,
): T {
  const shallowCopy = Object.assign({}, inputRecord, {
    salt: undefined, // to ensure we never return the salt
  });

  for (const field of fields) {
    shallowCopy[field] = decryptFieldIfRequired(shallowCopy[field], salt);
  }

  return shallowCopy;
}
