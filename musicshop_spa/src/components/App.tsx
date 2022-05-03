import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Test from './test';
import Test2 from './test2';
class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="test" element={<Test />} />
        <Route path="test2" element={<Test2 />} />
      </Routes>
    </BrowserRouter>
    );
  }
}

export default App;
