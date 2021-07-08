const doFetch = async (url, method, realBody) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      url,
      method,
      ...(realBody && { realBody }),
    }),
  };
  try {
    const response = await fetch('/.netlify/functions/fetch-data', options);
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    const dataContent = Object.values(data)[0];
    return dataContent;
  } catch (error) {
    throw new Error(error);
  }
};

export default doFetch;
