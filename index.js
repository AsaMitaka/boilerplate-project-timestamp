const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:data', function (req, res) {
  const { data } = req.params;
  let dateUnix;
  let dateUTC;

  if (!data) {
    dateUnix = Date.now().valueOf();
    dateUTC = new Date().toUTCString();
  }
  const isNumber = !isNaN(parseFloat(data)) && isFinite(data);
  const dateToParseDate = isNumber ? parseInt(data) : data;

  if (!Date.parse(new Date(dateToParseDate))) {
    res.status(400).json({
      error: 'Invalid Date',
    });
  }

  dateUnix = new Date(dateToParseDate).valueOf();
  dateUTC = new Date(dateToParseDate).toUTCString();

  return res.json({
    unix: dateUnix,
    utc: dateUTC,
  });
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
