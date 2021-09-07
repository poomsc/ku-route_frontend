import React, { SyntheticEvent, useState } from 'react'
import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
} from 'react-bootstrap'
import defaultUserProfile from 'assets/icons/user-icon.png'
import { Dropdown as SMTDropdown } from 'semantic-ui-react'
import DropFileZone from 'components/DropFileZone'
import ImageUploader from 'react-images-upload';

import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockLabel from "@material-ui/icons/Lock"
import LockLabelOff from "@material-ui/icons/LockOpen"
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

const EditProfilePage = () => {
  const [title, setTitle] = useState<string>()

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
    lock: true,
  });
  
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
          <div>
            <img src={defaultUserProfile} alt="current-user-profile"
              style={{
                display: 'block',
                margin: '4rem auto',
                width: '10rem',
                borderRadius: '50%',
                border: '0.25rem solid #A0A0A0'
                }}
            />
          </div>
          <div>
            <ImageUploader

            withIcon={false}
            buttonText='อัปโหลดภาพโปรไฟล์'
            accept='image/*'
            
          >+</ImageUploader>
          </div>
          
          {/* <Button className="font-weight-bold text-center mb-5" 
            href="/up"
            style={{
                color: 'white',
                position: 'relative',
                textAlign: "justify",
                fontSize: '20px',
                margin: '-14.75% 0 0 54%',
                padding: '0',
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#4782fa',
              }}>+</Button> */}
        </div >
        
        <div
          className="edit-profile-name-section"
          style={{ display: 'flex' }}
        >
          <div
           style={{ width: '48%' }}
          >
            <p className="font-weight-bold">ชื่อจริง</p>
            <InputGroup className="rounded-10 bg-white mb-4">
              <FormControl
                aria-label="title"
                className="rounded-10 border-0"
                placeholder="ชื่อจริงของคุณ"
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
              />
              {/* <InputAdornment position="end" >
                <IconButton
                  onClick={handleClickLock}
                >
                  {values.lock ? <LockLabel /> : <LockLabelOff />}
                </IconButton>
              </InputAdornment> */}
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
          </div>
         
          <div
          style={{
            margin: '0 0% 0 4%',
            width: '48%'
          }}
          >
            <p className="font-weight-bold">นามสกุล</p>
            <InputGroup className="rounded-10 bg-white mb-4">
              <FormControl
                aria-label="title"
                className="rounded-10 border-0"
                placeholder="นามสกุลจริงของคุณ"
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
          </div>
          
        </div>
        
        <p className="font-weight-bold">อีเมล</p>
        <InputGroup className="rounded-10 bg-white mb-4">
          <FormControl
            aria-label="title"
            className="rounded-10 border-0"
            placeholder="example@ku.th"
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
          </div>
        </InputGroup>

        <p className="font-weight-bold">บันทึกการเปลี่ยนแปลง (ใส่รหัสผ่าน)</p>
        <div>
          <InputLabel htmlFor="standard-adornment-password">
          </InputLabel>
          <Input 
            type={values.showPassword ? "text" : "password"}
            onChange={handlePasswordChange("password")}
            value={values.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            style={{backgroundColor: "white"}}
          />
        </div>
        

        <div className="d-flex justify-content-end">
          <Button variant="danger" style={{ width: '7rem' }} href='/'>
            ยกโลก
          </Button>
          <div className="mx-2"></div>
          <Button style={{ width: '7rem' }}>บันทึก</Button>
        </div>
      </div>

      <div className="bg-secondary p-5 rounded-25 shadow mx-auto mb-4"
        style={{ maxWidth: '70rem'}}
      >
        <h2 className="font-weight-bold text-center mb-5">เปลี่ยนรหัสผ่าน</h2>
        <h5 className="font-weight-bold"
          style={{ margin: "0 0 2rem 0" }}
        >ใส่รหัสผ่านเดิมและรหัสผ่านใกม่เพื่อทำการเปลี่ยนรหัสผ่าน</h5>

        <p className="font-weight-bold">รหัสผ่านเดิม</p>
        <div>
          <InputLabel htmlFor="standard-adornment-password">
          </InputLabel>
          <Input 
            type={values.showPassword ? "text" : "password"}
            onChange={handlePasswordChange("password")}
            value={values.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            style={{backgroundColor: "white"}}
          />
        </div>

        <p className="font-weight-bold">รหัสผ่านใหม่</p>
        <div>
          <InputLabel htmlFor="standard-adornment-password">
          </InputLabel>
          <Input 
            type={values.showPassword ? "text" : "password"}
            onChange={handlePasswordChange("password")}
            value={values.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            style={{backgroundColor: "white"}}
          />
        </div>
        <p className="font-weight-normal">รหัสผ่านต้องมีความยาวไม่ต่ำกว่า 8 ตัวอักษร ประกอบด้วยตัวเลข ตัวอักษรภาษาอังกฤษ และอักขระพิเศษ</p>

        <p className="font-weight-bold">ยืนยันรหัสผ่านใหม่</p>
        <div>
          <InputLabel htmlFor="standard-adornment-password">
          </InputLabel>
          <Input 
            type={values.showPassword ? "text" : "password"}
            onChange={handlePasswordChange("password")}
            value={values.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            style={{backgroundColor: "white"}}
          />
        </div>
        
        <div className="d-flex justify-content-end">
          <Button variant="danger" style={{ width: '7rem' }} href='/'>
            ยกโลก
          </Button>
          <div className="mx-2"></div>
          <Button style={{ width: '7rem' }}>เปลี่ยนแปลง</Button>
        </div>
      </div>
    </div>
  )
}

export default EditProfilePage