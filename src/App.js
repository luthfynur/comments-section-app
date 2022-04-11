import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './pages/Login';
import Comments from './pages/Comments';
import Register from './pages/Register';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://lnwics-api.herokuapp.com/api/user/current-user',
        { withCredentials: true }
      );
      setUser(response.data);
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<Comments setUser={setUser} user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
