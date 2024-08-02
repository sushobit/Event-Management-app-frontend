import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, Grid, IconButton } from '@mui/material';
import { ArrowForward, Refresh, ErrorOutline } from '@mui/icons-material';
import { motion } from 'framer-motion';


const WEATHER_API_KEY = 'bebd126d8b2166a5d0ccb126b6c6afa4'; 
const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather?'; 

const EventForm = ({ event, onEventSaved }) => {
  const [title, setTitle] = useState(event ? event.title : '');
  const [description, setDescription] = useState(event ? event.description : '');
  const [date, setDate] = useState(event ? event.date : '');
  const [location, setLocation] = useState(event ? event.location : '');
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date);
      setLocation(event.location);
    } else {
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setWeather(null);
    }
  }, [event]);

  useEffect(() => {
    if (location) {
      fetchWeather(location);
    }
  }, [location]);

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(WEATHER_API_URL, {
        params: {
          q: location,
          appid: WEATHER_API_KEY,
          units: 'metric' 
        }
      });
      setWeather(response.data);
      setWeatherError('');
    } catch (error) {
      setWeather(null);
      setWeatherError('Failed to fetch weather information.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = { title, description, date, location };

    if (event) {
      axios.put(`https://event-management-app-backend-1ub1.onrender.com/events/${event.id}`, eventData)
        .then(() => {
          onEventSaved();
        })
        .catch(error => console.error(error));
    } else {
      axios.post('https://event-management-app-backend-1ub1.onrender.com/events', eventData)
        .then(() => {
          onEventSaved();
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', mt: 5,filter: 'drop-shadow(1px 1px 20px #6c63ff)', }}>
      <Typography variant="h5" gutterBottom>
        {event ? 'Update Event' : 'Create Event'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Grid>
          {weather && (
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h6">Weather Information:</Typography>
                <Typography>Temperature: {weather.main.temp}°C</Typography>
                <Typography>Weather: {weather.weather[0].description}</Typography>
                <Typography>Humidity: {weather.main.humidity}%</Typography>
              </motion.div>
            </Grid>
          )}
          {weatherError && (
            <Grid item xs={12}>
              <Typography color="error" variant="body2">
                <ErrorOutline fontSize="small" /> {weatherError}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<ArrowForward />}
              fullWidth
            >
              {event ? 'Update Event' : 'Create Event'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EventForm;
