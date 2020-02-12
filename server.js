const express = require('express');
const layouts = require('express-ejs-layouts');
// const dinoRoutes = require('./routs/dinos');
const methodOverride = require('method-override');

const app = express();
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    // res.send('HOME');
    res.render('home');
})

app.use('/dinos', require('./routes/dinos'));

app.listen(3000, () => {
    console.log('🎻 You are listening to port 3000 🎻');
});