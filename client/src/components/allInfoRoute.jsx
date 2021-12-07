import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoute, getRouteById } from "../actions/index.js";
import ReactMapboxGl, {
  Marker,
  GeoJSONLayer,
  ZoomControl,
} from "react-mapbox-gl";
import { useHistory } from "react-router";
import {
  BsFillCalendarCheckFill,
  BsWatch,
  BsPinMap,
  BsPinMapFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { RiPinDistanceFill } from "react-icons/ri";
import "../Sass/Styles/allInfoRoute.scss";
import { BsStarFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { Modal } from "./ModalMP.jsx";

export default function AllInfoRoute({ match }) {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(getRouteById(match.params.id))
    
  }, []);

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const route = useSelector((state) => state.routeById);
  const data = useSelector((state) => state.route);

  

  
  const coordinates = {
    geometry: {
      coordinates: route.points,
      type: 'LineString'
    },
    type: 'Feature'
  }
 
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoiZmFic2FudGFuZHJlYSIsImEiOiJja3czbGFzNmw1MDVwMzJtb3F2ajBobzlqIn0.HtizxCUDY-hUg5ZxLPArDg",
  });

  function handleClick() {
    dispatch(deleteRoute());
    history.push("/route-list");
  }
  return (
    <div >

    <div className="Map">
      {route.length > 0 && route.originName}
      <div className="Container">

      <div className="infoContainer">
        <p>
          <BsPinMap /> {route.originName}
        </p>
        <p>
          <BsPinMapFill /> {route.destinyName}
        </p>
        <p>
          <BsFillCalendarCheckFill /> {route.date}
        </p>
        <p>
          <RiPinDistanceFill /> {route.km}.
        </p>
        <p>
          <BsWatch /> {route.time}
        </p>
        <p>
          <BsFillPersonFill /> {route.place} Seats available.
        </p>
      </div>
      {route.users && <Link to={`/user/${route.users[0].email}`} className="userContainer">
            <div className="userContainer">
                <img src={ route.users.length > 0 && route.users[0].photo}/>
                <h5>{route.users.length > 0 && route.users[0].name}</h5>

                  <div>
        <BsStarFill className="icon" />
        {route.users.length > 0 && route.users[0].calification}/5
           </div>

              </div>
              </Link> }
      </div>


      <Map
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: "50vh",
          width: "50vw",
        }}
        className="mapbox"
        center={route.destiny}
        fitBounds={route.origin && [route.origin, route.destiny]}
      >
        {data && (
          <Marker coordinates={route.origin} anchor='bottom' style={{ color: "red" }}>
            <img
              src="https://www.agroavisos.net/wp-content/uploads/2017/04/map-marker-icon.png"
              style={{ height: "30px" }}
              alt=""
            ></img>
          </Marker>
        )}

        {data && (
          <Marker coordinates={route.destiny} anchor='bottom'>
            <img
              src="https://www.agroavisos.net/wp-content/uploads/2017/04/map-marker-icon.png"
              style={{ height: "30px" }}
              alt=""
            ></img>
          </Marker>
        )}

        <GeoJSONLayer
          data={route.points && coordinates}
          linePaint={{
            "line-color": "#2CB67D",
            "line-width": 5,
          }}
          lineLayout={{
            "line-join": "miter",
            "line-cap": "round",
          }}
        />
        <ZoomControl />
      </Map>



      </div>
      <button className='buttonBlue' onClick={handleClick}>Go Back</button>

      
      <button onClick={openModal} className='button'> Join this trip!</button>
      {showModal ? <Modal setShowModal={setShowModal} route={route} user ={user} /> : null}
   
      {/* {datos.init_point && route.place !== 0 ? <a href={datos.init_point} >
      <button className='button'>
      Join this trip!
      </button>
      </a> :  
      <button className='buttonDisabled'>
      Join this trip!
      </button>} */}
    </div>
  );

}
