import React, { useEffect, useState } from 'react';
import { teacherRoute } from '../../utils/Apiroutes';
import axios from 'axios';

const TeacherPage = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios.get(teacherRoute)
      .then(response => setTeachers(response.data))
      .catch(error => console.error('Error fetching teacher data:', error));
  }, []);

  return (
    <div className="teacher-page">
      <h1>Available Teachers for Deaf and Mute People</h1>
      <div className="teacher-list">
        {teachers.map((teacher) => (
          <div key={teacher._id} className="teacher-card">
            <img src={teacher.photo} alt={teacher.name} className="teacher-photo" />
            <h2>{teacher.name}</h2>
            <p>Charge per hour: ${teacher.chargePerHour}</p>
            <p>Qualifications:</p>
            <ul>
              {teacher.qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherPage;
