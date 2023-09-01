import { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


function HowToPage() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  let history= useHistory();

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

  const firstExercise = filteredExercises.length > 0 ? filteredExercises[0] : null;
  const otherExercises = filteredExercises.slice(1);

  return (
    <div>
      <Form onSubmit={handleSearch}>
      <Form.Group>
  <Form.Label className="font-weight-bold" style={{fontSize: "30px", color: "white"}} >Search Exercise Name:</Form.Label>
  <Form.Control type="text" placeholder="Enter search term" name="search" />
</Form.Group>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      <Button onClick={() =>history.goBack()} className="mt-3 btn-dark"  >Back to Workout</Button>
      {firstExercise && (
        <div>
          <h2 className='GifName' style={{color: `white`, fontSize: `30px`}}> {firstExercise.bodyPart}</h2>
          <Card className='HowToCard'>
            <Card.Img variant="top" src={firstExercise.gifUrl} alt={firstExercise.name} />
            <Card.Body>
              <Card.Title> Name:{firstExercise.name}</Card.Title>
              <Card.Text>
                <p>Equipment: {firstExercise.equipment}</p>
                <p>Target: {firstExercise.target}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
      {otherExercises.length > 0 && (
        <div>
          <h2 className='GifName' style={{fontSize: `30px`, color: 'white'}} >Alternative Exercises:</h2>
          <div className="card-deck">
            {otherExercises.slice(0, 3).map((exercise, index) => (
              <Card key={index}>
                <Card.Img variant="top" src={exercise.gifUrl} alt={exercise.name} />
                <Card.Body>
                  <Card.Title>Name:
                     {exercise.name}</Card.Title>
                  <Card.Text>
                    <p>Equipment: {exercise.equipment}</p>
                    <p>Target: {exercise.target}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
      {otherExercises.length < 3 && (
        <div>
          <h2 className='GifName'>More Alternatives:</h2>
          <div className="card-deck">{otherExercises.slice(3).map((exercise, index) => (
<Card   key={index}>
<Card.Img variant="top" src={exercise.gifUrl} alt={exercise.name} />
<Card.Body>
<Card.Title> Exercise Name: {exercise.name}</Card.Title>
<Card.Text>
<p>Equipment: {exercise.equipment}</p>
<p>Target: {exercise.target}</p>
</Card.Text>
</Card.Body>
</Card>
))}
</div>
</div>
)}
</div>
);
}



export default HowToPage;
