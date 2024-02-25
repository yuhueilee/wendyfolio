import './App.scss';

import React from 'react';

import Experience from './components/experience';
import Introduction from './components/introduction';
import Project from './components/project';

function App() {
    return (
        <div>
            <div className="topNav d-flex justify-content-center align-items-center">
                <h3 className="fb-24 m-0">wendyfolio</h3>
            </div>
            <Introduction />
            <div className="divider"></div>
            <Project />
            <div className="divider"></div>
            <Experience />
            <div className="copyRight fb-24 d-flex justify-content-center align-items-center">
                <h4 className="fr-16 m-0">
                    Designed & Developed by Wendy Lee @ 2024
                </h4>
            </div>
        </div>
    );
}

export default App;
