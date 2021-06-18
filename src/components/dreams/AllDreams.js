import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Error from '../common/Error'
import { baseUrl, dreamsPath } from '../../lib/api'

function AllDreams() {

  const [dreams, setDreams] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const isLoading = !dreams && !isError


  React.useEffect(() => {

    const getData = async () => {

      try {

        const res = await axios.get(`${baseUrl}${dreamsPath}`)
        setDreams(res.data)

      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  //* search functions
  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  const filteredDreams = dreams?.filter((dream) => {
    return (
      dream.title.toLowerCase().includes(searchTerm) ||
      dream.type.includes(searchTerm) ||
      dream.setting.includes(searchTerm) ||
      dream.characters.includes(searchTerm) ||
      dream.themes.includes(searchTerm) ||
      dream.emotions.includes(searchTerm) ||
      dream.date.includes(searchTerm)
    )
  })

  return (
    <>
      <section>

        <h1>
          Dreams
        </h1>

        <container>

          {isError && <Error />}
          {isLoading && <p>...loading</p>}


          <aside >
            <input
              type="text"
              placeholder="Find dream..."
              onChange={handleInput}
              value={searchTerm}
            />

            <button onClick={handleClear}>
              Clear
            </button>

          </aside>


          {filteredDreams && (filteredDreams.map(dream =>

            <div key={dream._id}>
              <Link to={`${dreamsPath}/${dream._id}`}>
                <h3>{dream.title}</h3>

                <h5>
                  {dream.date}
                </h5>
                <img
                  height="256px"
                  width="256px"
                  src={dream.image}
                  alt={dream.title}
                />
                <p>{dream.description}</p>

              </Link>
            </div>

          ))}
        </container>
      </section>
    </>




  )
}
export default AllDreams