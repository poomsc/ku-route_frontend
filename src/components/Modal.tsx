import { observer } from 'mobx-react'
import { useState, ReactElement } from 'react'
import { Button, Modal, Dropdown } from 'semantic-ui-react'
import applicationStore from 'stores/applicationStore'
import { disable } from 'service/user'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo_delete from '../assets/icons/Vector.png'

interface postProps {
  onClick: (PostID: string) => void
  PostID: string
}

interface commentProps {
  CommentID: string
  onClick: (CommentID: string) => void
  children: ReactElement<any, any>
}

const ModalFavouriteMenu = observer(({ PostID, onClick }: postProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOnDelete = async () => {
    if (!applicationStore.user) return
    await disable(
      {},
      'Like:' + applicationStore.user.uid + '_' + PostID,
      'Like'
    )
    setOpen(false)
    onClick(PostID)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <div className="removebutton max-w-content d-inline-block cursor-pointer">
          REMOVE
        </div>
      }
      open={open}
      size="tiny"
      dimmer="blurring"
      className="h-auto"
    >
      <Modal.Header>Unlike Post</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p style={{ fontSize: '16px' }}>คุณต้องการยกเลิกถูกใจโพสต์นี้ ?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          ยกเลิก
        </Button>
        <Button onClick={() => handleOnDelete()} negative>
          ตกลง
        </Button>
      </Modal.Actions>
    </Modal>
  )
})

const ModalEditPostMenu = observer(({ PostID, onClick }: postProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOnDelete = async () => {
    if (!applicationStore.user) return
    await disable({}, PostID, 'Post')
    setOpen(false)
    onClick(PostID)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <div className="removebutton max-w-content d-inline-block cursor-pointer hover-darken">
          REMOVE
        </div>
      }
      open={open}
      size="tiny"
      dimmer="blurring"
      className="h-auto"
    >
      <Modal.Header>Delete Post</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p style={{ fontSize: '16px' }}>คุณต้องการลบโพสต์นี้ ?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          ยกเลิก
        </Button>
        <Button onClick={() => handleOnDelete()} negative>
          ตกลง
        </Button>
      </Modal.Actions>
    </Modal>
  )
})

const ModalDisableComment = observer(
  ({ CommentID, onClick, children }: commentProps) => {
    const [open, setOpen] = useState<boolean>(false)

    const handleOnDelete = async () => {
      if (!applicationStore.user) return
      await disable({}, CommentID, 'Comment')
      setOpen(false)
      onClick(CommentID)
    }

    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={children}
        size="tiny"
        dimmer="blurring"
        className="h-auto"
      >
        <Modal.Header>Delete Comment</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p style={{ fontSize: '16px' }}>คุณต้องการลบความคิดเห็นนี้ ?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            ยกเลิก
          </Button>
          <Button onClick={() => handleOnDelete()} negative>
            ตกลง
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
)

const ModalReport = observer(
  ({ CommentID, onClick, children }: commentProps) => {
    const [open, setOpen] = useState<boolean>()

    //useEffect
    const [filter, setFilter] = useState([
      'เนื้อหาไม่เหมาะสม',
      'ใช้คำหยาบ',
      'สแปม',
      'คุกคามทางเพศ',
      'Lecture',
      'แบบฝึกหัด',
      'อื่นๆ',
    ])

    const statusFilter = {
      เนื้อหาไม่เหมาะสม: false,
      ใช้คำหยาบ: false,
      สแปม: false,
      คุกคามทางเพศ: false,
      Lecture: false,
      แบบฝึกหัด: false,
      อื่นๆ: false,
    }

    const changeStatus = (TagID: string) => {
      statusFilter[TagID] = !statusFilter[TagID]
      console.log(statusFilter)
      setOpen(true)
    }

    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={children}
        size="tiny"
        dimmer="blurring"
        className="h-auto"
      >
        <Modal.Header>Report</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {filter.map((filter) => (
              <div style={{ color: 'black', fontSize: '18px' }}>
                <form>
                  <input
                    type="checkbox"
                    className="checkbox-round"
                    style={{
                      boxSizing: 'border-box',
                    }}
                    onClick={() => changeStatus(filter)}
                  />
                  <label>&nbsp;&nbsp;{filter}</label>
                </form>
              </div>
            ))}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            ยกเลิก
          </Button>
          <Button onClick={() => setOpen(false)} negative>
            ตกลง
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
)

export {
  ModalFavouriteMenu,
  ModalEditPostMenu,
  ModalDisableComment,
  ModalReport,
}
