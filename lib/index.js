require('@remy/envy');
const fetch = require('node-fetch');
const Headers = fetch.Headers;

const API = 'https://api.feedbin.com/v2';

function prepareHeaders() {
  const headers = new Headers();
  headers.set(
    'Authorization',
    'Basic ' +
      Buffer.from(`${process.env.USERNAME}:${process.env.PASSWORD}`).toString(
        'base64'
      )
  );
  headers.set('content-type', 'application/json');
  return headers;
}

async function subscribe(url) {
  // console.log('trying ' + url);

  if (!url) {
    throw new Error('Missing url');
  }

  const headers = prepareHeaders();
  let res;
  let data;
  try {
    res = await fetch(API + '/subscriptions.json', {
      method: 'post',
      headers,
      body: JSON.stringify({
        feed_url: url,
      }),
    });
  } catch (e) {
    throw `Failed fetch exception with ${url} - ${e.message}`;
  }

  const status = res.status;

  data = await res.json();

  if (status === 201) {
    return 'Subscribed to ' + data.feed_url + ' 👍';
  }

  if (status === 300) {
    return (await Promise.all(
      data.map(({ feed_url }) => subscribe(feed_url))
    )).join('\n');
  }

  if (status == 302 || status === 200) {
    return 'Subscribed to ' + data.feed_url + ' (had it already 😉)';
  }

  if (status === 404) {
    throw new Error(`No feed found for "${url}"`);
  }

  return 'Unknown success - let me know what URL you gave…';
}

if (!module.parent) {
  subscribe(process.argv[2])
    .catch(e => console.log(e))
    .then(m => console.log(m));
} else {
  module.exports = subscribe;
}
