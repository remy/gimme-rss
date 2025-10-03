const subscribe = require('../lib/index');
const page = require('../lib/page');

module.exports = async (req, res) => {
  const url = req.body.url;

  if (!url) {
    res
      .status(400)
      .send('URL is required - please go back and try again - thanks');
    return;
  }

  try {
    const reply = await subscribe(url);

    res.status(201).send(page(reply.replace(/\n/g, '<br><br>')));
  } catch (e) {
    res.status(500).send(page('It went wrong with: ' + e.message));
  }
};
