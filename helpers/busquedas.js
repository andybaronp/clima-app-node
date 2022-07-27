
import axios from "axios"

export class Bsuquedas {

    historial = ['Caracas', 'Medellin']

    constructor() {

        //TODO ller de Db
    }

    async ciudad(lugar) {

        try {

            //peticion Http
            const resp = await axios.get('https://reqres.in/api/users?page=2')
            console.log(resp.data)
            return []
        } catch (error) {
            return []
        }
    }
}