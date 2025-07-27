import React, { createContext, useState } from "react";

const SurveyContext = createContext();

const SurveyProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [childName, setChildName] = useState("");
  const [childBirthDate, setChildBirthDate] = useState("");
  const [step1Answers, setStep1Answers] = useState({});
  const [step2Answers, setStep2Answers] = useState([]);

  return (
    <SurveyContext.Provider
      value={{
        phoneNumber,
        setPhoneNumber,
        childName,
        setChildName,
        childBirthDate,
        setChildBirthDate,
        step1Answers,
        setStep1Answers,
        step2Answers,
        setStep2Answers,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export { SurveyContext, SurveyProvider };
