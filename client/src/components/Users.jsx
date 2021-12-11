import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById, getUserByName } from "../actions";
import CardUser from "./CardUser";
import "../Sass/Styles/Users.scss";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";


export default function Users() {
  const { users } = useSelector((state) => state);
  const { userBuscado } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="userContainer">
      {users.length === 0 && userBuscado.email ? (
        <div className="usercard">
          <CardUser
            name={userBuscado.name}
            lastName={userBuscado.lastName}
            email={userBuscado.email}
            genre={userBuscado.genre}
            age={userBuscado.age}
            photo={userBuscado.photo}
            calification={userBuscado.calification}
            // calification={
            //   userBuscado.email && userBuscado.calification.length > 0
            //     ? userBuscado.calification
            //         .map((c) => parseInt(c.calification))
            //         .reduce((a, b) => a + b, 0) / userBuscado.posts.length
            //     : 0
            // }
          />
        </div>
      ) : users.length > 0 ? (
        users.map((user) => {
          return (
            <div className="usercard">
              <CardUser
                name={user.name}
                lastName={user.lastName}
                email={user.email}
                genre={user.genre}
                age={user.age}
                photo={user.photo}
                calification={user.calification}
              />
            </div>
          );
        })
      ) : (
        <>
          <p><FormattedMessage
                        id="user.result"
                        defaultMessage="No user matches those descriptions"
                      /></p>
          <button
            className="button"
            onClick={() => dispatch(getUserByName(""))}
          >
            <FormattedMessage
                        id="user.button"
                        defaultMessage="Load All Users"
                      />
          </button>
        </>
      )}
    <div>
      {/* { users.map(user => {
        return(
          <NavLink to={"/profile/"+ user.email}>
          <CardUser  
          name = { user.name }
          lastName = { user.lastName }
          genre = { user.genre } 
          age = { user.age } 
          photo = { user.photo }
          calification = { user.calification }
          />
          </NavLink>
        )
      }) } */}
    
    </div>
    </div>
  );
}
