import React, { useState, useEffect } from "react";
import { hot } from 'react-hot-loader/root';
import LandingPage from  './Containers/LandingPage';
import SignupPage from "./Containers/SignupPage";
import SearchContainer from './Containers/SearchContainer';
import MusicContainer from './Containers/musicRec';
import LoadingContainer from './Containers/LoadingContainer';
import ProfileComponent from './Containers/ProfileContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./styles.css";


function App() {
  const storedDarkMode = localStorage.getItem("DARK_MODE");
  const [darkMode, setDarkMode] = useState(storedDarkMode);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  useEffect(() => {
    localStorage.setItem("DARK_MODE", darkMode);
  }, [darkMode]);

  const [username, setUsername] = useState('')
    return (
      <React.Fragment>
        <BrowserRouter>
        {/* <div className="App" data-theme={darkMode ? "dark" : "light"}>
          Hello
        <button onClick={toggleDarkMode}>Toggle</button>
        </div> */}
          <Routes data-theme={darkMode ? "dark" : "light"}>
            <Route path='/' element={<LandingPage username={username} setUsername={setUsername}/>} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/profile' element={<ProfileComponent />} />
            <Route path='/search' element={<SearchContainer />} />
            <Route path='/loading' element={<LoadingContainer />} />
            <Route path='/music' element={<MusicContainer />} />
            <Route 
                        path="*" 
                        element={
                            <main>
                                <p>There's no page at this URL!</p>
                            </main>
                        }
                    />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    );
}

export default hot(App);

//All I need to build to start is a form that does a post request and passes in a username and password.