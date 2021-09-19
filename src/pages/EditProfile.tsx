import React, { SyntheticEvent, useState, useEffect } from 'react'
import { Alert, Button, FormControl, InputGroup } from 'react-bootstrap'
import defaultUserProfile from 'assets/icons/user-icon.png'
import { Dropdown as SMTDropdown } from 'semantic-ui-react'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { DocumentData } from '@firebase/firestore'
import { get_faculty, get_info } from 'service/system'
import { edit } from 'service/user'
import Slide from '@mui/material/Slide'
import LockLabel from '@material-ui/icons/Lock'
import applicationStore from 'stores/applicationStore'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react'

const facultyList = [] as any
let facultyLoader = 0
let currentFaculty, newSelected
let changeCount = [false, false, false]

let updateDatabaseTarget = 'Account'
let UUID = 'accout01'

function loadFaculty(components) {
  for (const e of components) {
    let builder = {
      key: facultyLoader.toString(10),
      value: facultyLoader.toString(10),
      text: e,
    }

    facultyList.push(builder)
    facultyLoader++
  }
}

function findFacultyKey(faculty, keyword: string) {
  let i = 0
  for (const e of faculty) {
    if (keyword == e) {
      return i
    }
    i++
  }
}

const EditProfilePage = observer(() => {
  //check signin
  const history = useHistory()
  if (!applicationStore.user) {
    history.push('/signin')
  }

  const [saveButtonClickable, setSaveButtonClickable] = useState(false)
  const [faculty, setFaculty] = useState<string>()

  const [userInfo, setUserInfo] = useState<DocumentData>()
  const [title, setTitle] = useState<string>()
  const [userFaculty, setUserFaculty] = useState<string>()
  const [about, setAbout] = useState<string>()

  const [successAlertHidden, setSuccessAlertHidden] = useState(true)
  const [failAlertHidden, setFailAlertHidden] = useState(true)
  const [animationAlert, setAnimationAlert] = useState(false)

  useEffect(() => {
    async function fetch() {
      const rawInfo = (await get_info(UUID)) as DocumentData
      const rawFaculty = await get_faculty()
      setUserInfo(rawInfo)
      setFaculty(rawFaculty)
    }
    fetch()
  }, [])

  async function uploadInfo(changedInfo) {
    let result = await edit(changedInfo, UUID, updateDatabaseTarget)
    if (result === 'Successful') {
      setTimeout(() => {
        //fetchInfo()
        setSuccessAlertHidden(false)
        setAnimationAlert(true)
        setTimeout(() => {
          setAnimationAlert(false)
        }, 5000)
      }, 0)
    } else {
      setTimeout(() => {
        setFailAlertHidden(false)
        setAnimationAlert(true)
        setTimeout(() => {
          setAnimationAlert(false)
        }, 5000)
      }, 0)
    }
  }

  // Check whether it's undefined
  if (faculty && facultyLoader == 0) {
    loadFaculty(faculty)
    currentFaculty = findFacultyKey(faculty, userInfo?.Faculty)
  }

  const saveCurrentState = (title, about, newFaculty) => {
    setSaveButtonClickable(false)
    let changedInfo = {}
    if (changeCount[0]) {
      changedInfo['DisplayName'] = title
    }
    if (changeCount[1]) {
      changedInfo['Faculty'] = newFaculty
    }
    if (changeCount[2]) {
      changedInfo['About'] = about
    }
    // sent new changes to database
    uploadInfo(changedInfo)

    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  }

  const handleOnDisplayNameChange = (event: any) => {
    setTitle(event.target.value)
    checkChangeData(userInfo?.DisplayName, event, 0)
  }

  const handleOnSelectFaculty = (event: any) => {
    setUserFaculty(event.target.innerText)
    newSelected = findFacultyKey(faculty, event.target.innerText)
    checkChangeData(userInfo?.Faculty, event, 1)
  }

  const handleOnAboutChange = (event: any) => {
    setAbout(event.target.value)
    checkChangeData(userInfo?.About, event, 2)
  }

  const checkChangeData = (attr, event, index: number) => {
    // Check equal of two string
    if (index != 1) {
      if (attr && !(event.target.value === attr)) {
        changeCount[index] = true
      } else if (!attr) {
        changeCount[index] = true
      } else {
        changeCount[index] = false
      }
    } else {
      if (currentFaculty == newSelected) {
        changeCount[index] = false
      } else {
        changeCount[index] = true
      }
    }
    if (!changeCount[0] && !changeCount[1] && !changeCount[2]) {
      setSaveButtonClickable(false)
    } else {
      setSaveButtonClickable(true)
    }
  }

  return (
    <div className="blue-bg py-5">
      <div
        className="bg-secondary p-5 rounded-25 shadow mx-auto mb-4"
        style={{ maxWidth: '70rem' }}
      >
        <h2 className="font-weight-bold text-center mb-5">
          แก้ไขข้อมูลส่วนตัว
        </h2>
        <div className="edit-profile-picture-section">
          <img
            src={defaultUserProfile}
            className="img-fluid mx-auto my-5 d-block"
            alt="Responsive image"
            style={{
              borderRadius: '50%',
              border: '0.25rem solid #A0A0A0',
            }}
          />
        </div>
        <div className="edit-profile-name-section" style={{ display: 'flex' }}>
          <div style={{ width: '48%' }}>
            <p className="font-weight-bold">ชื่อจริง</p>
            <div className="rounded-10 bg-white mb-4 p-2 clearfix">
              <div className="d-inline-block float-left">
                <p className="h6 d-inline-block text-muted px-1">
                  {userInfo?.Name}
                </p>
              </div>
              <div className="d-inline-block float-right ">
                <LockLabel />
              </div>
            </div>
          </div>

          <div
            style={{
              margin: '0 0% 0 4%',
              width: '48%',
            }}
          >
            <p className="font-weight-bold">นามสกุล</p>
            <div className="rounded-10 bg-white mb-4 p-2 clearfix">
              <div className="d-inline-block float-left">
                <p className="h6 d-inline-block text-muted px-1">
                  {userInfo?.Surname}
                </p>
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
            <p className="h6 d-inline-block text-muted px-1">
              {userInfo?.Email}
            </p>
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
            onChange={handleOnDisplayNameChange}
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
            {title
              ? title?.length
              : userInfo?.DisplayName
              ? userInfo?.DisplayName.length
              : 0}
            /50
          </div>
        </InputGroup>

        <p className="font-weight-bold">คณะ</p>
        <div
          className="rounded-25 shadow mx-auto mb-4"
          style={{ maxWidth: '70rem' }}
        >
          <SMTDropdown
            placeholder="-- กรุณาเลือกคณะ --"
            fluid
            search
            selection
            options={facultyList}
            onChange={handleOnSelectFaculty}
            value={
              userFaculty
                ? facultyList[newSelected]?.value
                : facultyList[currentFaculty]?.value
            }
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
            onChange={handleOnAboutChange}
            rows={6}
            maxLength={1000}
            style={{ minHeight: '10rem' }}
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
            {about
              ? about?.length
              : userInfo?.About
              ? userInfo?.About.length
              : 0}
            /1000
          </div>
        </InputGroup>

        <div className="d-flex justify-content-end">
          <div className="mx-2"></div>
          <Button
            disabled={!saveButtonClickable}
            style={{ width: '7rem' }}
            type="submit"
            onClick={(e) => {
              saveCurrentState(title, about, userFaculty)
            }}
          >
            บันทึก
          </Button>
        </div>
      </div>

      <Slide direction="up" in={animationAlert} mountOnEnter unmountOnExit>
        <Alert
          hidden={successAlertHidden}
          className="fixed-bottom my-0 rounded-0"
          style={{
            backgroundColor: '#02353c',
            color: '#8BF7DB',
          }}
        >
          <Alert.Heading></Alert.Heading>
          <h5>Your change has been saved!</h5>
        </Alert>
      </Slide>

      <Slide direction="up" in={animationAlert} mountOnEnter unmountOnExit>
        <Alert
          hidden={failAlertHidden}
          className="fixed-bottom my-0 rounded-0"
          style={{
            backgroundColor: '#660000',
            color: '#FFA6A6',
          }}
        >
          <Alert.Heading></Alert.Heading>
          <h5>Your Change saving Failed... Please try again later!</h5>
        </Alert>
      </Slide>
    </div>
  )
})

export default EditProfilePage