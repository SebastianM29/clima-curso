const fs = require ('fs');

const axios = require('axios');





class Busquedas {
  historial = [];
  dbpath = './db/database.json';  
  
    constructor(){
      this.leerdb();

    }

    get historialCapitalizado() {
      return this.historial.map( lugar => {

          let palabras = lugar.split(' ');
          palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

          return palabras.join(' ')

      })
  }
    get paramsWeather(){
      return {
        'appid':process.env.OPENWEATHER_APIKEY,
      'units':'metric',
      'lang':'es'
      
      }
      
    }



    async ciudad( lugar = ''){

     try {

    let instance =await axios.create ({
        baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?types=place%2Cpostcode%2Caddress`,
      params:{

        'access_token':process.env.mapbox,
        'proximity':'ip',

      }
     })  
     const resp = await instance.get();  
     return resp.data.features.map(resp =>({ // parentesis y llaves significa que devuelve un objeto
      id:resp.id,
      nombre:resp.place_name,
      lng:resp.center[0],
      lat:resp.center[1]
     }));
     return[];// retornar arreglo con los lugares q pida
     //console.log(`lugar: ${lugar}`)
        
   }catch(error){
    return[];
   }
}
async climaLugar(lat,lon){
  

  try {
  let instance =await axios.create ({
    baseURL:`https://api.openweathermap.org/data/2.5/weather`,
    params: {...this.paramsWeather,lat,lon}
      
    
  })

   const climaRes = await instance.get(); 
 
  
  let {weather,main,wind}=climaRes.data
  

 
  
  return {
    desc:weather[0].description,
    min:main.temp_min,
    max:main.temp_max,
    temp:main.temp,
    humidity:main.humidity,
    speed:wind.speed,
    feel:main.feels_like
    
   
   
  }
  
 
    

  }catch (error) {
    console.log('error')
    
  }
}


 





 async datosTiempo (lat,lng){
  try {
    

  let instance =await axios.create({
    baseURL:`http://api.timezonedb.com/v2.1/get-time-zone`,
    params:{
      'key':process.env.appikeyTime,
      'format':'json',
      'by':'position',
      'lat':lat,
      'lng':lng

    }

  })
  const dateTime = await instance.get()
  let {formatted}= dateTime.data;
  

  
  return {
    Fecha:formatted
  }




} catch (error) {
    
}




}

agregarHistorial(lugar = ''){
    
  if( this.historial.includes( lugar.toLocaleLowerCase() ) ){
    return;
}
this.historial = this.historial.splice(0,5);

this.historial.unshift( lugar.toLocaleLowerCase() );

    this.grabardb()
    
  
  

 }

grabardb (){
  let ojbHist={
    historial:this.historial
  }
  fs.writeFileSync(this.dbpath,JSON.stringify(ojbHist))
  console.log('grabado en historial')

} 

leerdb(){
  console.log('probando')
  if( ! fs.existsSync( this.dbPath ) ) return;
        
        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse( info );
        
        this.historial = data.historial;
}


}


     


//http://api.timezonedb.com/v2.1/get-time-zone







module.exports = Busquedas