const path = require('path');

const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

//Define path to express config
const publicpathDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engines and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to Serve
app.use(express.static(publicpathDirectory));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Amandeep Saini'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Amandeep Saini'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'How can i help you?',
        title: 'HELP',
        name: 'Amandeep Saini'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            });
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            } 
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });      
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Amandeep Saini',
        errorMessage: 'Help Article not Found'
     });
});

app.get('*', (req, res) => {
    res.render('404', {
       title: '404', 
       name: 'Amandeep Saini',
       errorMessage: 'Page not Found!'
    });
});

app.listen(port, () => {
    console.log('Server is up on port' + port);
});


// app.get('', (req, res) => { //setup route for index page
//     res.send('Hello');
// });

//nodemon src/app.js -e js,hbs