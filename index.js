import { Bsuquedas } from "./helpers/busquedas.js";
import { inquirerMenu, listCountry, pauseInquirer, readInput } from "./helpers/inquirer.js"
import 'dotenv/config'

const main = async () => {
    console.clear()
    let opt;
    const busqueda = new Bsuquedas()

    do {
        console.clear()

        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const lugar = await readInput('Ingrese un lugar')
                //Buscar lugar
                const citys = await busqueda.ciudad(lugar)
                //Seleccionar lugar
                const { place_name, center } = await listCountry(citys)



                //Clima
                const { description, max, min } = await busqueda.climaCiudad(center[0], center[1])

                //Mostrar resultados
                console.log('\n Informacion de la ciudad\n'.green)
                console.log(`Ciudad: ${place_name}`)
                console.log(`Lat:  ${center[0]} `)
                console.log(`Lng:  ${center[0]} `)
                console.log(`Temperatura: ${description}`)
                console.log(`Min: ${min}`)
                console.log(`Max: ${max}`)

                break;

            default:
                break;
        }
        if (opt !== 0) await pauseInquirer()

    } while (opt !== 0);

}





main()