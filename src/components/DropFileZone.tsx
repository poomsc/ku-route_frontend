import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, { IFileWithMeta, StatusValue } from 'react-dropzone-uploader'
import { upload_file } from 'service/file'
import { copyFile } from 'fs'

interface Props {
  onChange: (status: StatusValue, allFiles: IFileWithMeta[]) => void
}

const DropFileZone = ({ onChange }: Props) => {
  // called every time a file's `status` changes
  const handleChangeStatus = (
    file: IFileWithMeta,
    status: StatusValue,
    allFiles: IFileWithMeta[]
  ) => {
    console.log(status, file, allFiles)
    onChange(status, allFiles)
  }

  const getUploadParams = ({ meta }) => {
    return { url: 'https://httpbin.org/post' }
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
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      // onSubmit={handleSubmit}
      // accept="image/*,audio/*,video/*"
    />
  )
}

export default DropFileZone
