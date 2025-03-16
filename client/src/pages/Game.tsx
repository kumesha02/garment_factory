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
  id: number;
  imageUrl: string;
  defects: Defect[];
}

const Game = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
  const [currentGarment, setCurrentGarment] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number } | null>(null);
  const [garments, setGarments] = useState<Garment[]>([]); // This will be populated from API

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

  const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setSelectedPoint({ x, y });

    // Check if the clicked point is within any defect's radius
    const currentDefects = garments[currentGarment]?.defects || [];
    const defectFound = currentDefects.some(defect => {
      const distance = Math.sqrt(
        Math.pow(x - defect.x, 2) + Math.pow(y - defect.y, 2)
      );
      return distance <= defect.radius;
    });

    if (defectFound) {
      setScore(prev => prev + 20);
    }
  };

  const nextGarment = () => {
    if (currentGarment < 9) {
      setCurrentGarment(prev => prev + 1);
      setSelectedPoint(null);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setGameOver(true);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Time Remaining: {formatTime(timeLeft)}
            </Typography>
            <Typography variant="h6">
              Score: {score}/100
            </Typography>
            <Typography variant="h6">
              Garment: {currentGarment + 1}/10
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              height: '60vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              cursor: 'crosshair',
            }}
            onClick={handleImageClick}
          >
            {garments[currentGarment] ? (
              <Box
                component="img"
                src={garments[currentGarment].imageUrl}
                sx={{ maxHeight: '100%', maxWidth: '100%' }}
              />
            ) : (
              <CircularProgress />
            )}
            {selectedPoint && (
              <Box
                sx={{
                  position: 'absolute',
                  left: selectedPoint.x - 5,
                  top: selectedPoint.y - 5,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: 'error.main',
                }}
              />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={nextGarment}
              disabled={gameOver}
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
        </Grid>
      </Grid>

      <Dialog open={gameOver} onClose={() => navigate('/dashboard')}>
        <DialogTitle>Game Over</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Final Score: {score}/100
          </Typography>
          <Typography variant="body1">
            {score >= 75 ? 'Congratulations! You qualified for a bonus!' : 'Keep practicing to earn a bonus next time!'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/dashboard')} color="primary">
            Return to Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Game;