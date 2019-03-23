const path=require('path')
const express =require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const chalk=require('chalk')
const app=express()

// define path for express config
const publiDirectorypath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')


//setup handler engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publiDirectorypath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Asad Aazam'
    })
})
app.get('/about',(req,res)=>{
     res.render('about',{
        title:'About Me',
        name:'Asad Aazam'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:"We r happy to help you!!",
        name:'Asad Aazam'
    
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return  res.send({
           error:'Please provide an address'
       })
    }
    const address=req.query.address
    geocode(address,(error,{location,latitude,longitude}={})=>{
        if(error)
        {
        return res.send({error:error})
        }
         
        forecast(latitude  , longitude, (error, forecastData) => {
            if(error)
            {
            return res.send({error:error})
            }
           
            console.log(chalk.red.inverse(location))
            console.log(forecastData)
            res.send({
                address,
                forecast:forecastData,  
                location:location  
            })
          }) 
    })
   

})
app.get('/products',(req,res)=>{
    if(!req.query.search){
     return res.send({
          error:'You must provide a search term'
      })
    }
    console.log(req.query.search)
    res.send({
                products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help Article Missing',
        message:'Help article not found',
        name:'Asad Aazam'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Page Not Found',
        name:'Asad Aazam'
    })
})
//app.com
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})