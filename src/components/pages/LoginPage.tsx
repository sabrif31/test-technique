import { FC, ReactElement } from 'react'
import LoginForm from '../molecules/LoginForm'
import BlockBox from '../organisms/Box'

const LoginPage: FC = (): ReactElement => {
  return (
    <BlockBox>
      <LoginForm />
    </BlockBox>
  )
}

export default LoginPage
