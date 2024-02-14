app.get('/api/:data?', function (req, res) {
  const { data } = req.params;

  if (!data) {
    const dateUnix = Date.now();
    const dateUTC = new Date().toUTCString();

    return res.json({
      unix: dateUnix,
      utc: dateUTC,
    });
  }

  let dateUnix;
  let dateUTC;

  const isNumber = !isNaN(parseFloat(data)) && isFinite(data);
  const dateToParseDate = isNumber ? parseInt(data) : data;

  if (!Date.parse(new Date(dateToParseDate))) {
    return res.status(400).json({
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
