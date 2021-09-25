import { useState } from 'react'
import { Button, Dropdown, FormControl, InputGroup } from 'react-bootstrap'
import { useLocation } from 'react-router'
import { generateRandomColor, removeElementFromArray } from 'utils'
import { BsFillCaretDownFill } from 'react-icons/bs'
import facebook from 'assets/icons/facebook.png'
import instagram from 'assets/icons/instagram.png'
import mail from 'assets/icons/mail.png'
import phone from 'assets/icons/phone.png'
import { Dropdown as SMTDropdown } from 'semantic-ui-react'
import DropFileZone from 'components/DropFileZone'
import applicationStore from 'stores/applicationStore'
import { observer } from 'mobx-react-lite'
import { IFileWithMeta, StatusValue } from 'react-dropzone-uploader'
import { create_post } from 'service/user'
import { delete_post } from 'service/system'

const subjects = [
  {
    key: '02212641-55',
    value: '02212641-55',
    text: '02212641-55 สเปกโทรสโกปีอินฟราเรดใกล้ขั้นสูง',
  },
  {
    key: '02743552-60',
    value: '02743552-60',
    text: '02743552-60 นิติการบัญชีและการเงิน',
  },
  {
    key: '01204111-55',
    value: '01204111-55',
    text: '01204111-55 คอมพิวเตอร์และการโปรแกรม',
  },
]

const contractChannels = [
  { Icon: mail, Placeholder: 'hello@kuroute.com' },
  { Icon: phone, Placeholder: '09-234-5678' },
  { Icon: facebook, Placeholder: 'https://www.facebook.com/kuroute' },
  { Icon: instagram, Placeholder: 'https://www.instagram.com/kuroute' },
]

const pathType = { '/create-post': true, '/edit-post': false }

const VersatilePost = observer(() => {
  const preprocessTags = generateRandomColor(
    [
      'ทั่วไป',
      'รีวิวรายวิชา',
      'คลังความรู้',
      'แบบฝึกหัด',
      'Lecture',
      'สรุป',
      'อื่นๆ',
    ].map((t) => {
      return { text: t }
    })
  )
  const [topicSelected, setTopicSelected] = useState(subjects[0].text)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [tags, setTags] = useState<{ [name: string]: string }[]>(preprocessTags)
  const [tagsSelected, setTagSelected] = useState<string[]>([])
  const [filesUpload, setFilesUpload] = useState<{
    status: StatusValue
    allFiles: IFileWithMeta[]
  }>({ status: 'done', allFiles: [] })

  const { pathname } = useLocation()
  const isNewPost = pathType[pathname]

  const handleOnTagChange = (value: string, event: 'add' | 'remove') => {
    if (event === 'add') {
      setTagSelected([...tagsSelected, value])
    } else {
      setTagSelected(removeElementFromArray(tagsSelected, value))
    }
  }

  const handleOnSelectSubject = (event: any) => {
    setTopicSelected(event.target.innerText)
  }

  const onFileChange = (status: StatusValue, allFiles: IFileWithMeta[]) => {
    setFilesUpload({ status, allFiles })
  }

  const handelOnCreatePost = () => {
    if (filesUpload.status !== 'done' || !applicationStore.user) return
    // create_post
    create_post(
      {
        AccountID: applicationStore.user.uid,
        TagID: tagsSelected,
        SubjectID: topicSelected,
        Title: title,
        Description: description,
      },
      filesUpload.allFiles
    )
  }

  const handleOnDeletePost = () => {
    // delete_post()
  }

  return (
    <div className="white-bg py-5">
      <h2 className="font-weight-bold text-center mb-5">
        {isNewPost ? 'สร้างโพสต์' : 'แก้ไขโพสต์'}
      </h2>

      <div
        className="rounded-25 shadow mx-auto mb-4"
        style={{ maxWidth: '70rem' }}
      >
        <SMTDropdown
          placeholder="กรุณาเลือกวิชา"
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
      <div
        className="bg-secondary p-5 rounded-25 shadow mx-auto mb-4"
        style={{ maxWidth: '70rem' }}
      >
        {/* <div className="bg-secondary p-4" style={{borderRadius: '20px'}}> */}
        <p className="font-weight-bold">หัวเรื่อง</p>
        <InputGroup className="rounded-10 bg-white mb-4">
          <FormControl
            aria-label="title"
            className="rounded-10 border-0"
            placeholder="หัวข้อโพสต์..."
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

        <p className="font-weight-bold">ข้อความ</p>
        <InputGroup>
          <FormControl
            as="textarea"
            rows={8}
            className="rounded-10 border-0 mb-4"
            placeholder="รายละเอียดเกี่ยวกับโพสต์..."
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
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
            {description?.length}/500
          </div>
        </InputGroup>

        <p className="font-weight-bold">Tag</p>
        <div className="d-flex">
          {tagsSelected.map((tag, idx) => (
            <div
              className="max-w-content px-2 rounded cursor-pointer align-self-center px-2 py-1 mr-2"
              key={tag}
              onClick={() => handleOnTagChange(tag, 'remove')}
              style={{
                backgroundColor: tags.find((t) => t.text === tag)?.color,
              }}
            >
              {tag}
            </div>
          ))}
          <Dropdown className="rounded">
            <Dropdown.Toggle
              id="dropdown-custom-components"
              className="px-2 py-1 rounded border-0"
            >
              + เพิ่ม
            </Dropdown.Toggle>

            <Dropdown.Menu className="px-2 py-0">
              {tags
                .filter((tag) => !tagsSelected.includes(tag.text))
                .map((tag, idx) => (
                  <Dropdown.Item
                    eventKey={idx}
                    style={{ backgroundColor: tag.color }}
                    className="rounded my-2"
                    onClick={() => handleOnTagChange(tag.text, 'add')}
                    key={tag.text}
                  >
                    {tag.text}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div
        className="bg-secondary p-5 rounded-25 shadow mx-auto mb-4"
        style={{ maxWidth: '70rem' }}
      >
        <h5 className="font-weight-bold mb-3">แนบไฟล์เพิ่มเติม</h5>
        <DropFileZone onChange={onFileChange} />
      </div>
      <div
        className="bg-secondary p-5 rounded-25 shadow mx-auto"
        style={{ maxWidth: '70rem' }}
      >
        <h5 className="font-weight-bold mb-3">ช่องทางติดต่อ</h5>
        {contractChannels.map(({ Icon, Placeholder }, idx) => (
          <InputGroup className="mb-3" style={{ height: '50px' }} key={idx}>
            <>
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
              <FormControl
                className="border-0 h-100"
                placeholder={Placeholder}
                aria-label={Placeholder}
              />
            </>
          </InputGroup>
        ))}
      </div>
      <div className="mx-auto my-5" style={{ maxWidth: '70rem' }}>
        <div className="d-flex justify-content-end">
          {!isNewPost && (
            <Button
              variant="danger"
              style={{ width: '7rem' }}
              onClick={handleOnDeletePost}
            >
              DELETE
            </Button>
          )}
          <div className="mx-2" />
          <Button style={{ width: '7rem' }} onClick={handelOnCreatePost}>
            PUBLISH
          </Button>
        </div>
      </div>
    </div>
  )
})

export default VersatilePost
