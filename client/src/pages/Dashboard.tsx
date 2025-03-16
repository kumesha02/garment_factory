import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    gamesPlayed: 0,
    averageScore: 0,
    bonusesEarned: 0,
  });

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
              Welcome to Quality Control Game
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Test your quality control skills and earn bonuses by identifying garment defects.
            </Typography>
          </Paper>
        </Grid>

        {/* Game Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PlayArrowIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h5" component="div">
                  Start New Game
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Identify defects in 10 garments within the time limit. Complete at least 5 to qualify for bonus points.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="large"
                variant="contained"
                startIcon={<PlayArrowIcon />}
                onClick={handleStartGame}
                fullWidth
              >
                Play Now
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Stats Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h5" component="div">
                  Your Statistics
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h6">{userStats.gamesPlayed}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Games Played
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h6">{userStats.averageScore}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average Score
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h6">{userStats.bonusesEarned}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bonuses Earned
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;