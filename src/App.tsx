import "./App.css";
import React, {useEffect} from "react";
import Routes from "routes/index";
import { checkAuthState, signOut , signIn_Google} from "service/auth";
import { delete_post, get_comment, get_info, get_post, delete_comment, get_file, get_pathfile, delete_file, get_one_post} from "service/system";
import applicationStore from "stores/applicationStore";

const App = () => {
  //signOut()
  //checkAuthState()
  useEffect(() => {
    checkAuthState()
  }, []);
  //get_one_post('TPkRmWLZdLRIUWIa8ptS')
  return <Routes />;
};

export default App;

// P01/ดาบแฟหมา.png
