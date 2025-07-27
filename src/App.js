import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SurveyProvider } from "./context/SurveyContext";
import WelcomePage from "./pages/WelcomePage";
import Step1Page from "./pages/Step1Page";
import Step2Page from "./pages/Step2Page";

const App = () => {
  return (
    <SurveyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/step1" element={<Step1Page />} />
          <Route path="/step2" element={<Step2Page />} />
        </Routes>
      </Router>
    </SurveyProvider>
  );
};

export default App;
