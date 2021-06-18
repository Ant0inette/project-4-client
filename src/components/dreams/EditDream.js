// import React from 'react'
// import axios from 'axios'
// import { useParams, useHistory } from 'react-router'
// import moment from 'moment'


// import ImageUploadField from './ImageUploadField'
// import { useForm } from '../../hooks/useForm'
// import {  baseUrl, editDream, dreamsPath } from '../../lib/api'

// function EditDream() {
//   const history = useHistory()
//   const { dreamId } = useParams()

//   function formatTagArray(tags) {

//     if (typeof tags === 'string') {
//       const tagsArray = tags.replace(/[^a-zA-Z0-9]/g, ' ').split(' ')
//       const sanitisedTagsArray = tagsArray.filter(tag => tag !== '')
//       return sanitisedTagsArray
//     }

//     return tags

//   }

//   const { formData, setFormData, handleChange, formError, setFormError } = useForm({
//     title: '',
//     date: '',
//     image: '',
//     description: '',
//     caption:'',
//     type: '',
//     themes:'',
//     characters:'',
//     emotions:'',
//     settings:''

//     user: '',
//   })
  
//   React.useEffect(() => {

//     const getData = async () => {

//       try {

//         const res = await axios.get(`${baseUrl}${dreamssPath}/${dreamId}`)
//         setFormData(res.data)

//       } catch (err) {
//         setFormError(err.response.data.errorss)
//       }
//     }

//     getData()

//   }, [dreamId, setFormData, setFormError])


//   const handleDanger = (e) => {

//     const emptyField = (e.target.value.length === 0)
//     const requiredFields = ['title', 'date', 'description', 'caption']

//     if (requiredFields.includes(e.target.name) && emptyField) {
//       setFormError({ ...formError, [e.target.name]: 'Required field.' })
//     }

//     if (formError.errMessage) {
//       setFormError({ ...formError, errMessage: '' })
//     }
//   }

//   const handleUpload = (file) => {
//     handleChange({ target: { name: 'image', value: file } })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const res = await editdream(dreamId, formData)
//       console.log('res',res.data)
//       history.push(`${dreamsPath}/${dreamId}`)
//     } catch (err) {
//       setFormError({ ...formError, errMessage: err.response.data.errMessage })
//     }
//   }

//   return (
//     <>
//       <h1>edit dream</h1>
//       <section>

//         <container>
//             <form
//               onSubmit={handleSubmit}
//             >

//               <div htmlFor="title">
//                 <label>Title</label>

//                   <input
//                     className={`input
//                     ${formError.title
//                       ||
//                       formError.errMessage ? 'is-danger' : ''}`}
//                     type="text"
//                     placeholder="A Great Day to Get a Perm"
//                     name="title"
//                     onChange={handleChange}
//                     onBlur={handleDanger}
//                     value={formData.title}
//                     required
//                   />

//                 <div> {formError.title
//                   &&
//                   <p className="help is-danger">
//                     {formError.title}
//                   </p>
//                 }
//                 </div>

//               <div className="field" htmlFor="title">
//                 <label className="label has-text-white">
//                  Describe the dream
//                 </label>
//                 <div className="control">

//                   <input
//                     className={`input ${formError.description || formError.errMessage ? 'is-danger' : ''}`}
//                     type="text"
//                     placeholder="I was floating in the air, when suddenly..."
//                     name="location"
//                     onChange={(e) => {
//                       handleNestedChange(e)
//                       setFormError({ ...formError, location: '' })
//                     }}
//                     value={formData.location.userInput || ''}
//                     onSubmit={handleDanger}
//                     required
//                     disabled
//                   />

//                 </div>
//                 {formError.location && <p className="help is-danger">{formError.location}</p>}
//               </div>
//               </
// {/* 
//               <div className="field" htmlFor="title">
//                 <label className="label has-text-white">dream Date</label>
//                 <div className="control">

//                   <input
//                     className={`input ${formError.description|| formError.errMessage ? 'is-danger' : ''}`}
//                     type="text"
//                     name="date"
//                     onChange={handleChange}
//                     value={formData.description}
//                     required
//                   />

//                 </div>
//                 {formError.date && <p className="help is-danger">{formError.date}</p>}
//               </div>

//               <div className="field" htmlFor="title">
//                 <label className="label has-text-white">Description</label>
//                 <div className="control">

//                   <input
//                     className={`input ${formError.description || formError.errMessage ? 'is-danger' : ''}`}
//                     type="text"
//                     placeholder="e.g. Roses are red, violets are blue"
//                     name="description"
//                     onChange={handleChange}
//                     onBlur={handleDanger}
//                     value={formData.description}
//                     required
//                   />

//                 </div>
//                 {formError.description && <p className="help is-danger">{formError.description}</p>}
//               </div>

//               <div className="field" htmlFor="title">
//                 <label className="label has-text-white">Tags</label>
//                 <div className="control">

//                   <input
//                     className={`input ${formError.errMessage ? 'is-danger' : ''}`}
//                     type="text"
//                     placeholder="e.g. crazy, miraculous, romantic"
//                     name="tags"
//                     onChange={handleTags}
//                     value={formData.tags}
//                   />

//                 </div>
//               </div>

//               <div>
//                 <ImageUploadField onUpload={handleUpload} />
//               </div>

//               <div className="field">
//                 <button type="submit" className="button is-warning is-fullwidth">
//                   Send Updated dream
//                 </button>
//               </div>

//               <figure>
//                 <img className="image is-256x256" src="https://imgur.com/bWMKvl8.png" />
//               </figure>
//             </form>

//             <div className="column is-half">
//               {formError.errMessage && <p className="help is-danger">{formError.errMessage}</p>}
//               <MapboxSearch onResult={handleNestedChange} />
//             </div>

//           // </div> */}
//         </container>
//       </section>
//     </>
//   )
// }

// export default Editdream
