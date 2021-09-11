import "./App.css";
import React from "react";
import Routes from "routes/index";
import { delete_post, get_comment, get_info, get_post, delete_comment, get_file, get_pathfile, delete_file } from "service/system";

const App = () => {
  // get_info("R7pOZWEpTlWIcVzsOjPrbiip5T82")
  // get_post()
  // get_comment("1")
  // delete_post("9olKvWQ2K5TyzwYCJf9q")
  // delete_comment("1Ry5CUM1beMSJxikMrYF")
  // get_file("P01/")
  // get_pathfile("P01/")
  // delete_file("P01/ดาบแฟหมา.png")

  return <Routes />;
};

export default App;

// P01/ดาบแฟหมา.png
