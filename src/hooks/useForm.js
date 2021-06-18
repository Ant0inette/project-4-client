import React from 'react'

export function useForm(initialFormData) {

  const [formData, setFormData] = React.useState(initialFormData)
  const [formError, setFormError] = React.useState(initialFormData)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormError({ ...formError, [e.target.name]: '' })
  }

  return {
    formData,
    setFormData,
    handleChange,
    formError,
    setFormError,
  }
}