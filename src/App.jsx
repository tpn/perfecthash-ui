import React from "react";
import { ThemeProvider } from './ThemeContext';
import PerfectHashNavbar from "./PerfectHashNavbar";
import PerfectHashForm from "./PerfectHashForm";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <PerfectHashNavbar />
        <PerfectHashForm />
      </div>
    </ThemeProvider >
  );
}

export default App;
