import React, { useState } from 'react';
import { Grid, Button, Typography, Paper, Card, CardContent, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';

const Training = () => {
  // State for tracking quiz visibility, progress, answers, and scores
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null); // Store selected module for quiz
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(null);

  // Define training modules with questions and progress
  const trainingModules = [
    {
      title: 'Basic Training',
      description: 'Learn the basics of dog training, including commands and obedience.',
      progress: 50, // initial progress
      questions: [
        {
          question: 'What is the first command to teach a dog?',
          options: ['Sit', 'Stay', 'Come'],
          answer: 'Sit',
        },
        {
          question: 'What type of reward is most effective?',
          options: ['Food', 'Praise', 'Toys'],
          answer: 'Food',
        },
        {
          question: 'Which of the following is the best way to reinforce a command?',
          options: ['Immediate reward', 'Ignore the behavior', 'Yell at the dog'],
          answer: 'Immediate reward',
        },
      ],
      videoLink: 'https://youtu.be/jFMA5ggFsXU', // YouTube link for Basic Training
    },
    {
      title: 'Advanced Training',
      description: 'Advanced techniques for dog obedience and complex behavior correction.',
      progress: 20, // initial progress
      questions: [
        {
          question: 'What is the correct technique to teach a dog to stay?',
          options: ['Positive reinforcement', 'Scolding', 'Ignoring'],
          answer: 'Positive reinforcement',
        },
        {
          question: 'How do you prevent a dog from jumping on guests?',
          options: ['Ignore the dog', 'Use a firm "sit" command', 'Give a treat when jumping'],
          answer: 'Use a firm "sit" command',
        },
      ],
      videoLink: 'https://youtu.be/eFNMo693NuU', // YouTube link for Advanced Training
    },
    {
      title: 'Behavioral Training',
      description: 'Training to correct common behavioral issues like barking, chewing, etc.',
      progress: 80, // initial progress
      questions: [
        {
          question: 'How should you handle excessive barking?',
          options: ['Yell at the dog', 'Ignore the dog', 'Use a firm "quiet" command'],
          answer: 'Use a firm "quiet" command',
        },
        {
          question: 'What is a common cause of destructive chewing?',
          options: ['Lack of exercise', 'Boredom', 'Both of the above'],
          answer: 'Both of the above',
        },
        {
          question: 'How do you discourage digging in the yard?',
          options: ['Give the dog a toy', 'Ignore the behavior', 'Provide positive reinforcement when they stop'],
          answer: 'Provide positive reinforcement when they stop',
        },
      ],
      videoLink: 'https://youtu.be/cXN8Obr1yss', // YouTube link for Behavioral Training
    },
  ];

  // Function to start quiz for a selected module
  const startQuiz = (module) => {
    setSelectedModule(module); // Set the selected module
    setQuizAnswers([]); // Reset previous answers
    setQuizScore(null); // Reset score
    setShowQuiz(true); // Show the quiz
  };

  // Function to update the progress of a module
  const updateProgress = (index, increment) => {
    trainingModules[index].progress = Math.min(trainingModules[index].progress + increment, 100); // Update progress
  };

  // Function to handle quiz answer selection
  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...quizAnswers];
    newAnswers[index] = answer;
    setQuizAnswers(newAnswers);
  };

  // Function to handle quiz submission
  const handleQuizSubmit = () => {
    let score = 0;
    selectedModule.questions.forEach((question, index) => {
      if (quizAnswers[index] === question.answer) {
        score += 1;
      }
    });
    setQuizScore(score); // Set final score
  };

  return (
    <div style={pageStyle}>
      <Typography variant="h3" gutterBottom style={{ color: 'white', fontWeight: 'bold' }}>
        Dog Training Services
      </Typography>
      <Typography variant="h6" paragraph style={{ color: 'white' }}>
        Choose a training course for your dog!
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {trainingModules.map((module, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" style={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  {module.title}
                </Typography>
                <Typography variant="body2" style={{ color: '#7f8c8d', marginTop: '10px' }}>
                  {module.description}
                </Typography>

                {/* Progress Bar */}
                <LinearProgress
                  variant="determinate"
                  value={module.progress}
                  style={{ marginTop: '15px' }}
                />

                {/* Button to start quiz */}
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginTop: '15px', width: '100%' }}
                  onClick={() => startQuiz(module)} // Start quiz on button click
                >
                  Start Quiz
                </Button>

                {/* Link to training content (YouTube Video) */}
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginTop: '10px', width: '100%' }}
                  href={module.videoLink} // Link to YouTube video
                  target="_blank" // Opens in a new tab
                >
                  Start Training
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Quiz Section */}
      {showQuiz && selectedModule && (
        <Paper style={quizContainerStyle}>
          <Typography variant="h5" gutterBottom style={{ color: '#2c3e50', fontWeight: 'bold' }}>
            Quiz - {selectedModule.title}
          </Typography>
          {selectedModule.questions.map((question, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <Typography variant="body1" style={{ color: '#2c3e50' }}>
                {question.question}
              </Typography>
              {question.options.map((option, i) => (
                <Button
                  key={i}
                  variant="outlined"
                  color="primary"
                  style={{ margin: '5px' }}
                  onClick={() => handleAnswerChange(index, option)} // Handle answer change
                >
                  {option}
                </Button>
              ))}
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
            onClick={handleQuizSubmit} // Submit quiz on button click
          >
            Submit Quiz
          </Button>

          {/* Display Quiz Score */}
          {quizScore !== null && (
            <Typography variant="h6" style={{ marginTop: '20px', fontWeight: 'bold' }}>
              Your Score: {quizScore}/{selectedModule.questions.length}
            </Typography>
          )}
        </Paper>
      )}
    </div>
  );
};

// Styled components for consistent styling
const StyledCard = styled(Card)({
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
});

const quizContainerStyle = {
  padding: '20px',
  backgroundColor: '#f9f9f9',
  marginTop: '30px',
  borderRadius: '8px',
  textAlign: 'center',
};

const pageStyle = {
  padding: '30px',
  textAlign: 'center',
  background: 'url(https://images.pexels.com/photos/29352257/pexels-photo-29352257/free-photo-of-golden-retriever-puppy-playing-in-autumn-leaves.jpeg?auto=compress&cs=tinysrgb&w=600) no-repeat center center fixed',
  backgroundSize: 'cover',
  minHeight: '100vh',
};

export default Training;
