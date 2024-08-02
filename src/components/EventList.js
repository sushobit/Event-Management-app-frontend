
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventForm from './EventForm';
import { AppBar, Toolbar, Typography, Container, Button, Card, CardContent, IconButton, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './EventList.css'; 

const EventList = ({ user, onLogout }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('https://event-management-app-backend-1ub1.onrender.com/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  };

  const handleUpdate = (event) => {
    setSelectedEvent(event);
  };

  const handleDelete = (id) => {
    axios.delete(`https://event-management-app-backend-1ub1.onrender.com/events/${id}`)
      .then(() => fetchEvents())
      .catch(error => console.error(error));
  };

  const handleEventSaved = () => {
    setSelectedEvent(null);
    fetchEvents();
  };
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="event-list-container">  {/* Add CSS class here */}
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #003366, #336699)' }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, color: '#ffffff' }}>
            Welcome, <strong style={{ fontStyle: 'italic' }}>{user}</strong>
          </Typography>
          <Button color="inherit" sx={{ color: '#ffffff' }} onClick={onLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ mt: 4 }}>
        <EventForm event={selectedEvent} onEventSaved={handleEventSaved} />
        <Typography variant="h4" sx={{ mb: 4 }}>Events</Typography>
        <Grid container spacing={2}>
          {events.map(event => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={{filter: 'drop-shadow(1px 1px 20px #6c63ff)', margin: '10px'}}>
                  <CardContent>
                    <Typography variant="h6">{event.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Date:</strong> {event.date}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Description:</strong> {event.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Location:</strong> {event.location}
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                      <IconButton onClick={() => handleUpdate(event)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(event.id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        <div
        style={{
          position: 'absolute',
          width: '50px',
          height: '50px',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          left: cursorPosition.x,
          top: cursorPosition.y,
          transition: 'left 0.1s ease-out, top 0.1s ease-out',
        }}
      />
      </Container>
    </div>
  );
};

export default EventList;
