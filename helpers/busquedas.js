
import axios from "axios"

export class Bsuquedas {

    historial = ['Caracas', 'Medellin']

    constructor() {

        //TODO ller de Db
    }

    get paramsMaptiler() {
        return {

            'key': 'fzHjYb2p1bTZzey9h06D',
            'language': 'es'
        }
    }

    async ciudad(lugar) {

        try {

            const intanceAxios = axios.create({
                baseURL: `https://api.maptiler.com/geocoding/[${lugar}].json `,
                params: this.paramsMaptiler
            })

            //peticion Http
            const resp = await intanceAxios.get()
            console.log(resp.data)
            return []


        } catch (error) {
            return []
        }
    }
}