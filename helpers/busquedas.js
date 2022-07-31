import fs from 'fs'
import axios from "axios"

export class Bsuquedas {

    historial = []
    pathHistory = './DB/historial.json'
    constructor() {

        //TODO ller de Db
        this.readDB()
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

    get historialCapitalize() {


        return this.historial.map(lugar => {
            let palabras = lugar.split(' ')
            palabras = palabras.map(p => p[0].toLocaleUpperCase() + p.substring(1))
            return palabras.join(' ')
        })
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

    addHistory(lugar = '') {

        if (!this.historial.includes(lugar.toLocaleUpperCase())) {

            this.historial.unshift(lugar.toLocaleLowerCase())
        }
        //Guardar en DB
        this.saveDB()
    }
    saveDB() {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.pathHistory, JSON.stringify(payload))
    }

    readDB() {

        if (!fs.existsSync(this.pathHistory)) return
        const info = fs.readFileSync(this.pathHistory, { encoding: 'utf8' })

        const data = JSON.parse(info)
        this.historial = data.historial





    }
}

