import { useState, useEffect, ReactElement, FC } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from '@emotion/styled'
import axios from 'axios'
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useForm } from '../../hooks/useForm'
import CustomButton from '../atoms/Button'
import ProgressLinear from '../atoms/ProgressLinear'
import CustomTextField from '../atoms/TextField'

type ProfileProps = {
  picture?: string
  name?: string
  email?: string
  family_name?: string
  given_name?: string
  user_id?: string
  address?: string
  user_metadata?: any
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 45%;
  }
`
const ProfileContainer = styled.div`
  .profile-input {
    margin-bottom: 20px;
  }
`
const ProfileInfo = styled.div`
  display: flex;
  margin-bottom: 20px;

  div {
    width: 100%;
    padding-left: 15px;

    h2,
    h5 {
      margin: 0;
    }
  }
`
const ProfileImage = styled.img`
  border-radius: 50%;
`

const Profile: FC = (props: ProfileProps): ReactElement => {
  const notify = () => toast('Le profile a été mis à jour !')
  const initialState = {}
  const { user, getAccessTokenSilently, logout } = useAuth0()
  const [userMetadata, setUserMetadata] = useState<ProfileProps>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [accessToken, setAccessToken] = useState<string>('')

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const access_token = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
            scope: 'read:current_user update:current_user_metadata',
          },
        })
        setAccessToken(access_token)

        const userDetailsByIdUrl = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user?.sub}`

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })

        const userData = await metadataResponse.json()
        setUserMetadata(userData)
        setIsLoading(false)
      } catch (e: any) {
        console.log(e.message)
      }
    }
    setIsLoading(true)
    getUserMetadata()
  }, [getAccessTokenSilently, user?.sub])

  const updateUserCallback = async () => {
    const options = {
      method: 'PATCH',
      url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userMetadata.user_id}`,
      headers: {
        authorization: 'Bearer ' + accessToken,
        'content-type': 'application/json',
      },
      data: {
        user_metadata: {
          ...values,
        },
      },
    }
    await axios
      .request(options)
      .then((response) => {
        notify()
        console.log('response', response)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const { onChange, onSubmit, values } = useForm(
    updateUserCallback,
    initialState
  )

  return (
    <>
      <ProgressLinear isLoading={isLoading} />
      {!isLoading ? (
        <ProfileContainer>
          <ProfileInfo>
            <ProfileImage
              src={userMetadata?.picture}
              alt={userMetadata?.name}
              width={110}
            />
            <Box>
              <Typography variant="h2">{userMetadata?.name}</Typography>
              <Typography variant="h5">{userMetadata?.email}</Typography>
            </Box>
          </ProfileInfo>
          <CustomTextField
            className={'profile-input'}
            changeHandler={onChange}
            defaultValue={userMetadata?.user_metadata?.address}
            label={'Address'}
            name={'address'}
            type={'text'}
          />
          <CustomTextField
            className={'profile-input'}
            changeHandler={onChange}
            defaultValue={userMetadata?.user_metadata?.phone_number}
            label={'Phone number'}
            name={'phone_number'}
            type={'text'}
          />
          <ButtonContainer>
            <CustomButton
              type="button"
              variant={'contained'}
              onClick={onSubmit}
            >
              Sauvegarder
            </CustomButton>
            <CustomButton
              type="button"
              variant={'outlined'}
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: window.location.origin,
                  },
                })
              }
            >
              Se déconnecter
            </CustomButton>
          </ButtonContainer>
        </ProfileContainer>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default Profile
