import './App.scss';

import React from 'react';

import Experience from './components/experience';
import Project from './components/project';

function App() {
    return (
        <div>
            <Project />
            <div className="divider"></div>
            <Experience />
        </div>
    );
}

export default App;
