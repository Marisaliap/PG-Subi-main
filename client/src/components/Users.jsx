import React from "react";

export default function Users({name, lastName, genre, age, image, calification}) {
  return (
    <div>
      <img src={image} alt={name} />
        <h2>{name}</h2>
        <h2>{lastName}</h2>
        <h2>{genre}</h2>
        <h2>{age}</h2>
        <h2>{calification}</h2>
    </div>
  );
}
