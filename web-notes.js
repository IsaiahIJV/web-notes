const express = require('express')
const app = express()
const notes = [
  'http is a protocol',
  'http requests have a url, method, header, and body',
  'I am the terminal itself'
];
const bodyParser = require('body-parser');
const morgan = require('morgan');

// app.get('/', (req, res) => res.send('Web Notes'))
// app.use('/', express.static('views'));

app.use(morgan('tiny')); 

app.get('/', (req, res) => {
  res.render('notes', { notes: notes });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.set('view engine', 'ejs');
app.use('/css', express.static('css'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/notes', (req, res) => { 
  notes.push(req.body.note);
  res.redirect('/');
});
