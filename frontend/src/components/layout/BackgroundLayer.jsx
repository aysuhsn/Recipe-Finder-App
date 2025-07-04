import React from "react";
import "./BackgroundLayer.css";

const BackgroundLayer = () => {
  return (
    <div className="moving-background">
        <img src="/tomato.png" className="ingredient tomato" alt="tomato" />
        <img src="/chili.png" className="ingredient chili" alt="chili" />
        <img src="/leaf.png" className="ingredient leaf" alt="leaf" />
        <img src="/avacado.png" className="ingredient avacado" alt="avacado" />
        <img src="/salt.png" className="ingredient salt" alt="salt" />
        <img src="/cheese.png" className="ingredient cheese" alt="cheese" />
    </div>
  );
};

export default BackgroundLayer;
