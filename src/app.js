const path = require('path')
const express = require('express')
const hbs =  require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000
//To setup the path
const directoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../src/templates/views')
const partialsPath = path.join(__dirname,('../src/templates/partials'))
//To setup the handlebar section and the views section
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
//To use the static directories to serve
app.use(express.static(directoryPath))
app.get('',(req,res)=>
{
    res.render('index',{
        title: 'Weather app',
        name: 'Devanshi'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'Devanshi',
       message:"This page is to help you guys"})
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"Devanshi goel"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Address must be entered"
        })
    }
 geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
  if(error){
return res.send({ 
        error:"Please enter another address"
  })}
   forecast(latitude,longitude,(error,forecastData)=>{
     if(error){
     return res.send({ 
          error:"Some error occured"
     })
    }
  res.send({
      location,
    forecast: forecastData,
    address: req.query.address
  })
})
 })
})
app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'404',
        name:"Devanshi",
     errorMessage:"Help article not found"
    
    })
})
app.get('*',(req,res)=>{
    res.render('404page',{
        title:"404",
        name:"Devanshi",
       errorMessage: "My 404 Page"
    })
})
app.listen(port,() => {
console.log("Server is up and running at "+port)
})