const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000   
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'André Silva'
    })
})

app.get('/about',(req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'André Silva'
    })
})

app.get('/help', (req, res) =>{
    res.render('help' ,{
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'André Silva'
    })
})

app.get('/weather', (req, res) =>{
    const location = req.query.address
    if(!location){
        return res.send({
            error: 'You must provide a address term!'
        })
    }
    geocode(location, (error, { latitude, longitude, location } = {}) =>{
        if(error){
            return res.send({
                error: error
            })
        } 
        
        forecast(latitude, longitude, (error, foreCastdata) =>{
            if(error){
                return res.send({
                    error: error
                })
            } 
            
            res.send({
                location,
                forecast: foreCastdata
            })     
        })
    })
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'})
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        text: 'Article not found',
        name: 'André Silva'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        text: 'Page not found',
        name: 'André Silva'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})