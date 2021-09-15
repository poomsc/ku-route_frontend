import React, { SyntheticEvent, useState, useEffect } from 'react'
import {
  Button,
  FormControl,
  InputGroup,
} from 'react-bootstrap'
import defaultUserProfile from 'assets/icons/user-icon.png'
import { Dropdown as SMTDropdown } from 'semantic-ui-react'
import DropFileZone from 'components/DropFileZone'
import ImageUploader from 'react-images-upload';
import { BsFillCaretDownFill } from 'react-icons/bs'
import { DocumentData } from '@firebase/firestore'
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockLabel from "@material-ui/icons/Lock"
import LockLabelOff from "@material-ui/icons/LockOpen"
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { get_info } from 'service/system'
import FormControl1 from '@material-ui/core/FormControl';
import { FormHelperText, TextField } from '@material-ui/core'


const subjects = [
  {
    value: '02212641-55',
    text: 'วิศวกรรมศาสตร์',
  },
  {
    value: '02743552-60',
    text: 'คหกรรม',
  },
  {
    value: '01204111-55',
    text: 'บัญชี',
  },
]

const EditProfilePage = () => {
  const [title, setTitle] = useState<string>()
  const [about, setAbout] = useState<string>()
  const [topicSelected, setTopicSelected] = useState(subjects[0].text)
  const [userInfo, setUserInfo] = useState<DocumentData>();

  useEffect(() => {
    async function fetch () {
      const rawInfo = await get_info('accout01')
      setUserInfo(rawInfo)
    }
    fetch()
  }, [])
  
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
    lock: true,
  });

  const handleOnSelectSubject = (event: any) => {
    setTopicSelected(event.target.innerText)
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickLock = () => {
    setValues({ ...values, lock: !values.lock });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className="blue-bg py-5">

      <div
        className="bg-secondary p-5 rounded-25 shadow mx-auto mb-4"
        style={{ maxWidth: '70rem' }}
      >
        <h2 className="font-weight-bold text-center mb-5">แก้ไขข้อมูลส่วนตัว</h2>
        <div className="edit-profile-picture-section">
          <img src={defaultUserProfile} 
                 className="img-fluid mx-auto my-5 d-block" 
                 alt="Responsive image"
                 style={{
                  borderRadius: '50%',
                  border: '0.25rem solid #A0A0A0'
                 }}
          />
        </div >
        
        <div
          className="edit-profile-name-section"
          style={{ display: 'flex' }}
        >
          <div
           style={{ width: '48%' }}
          >
            <p className="font-weight-bold" >ชื่อจริง</p>
            <div className="rounded-10 bg-white mb-4 p-2 clearfix">
              <div className="d-inline-block float-left">
                <p className="h6 d-inline-block text-muted px-1">{userInfo?.Name}</p>
              </div>
              <div className="d-inline-block float-right ">
                <LockLabel />
              </div> 
            </div>
          </div>

          <div
            style={{
              margin: '0 0% 0 4%',
              width: '48%'
          }}
          >
            <p className="font-weight-bold">นามสกุล</p>
            <div className="rounded-10 bg-white mb-4 p-2 clearfix">
              <div className="d-inline-block float-left">
                <p className="h6 d-inline-block text-muted px-1">{userInfo?.Surname}</p>
              </div>
              <div className="d-inline-block float-right ">
                <LockLabel />
              </div> 
            </div>
          </div>
        </div>

        <p className="font-weight-bold">อีเมล</p>
        <div className="rounded-10 bg-white mb-4 p-2 clearfix">
          <div className="d-inline-block float-left">
            <p className="h6 d-inline-block text-muted px-1">{userInfo?.Email}</p>
          </div>
          <div className="d-inline-block float-right ">
            <LockLabel />
          </div> 
        </div>

        <p className="font-weight-bold">ชื่อเล่น</p>
        <InputGroup className="rounded-10 bg-white shadow mb-4">
          <FormControl
            aria-label="title"
            defaultValue={userInfo?.DisplayName}
            className="rounded-10 border-0"
            placeholder="ฉันมีชื่อเล่นว่า"
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
          />
          <div
            style={{
              position: 'absolute',
              top: -25,
              right: 0,
              fontSize: 14,
              opacity: 0.5,
            }}
          >
            {title?.length}/50
          </div>
        </InputGroup>

        <p className="font-weight-bold">คณะ</p>
        <div
        className="rounded-25 shadow mx-auto mb-4"
        style={{ maxWidth: '70rem' }}
      >
        <SMTDropdown
          placeholder="กรุณาเลือกคณะ"
          fluid
          search
          selection
          options={subjects}
          onChange={handleOnSelectSubject}
          className="rounded-10 bg-primary-dark text-white font-weight-bold d-flex"
          icon={
            <div className="ml-auto">
              <BsFillCaretDownFill />
            </div>
          }
        />
      </div>

        <p className="font-weight-bold">เกี่ยวกับตัวฉัน</p>
        <InputGroup className="rounded-10 bg-white shadow mb-4">
          <FormControl
            as="textarea"
            defaultValue={userInfo?.About}
            aria-label="title"
            className="rounded-10 border-0"
            placeholder="คำอธิบายของตัวท่าน"
            onChange={(e) => setAbout(e.target.value)}
            rows={6}
            maxLength={1000}
            style={{ minHeight: "10rem" }}
          />
          <div
            style={{
              position: 'absolute',
              top: -25,
              right: 0,
              fontSize: 14,
              opacity: 0.5,
            }}
          >
            {about?.length}/1000
          </div>
        </InputGroup>
        

        <div className="d-flex justify-content-end">
          <div className="mx-2"></div>
          <Button style={{ width: '7rem' }}>บันทึก</Button>
        </div>
      </div>
    </div>
  )
}

export default EditProfilePage