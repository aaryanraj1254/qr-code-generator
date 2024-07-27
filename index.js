const express = require('express');
const ejs = require('ejs');
const path = require('path');
const qrcode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index'); // Render the index.ejs template
});

app.post('/scan', (req, res) => {
  const inputText = req.body.text;
  console.log(inputText);
  qrcode.toDataURL(inputText, (err, src) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error generating QR code');
    } else {
      res.render('scan', { qr_code: src });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});