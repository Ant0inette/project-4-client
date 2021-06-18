// import React from 'react'
// import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'


// function IframePage() {

//   return (
//     <div style={{ width: 660, height: 'auto' }}>
//       <ResponsiveEmbed aspectRatio="16by9">
//         <iframe src="https://www.youtube.com/embed/nsjDnYxJ0bo" />
//       </ResponsiveEmbed>
//     </div>
//   )
// }

// export default IframePage

import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ width: 660, height: 'auto' }}>
          <ResponsiveEmbed aspectRatio="16by9">
            <iframe src="https://www.youtube.com/embed/nsjDnYxJ0bo" />
          </ResponsiveEmbed>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

function IframePage() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="info" onClick={() => setModalShow(true)}>
      Imaging Brain Activity at UC Berkeley   <img src="https://i.imgur.com/wuy1hWv.png" alt="button" />
        
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default IframePage






