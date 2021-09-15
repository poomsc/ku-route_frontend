import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { upload_file } from 'service/file'
import { copyFile } from 'fs'

const DropFileZone = () => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: 'https://httpbin.org/post' }
  }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file)
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    //console.log(files.map((f) => f.meta))
    const array_file = files.map((f)=>f.file)
    console.log(files)
    console.log(array_file)
    array_file.forEach(f => upload_file(f))
    allFiles.forEach((f) => f.remove())

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
      // onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      // accept="image/*,audio/*,video/*"
    />
  )
}

export default DropFileZone
