import { FC, ReactElement, ReactNode } from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Main from './components/pages/Main'

import 'react-toastify/dist/ReactToastify.css'

type Auth0ProvideProps = {
  children: ReactNode
  domain: any
  clientId: any
  authorizationParams?: object
}

const Auth0ProviderWithRedirectCallback = (
  props: Auth0ProvideProps
): ReactElement => {
  const navigate = useNavigate()
  const onRedirectCallback = (appState: any) => {
    navigate((appState && appState.returnTo) || window.location.pathname)
  }
  return (
    <Auth0Provider
      domain={props.domain}
      clientId={props.clientId}
      authorizationParams={props.authorizationParams}
      onRedirectCallback={onRedirectCallback}
    >
      {props.children}
    </Auth0Provider>
  )
}

const App: FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithRedirectCallback
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
          scope: 'read:current_user update:current_user_metadata update:users',
        }}
      >
        <Main />
        <ToastContainer />
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
  )
}

export default App
