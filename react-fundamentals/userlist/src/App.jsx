import { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState({});

  const fetchData = () => {
    fetch('https://opentdb.com/api.php?amount=1')
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Response status not ok');
      }

      return response.json();
    })
    .then(resData => setQuestion(resData.results[0]))
    .catch(err => console.error(err))
  };


  return (
    <>
		<p>{question.question}</p>
    	<button onClick={fetchData}>New question</button>

    </>
  );
}

export default App;