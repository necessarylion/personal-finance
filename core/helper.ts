import type { Controller } from './types';

// Helper function to check if a value is a class constructor
export function isClass(v: any): v is new (...args: any[]) => any {
  return (
    typeof v === 'function' && /^class\s/.test(v.toString()) // Check if the function is a class
  );
}

export function isTuple(
  v: Controller,
): v is [new (...args: any[]) => any, string] {
  return Array.isArray(v) && v.length === 2 && isClass(v[0]);
}

/**
 * Parse the response to a Response object
 * @param res - The response to parse
 * @returns A Response object
 */
export function responseParser(res: any) {
  // if already response object, return it
  if (res instanceof Response) return res;
  // handel for array of serializable objects
  if (res instanceof Array && res.length > 0 && isSerializable(res[0])) {
    const serialized = res.map((item) => item.serialize());
    return Response.json(serialized);
  }
  // handel for single serializable object
  if (isSerializable(res)) {
    const serialized = res.serialize();
    return Response.json(serialized);
  }
  // if object, return json response
  if (res instanceof Object) return Response.json(res);
  // else return string response
  return new Response(res);
}

/**
 * Check if a value is a serializable object
 * @param v - The value to check
 * @returns True if the value is a serializable object, false otherwise
 */
export function isSerializable(v: any): v is { serialize: () => any } {
  return typeof v === 'object' && v !== null && typeof v.serialize === 'function';
}