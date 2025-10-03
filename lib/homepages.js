require('@remy/envy');
const fetch = require('node-fetch');

const API = 'https://twitter.com/';

async function get(username) {
  let res;
  let data;
  try {
    res = await fetch(API + username, {
      headers: {
        'user-agent':
          'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
      },
      method: 'get',
    });
  } catch (e) {
    console.log('FAIL fetch exception with %s', username);
    return;
  }

  try {
    data = await res.text();
  } catch (e) {
    console.log('FAIL html exception with %s', username);
    console.log(e);

    return;
  }

  // if (status !== 200) {
  //   console.log('not found: ' + username);
  //   return;
  // }

  const cheerio = require('cheerio');
  const $ = cheerio.load(data);

  console.log(username, $('.details .url a').data('url'));
}

get(process.argv[2]);
