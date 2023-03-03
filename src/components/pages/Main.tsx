import { FC, ReactElement } from 'react'
import styled from '@emotion/styled'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { Route, Routes } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import GlobalStyles from '@mui/material/GlobalStyles'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import ProgressLinear from '../atoms/ProgressLinear'
import ProfilePage from './ProfilePage'
import HomePage from './Home'
import LoginPage from './LoginPage'
import CalendarPage from './CalendarPage'
import CustomButton from '../atoms/Button'
import NavRoute from '../molecules/NavRoute'
import RegisterForm from '../molecules/RegisterForm'
import SearchPage from './SearchPage'

const LoginButton = styled(CustomButton)`
  &.btn-login {
    width: 74px;
    border-radius: 4px;
    height: 36px;
    margin: 0;
    text-transform: uppercase;
  }
`
const ProtectedRoute = (args: any) => {
  const Component = withAuthenticationRequired(args.component, args)
  return <Component />
}

const Main: FC = (): ReactElement => {
  const { isLoading, isAuthenticated, logout, loginWithPopup } = useAuth0()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#fbfbfb',
      }}
    >
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <ProgressLinear isLoading={isLoading} />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Test technique
          </Typography>
          <NavRoute />
          {!isAuthenticated ? (
            <LoginButton
              type="button"
              variant={'outlined'}
              onClick={() => loginWithPopup()}
              className={'btn-login'}
            >
              Login
            </LoginButton>
          ) : (
            <LoginButton
              type="button"
              variant={'outlined'}
              onClick={() => logout()}
              className={'btn-login'}
            >
              Logout
            </LoginButton>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ backgroundColor: '#c7c7c70' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/calendar"
            element={<ProtectedRoute component={CalendarPage} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute component={ProfilePage} />}
          />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          textAlign: 'center',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            My sticky footer can be found here.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Main
