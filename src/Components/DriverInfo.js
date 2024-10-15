import React from "react";
import { useParams } from 'react-router-dom';

function DriverInfo() {
  const { name } = useParams();
  return (
    <div>
      {decodeURIComponent(name)}
      
    </div>
  )
}

export default DriverInfo;