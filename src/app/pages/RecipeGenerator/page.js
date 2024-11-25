"use client"; 
import React, { useEffect, useRef, useState } from "react";
import RecipeCard from "@/app/components/RecipeCard"; // Import RecipeCard
import styles from "@/app/styles/Recipe.css";

function App() {
  const [videoIds, setVideoIds] = useState([]);
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState("");
  const [text, setText] = useState("");
  const [audioFile, setAudioFile] = useState();
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

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
          setAudioFile(data);
        }
      }
    );
  };

  const eventSourceRef = useRef(null);

  useEffect(() => {
    closeEventStream(); // Close any existing connection
  }, []);

  useEffect(() => {
    if (recipeData) {
      closeEventStream(); // Close any existing connection
      initializeEventStream(); // Open a new connection
    }
  }, [recipeData]);

  const initializeEventStream = () => {
    const recipeInputs = { ...recipeData };
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

  const closeEventStream = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  async function onSubmit(data) {
    setRecipeText("");
    setRecipeData(data);
    setVideoIds([]); // Reset video IDs and error message
    setErrorMessage(""); // Clear previous error message
  }

  return (
    <>
      <div className="App">
        <div className="flex flex-row h-full my-4 gap-2 justify-center">
          <RecipeCard onSubmit={onSubmit} />
          <div className="book-text-box relative w-1/2 text-gray-600">
            <div className="book-inner relative px-8 py-10">
              <div className="recipe-text font-[Great Vibes] text-lg leading-relaxed whitespace-pre-wrap">
                {recipeText}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube videos displayed below the recipe text */}
      <div className="flex flex-col items-center mt-8 space-y-6">
        <h2 className="text-2xl font-bold text-white">Watch These Videos</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Show error message */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {videoIds.length > 0 ? (
            videoIds.slice(0, 4).map((id) => (
              <div
                key={id}
                className="video-card w-[340px] margin-30 bg-gray-800 bg-gradient-to-r from-purple-500 to-grey-500 mb-40 text-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
              >
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${id}`}
                  frameBorder="0"
                  allowFullScreen
                  title={`YouTube Video ${id}`}
                  className="rounded-t-lg"
                ></iframe>
                <div className="p-1 text-center ">
                  <h3 className="text-lg font-semibold">Watch Now!</h3>
                </div>
              </div>
            ))
          ) : (
            !errorMessage && <p className="text-gray-300">Loading videos...</p> // Show loading message
          )}
        </div>
      </div>
    </>
  );
}

export default App;