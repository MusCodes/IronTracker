import React, { useEffect, useState } from "react";

function HowToPage() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(
      "https://zylalabs.com/api/392/exercise+database+api/313/list+of+all+exercise",
      {
        headers: {
          Authorization: "Bearer 877|TMnBSYUvcTZe8UJAw3pxqeItNJMvWWOwbiCSmfWO",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("THIS IS DATA", data);
        setExercises(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.search.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Search for an exercise:</label>
        <input type="text" id="search" name="search" />
        <button type="submit">Search</button>
      </form>
      <h2>List of Exercises:</h2>
      {filteredExercises.length > 0 ? (
        filteredExercises.slice(0,2).map((exercise, index) => (
          <div className="exercise-box" key={index}>
            <img src={exercise.gifUrl} alt={exercise.name} />
            <p>bodyPart: {exercise.bodyPart}</p>
            <p>Equipment: {exercise.equipment}</p>
            <p>Name: {exercise.name}</p>
            <p>Target: {exercise.target}</p>
          </div>
        ))
      ) : (
        <div>No exercises found.</div>
      )}
    </div>
  );
}

export default HowToPage;
