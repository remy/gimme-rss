module.exports = message => `<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Gimme your RSS</title>
    <link rel="stylesheet" href="/style.css">
  </head>

  <body>
    <h1>Gimme your RSS</h1>
    <p>I'm collecting websites that have RSS feeds for a small personal project. I'm not sure it's worth talking about
      just yet, but if you have a website drop your URL below, hit "send" and I'll have subscribed, thank you 👍</p>
    <p class="reply">${message}</p>
    <form action="/send" method="post">
      <label for="url">Your URL</label>
      <div class="flex-h">
        <input required class="flex-grow" autofocus id="url" name="url" placeholder="example.com">
        <span>&nbsp;</span>
        <input type="submit" value="Send" class="button">
      </div>
    </form>
  </body>

</html>`;
