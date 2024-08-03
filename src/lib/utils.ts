/**
 * Flattens nested Strapi API response objects by removing 'data' and 'attributes' layers,
 * making the structure simpler and more direct for client-side consumption. This function
 * recursively processes the response to ensure all nested objects are similarly flattened.
 *
 * This function is designed to handle responses that include nested 'data' and 'attributes' keys,
 * common in Strapi API responses, by merging these layers into the parent object. It preserves
 * other properties and handles arrays by applying the same flattening logic to each element.
 *
 * @param {any} data - The original API response data, which may include nested 'data' and 'attributes' keys.
 * @returns {any} The flattened version of the input data, with all 'data' and 'attributes' keys merged into their parent objects.
 *
 * @example
 * // A typical Strapi response object
 * const apiResponse = {
 *   data: {
 *     id: 1,
 *     attributes: {
 *       name: "John Doe",
 *       age: 30,
 *       contact: {
 *         email: "john.doe@example.com",
 *         phone: "1234567890"
 *       }
 *     }
 *   }
 * };
 *
 * // Flattened response
 * const flattenedResponse = flattenAttributes(apiResponse);
 * // Resulting object will be:
 * // {
 * //   id: 1,
 * //   name: "John Doe",
 * //   age: 30,
 * //   contact: {
 * //     email: "john.doe@example.com",
 * //     phone: "1234567890"
 * //   }
 * // }
 */
export function flattenAttributes(data: any): any {
  // Check if data is a plain object; return as is if not
  if (
    typeof data !== 'object' ||
    data === null ||
    data instanceof Date ||
    typeof data === 'function'
  ) {
    return data;
  }

  // If data is an array, apply flattenAttributes to each element and return as array
  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item));
  }

  // Initialize an object with an index signature for the flattened structure
  let flattened: { [key: string]: any } = {};

  // Iterate over each key in the object
  for (let key in data) {
    // Skip inherited properties from the prototype chain
    if (!data.hasOwnProperty(key)) continue;

    // If the key is 'attributes' or 'data', and its value is an object, merge their contents
    if (
      (key === 'attributes' || key === 'data') &&
      typeof data[key] === 'object' &&
      !Array.isArray(data[key])
    ) {
      Object.assign(flattened, flattenAttributes(data[key]));
    } else {
      // For other keys, copy the value, applying flattenAttributes if it's an object
      flattened[key] = flattenAttributes(data[key]);
    }
  }

  return flattened;
}

/**
 * Returns the Strapi URL based on the environment variable NEXT_PUBLIC_STRAPI_URL.
 * If the environment variable is not set, it defaults to "http://127.0.0.1:1337".
 *
 * @returns The Strapi URL.
 */
export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://127.0.0.1:1337';
}
