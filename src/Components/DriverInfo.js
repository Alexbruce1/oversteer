import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./DriverInfo.css";
import { getDriverInfo, getCountryFlag } from "../api";

function DriverInfo({ driverStandings }) {
  const { name } = useParams();
  const [driverFirstName, setDriverFirstName] = useState(name.split("_")[0]);
  const [driverLastName, setDriverLastName] = useState(name.split("_")[1]);
  const [driverTeam, setDriverTeam] = useState();
  const [driverDOB, setDriverDOB] = useState();
  const [driverNumber, setDriverNumber] = useState();
  const [driverNationality, setDriverNationality] = useState();
  const [driverFlag, setDriverFlag] = useState();
  const [driverDescription, setDriverDescription] = useState();
  const [driverRender, setDriverRender] = useState();
  const [driverCutout, setDriverCutout] = useState();
  const [driverPoints, setDriverPoints] = useState();
  const [driverPosition, setDriverPosition] = useState();
  const [driverCode, setDriverCode] = useState();
  const [driverAge, setDriverAge] = useState();

  useEffect(() => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    
    getDriverInfo(name.replace("_", "%20")).then(info => {
      const today = new Date();
      const DOB = new Date(info.dateBorn);
      let age = today.getFullYear() - DOB.getFullYear();
      const monthDiff = today.getMonth() - DOB.getMonth();
      const dayDiff = today.getDate() - DOB.getDate();
    
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
    
      setDriverAge(age);
      setDriverDOB(DOB.toLocaleDateString(undefined, options));
      setDriverNumber(info.strNumber);
      setDriverNationality(info.strNationality);
      setDriverDescription(info.strDescriptionEN);
      setDriverRender(info.strRender);
      setDriverCutout(info.strCutout);
    });

    if (!driverCutout) {
      const image = localStorage.getItem(`${driverFirstName}_${driverLastName}_images`);
      setDriverCutout(image);
    }
  }, [name]);
  
  useEffect(() => {
    let splitName = name.split("_")
    const propData = driverStandings.find(driver => driver.Driver.familyName === splitName[1]);
    // console.log(propData)
    
    if (propData) {
      setDriverTeam(propData.Constructors[0].name);
      setDriverPoints(propData.points);
      setDriverPosition(propData.position);
      setDriverCode(propData.Driver.code);
    }
  }, [driverStandings])

  useEffect(() => {
    if (driverNationality) {
      getCountryFlag(driverNationality).then(url => {
        setDriverFlag(url);
      });
    }
  }, [driverNationality]);

  return (
    <div className="driver-info">
      <div className="driver-info-header">
        <div className="driver-info-picture-container">
          <img className="driver-info-cutout" src={driverCutout} />
          <h2 className="driver-info-number">{driverNumber}</h2>
        </div>
        <div className="driver-info-header-details">
          <div className="driver-info-header-top-line">
            <img className="driver-info-flag" src={driverFlag}/>
            <h1 className="driver-info-name">{driverFirstName}<strong>{driverLastName}</strong></h1>
            <h2 className="driver-info-team">{driverTeam}</h2>
          </div>
          <div className="driver-info-header-second-line">
            <p className="driver-info-code"><strong>{driverCode}</strong></p>
            <p className="driver-info-dob">Age: <strong>{driverAge}</strong></p>
            <p className="driver-info-position">POS: <strong>{driverPosition}</strong></p>
            <p className="driver-info-points">
              <strong>{driverPoints} </strong>
              {driverPoints === 1 ? "PT" : !driverPoints ? " " : "PTS"}
            </p>
          </div>
          <div className="driver-info-header-last-line">
            <p className="driver-info-description">{driverDescription}</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default DriverInfo;