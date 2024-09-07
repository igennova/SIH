// import React, { useState, useEffect } from 'react';

// const MathGame = () => {
//   const [num1, setNum1] = useState(0);
//   const [num2, setNum2] = useState(0);
//   const [userAnswer, setUserAnswer] = useState('');
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   const [totalQuestions, setTotalQuestions] = useState(0);
//   const [gameOver, setGameOver] = useState(false);

//   useEffect(() => {
//     generateQuestion();
//   }, []);

//   const generateQuestion = () => {
//     const newNum1 = Math.floor(Math.random() * 10);
//     const newNum2 = Math.floor(Math.random() * 10);
//     setNum1(newNum1);
//     setNum2(newNum2);
//     setUserAnswer('');
//   };

//   const checkAnswer = () => {
//     const answer = Number(userAnswer);
//     if (answer === num1 + num2) {
//       setCorrectAnswers(correctAnswers + 1);
//     }
//     setTotalQuestions(totalQuestions + 1);
//     if (totalQuestions + 1 === 10) {
//       setGameOver(true);
//     } else {
//       generateQuestion();
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUserAnswer(e.target.value);
//   };

//   const startNewGame = () => {
//     setCorrectAnswers(0);
//     setTotalQuestions(0);
//     setGameOver(false);
//     generateQuestion();
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       {!gameOver ? (
//         <>
//           <h1 className="text-4xl font-bold mb-8 text-blue-600">Math Game</h1>
//           <p className="text-xl mb-6">
//             What is <span className="font-semibold">{num1}</span> + <span className="font-semibold">{num2}</span>?
//           </p>
//           <div className="flex flex-col items-center">
//             <input
//               type="number"
//               value={userAnswer}
//               onChange={handleInputChange}
//               onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
//               className="w-24 p-2 border-2 border-blue-300 rounded mb-4 text-center text-xl"
//               aria-label="Enter your answer"
//             />
//             <button
//               onClick={checkAnswer}
//               className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
//               aria-label="Submit answer"
//             >
//               Submit
//             </button>
//           </div>
//           <p className="mt-6 text-lg">
//             Correct Answers: <span className="font-semibold">{correctAnswers}</span> / {totalQuestions}
//           </p>
//         </>
//       ) : (
//         <>
//           <h1 className="text-4xl font-bold mb-8 text-red-600">Game Over!</h1>
//           <p className="text-xl mb-6">
//             You got <span className="font-semibold">{correctAnswers}</span> out of {totalQuestions} correct!
//           </p>
//           <button
//             onClick={startNewGame}
//             className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300"
//             aria-label="Start new game"
//           >
//             Start New Game
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default MathGame;
