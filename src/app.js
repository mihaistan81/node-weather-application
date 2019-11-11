const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mihai Stan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mihai Stan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Mihai Stan',
        message: 'This is a helpful message!'
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404 page',
        name: 'Mihai Stan',
        message404: 'Help article not found!'
    })
})

app.get('/products', (req, res) => {
    if ( !req.query.search ) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if ( !req.query.address ) {
        return res.send({
            error: 'You must provide an Address!'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error) {
                console.log('Error: ', error)
                return res.send({
                    error: error
                })
            }
            //({latitude, longitude, location} = geocodeResponse) => in case you do not have a default empty object

            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    console.log('Error: ', error)
                    return res.send({ error: error })
                }
                console.log('Location: ', location)
                console.log('Forecast: ', forecastData)
                res.send({
                    location: location,
                    forecast: forecastData,
                    address: req.query.address
                })
            })
        })
    }
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Mihai Stan',
        message404: 'Page not found!'
    })
})

app.listen(port, () => { 
    console.log('Server is up on port '+ port) 
})