const path =  require('path')
const hbs =  require('hbs')
const express = require('express')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

const port = process.env.PORT || 3000

publicDirectoryPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../templates/partials')
const viewPath = path.join(__dirname, '../views')

app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) =>{
//     res.send("Hello express")
// })

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) =>{
    
    res.render('index', {
        title: "Welcome to home page",
        name: "Home page"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
       return res.send({
            error: "Please provide address."
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location}) =>{
        if(error){
            return res.send(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send("Error", error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: "About page....",
        name: "About"
    })
})

app.get('/about/what', (req, res)=>{
    res.render('404', {
        title: "404",
        errorMessage: "This page is coming soon"
    })
})

app.get('*', (req,res)=>{
    res.render("404", {
        title: "404",
        errorMessage: "Page not found"
    })
})

app.listen(port, () =>{
    console.log('PORT '+port+' is up')
})