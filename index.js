import { Bsuquedas } from "./helpers/busquedas.js";
import { inquirerMenu, pauseInquirer, readInput } from "./helpers/inquirer.js"
import 'dotenv/config'

const main = async () => {

    let opt;
    const busqueda = new Bsuquedas()

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const lugar = await readInput('Ingrese un lugar')
                //Buscar lugar
                const ciudad = await busqueda.ciudad(lugar)
                //Seleccionar lugar

                //Clima

                //Mostrar resultados
                console.log('\n Informacion de la ciudad\n'.green)
                console.log('Ciudad: ')
                console.log('Lat: ')
                console.log('Lng: ')
                console.log('Temperatura: ')
                console.log('Min: ')
                console.log('Max: ')

                break;

            default:
                break;
        }
        if (opt !== 0) await pauseInquirer()

    } while (opt !== 0);

}





main()