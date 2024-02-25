import './App.scss';

import React from 'react';

import Experience from './components/experience';
import Introduction from './components/introduction';
import Project from './components/project';

function App() {
    return (
        <div>
            <Introduction />
            <div className="divider"></div>
            <Project />
            <div className="divider"></div>
            <Experience />
        </div>
    );
}

export default App;
