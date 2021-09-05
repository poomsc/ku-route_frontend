import "./App.css";
import React from "react";
import Routes from "routes/index";
import { register } from "service/firestore";
import { signin_EM, signup_EM } from "service/auth";

const App = () => {
  //signup_EM({Name:"Saran", Surname:"Janwat", Email:"saraphat@ku.th", password:"testtt"})
  //signin_EM("saraphatda@ku.th", "testtt")
  return <Routes />;
};

export default App;
