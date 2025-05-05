// get the wordpress api url from the environment variables
interface gqlParams {
  query:string;
  variables?:object;
}

export async function wpquery({query, variables = {}}:gqlParams) {
  const response = await fetch("https://admin-cooldown.getquick.io/graphql", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query, variables}),
  });

  if (!response.ok) {
    console.error('Response not OK:', response.status, response.statusText);
    return {};
  }

  const data = await response.json();

  // Log the response data to help debug
  console.log('GraphQL Response:', JSON.stringify(data, null, 2));

  if (data.errors) {
    console.error('GraphQL Errors:', data.errors);
    return {};
  }

  return data;
}
