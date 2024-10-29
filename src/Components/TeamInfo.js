import React from "react";
import { useParams } from "react-router-dom";
import "./TeamInfo.css";

function TeamInfo() {
  const { name } = useParams();
  
  return (
    <div>
      {decodeURIComponent(name)}
      
    </div>
  )
}

export default TeamInfo;