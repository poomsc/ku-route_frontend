import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, { IFileWithMeta, StatusValue } from 'react-dropzone-uploader'
import { upload_file } from 'service/file'
import { copyFile } from 'fs'
import { useEffect, useState } from 'react'

interface Props {
  onChange: (status: StatusValue, allFiles: IFileWithMeta[]) => void
}

let currentFileSuccessCount = 0
let inQueue = 0
let bool = false

function getCurrentFileSuccess() {
  return currentFileSuccessCount
}

function getInQueue() {
  return inQueue
}

function isDropZoneReady() {
  return bool
}

const DropFileZone = ({ onChange }: Props) => {
  const [currentSuccessFile, setCurrentSuccessFile] = useState<IFileWithMeta[]>(
    []
  )

  // called every time a file's `status` changes
  const handleChangeStatus = (
    file: IFileWithMeta,
    status: StatusValue,
    allFiles: IFileWithMeta[]
  ) => {
    console.log(status, file, allFiles)
    onChange(status, allFiles)

    if (status == 'removed') {
      let handleDelete = false
      for (let i = 0; i < currentSuccessFile.length; i++) {
        if (currentSuccessFile[i] == file) {
          handleDelete = true
          break
        }
      }

      if (handleDelete) {
        setCurrentSuccessFile(
          currentSuccessFile.filter((item) => item !== file)
        )
        currentFileSuccessCount--
        // console.log("Current file success: " + currentFileSuccessCount)
      }
    } else if (status == 'done') {
      setCurrentSuccessFile([...currentSuccessFile, file])
      currentFileSuccessCount++
      // console.log("Current file success: " + currentFileSuccessCount)
    }
    setTimeout(() => {
      inQueue = allFiles.length
      bool = inQueue == currentFileSuccessCount
      console.log('Q: ' + inQueue)
      console.log('L: ' + currentFileSuccessCount)
    }, 10)
  }

  // useEffect(() => {

  // }, [han])

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
export { getCurrentFileSuccess, getInQueue, isDropZoneReady }
