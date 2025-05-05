interface gqlParams {
  query: String;
  variables?: object;
}

const WORDPRESS_URL = import.meta.env.WORDPRESS_URL;
const headers = {
  "Content-Type": "application/json",
}

export async function wpquery({ query, variables = {} }: gqlParams) {
  const response = await fetch(WORDPRESS_URL, {
      method: "post",
      headers,
      body: JSON.stringify({
          query,
          variables,
      }),
  });

  if (!response.ok) {
      console.error(response);
      return {};
  }

  const { data } = await response.json();
  return data;
}
