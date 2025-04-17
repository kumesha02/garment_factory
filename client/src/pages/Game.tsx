import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface Defect {
  x: number;
  y: number;
  radius: number; // Acceptable radius for marking the defect
}

interface Garment {
  id: string;
  name: string;
  imageUrl: string;
  defects: Defect[];
  isOriginal: boolean;
}

const Game = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
  const [currentGarment, setCurrentGarment] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number, isDefect: boolean } | null>(null);
  const [garments, setGarments] = useState<Garment[]>([]); // This will be populated from API
  const [foundDefects, setFoundDefects] = useState<Set<string>>(new Set());
  const SERVER_URL = 'http://localhost:5001';

  const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const image = event.currentTarget.querySelector('img');
    if (!image) return;

    const imageRect = image.getBoundingClientRect();
    const scaleX = image.naturalWidth / imageRect.width;
    const scaleY = image.naturalHeight / imageRect.height;

    const x = (event.clientX - imageRect.left);
    const y = (event.clientY - imageRect.top);

    // Convert to scaled coordinates for defect detection
    const scaledX = x * scaleX;
    const scaledY = y * scaleY;

    // Check if the clicked point is within any defect's radius
    const currentDefects = garments[currentGarment]?.defects || [];
    const defectIndex = currentDefects.findIndex(defect => {
      const distance = Math.sqrt(
        Math.pow(scaledX - defect.x, 2) + 
        Math.pow(scaledY - defect.y, 2)
      );
      return distance <= defect.radius;
    });

    const defectKey = `${currentGarment}-${defectIndex}`;
    const isNewDefect = defectIndex !== -1 && !foundDefects.has(defectKey);

    if (isNewDefect) {
      setFoundDefects(prev => new Set([...prev, defectKey]));
      setScore(prev => prev + 20);
      setSelectedPoint({ x, y, isDefect: true });
      console.log('New defect found! Score updated:', score + 20);
    } else {
      setSelectedPoint({ x, y, isDefect: false });
      console.log('No new defect found at coordinates:', { x: scaledX, y: scaledY });
    }
  };

  // Fetch garments on component mount
  useEffect(() => {
    const fetchGarments = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/games/start`);
        if (!response.ok) {
          throw new Error('Failed to fetch garments');
        }
        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Invalid garments data received');
        }
        const garmentData = data.map(garment => ({
          ...garment,
          imageUrl: garment.imageUrl.startsWith('http') 
            ? garment.imageUrl 
            : `/images/garments/${garment.imageUrl}`,
          defects: garment.isOriginal ? [] : garment.defects || []
        }));
        setGarments(garmentData);
      } catch (error) {
        console.error('Error fetching garments:', error);
        setGameOver(true);
      }
    };

    fetchGarments();
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, gameOver]);

  // Function to move to the next garment
  const nextGarment = () => {
    if (currentGarment < garments.length - 1) {
      setCurrentGarment(prev => prev + 1);
      setSelectedPoint(null);
      setFoundDefects(new Set());
    } else {
      endGame();
    }
  };

  // Function to end the game
  const endGame = () => {
    setGameOver(true);
    // Here you would typically submit the score to the server
    // For example: submitGameResults(score);
  };

  if (!garments.length) {
    return (
      <Container>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading game assets...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Score: {score}/100</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Garment: {currentGarment + 1}/10</Typography>
            </Grid>
          </Grid>

          <Box 
            sx={{ 
              mt: 4, 
              position: 'relative',
              width: '100%',
              height: '600px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              cursor: 'crosshair',
              '& img': {
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                display: 'block'
              }
            }} 
            onClick={handleImageClick}
          >
            {garments[currentGarment] && (
              <>
                <img
                  src={garments[currentGarment].imageUrl}
                  alt={`Garment ${currentGarment + 1} for inspection`}
                  onError={(e) => {
                    const imgElement = e.currentTarget;
                    imgElement.src = '/images/garments/images.jpeg';
                    console.error('Failed to load image:', garments[currentGarment].imageUrl);
                  }}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
                {selectedPoint && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: selectedPoint.x - 10,
                      top: selectedPoint.y - 10,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: selectedPoint.isDefect ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)',
                      border: `2px solid ${selectedPoint.isDefect ? 'green' : 'red'}`,
                      pointerEvents: 'none',
                      animation: 'pulse 1s ease-in-out',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.2)' },
                        '100%': { transform: 'scale(1)' }
                      }
                    }}
                  />
                )}
              </>
            )}
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={nextGarment}
              disabled={currentGarment >= 9}
            >
              Next Garment
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={endGame}
            >
              End Game
            </Button>
          </Box>
        </Paper>
      </Box>

      <Dialog open={gameOver} onClose={() => navigate('/')}>
        <DialogTitle>Game Over!</DialogTitle>
        <DialogContent>
          <Typography>Your final score: {score}/100</Typography>
          {score >= 75 && (
            <Typography color="success.main">Congratulations! You've earned a bonus!</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/')} color="primary">
            Return to Home
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Game;