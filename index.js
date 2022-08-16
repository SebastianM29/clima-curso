require('dotenv').config()

const { inquirerMenu, pausa, leerInput, listarResultados } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");





const main=async ()=>{
let opt 
const busqueda = new Busquedas();

do {
    opt = await inquirerMenu();
    switch (opt) {
        case 1:
            //mostrar mensaje
            const lugar = await leerInput('Ciudad:');
            //buscar lugares
            let resultado = await busqueda.ciudad(lugar);
            
            
            //seleccionar lugares
            let id=await listarResultados(resultado);
            if (id ==='0') continue;
           
           let lugarSel=resultado.find(l => l.id===id)
            // guardar en db
           busqueda.agregarHistorial(lugarSel.nombre);
           
           
          
            //clima
           let clima = await busqueda.climaLugar(lugarSel.lat,lugarSel.lng)
           
           let tiempo = await busqueda.datosTiempo(lugarSel.lat,lugarSel.lng)
          
       
            //seleccionar el lugar
            
            //mostrar resultado
            console.log('\n Informacion de la ciudad\n'.red);
            console.log('ciudad', lugarSel.nombre.red);
            console.log('Lat:',lugarSel.lat);
            console.log('Lng',lugarSel.lat);
            console.log('Temperatura',clima.temp);
            console.log('Minima',clima.min);
            console.log('Maxima',clima.max);
            console.log('humedad:',clima.humidity) 
            console.log('como esta el clima:',clima.desc.red)
            console.log('vientos:',clima.speed);
            console.log('sensacion termica:',clima.feel)
            console.log('Fecha y hora:',tiempo.Fecha.red )
            
            break;
            
            
            case 2:

                busqueda.historialCapitalizado.forEach( (lugar, i) =>  {
                    const idx = `${ i + 1 }.`.green;
                    console.log( `${ idx } ${ lugar } ` );
                });

            break;
            
    
       
    }




  
if (opt !== 0) await pausa() ;

} while (opt !==0);



}

main();