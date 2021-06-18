import axios from 'axios'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'


import Error from '../common/Error'
import { baseUrl, dreamsPath, commentPath, headers, deleteDream, editPath } from '../../lib/api'
// import { isOwner } from '../../lib/auth'
// import { FormLabel, FormText } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'


function Singledream() {

  const { dreamId } = useParams()
  const history = useHistory()

  const [dream, setdream] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [hasComments, setHasComments] = React.useState(false)

  const isLoading = !dream && !isError

  //* for comments/error state
  const [FormComment, setFormComment] = React.useState({
    text: '',
  })
  const [FormError, setFormError] = React.useState(FormComment)


  //* For page content render
  React.useEffect(() => {

    const getData = async () => {

      try {

        const res = await axios.get(`${baseUrl}${dreamsPath}/${dreamId}`)
        setdream(res.data)
        
      } catch (err) {
        setIsError(true)
      }
    }

    getData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasComments])


  const handleChange = (e) => {
    setFormComment({
      ...FormComment,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    // * to prevent empty comments submissions
    if (FormComment.text) {
      try {

        await axios.post(
          `${baseUrl}${dreamsPath}/${dreamId}/${commentPath}`,
          FormComment,
          headers()
        )

        // * reset comment Input
        e.target.value = ''

        // * force useEffect render on comment submission
        setHasComments(!hasComments)

        // * reset comment Forms to blank
        setFormComment({ ...FormComment, text: '' })
        setFormError('')

      } catch (err) {
        setFormError({ ...FormError, text: err.response.data.errMessage })
      }

    } else {
      return
    }
  }


  // //* Delete a comment 
  // const handleDelete = async (e) => {

  //   e.preventDefault()

  //   try {

  //     await axios.delete(
  //       `${baseUrl}${dreamsPath}/${dreamId}/${commentPath}/${e.target.name}`,
  //       headers()
  //     )

  //     setHasComments(!hasComments)
  //     setFormError({ ...FormComment, text: '' })

  //   } catch (err) {
  //     setFormError({ ...FormError, text: err.response.data.errMessage })
  //   }
  // }

  // //* Delete a dream
  // const handledreamDelete = async () => {
  //   const shouldDelete = confirm('Are you sure you want to delete?')
  //   if (shouldDelete) {
  //     console.log(dream._id)
  //     await deletedream(dream._id)
  //     history.push(dreamsPath)
  //   }
  // }

  //* Edit a dream
  const handledreamEdit = async () => {
    history.push(`${dreamsPath}/${dream._id}${editPath}`)
  }

  return (
    <section>

      {isError && <Error />}
      {isLoading && <p> ... loading</p>}

      {dream && (
        <>
          <h1> Single Dream</h1>
          <Button onClick={handledreamEdit}>Edit</Button>
        </>
      )
      }

    </section>)
}



export default Singledream