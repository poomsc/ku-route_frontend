import './App.css'
import React, { useEffect } from 'react'
import Routes from 'routes/index'
import { signOut, signIn_Google } from 'service/auth'
import {
  delete_post,
  get_comment,
  get_info,
  get_post,
  delete_comment,
  get_file,
  get_pathfile,
  delete_file,
  get_one_post,
  get_faculty,
} from 'service/system'
import { like } from 'service/user'
import { BasicSearch } from 'service/search'
import { title } from 'process'
import { edit } from 'service/user'
import { serverTimestamp } from '@firebase/firestore'
import applicationStore from 'stores/applicationStore'
import AllPostPage from './pages/AllPost'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PDF1 from './assets/icons/PDF.png'

const App = () => {
  //signOut()
  //get_one_post('TPkRmWLZdLRIUWIa8ptS')
  //like('KVcKU4KWX8UJIc6yiwwesWrU2Ef1', "TPkRmWLZdLRIUWIa8ptS")
  //console.log(get_one_post('ySH7xouv3vAaTjrGqxnQ'))
  //edit({Title:"แนวข้อสอบ", Description:"ว้าวซ่า", SubjectID:"02121221", Status:true, TagID:["คลังข้อสอบ"], DateCreated:}, "v9qZWXtsicOh2L6evzO9", "Post")
  //console.log(get_faculty())
  //const test = get_info('accout01')
  //console.log(test)
  //console.log(res.to)
  //console.log(TagSearch(['คลังความรู้', 'คลังข้อสอบ']))
  //edit({Faculty:'คณะหมูกรอบ'}, 'QgeVAV0fQHgqv99ttcdB', 'Account')

  return <Routes />
}

export default App

// P01/ดาบแฟหมา.png
