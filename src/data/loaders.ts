import qs from 'qs';
import { flattenAttributes, getStrapiURL } from '@/lib/utils';

const baseUrl = getStrapiURL();

/**
 * Fetches data from the specified URL.
 */
async function fetchData(url: string) {
  const authToken = null; // to implement getAuthToken() later
  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // or return null;
  }
}

export async function getGlobalData() {
  const url = new URL('/api/global', baseUrl);

  url.search = qs.stringify({
    populate: {
      sideNavigation: {
        populate: {
          logo: {
            fields: ['url', 'alternativeText'],
          },
          menuItem: {
            fields: ['href', 'icon', 'text'],
          },
        },
      },
    },
  });

  return await fetchData(url.href);
}
