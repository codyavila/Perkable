import React from 'react'
import { AppBar, Typography } from '@material-ui/core'

import useStyles from './styles'

const Navbar = () => {
  const classes = useStyles()

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Typography className={classes.heading} variant='h2' align='center'>
        Games
      </Typography>
      {/* A game image will go here once made */}
      <img className={classes.image} src='' alt='Games' height='60' />
    </AppBar>
  )
}

export default Navbar