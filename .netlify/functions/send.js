const subscribe = require('../../lib/index');
const page = require('../../lib/page');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  // Parse the form data from the body
  let url;
  try {
    // Netlify automatically parses form data
    const params = new URLSearchParams(event.body);
    url = params.get('url');
  } catch (e) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'text/html',
      },
      body: 'Invalid request format',
    };
  }

  if (!url) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'text/html',
      },
      body: 'URL is required - please go back and try again - thanks',
    };
  }

  try {
    const reply = await subscribe(url);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'text/html',
      },
      body: page(reply.replace(/\n/g, '<br><br>')),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/html',
      },
      body: page('It went wrong with: ' + e.message),
    };
  }
};
