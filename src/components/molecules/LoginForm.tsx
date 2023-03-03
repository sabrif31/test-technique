import React from 'react'
import { Typography, Divider } from '@mui/material'
import styled from '@emotion/styled'
import { useAuth0 } from '@auth0/auth0-react'

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

const LoginForm: React.FC = () => {
  const { loginWithPopup } = useAuth0()

  const initialState = {
    email: '',
    password: '',
  }

  const { onChange, onSubmit, values } = useForm(
    loginUserCallback,
    initialState
  )

  async function loginUserCallback() {
    console.log('values', values)
    // send "values" to database
  }

  return (
    <div style={{ width: '300px' }}>
      <FormTypography variant={'h4'}>Login</FormTypography>
      <Form onSubmit={onSubmit}>
        <CustomTextField
          changeHandler={onChange}
          label={'Email'}
          name={'email'}
          type={'email'}
        />
        <CustomTextField
          changeHandler={onChange}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <CustomButton type="submit" variant={'contained'}>
          LOGIN
        </CustomButton>
      </Form>
      <CustomButton
        type="button"
        onClick={() => console.log('Forgot your password')}
      >
        Forgot your password ?
      </CustomButton>
      <Separator />
      <CustomButton
        type="button"
        variant={'outlined'}
        onClick={() => loginWithPopup()}
      >
        Login with Auth0
      </CustomButton>
    </div>
  )
}

export default LoginForm
