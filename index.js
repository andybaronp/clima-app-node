import('colors')

import { Bsuquedas } from "./helpers/busquedas.js";
import { inquirerMenu, listCountry, pauseInquirer, readInput } from "./helpers/inquirer.js"
import 'dotenv/config'

const main = async () => {
    console.clear()
    let opt;
    const busqueda = new Bsuquedas()

    do {

        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino = await readInput('Ingrese un lugar')
                //Buscar lugar
                const data = await busqueda.city(termino)
                //Seleccionar lugar
                const id = await listCountry(data)
                console.log(id)
                const { nombre, lng, lat } = data.find(l => l.id == id)
                //Clima
                const { description, max, min, temp } = await busqueda.climaCiudad(lat, lng)

                //Mostrar resultados
                console.clear()

                console.log('\n Informacion de la ciudad\n'.green)
                console.log(`Ciudad: ${nombre.green}`)
                console.log(`Lng:  ${lng} `)
                console.log(`Lat:  ${lat} `)
                console.log(`Temperatura: ${temp}`)
                console.log(`Min: ${min}`)
                console.log(`Max: ${max}`)
                console.log(`El clima en este momento: ${description.green}`)

                break;

            default:
                break;
        }
        if (opt !== 0) await pauseInquirer()

    } while (opt !== 0);

}





main()