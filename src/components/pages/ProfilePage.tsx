import { FC, ReactElement } from 'react'
import BlockBox from '../organisms/Box'
import Profile from '../molecules/Profile'

const ProfilePage: FC = (): ReactElement => {
  return (
    <BlockBox>
      <Profile />
    </BlockBox>
  )
}

export default ProfilePage
