import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import SignUp from './Components/Authentication/SignUp';
import SignIn from './Components/Authentication/SignIn';
import Home from './Components/Home';

/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The rendered application component.
 */
function App() {
  return (
    <Routes>
      <Route path="stock">
        <Route path=":year">
          <Route path=":isin" element={<Home />} />
        </Route>
      </Route>
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="/" element={
        <Navigate to="signup" />} />
    </Routes>
  );
}

export default App;
