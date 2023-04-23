import React, { useEffect,useState } from "react";

const API_URL = "https://randomfox.ca/floof/";
//when the component renders we make some fetch to the api and set some image
function FoxImage() {
  const [image, setImage] = useState(null);
 useEffect(()=>{
    fetch(API_URL)
    .then(res=>res.json())
    .then((data)=>setImage(data.image))
 },[])
 if(!image){
    return <h2>Loading ...</h2>
 }
  return (
    <div>
      <p>Here's a lovely fox for you:</p>
      <img src={image} alt="Random Fox" />
    </div>
  );
}

export default FoxImage;
