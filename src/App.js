import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const data = [
    {
      question: "Who is known as the 'Father of the Nation' in India?",
      textColor: '#fff',
      options: {
        A: "Jawaharlal Nehru",
        B: "Sardar Vallabhbhai Patel",
        C: "Mahatma Gandhi",
        D: "B. R. Ambedkar",
      },
      correctAnswer: "C",
    },
    {
      question: "Which planet is known as the Red Planet?",
      textColor: '#fff',
      options: {
        A: "Earth",
        B: "Mars",
        C: "Jupiter",
        D: "Saturn",
      },
      correctAnswer: "B",
    },
    {
      question: "What is the capital city of Australia?",
      textColor: '#fff',
      options: {
        A: "Sydney",
        B: "Melbourne",
        C: "Canberra",
        D: "Perth",
      },
      correctAnswer: "C",
    },
    {
      question: "Which element is said to keep bones strong?",
      textColor: '#fff',
      options: {
        A: "Iron",
        B: "Calcium",
        C: "Potassium",
        D: "Sodium",
      },
      correctAnswer: "B",
    },
    {
      question: "In which year did the Titanic sink?",
      textColor: '#fff',
      options: {
        A: "1905",
        B: "1912",
        C: "1918",
        D: "1925",
      },
      correctAnswer: "B",
    },
    {
      question: "What is the hardest natural substance on Earth?",
      textColor: '#fff',
      options: {
        A: "Gold",
        B: "Iron",
        C: "Diamond",
        D: "Platinum",
      },
      correctAnswer: "C",
    },
    {
      question: "Who wrote the famous book '1984'?",
      textColor: '#fff',
      options: {
        A: "George Orwell",
        B: "Aldous Huxley",
        C: "Ray Bradbury",
        D: "J.K. Rowling",
      },
      correctAnswer: "A",
    },
    {
      question: "Which gas is most abundant in the Earth's atmosphere?",
      textColor: '#fff',
      options: {
        A: "Oxygen",
        B: "Carbon Dioxide",
        C: "Nitrogen",
        D: "Hydrogen",
      },
      correctAnswer: "C",
    },
    {
      question: "What is the currency of Japan?",
      textColor: '#fff',
      options: {
        A: "Yuan",
        B: "Yen",
        C: "Won",
        D: "Rupee",
      },
      correctAnswer: "B",
    },
    {
      question: "Who painted the Mona Lisa?",
      textColor: '#fff',
      options: {
        A: "Vincent van Gogh",
        B: "Pablo Picasso",
        C: "Leonardo da Vinci",
        D: "Michelangelo",
      },
      correctAnswer: "C",
    },
  ];

  const moneyPyramid = [
    { index: 1, amount: "$100" },
    { index: 2, amount: "$200" },
    { index: 3, amount: "$300" },
    { index: 4, amount: "$500" },
    { index: 5, amount: "$1,000" },
    { index: 6, amount: "$2,000" },
    { index: 7, amount: "$4,000" },
    { index: 8, amount: "$8,000" },
    { index: 9, amount: "$16,000" },
    { index: 10, amount: "$32,000" },
    { index: 11, amount: "$64,000" },
    { index: 12, amount: "$125,000" },
    { index: 13, amount: "$250,000" },
    { index: 14, amount: "$500,000" },
    { index: 15, amount: "$1,000,000" },
  ].reverse();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [moneyPyramidIndex, setMoneyPyramidIndex] = useState(14);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [winningText, setWinningText] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const selectedQuestion = data[currentQuestionIndex];
  const handleAnswer = (optionKey) => {
    if (isAnswered) return;
    setSelectedAnswer(optionKey);
    setIsAnswered(true);
    const correctAnswer = selectedQuestion.correctAnswer === optionKey;
    if (correctAnswer) {
      setMoneyPyramidIndex((prevIndex) => prevIndex - 1);
      setWinningText('');
    } else {
      if (moneyPyramidIndex > 8) {
        setMoneyPyramidIndex(14);
        setWinningText(`You have earned ${moneyPyramid[14].amount}`);
      } else {
        setMoneyPyramidIndex(8);
        setWinningText(`You have earned ${moneyPyramid[8].amount}`);
      }
    }
  };
  const nextbtn = (correctAnswer) => {
    if (isAnswered) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setWinningText('');
    }
    if(correctAnswer !== selectedAnswer){
      console.log("next")
      setCurrentQuestionIndex(0);
      setMoneyPyramidIndex(14);
    }
  };
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setWinningText('');
  }, [currentQuestionIndex]);
  return (
    <div className="App">
      <div className="container">
        <div className="quizapp">
          <div className="row">
            <div className="list-item">
              {selectedQuestion ? (
                <>
                  <h2 style={{ color: selectedQuestion.textColor, border: '1px solid #fff' }}>
                    {selectedQuestion.question}
                  </h2>
                  <h3 style={{ color: selectedQuestion.textColor, marginBottom: '20px' }}>{winningText}</h3>
                  <ul>
                    {Object.entries(selectedQuestion.options).map(([key, value], index) => {
                      const optionBackground = selectedAnswer === key
                        ? (selectedQuestion.correctAnswer === key ? 'green' : 'red')
                        : 'linear-gradient(#0e0124,#22074d)';
                      return (
                        <li
                          key={index}
                          onClick={() => handleAnswer(key)}
                          style={{
                            cursor: 'pointer',
                            color: selectedQuestion.textColor,
                            border: '1px solid #fff',
                            marginBottom: '20px',
                            background: optionBackground,
                          }}
                        >
                          {`${key}: ${value}`}
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <h2>Quiz Completed</h2>
              )}
              <button className="next_btn" onClick={()=>nextbtn(selectedQuestion.correctAnswer)} disabled={!isAnswered}>Next</button>
            </div>
          </div>
          <div className="moneylist_item">
            {moneyPyramid.map((item, index) => (
              <div
                key={item.index}
                style={{
                  backgroundColor: index === moneyPyramidIndex ? 'green' : 'transparent',
                  marginBottom: '20px',
                  color: '#fff',
                  padding: '15px',
                  borderRadius: '15px',
                }}
              >
                {item.amount}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
