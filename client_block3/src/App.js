import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Quiz from './components/Quiz/Quiz';
import EditQuiz from './components/EditQuiz/EditQuiz';


const App = () => {
  return (
    <><Router>
      <Routes>
        <Route exact path="/quiz" element={<Quiz />} />
        <Route exact path="/" element={<EditQuiz />} />
      </Routes>
    </Router></>
  )
};

export default App;
