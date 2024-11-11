import React, { useRef, useEffect, useState } from 'react';
import { ThemeProvider } from './ThemeContext';
import PerfectHashNavbar from './PerfectHashNavbar';
import PerfectHashForm from './PerfectHashForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import './App.css';

function App() {
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        <PerfectHashNavbar ref={navbarRef} />
        <PerfectHashForm navbarHeight={navbarHeight} />
      </div>
    </ThemeProvider>
  );
}

export default App;
