const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXNhZGFhemFtIiwiYSI6ImNqdGhpM210dTB5OXU0NHJyd2Fsbnc4NnEifQ.KS-lVa3s8lI5sXgbrBeABw&limit=1'
     request({url,json:true},(error,{ body })=>{
         if(error){
             callback('Unable to connect to location services!!',undefined)
         }
         else if(body.features.length===0){
             callback('Unable to find location, Try another location',undefined)

         }
         else{
             callback(undefined,{
                location:body.features[0].place_name,
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0]
            })
         }

     })
}

module.exports=geocode