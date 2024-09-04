import './App.css'
import { useState } from 'react';

const questions = {
  'Legislature': [
    { question: 'What is the primary function of the Legislature?', options: ['Make Laws', 'Enforce Laws', 'Interpret Laws', 'Review Laws'], correct: 'Make Laws' },
    { question: 'Which body is responsible for creating laws?', options: ['Judiciary', 'Executive', 'Legislature', 'President'], correct: 'Legislature' },
    { question: 'How many houses are in the U.S. Congress?', options: ['One', 'Two', 'Three', 'Four'], correct: 'Two' },
    { question: 'Who can propose a bill?', options: ['Any citizen', 'President', 'Judiciary', 'Legislature'], correct: 'Legislature' },
    { question: 'What is a bicameral legislature?', options: ['One house', 'Two houses', 'Three houses', 'Four houses'], correct: 'Two houses' }
  ],
  'Executive': [
    { question: 'Who heads the Executive branch of government?', options: ['President', 'Supreme Court', 'Parliament', 'Prime Minister'], correct: 'President' },
    { question: 'What is the role of the Executive branch?', options: ['Make Laws', 'Interpret Laws', 'Enforce Laws', 'Review Laws'], correct: 'Enforce Laws' },
    { question: 'Which official is known as the Commander-in-Chief?', options: ['President', 'Congress', 'Supreme Court', 'Vice President'], correct: 'President' },
    { question: 'Who appoints judges to the Supreme Court?', options: ['President', 'Congress', 'Supreme Court', 'Vice President'], correct: 'President' },
    { question: 'Which document outlines the powers of the Executive branch?', options: ['The Bill of Rights', 'The Constitution', 'The Declaration of Independence', 'The Federalist Papers'], correct: 'The Constitution' }
  ],
  'Judiciary': [
    { question: 'Which entity interprets the laws?', options: ['Legislature', 'Executive', 'Judiciary', 'President'], correct: 'Judiciary' },
    { question: 'Who can declare laws unconstitutional?', options: ['President', 'Legislature', 'Supreme Court', 'Congress'], correct: 'Supreme Court' },
    { question: 'What is the highest court in the United States?', options: ['Supreme Court', 'Court of Appeals', 'District Court', 'Family Court'], correct: 'Supreme Court' },
    { question: 'Who appoints federal judges?', options: ['President', 'Congress', 'Supreme Court', 'Vice President'], correct: 'President' },
    { question: 'What does the term “Judicial Review” mean?', options: ['Reviewing executive orders', 'Reviewing legislation', 'Reviewing the constitutionality of laws', 'Reviewing judicial appointments'], correct: 'Reviewing the constitutionality of laws' }
  ],
  'Fundamental Rights': [
    { question: 'Which right is protected under Fundamental Rights?', options: ['Right to Vote', 'Right to Education', 'Right to Work', 'Right to Property'], correct: 'Right to Education' },
    { question: 'Which amendment guarantees freedom of speech?', options: ['First Amendment', 'Second Amendment', 'Third Amendment', 'Fourth Amendment'], correct: 'First Amendment' },
    { question: 'What does the Fourth Amendment protect?', options: ['Freedom of speech', 'Right to a fair trial', 'Protection against unreasonable searches and seizures', 'Right to bear arms'], correct: 'Protection against unreasonable searches and seizures' },
    { question: 'Which amendment abolished slavery?', options: ['Fifth Amendment', 'Sixth Amendment', 'Thirteenth Amendment', 'Fourteenth Amendment'], correct: 'Thirteenth Amendment' },
    { question: 'Which amendment guarantees the right to a speedy trial?', options: ['First Amendment', 'Fifth Amendment', 'Sixth Amendment', 'Eighth Amendment'], correct: 'Sixth Amendment' }
  ],
  'Miscellaneous': [
    { question: 'Which of the following is not a branch of government?', options: ['Legislature', 'Executive', 'Judiciary', 'Monarchy'], correct: 'Monarchy' },
    { question: 'What is the supreme law of the land?', options: ['The Bill of Rights', 'The Constitution', 'The Declaration of Independence', 'The Federalist Papers'], correct: 'The Constitution' },
    { question: 'How many amendments does the U.S. Constitution have?', options: ['10', '15', '27', '50'], correct: '27' },
    { question: 'What is the purpose of the Bill of Rights?', options: ['To outline the powers of government', 'To limit the power of government', 'To provide a structure for the government', 'To create a new government'], correct: 'To limit the power of government' },
    { question: 'Which document declared the independence of the United States from Britain?', options: ['The Bill of Rights', 'The Constitution', 'The Declaration of Independence', 'The Federalist Papers'], correct: 'The Declaration of Independence' }
  ]
};

// Function to get a random question from a category
const getRandomQuestion = (category) => {
  const categoryQuestions = questions[category];
  if (categoryQuestions && categoryQuestions.length > 0) {
    const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
    return categoryQuestions[randomIndex];
  }
  return null;
};

const categories = Object.keys(questions);

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [points, setPoints] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * categories.length);
    const selectedCategory = categories[randomIndex];

    const degreesPerSection = 360 / categories.length;
    const randomDegree = 360 * 3 + (randomIndex * degreesPerSection) + (degreesPerSection / 2);
    setRotationDegree(rotationDegree + randomDegree);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedCategory(selectedCategory);
      const question = getRandomQuestion(selectedCategory);
      setCurrentQuestion(question);
      setShowQuestion(true);
    }, 4000); // Spins for 4 seconds
  };

  const handleOptionClick = (option) => {
    if (currentQuestion) {
      if (option === currentQuestion.correct) {
        setPoints(points + 10);
        setFeedback(`Yay, you earned 10 points!`);
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
          setShowQuestion(false);
          setSelectedCategory(null);
          setCurrentQuestion(null);
          setFeedback('');
        }, 4000); // Show celebration for 4 seconds
      } else {
        setFeedback(`Incorrect. The correct answer is "${currentQuestion.correct}".`);
        setTimeout(() => {
          setFeedback('');
        }, 3000); // Clear feedback after 3 seconds
      }
    }
  };

  return (
    <div className="App">
      <h1>Spin the Wheel: Constitutional Challenge</h1>
      <div className="wheel-container">
        <div 
          className={`wheel ${isSpinning ? 'spinning' : ''}`} 
          style={{ transform: `rotate(${rotationDegree}deg)` }}
        >
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="wheel-section" 
              style={{ 
                backgroundColor: `hsl(${(index * 360) / categories.length}, 70%, 50%)`, 
                transform: `rotate(${index * (360 / categories.length)}deg)` 
              }}
            >
              <span className="category-label">{category}</span>
            </div>
          ))}
        </div>
        <div className="pointer"></div>
      </div>
      <button onClick={spinWheel} className="spin-button" disabled={isSpinning}>Spin the Wheel</button>
      {showQuestion && currentQuestion && (
        <div className="result">
          <h2>{currentQuestion.question}</h2>
          <div>
            {currentQuestion.options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleOptionClick(option)} 
                className="option-button"
              >
                {option}
              </button>
            ))}
          </div>
          {feedback && (
            <div className="feedback">
              <p>{feedback}</p>
            </div>
          )}
        </div>
      )}
      {showCelebration && (
        <div className="celebration">
          <p>🎉 Congratulations! 🎉</p>
        </div>
      )}
      <div className="points">
        <p>Points: {points}</p>
      </div>
    </div>
  );
}

export default App;
