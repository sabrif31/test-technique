import React, { useState, useEffect } from 'react'
import { Typography, Divider } from '@mui/material'
import styled from '@emotion/styled'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import _isEmpty from 'lodash/isEmpty'
import _groupBy from 'lodash/groupBy'

import CustomTextField from '../atoms/TextField'
import CustomButton from '../atoms/Button'

import { useForm } from '../../hooks/useForm'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const FormTypography = styled(Typography)`
  margin: 0px 0 8px 0;
`
const Separator = styled(Divider)`
  margin: 0px 0 8px 0;
`
const initialState = {
  email: '',
  password: '',
  given_name: '',
  family_name: '',
}

const RegisterForm: React.FC = () => {
  const { loginWithPopup } = useAuth0()
  const [disabled, setDisabled] = useState<boolean>(true)

  // 8i@3P1VeFMyj
  const signupUserCallback = async () => {
    const options = {
      method: 'POST',
      url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/dbconnections/signup `,
      data: {
        connection: 'Username-Password-Authentication',
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        email: values.email,
        password: values.password,
        given_name: values.given_name,
        family_name: values.family_name,
        name: `${values.given_name} ${values.family_name}`,
      },
    }
    await axios
      .request(options)
      .then((response) => {
        console.log('response', response)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const { onChange, onSubmit, values } = useForm(
    signupUserCallback,
    initialState
  )

  useEffect(() => {
    const validForm = _groupBy(values, _isEmpty)
    setDisabled(typeof validForm.true !== 'undefined')
  }, [values])

  return (
    <>
      <FormTypography variant={'h4'}>Register</FormTypography>
      <Form onSubmit={onSubmit}>
        <CustomTextField
          required
          changeHandler={onChange}
          label={'Email'}
          name={'email'}
          type={'email'}
        />
        <CustomTextField
          required
          changeHandler={onChange}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <CustomTextField
          required
          changeHandler={onChange}
          label={'Given name'}
          name={'given_name'}
          type={'text'}
        />
        <CustomTextField
          required
          changeHandler={onChange}
          label={'Family name'}
          name={'family_name'}
          type={'text'}
        />
        <CustomButton type="submit" variant={'contained'} disabled={disabled}>
          Signup
        </CustomButton>
      </Form>
      <Separator />
      <CustomButton
        sx={{ backgroundColor: 'green' }}
        type="button"
        variant={'contained'}
        onClick={() => loginWithPopup()}
      >
        Signup/Signin with Auth0
      </CustomButton>
    </>
  )
}

export default RegisterForm
