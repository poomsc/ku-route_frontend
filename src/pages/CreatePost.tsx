import React, { SyntheticEvent, useState } from 'react'
import {
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
} from 'react-bootstrap'
import { removeElementFromArray } from 'utils'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { GoFile } from 'react-icons/go'
import facebook from 'assets/icons/facebook.png'
import instagram from 'assets/icons/instagram.png'
import mail from 'assets/icons/mail.png'
import phone from 'assets/icons/phone.png'
import { Dropdown as SMTDropdown } from 'semantic-ui-react'
import DropFileZone from 'components/DropFileZone'

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

const colors = [
  '#5697C4',
  '#E0598B',
  '#E278A3',
  '#9163B6',
  '#993767',
  '#A34974',
  '#BE5168',
  '#C84A52',
  '#E16452',
  '#F19670',
  '#E9D78E',
  '#E4BE7F',
  '#74C493',
]
const mockTags = ['ทั่วไป', 'รีวิวรายวิชา', 'คลังความรู้', 'อื่นๆ']
const contractChannels = [
  { Icon: mail, Placeholder: 'hello@kuroute.com' },
  { Icon: phone, Placeholder: '09-234-5678' },
  { Icon: facebook, Placeholder: 'https://www.facebook.com/kuroute' },
  { Icon: instagram, Placeholder: 'https://www.instagram.com/kuroute' },
]
const CreatePostPage = () => {
  const preprocessTags = mockTags.map((tag) => {
    const hue = Math.floor(Math.random() * 360)
    const pastel = 'hsl(' + hue + ', 100%, 80%)'
    return {
      text: tag,
      color: pastel,
    }
  })

  const [topicSelected, setTopicSelected] = useState(subjects[0].text)
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [tags, setTags] = useState<{ [name: string]: string }[]>(preprocessTags)
  const [tagsSelected, setTagSelected] = useState<string[]>([])
  const [fileUploaded, setFileUploaded] = useState<File[]>()

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

  const handleOnBrowsFile = (event: any) => {
    console.log(Array.from(event.target.files))

    setFileUploaded(Array.from(event.target.files))
  }

  return (
    <div className="white-bg py-5">
      <h2 className="font-weight-bold text-center mb-5">สร้างโพสต์</h2>

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

        <>
          <p className="font-weight-bold">อัพโหลดความรู้</p>
          <div className="input-group mb-4">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                multiple
                onChange={(e) => handleOnBrowsFile(e)}
              />
              <label className="custom-file-label">Choose file</label>
            </div>
          </div>

          {fileUploaded &&
            fileUploaded.map((file) =>
              file.type.includes('image') ? (
                <img
                  alt="preview"
                  src={URL.createObjectURL(file)}
                  style={{ maxWidth: '200px', maxHeight: '150px' }}
                  className="mx-2"
                />
              ) : (
                <GoFile
                  className="w-100 h-100"
                  style={{ maxWidth: '120px', maxHeight: '120px' }}
                />
              )
            )}
        </>

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
        <DropFileZone />
      </div>
      <div
        className="bg-secondary p-5 rounded-25 shadow mx-auto"
        style={{ maxWidth: '70rem' }}
      >
        <h5 className="font-weight-bold mb-5">ช่องทางติดต่อ (ไม่บังคับ)</h5>
        {contractChannels.map(({ Icon, Placeholder }) => (
          <InputGroup className="mb-3" style={{ height: '50px' }}>
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
    </div>
  )
}

export default CreatePostPage
