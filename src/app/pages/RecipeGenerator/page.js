"use client";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../utils/cn";
import "../../styles/Recipe.css";
import styled from "styled-components";
import Translate from "../../components/ui/Translate";
const RecipeCard = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [complexity, setComplexity] = useState("");

  const handleSubmit = () => {
    const recipeData = {
      ingredients,
      mealType,
      cuisine,
      cookingTime,
      complexity,
    };
    onSubmit(recipeData);
  };

  return (
    <>
      <div
        className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black"
        style={{ marginLeft: "60px", marginTop: "50px" }}
      >
        <div className="recipe-card-container ">
          <div className="recipe-card-inner">
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Recipe Generator
              </h2>
              <p
                className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300"
                style={{ marginBottom: "15px" }}
              >
                Discover Deliciousness: Your Continent, Your Ingredients, Your
                Recipe!
              </p>
              <div className="mb-4">
                <Label className="label" htmlFor="ingredients">
                  Ingredients
                </Label>
                <Input
                  id="ingredients"
                  placeholder="Enter ingredients"
                  type="text"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label className="label" htmlFor="mealType">
                  Meal Type
                </Label>
                <select
                  className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select"
                  id="mealType"
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <BottomGradient />
              </div>
              <div className="mb-4">
                <Label className="label" htmlFor="cuisine">
                  Cuisine Preference
                </Label>
                <Input
                  className="input"
                  id="cuisine"
                  type="text"
                  placeholder="e.g., Indian, Pakistani"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label className="label" htmlFor="cookingTime">
                  Cooking Time
                </Label>
                <select
                  className="select"
                  id="cookingTime"
                  value={cookingTime}
                  onChange={(e) => setCookingTime(e.target.value)}
                >
                  <option value="Less than 30 minutes">
                    Less than 30 minutes
                  </option>
                  <option value="30-60 minutes">30-60 minutes</option>
                  <option value="More than 1 hour">More than 1 hour</option>
                </select>
              </div>
              <div className="mb-4">
                <Label className="label" htmlFor="complexity">
                  Complexity
                </Label>
                <select
                  className="select"
                  id="complexity"
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="button"
                  onClick={handleSubmit}
                >
                  Generate Recipe
                  <BottomGradient />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

function App() {
  const [videoIds, setVideoIds] = useState("");
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState("");
  const [text, setText] = useState("");
  const [audioFile, setAudioFile] = useState();
  const [translatedText, setTranslatedText] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState("ur");
  const handleTranslateClick = () => {
    setTranslatedText(`Translation for ${selectedLanguage}: ${recipeText}`);
  };
  const handleInputChange = (event) => {
    setRecipeText(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  const convertTextToSpeech = () => {
    polly.synthesizeSpeech(
      {
        Text: text,
        OutputFormat: "mp3",
        VoiceId: "Salli",
      },
      (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          setAudioFile(data);
        }
      }
    );
  };

  let eventSourceRef = useRef(null);

  useEffect(() => {
    closeEventStream(); // Close any existing connection
  }, []);

  useEffect(() => {
    if (recipeData) {
      closeEventStream(); // Close any existing connection
      initializeEventStream(); // Open a new connection
    }
    // eslint-disable-next-line
  }, [recipeData]);

  // Function to initialize the event stream
  const initializeEventStream = () => {
    const recipeInputs = { ...recipeData };

    // Construct query parameters
    const queryParams = new URLSearchParams(recipeInputs).toString();

    const url = `/api/recipeGenerator?${queryParams}`;
    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onmessage = async (event) => {
      const data = await JSON.parse(event.data);

      if (data.action === "close") {
        closeEventStream();
      } else if (data.action === "chunk") {
        setRecipeText((prev) => prev + data.chunk);
      } else if (data.action === "complete") {
        const { videoIds, recipe } = await data;
        setVideoIds(videoIds);
        // Below is the code to save recipes whenever needed
        // const response = await fetch("/api/saveRecipe", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     recipe,
        //     videoIds,
        //   }),
        // });

        // const result = await response.json();
        // console.log("Result: "+result);
        

        // Set error message if no video IDs are found
        if (videoIds.length === 0) {
          setErrorMessage("Oops! Sorry, related videos have not been found.");
        } else {
          setErrorMessage(""); // Clear error message if videos are found
        }
      }
    };

    eventSourceRef.current.onerror = () => {
      eventSourceRef.current.close();
    };
  };

  // Function to close the event stream
  const closeEventStream = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  async function onSubmit(data) {
    // update state
    setRecipeText("");
    setRecipeData(data);
  }

  return (
    <>
      <div>
        <div className="App">
          <div className="flex flex-row h-full my-4 gap-2 justify-center">
            <RecipeCard onSubmit={onSubmit} />
            <div class="book-text-box w-[400px] h-[565px] text-xs text-gray-600 p-4  shadow-xl whitespace-pre-line overflow-y-auto">
              <div
                className="book-inner"
                style={{ marginRight: "200px", marginTop: "100px" }}
              >
                <div className="recipe-text">{recipeText}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <text type="recipeText" value={text} onChange={handleInputChange} />
          <select
            className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="ur">Urdu</option>
            <option value="ar">Arabic</option>
            <option value="hi">Hindi</option>
            <option value="zh">Mandarin Chinese</option>
          </select>
          <button className="translate-button" onClick={handleTranslateClick}>
            Translate
          </button>
          <Translate
            inputText={translatedText}
            targetLanguage={selectedLanguage}
          />
        </div>
      </div>
      <div>
        {videoIds && videoIds.length > 0 ? (
          videoIds.map((id) => <p>{id}</p>)
        ) : (
          <p>No video IDs available</p>
        )}
      </div>
      <footer></footer>
    </>
  );
}

export default App;
