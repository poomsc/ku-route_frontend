import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ModalText = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
      size="mini"
    >
      <Modal.Header>Delete Post</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>คุณแน่ใจหรือไม่ในการลบโพสต์นี้</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          ยกเลิก
        </Button>
        <Button content="ตกลง" onClick={() => setOpen(false)} negative />
      </Modal.Actions>
    </Modal>
  )
}

export default ModalText
