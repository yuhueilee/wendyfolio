import './App.scss';

import React from 'react';

import Experience from './components/experience';
import Introduction from './components/introduction';
import Project from './components/project';

function App() {
    return (
        <div>
            <div className="topNav d-flex justify-content-center align-items-center">
                wendyfolio
            </div>
            <Introduction />
            <div className="divider"></div>
            <Project />
            <div className="divider"></div>
            <Experience />
            <div className="copyRight d-flex justify-content-center align-items-center">
                Designed & Developed by Wendy Lee @ 2024
            </div>
        </div>
    );
}

export default App;
