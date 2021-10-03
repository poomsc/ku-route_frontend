import { observer } from 'mobx-react'
import { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import applicationStore from 'stores/applicationStore'
import { disable } from 'service/user'
import 'bootstrap/dist/css/bootstrap.min.css'

interface Props {
  onClick: (PostID: string) => void
  PostID: string
}

const ModalFavouriteMenu = observer(({ PostID, onClick }: Props) => {
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
      size="mini"
      dimmer="blurring"
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
        <Button onClick={() => handleOnDelete()} negative>
          ตกลง
        </Button>
      </Modal.Actions>
    </Modal>
  )
})

export default ModalFavouriteMenu
