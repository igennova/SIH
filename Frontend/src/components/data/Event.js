import { eventroute } from "../../utils/Apiroutes";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Event() {
  const [events, setEvents] = useState([]);
  const { folderId } = useParams();

  useEffect(() => {
    axios.get(eventroute) // Replace with your API endpoint
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="flex flex-wrap gap-10">
        {events.map(event => (
          <div
            key={event._id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 max-w-sm cursor-pointer hover:bg-gray-700 transition"
          >
            {event.image_url && (
              <img
                src={event.image_url}
                alt={event.event_name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h4 className="text-xl font-semibold mb-2">{event.event_name}</h4>
            <p className="text-lg mb-2"><strong>Organization:</strong> {event.organization_name}</p>
            <p className="text-lg mb-2"><strong>Place:</strong> {event.place}</p>
            <p className="text-lg"><strong>Timing:</strong> {new Date(event.timing).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Event;
