import { nanoid } from "nanoid";

export const generateShortCode = () => {
  return nanoid(8) || Math.random().toString(36).substring(2, 8);
};
