
export const apiURL = 'https://attngan-19b49156.hosted-models.runwayml.cloud/v1/query'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function DreamVisualiser() {
  // * GAN requests section

  // * 
  class handleChange = (e) => { 
    setRequestTerm(e.target.value)
  }

  const handleClear = () => {
    setRequestTerm('')
  }

  const inputs = {
    'prompt': 'Describe the dream visually in a few words',
    'max_characters': 512,
  }

  // Replace this Hosted Model URL with your own
  fetch('https://attngan-19b49156.hosted-models.runwayml.cloud/v1/query', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer UDM/pHKVUx8JEhVY2Pqtzg==', // Replace <token> with your Hosted Models's authorization token
    },
    body: JSON.stringify(inputs),
  })
    .then(response => response.json())
    .then(outputs => {
      const { result } = outputs
      // use the outputs in your project
      console.log(`The model responded to the prompt like so: ${result}`)
      if (!result) {
        console.log('The model did not understand, could you describe in other words?')
      }
      return {result}
    })
  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label placeholder='Describe the dream visually in a few words'></Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleRequest}>
          Submit
        </Button>
      </Form>
       
        <img src={result} />

     </Container>









  )
}

      export default DreamVisualiser