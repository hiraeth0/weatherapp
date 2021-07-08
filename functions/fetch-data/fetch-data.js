const fetch = require('node-fetch');

const handler = async (event) => {
  const API_KEY = process.env.API_SECRET;
  const { url, method, realBody } = JSON.parse(event.body);
  const options = {
    method,
    mode: 'cors',
    ...(realBody && {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }),
    ...(realBody && { body: JSON.stringify(realBody) }),
  };

  try {
    const response = await fetch(`${url}&appid=${API_KEY}`, options);
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
