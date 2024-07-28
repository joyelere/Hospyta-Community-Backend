import createHttpError from "http-errors";

export function assertIsDefined<T>(val: T | undefined): asserts val is T {
  if (val === undefined) {
    throw createHttpError(401, "You must be logged in to perform this action");
  }
}
