import React from 'react'
import { Container, createTheme, ThemeProvider } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/NavBar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ['Oswald', 'sans-serif', 'Poppins', 'sands-serif'].join(',')
    },
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff'
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000'
      }
    }
  })

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container maxWidth='lg'>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/auth' exact component={Auth} />
          </Switch>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
