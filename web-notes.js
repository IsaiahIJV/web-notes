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
app.set('view engine', 'ejs');
app.use('/css', express.static('css'));
app.use('/js',express.static('js'));
app.use(bodyParser.urlencoded({ extended: true }));

app.delete('/notes/:id',function (req,res) {
  var id = req.params.id;
if (id < notes.length && id >= 0){
  notes.splice(id,1);
  res.status(200).send("\n Note Deleted at " + id + "\n\n");//200
} else {
    res.status(404).send("Message not located");
  }

});

app.get('/', (req, res) => {
  res.render('notes', { notes: notes });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))



app.post('/notes', (req, res) => { 
  notes.push(req.body.note);
  res.redirect('/');
});
