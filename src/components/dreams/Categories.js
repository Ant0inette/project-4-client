import React from 'react'
import { Link } from 'react-router-dom'

import Error from '../common/Error'
import { basicURLParse, categoriesPath } from '../../lib/api'

function AllCategories() {
  const [categories, setCategories] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const isLoading = !categories && !isError

  React.useEffect(() =>
  const getData = async () => {

    try {
      const res = await 
    }
  } )


}