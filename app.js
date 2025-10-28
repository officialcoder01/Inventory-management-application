require('dotenv').config();
const express = require('express');
const path = require('node:path');
const suppliersRouter = require('./routes/suppliersRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const partsRouter = require('./routes/partsRouter');

const app = express();
const session = require('express-session');
const flash = require('connect-flash');

// Session setup
app.use(session({
  secret: 'something random and safe 29330i', // change this to something random and safe
  resave: false,
  saveUninitialized: true
}));

// Flash setup
app.use(flash());

// Make flash messages available in all views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('view cache', false);

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/suppliers');
})

app.use('/suppliers', suppliersRouter);
app.use('/categories', categoriesRouter);
app.use('/parts', partsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        console.error('Error starting server:', error);
    } else {
        console.log(`Server is running on port http://localhost:${PORT}`);
    }
});