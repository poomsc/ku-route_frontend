import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, { IFileWithMeta, StatusValue } from 'react-dropzone-uploader'
import { upload_file } from 'service/file'
import { copyFile } from 'fs'

const DropFileZone = () => {
  // called every time a file's `status` changes
  const handleChangeStatus = (
    file: IFileWithMeta,
    status: StatusValue,
    allFiles: IFileWithMeta[]
  ) => {
    console.log(status, file, allFiles)
  }

  return (
    <Dropzone
      styles={{
        dropzone: {
          borderStyle: 'dashed',
          borderRadius: '10px',
          overflowX: 'hidden',
          overflow: 'auto',
        },
      }}
      onChangeStatus={handleChangeStatus}
      // onSubmit={handleSubmit}
      // accept="image/*,audio/*,video/*"
    />
  )
}

export default DropFileZone
