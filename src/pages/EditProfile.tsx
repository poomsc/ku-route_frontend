import React, { SyntheticEvent, useState, useEffect } from 'react'
import {
  Alert,
  Button,
  Container,
  FormControl,
  InputGroup,
} from 'react-bootstrap'
import defaultUserProfile from 'assets/icons/user-icon.png'
import { Dropdown as SMTDropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { DocumentData, serverTimestamp } from '@firebase/firestore'
import { get_faculty, get_info } from 'service/system'
import { edit } from 'service/user'
import Slide from '@mui/material/Slide'
import LockLabel from '@material-ui/icons/Lock'
import applicationStore from 'stores/applicationStore'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react'
import { BasicSearch } from 'service/search'
import { border } from '@mui/system'
import facebook from 'assets/icons/facebook.png'
import instagram from 'assets/icons/instagram.png'
import mail from 'assets/icons/mail.png'
import phone from 'assets/icons/phone.png'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const facultyList = [] as any
let facultyLoader = 0
let currentFaculty, newFacultySelected
let sectionChangeStatus = [false, false, false, false, false, false, false]

let databaseTarget = 'Account'
let UUID = 'Account01'

const contractChannels = [
  { Icon: mail, Placeholder: 'E-mail' },
  { Icon: phone, Placeholder: 'เบอร์โทร' },
  { Icon: facebook, Placeholder: 'Facebok' },
  { Icon: instagram, Placeholder: 'Instagram' },
]

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
  if (applicationStore.user) UUID = applicationStore.user.uid

  const [saveButtonClickable, setSaveButtonClickable] = useState(false)
  const [faculty, setFaculty] = useState<string[]>()

  const [userInfo, setUserInfo] = useState<DocumentData>()
  const [title, setTitle] = useState<string>()
  const [userFaculty, setUserFaculty] = useState<string>()
  const [about, setAbout] = useState<string>()
  const [mail, setMail] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [facebook, setFacebook] = useState<string>()
  const [instagram, setInstagram] = useState<string>()

  const [successAlertHidden, setSuccessAlertHidden] = useState(true)
  const [failAlertHidden, setFailAlertHidden] = useState(true)
  const [animationAlert, setAnimationAlert] = useState(false)

  useEffect(() => {
    async function fetch() {
      if (!applicationStore.user) return
      const rawInfo = (await get_info(UUID)) as DocumentData
      const rawFaculty = (await get_faculty()) as string[]
      setUserInfo(rawInfo)
      setFaculty(rawFaculty)
    }
    fetch()
  }, [])

  async function uploadInfo(changedInfo) {
    let result = await edit(changedInfo, UUID, databaseTarget)
    if (result === 'Successful') {
      setTimeout(() => {
        fetchInfo()
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

  async function fetchInfo() {
    const rawInfo = (await get_info(UUID)) as DocumentData
    setUserInfo(rawInfo)
  }

  async function fetchFaculty() {
    const rawFaculty = (await get_faculty()) as string[]
    setFaculty(rawFaculty)
  }

  // Check whether it's undefined
  if (faculty && facultyLoader == 0) {
    loadFaculty(faculty)
    currentFaculty = findFacultyKey(faculty, userInfo?.Faculty)
  }

  const triggerThis = () => {
    window.onbeforeunload = confirmExit
    function confirmExit() {
      return 'show message'
    }
  }

  const saveCurrentState = (title, about, newFaculty) => {
    setSaveButtonClickable(false)
    let changedInfo = {}
    if (sectionChangeStatus[0]) {
      changedInfo['DisplayName'] = title
    }
    if (sectionChangeStatus[1]) {
      changedInfo['Faculty'] = newFaculty
    }
    if (sectionChangeStatus[2]) {
      changedInfo['About'] = about
    }
    if (sectionChangeStatus[3]) {
      changedInfo['Mail'] = mail
    }
    if (sectionChangeStatus[4]) {
      changedInfo['Phone'] = phone
    }
    if (sectionChangeStatus[5]) {
      changedInfo['Facebook'] = facebook
    }
    if (sectionChangeStatus[6]) {
      changedInfo['Instagram'] = instagram
    }
    changedInfo['DateEdited'] = serverTimestamp()
    // sent new changes to database
    uploadInfo(changedInfo)
    applicationStore.setUserDisplayName(title)

    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  }

  const handleOnDisplayNameChange = (event: any) => {
    setTitle(event.target.value)
    checkChangeData(userInfo?.DisplayName, event.target.value, 0)
  }

  const handleOnSelectFaculty = (event: any) => {
    setUserFaculty(event.target.innerText)
    newFacultySelected = findFacultyKey(faculty, event.target.innerText)
    checkChangeData(userInfo?.Faculty, event.target.value, 1)
  }

  const handleOnAboutChange = (event: any) => {
    setAbout(event.target.value)
    checkChangeData(userInfo?.About, event.target.value, 2)
  }

  const handleOnContactChange = (event: any, slot: number) => {
    let contactChecker = null
    let message = event
    switch (slot) {
      case 0:
        contactChecker = userInfo?.Mail
        setMail(message)
        break
      case 1:
        contactChecker = userInfo?.Phone
        setPhone(message)
        break
      case 2:
        contactChecker = userInfo?.Facebook
        setFacebook(message)
        break
      case 3:
        contactChecker = userInfo?.Instagram
        setInstagram(message)
    }
    checkChangeData(contactChecker, message, slot + 3)
  }

  const checkChangeData = (attr, value, index: number) => {
    // Check equal of two string
    if (index != 1) {
      if (attr && !(value === attr)) {
        sectionChangeStatus[index] = true
      } else if (!attr && value != '') {
        sectionChangeStatus[index] = true
      } else {
        sectionChangeStatus[index] = false
      }
    } else {
      if (currentFaculty == newFacultySelected) {
        sectionChangeStatus[index] = false
      } else {
        sectionChangeStatus[index] = true
      }
    }
    if (
      !sectionChangeStatus[0] &&
      !sectionChangeStatus[1] &&
      !sectionChangeStatus[2] &&
      !sectionChangeStatus[3] &&
      !sectionChangeStatus[4] &&
      !sectionChangeStatus[5] &&
      !sectionChangeStatus[6]
    ) {
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
        <h5 className="font-weight-bold mb-4">ประวัติส่วนตัว</h5>
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
              : sectionChangeStatus[0]
              ? 0
              : userInfo?.DisplayName.length}
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
                ? facultyList[newFacultySelected]?.value
                : facultyList[currentFaculty]?.value
            }
            className="rounded-10 bg-primary-dark font-weight-bold d-flex"
            style={{ color: 'aliceblue' }}
            icon={
              <div className="ml-auto">
                <BsFillCaretDownFill />
              </div>
            }
          />
        </div>

        <div className="pt-3">
          <h5 className="font-weight-bold mb-3">เกี่ยวกับตัวฉัน</h5>
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
                : sectionChangeStatus[2]
                ? 0
                : userInfo?.About.length}
              /1000
            </div>
          </InputGroup>
        </div>

        <div className="pt-3 pb-4">
          <h5 className="font-weight-bold mb-3">ช่องทางติดต่อ</h5>
          {contractChannels.map(({ Icon, Placeholder }, idx) => (
            <InputGroup
              className="mb-3 shadow bg-white rounded-10 d-flex justify-content-start"
              style={{ height: '50px' }}
              key={idx}
            >
              <InputGroup.Text
                className="border-0 h-100"
                style={{
                  borderRadius: '10px 0 0 10px',
                  backgroundColor: '#E1E1E1',
                  width: '70px',
                }}
              >
                <img src={Icon} alt="icon" className="h-75" />
              </InputGroup.Text>

              {idx != 1 ? (
                <FormControl
                  className="border-0 h-100"
                  placeholder={Placeholder}
                  aria-label={Placeholder}
                  defaultValue={
                    idx == 0
                      ? userInfo?.Mail
                      : idx == 2
                      ? userInfo?.Facebook
                      : userInfo?.Instagram
                  }
                  onChange={(e) => handleOnContactChange(e.target.value, idx)}
                />
              ) : (
                <div
                  className="d-flex p-0 m-0 w-50"
                  style={{
                    // overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <PhoneInput
                    placeholder={Placeholder}
                    value={userInfo?.Phone}
                    onChange={(phone) => handleOnContactChange(phone, 1)}
                    autoFormat={true}
                    enableSearch={true}
                    containerClass="d-flex w-100"
                    inputClass="d-flex w-100 h-100 m-0 border-0"
                  />
                </div>
              )}
            </InputGroup>
          ))}
        </div>

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
