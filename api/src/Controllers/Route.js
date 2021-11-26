const { Route } = require('../db.js');
const axios = require('axios');
const { kilometers, hours } = require('./Function'); // ME TRAIGO LAS FUNCTIONS
const { TOKEN } = process.env;

const getRouteInfo = async (req, res, next) => {
  try {

    let {
      long1,
      lat1,
      long2,
      lat2,
      name,
    } = req.query
    name = name.toLowerCase()

    var distance, time, cordenadas, cities, info, city
    if (name) {
      info = (await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json?country=ar&access_token=${TOKEN}`)).data.features
      cities = info.map(city => (
        {
          name: city.place_name,
          coordinates: city.center
        }
      ))

      city = cities.filter(city => city.name.toLowerCase() === name)

    }

    else if (long1 && lat1 && long2 && lat2) {
      info = (await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${long1}%2C${lat1}%3B${long2}%2C${lat2}?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=${TOKEN}`)).data
      distance = info.routes[0].distance
      time = info.routes[0].duration

      cordenadas = {
        distance: kilometers(distance),
        time: hours(time),
      }
    }

    return res.send({
      cities,
      cordenadas,
      city
    })
  }

  catch (error) {
    next(error)
  }
}


const postRoute= async (req, res, next) => {
  try{
    const {
      origin,
      destiny,
      price,
      date,
      hours,
      place,
      restriction,
    }=req.body;
    const route = await Route.findOrCreate({
      where: {
        origin,
        destiny,
        price,
        date,
        hours,
        place,
        restriction,
      }
    })

    res.send(route)

  }catch(error){
    next(error)
  }
}


const getRoute = async (req, res, next) => {
  try {
    let {restriction} = req.query;
    const {id} = req.params;
    let routes;
    if(id){
      routes = await Route.findByPk(id);
      return res.send(routes);
    }
    routes = await Route.findAll();

    if(restriction){ //Filtro de restricciones
      restriction = restriction.split(',');

      routes = routes.filter(route => {
        let restricRoute = route.restriction.split(',');
        restricRoute = restriction.map(r => restricRoute.includes(r))

        if(restricRoute.includes(false)) return false;
        else return true
      })
    }

    return res.send(routes);

  } catch (e) {
    next(e);
  }
}




module.exports = {
  getRouteInfo,
  postRoute,
  getRoute,
}
