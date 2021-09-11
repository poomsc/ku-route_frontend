import "./App.css";
import React from "react";
import Routes from "routes/index";
import { signIn_EmailPassword, signUp_EmailPassword, signIn_Google, signOut} from "service/auth";
import { create_post, create_comment} from "service/user_mode";
import { upload_file, test_file } from "service/file";
import {register} from "service/user"

const App = () => {
  //signup_EM({Name:"Sardadadaan", Surname:"Jandadadwat", Email:"sarap@ku.th", password:"testtt"})
  //signIn_EmailPassword("thitisak.si@ku.th", "Dimmy_0824503177")
  //register({UID:"accout01", Name:"CH", Surname:"ddd", Email:"dim@ku.th"})
  //create_post({AccountID:"aZnmd5mWjFd2D0oN1I3cEAGNUgx2", FileID:["File01", "File02"], TagID:["exam","test"], SubjectID:"6210503551", Title:"แนวข้อสอบ", Description:"บลาๆๆๆ"})
  //create_post({AccountID:"aZnmd5mWjFd2D0oN1I3cEAGNUgx2", FileID:["File03", "File04"], TagID:["exam"], SubjectID:"6210503551", Title:"แนวข้อสอบฉบับเด็กเรียนดี", Description:"เก่ง"})
  //create_post({AccountID:"ขก. หาไอดี", FileID:["File69"], TagID:["book"], SubjectID:"6210500781", Title:"หนังสือฉบับเด็กเรียนดี", Description:"เก่งที่สุด"})
  //create_comment({AccountID:"BossGoodSt", PostID:"1", Description:"บอสเด็กเรียนเก่ง"})
  return <Routes />;
};

export default App;


