import { FC, ReactElement, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'

type NavRouteType = {
  isProtected: boolean
  navigate: string
  label: string
}

const sx = { my: 1, mx: 1.5, cursor: 'pointer', textDecoration: 'none' }

const NavRoute: FC = (): ReactElement => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth0()
  const [navRoute] = useState<Array<NavRouteType>>([
    { navigate: '/', label: 'Home', isProtected: false },
    { navigate: '/calendar', label: 'calendar', isProtected: true },
    { navigate: '/profile', label: 'Profile', isProtected: true },
    { navigate: '/search', label: 'Search', isProtected: false },
  ])

  return (
    <nav>
      {navRoute.map((route) => {
        if (!route.isProtected) {
          if (route.navigate === '/register') {
            if (!isAuthenticated) {
              return (
                <Link
                  key={route.label}
                  onClick={() => navigate(route.navigate)}
                  variant="button"
                  color="text.primary"
                  sx={sx}
                >
                  {route.label}
                </Link>
              )
            }
            return false
          } else {
            return (
              <Link
                key={route.label}
                onClick={() => navigate(route.navigate)}
                variant="button"
                color="text.primary"
                sx={sx}
              >
                {route.label}
              </Link>
            )
          }
        } else {
          return (
            isAuthenticated && (
              <Link
                key={route.label}
                onClick={() => navigate(route.navigate)}
                variant="button"
                color="text.primary"
                sx={sx}
              >
                {route.label}
              </Link>
            )
          )
        }
      })}
    </nav>
  )
}

export default NavRoute
