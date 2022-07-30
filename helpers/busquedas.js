
import axios from "axios"

export class Bsuquedas {

    historial = ['Caracas', 'Medellin']

    constructor() {

        //TODO ller de Db
    }

    get paramsMaptiler() {
        return {

            'key': process.env.MAPTILER_KEY,
            'language': 'es'
        }
    }
    get paramsOpenweathermap() {
        return {

            'appid': process.env.OPENWEATHER_KEY,
            'lang': 'es',
            'units': 'metric'
        }
    }

    async city(lugar) {

        try {

            const intanceAxios = axios.create({
                baseURL: `https://api.maptiler.com/geocoding/[${lugar}].json `,
                params: this.paramsMaptiler
            })

            //peticion Http
            const resp = await intanceAxios.get()
            return resp.data.features.map((inf) => ({

                id: inf.id,
                nombre: inf.place_name,
                lng: inf.center[0],
                lat: inf.center[1]


            }))




        } catch (error) {
            return []
        }
    }


    async climaCiudad(lat = '', lon = '') {
        const intanceAxios = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
            params: this.paramsOpenweathermap
        })
        const resp = await intanceAxios.get()
        const { weather, main } = resp.data

        return {
            description: weather[0].description,
            temp: main.temp,
            min: main.temp_min,
            max: main.temp_max

        }


    }

}