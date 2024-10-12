import React, { useState } from "react";
import "./App.css";
import { Nav } from "./Components/Nav";
import axios, { Axios } from "axios";
export const App = () => {
  const [arrdata, setData] = useState({});
  const [ing, seting] = useState([]);
  const [measure, setmeasure] = useState([]);
  const [steps, setsteps] = useState([]);
  const [search, setSearch] = useState("");
  function generateRandom() {
    let isNotveg = true;
    var data;
    let error = false;
    axios
      .get(
        search.length < 1
          ? "https://www.themealdb.com/api/json/v1/1/random.php"
          : `https://themealdb.com/api/json/v1/1/search.php?s=${search}`
      )
      .then((e) => {
        if (e.data.meals[0].strCategory == "Beef") {
          generateRandom();
        } else {
          const meal = e.data.meals[0];
          setData(e.data.meals[0]);
          console.log(e.data.meals[0]);

          let count = 1;
          var ingr = [];
          var meas = [];
          for (const prop in meal) {
            if (meal[`strIngredient${count}`]) {
              ingr.push(meal[`strIngredient${count}`]);
              meas.push(meal[`strMeasure${count}`]);
            }
            count++;
          }
          var instruction = meal["strInstructions"];
          var arrinst = instruction.split(".");
          console.log(arrinst);
          seting(ingr);
          setmeasure(meas);
          setsteps(arrinst);
        }
      })
      .catch((e) => {
        alert("no record found");
      });
  }

  return (
    <div id="App">
      <Nav></Nav>
      <div id="sub-nav"></div>
      <div id="input">
        <h1 style={{ color: "white" }}>Search Your Favourite Foods....</h1>
        <div id="comp">
          <input
            placeholder="eg. Burger , Noodles"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></input>
          <button onClick={generateRandom}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </button>
        </div>
        <div id="random" onClick={generateRandom}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M300-240q25 0 42.5-17.5T360-300q0-25-17.5-42.5T300-360q-25 0-42.5 17.5T240-300q0 25 17.5 42.5T300-240Zm0-360q25 0 42.5-17.5T360-660q0-25-17.5-42.5T300-720q-25 0-42.5 17.5T240-660q0 25 17.5 42.5T300-600Zm180 180q25 0 42.5-17.5T540-480q0-25-17.5-42.5T480-540q-25 0-42.5 17.5T420-480q0 25 17.5 42.5T480-420Zm180 180q25 0 42.5-17.5T720-300q0-25-17.5-42.5T660-360q-25 0-42.5 17.5T600-300q0 25 17.5 42.5T660-240Zm0-360q25 0 42.5-17.5T720-660q0-25-17.5-42.5T660-720q-25 0-42.5 17.5T600-660q0 25 17.5 42.5T660-600ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
          </svg>
          <h3>Genrate Random</h3>
        </div>
      </div>

      {arrdata.idMeal > 0 ? (
        <div id="result">
          <div id="intro">
            <img id="result-img" src={arrdata.strMealThumb}></img>
            <div id="desc">
              <h1>{arrdata.strMeal}</h1>
              <h3>Country : {arrdata.strArea}</h3>
              <h3>Catergory : {arrdata.strCategory}</h3>
            </div>
          </div>
          <div id="ingrediant">
            <h1 style={{ textAlign: "center", color: "white" }}>
              {" "}
              ingrediants Required
            </h1>
            <div id="ing">
              {ing.map((e, i) => {
                return (
                  <div id="ing-card">
                    <div id="bold">{ing[i]}</div>
                    <div>{measure[i]}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <hr></hr>

          <div id="instruction">
            <h1
              style={{ color: "white", textAlign: "center", marginTop: "50px" }}
            >
              Instructions<p></p>
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {/* <img src="https://i.pinimg.com/originals/8e/76/37/8e763721d599a7e7a3fe115f6b5a1822.gif"></img> */}
              <div id="yt-card">
                {" "}
                <img
                  onClick={() => {
                    window.location.href = arrdata.strYoutube;
                  }}
                  id="logo-img"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/800px-YouTube_Logo_2017.svg.png"
                ></img>
                <h1>watch on Youtube</h1>
              </div>
            </div>
            {/* <p>{arrdata.strInstructions}</p> */}
            {steps.map((e, index) => {
              if (e) {
                return (
                  <div id="inst">
                    <h2>step {index + 1} </h2> {e}
                  </div>
                );
              }
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
