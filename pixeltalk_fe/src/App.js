import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom';
import Home from "./pages/home";
import Register from './pages/register';
import Login from './pages/login';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/userSlice';
import { sendMessage } from './features/chatSlice';
import { useEffect } from 'react';
import socketContext from './context/SocketContext';

//socket io
const socket = io(process.env.REACT_APP_API_ENDPOINT.split("/api/v1")[0]);

// socket.on("connect_error", (error) => {
//   console.error("Socket.IO connection error:", error);
// });

// socket.on("connect_timeout", (timeout) => {
//   console.error("Socket.IO connection timeout:", timeout);
// });


function App() {
  const {user}=useSelector((state)=>state.user);
  const {files}=useSelector((state)=>state.chat);
  const {token}=user;  
  return (
    <div className="dark">
      <socketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                token ? <Home socket={socket} /> : <Navigate to="/login" />
              }
            />
            <Route
              exact
              path="/login"
              element={!token ? <Login /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/register"
              element={!token ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </socketContext.Provider>
    </div>
  );
}

export default App;


{/* <Route exact path="/" element={ token ? <Home /> : <Navigate to="/login"/> } />
          <Route exact path="/login" element={!token ? <Login /> : <Navigate to="/"/>} />
          <Route exact path="/register" element={!token ? <Register /> : <Navigate to="/"/>} /> */}