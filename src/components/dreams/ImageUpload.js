
import React from 'react'
import Button from 'react-bootstrap/Button'
import  Image  from 'react-bootstrap/Image'

const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

function ImageUpload({ onUpload }) {
  const [image, setImage] = React.useState('')

  function handleUpload() {

    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'dhtnqavlg',
          uploadPreset,
          sources: ['local'],
          multiple: false,
        }, (err, result) => {
          if (err) console.log(err)
          if (result.event === 'success') {
            setImage(result.info.url)
            onUpload(result.info.url)
          }
        }
      )
      .open()
  }

  return (
    <>
      {image && <Image src={image} alt="uploaded profile"/>}
      {!image && <Button onClick={handleUpload} type="button" className="button is-info is-fullwidth">Upload Profile Image</Button>}
    </>
  )
}

export default ImageUpload