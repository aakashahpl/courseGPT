import React, { useState } from 'react';
import { BookOpenCheck, Check, CircleX } from 'lucide-react';

interface Option {
  question: string;
  options: string[];
  correct: string;
}

interface QuizItem {
  question: string;
  options: string[];
  correct: string;
}

interface Props {
  data: QuizItem[];
}

const Quiz: React.FC<Props> = ({ data }) => {
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>(Array(data.length).fill(null));
  const [answered, setAnswered] = useState<boolean[]>(Array(data.length).fill(false));
  const [showCorrects, setShowCorrects] = useState<boolean[]>(Array(data.length).fill(false));

  const handleOptionChange = (option: string, correctSol: string, quizIndex: number) => {
    if (!answered[quizIndex]) {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions[quizIndex] = option;
      setSelectedOptions(newSelectedOptions);
      const newAnswered = [...answered];
      newAnswered[quizIndex] = true;
      setAnswered(newAnswered);
      if (option !== correctSol) {
        const newShowCorrects = [...showCorrects];
        newShowCorrects[quizIndex] = true;
        setShowCorrects(newShowCorrects);
      }
    }
  };

  return (
    <div className='text-neutral-200 py-6'>
      {data.map((quizItem, index) => (
        <div key={index}>
          <h1 className='text-4xl py-3 flex items-center'>
            <BookOpenCheck size={35} />
            <span className='pl-3'>Quiz {index + 1}</span>
          </h1>
          <h3 className='text-3xl py-2 text-neutral-300'>{quizItem.question}</h3>
          <ul>
            {quizItem.options.map((option, optionIndex) => (
              <li
                onClick={() => { handleOptionChange(option, quizItem.correct, index) }}
                className={`bg-zinc-700/50  
                text-2xl py-2 px-3 m-2 w-[50%] font-light rounded-md border hover:border-2 hover:border-white 
                ${((selectedOptions[index] === quizItem.correct) && (selectedOptions[index] === option)) ? 'border-green-500 hover:border-green-500' : 'bg-transparent'}
                ${((selectedOptions[index] !== quizItem.correct) && (selectedOptions[index] === option)) ? 'border-red-500 hover:border-red-500 ' : 'bg-transparent'}
                `}
                key={optionIndex}
                style={{ cursor: answered[index] ? 'not-allowed' : 'pointer', opacity: answered[index] && selectedOptions[index] !== option ? 0.5 : 1 }}
              >
                <div className="flex justify-between items-center">
                  {option}
                  {(selectedOptions[index] === quizItem.correct) && (selectedOptions[index] === option) && <Check color='green' />}
                  {(selectedOptions[index] !== quizItem.correct) && (selectedOptions[index] === option) && <CircleX color='red' />}
                </div>
              </li>
            ))}
            {showCorrects[index] && (
              <li className='bg-transparent text-xl py-2 px-3 m-2 w-[50%] font-light rounded-md'>
                Correct Answer: {quizItem.correct}
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
