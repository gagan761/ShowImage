import React, { useState } from "react";

import axios from "axios";

function App() {
  const [checkedBoxes, setCheckedBoxes] = useState({ cat: false, dog: false });

  const [catFact, setCatFact] = useState("");

  const [dogImage, setDogImage] = useState("");

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setCheckedBoxes({ ...checkedBoxes, [name]: checked });

    if (!checked) {
      setDogImage("");
      setCatFact("");
    } else {
      if (name === "cat") getCatFact();
      if (name === "dog") getDogImage();
    }
  };

  const getCatFact = async () => {
    const response = await axios.get("https://catfact.ninja/fact");

    setCatFact(response.data.fact);
  };

  const getDogImage = async () => {
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");
    const res = await fetch(response.data.message);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);

    setDogImage(imageObjectURL);
  };

  return (
    <div className="App">
      <label>
        <h2>PICTURE MAY TAKE SOME TIME TO LOAD</h2>
        <input
          type="checkbox"
          name="cat"
          checked={checkedBoxes.cat}
          onChange={handleCheckboxChange}
        />
        Cat
      </label>

      <label>
        <input
          type="checkbox"
          name="dog"
          checked={checkedBoxes.dog}
          onChange={handleCheckboxChange}
        />
        Dog
      </label>

      {checkedBoxes.cat && <p>{catFact}</p>}

      {checkedBoxes.dog && <img src={dogImage} alt="A random dog" />}
    </div>
  );
}

export default App;
