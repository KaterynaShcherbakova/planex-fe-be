import React, { Component } from 'react'
import { Container, Grid, Paper } from '@mui/material';
import './FooterHome.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGithub,
    faGoogle,
    faFacebook,
    faTwitter,
    faLinkedin
  } from '@fortawesome/free-brands-svg-icons';
const classes = {
    rootFooter: {
      flexGrow: 1,
    },
    paperFooter: {
      padding: 20,
      textAlign: "center",
      backgroundColor: 'transparent',
      boxShadow: "none",
      backgroundSize:"cover",
      backgroundPosition:"center",
      paddingTop: "20vh",
      alignItems: "flex-start"
    }
  };

export default class FooterHome extends Component {
  render() {
    return (
        <div id ='contacts'>
      <Container className='footer'>
    <div style={classes.rootFooter}>
      
       
      <Grid container direction="row"  alignItems="flex-start" style={{'marginLeft':"8%"}}>

            <Grid item xs={12} sm={4}>
                <Paper style={classes.paperFooter}> 
                    <h2 className='text-aboutus-h2'>Planex<hr/></h2>
                    <p className='text-aboutus'>  With Planex, you’ll have a powerful tool set to manage your work and take your productivity to the next level.</p>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper style={classes.paperFooter}>
                    <h2 className='text-aboutus-h2'>Social Media<hr/></h2>
                    <div className="icon">
                        <a href='https://github.com/mburko/planex-fe'><FontAwesomeIcon icon={faGithub} /></a>
                        <a href=''><FontAwesomeIcon icon={faGoogle} /></a>
                        <a href=''><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href=''><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href=''><FontAwesomeIcon icon={faLinkedin}/></a>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper style={classes.paperFooter}>
                    <h2 className='text-aboutus-h2'>Location<hr/></h2>
                      <p className='text-aboutus'>Lviv, Ukraine     </p>
                </Paper>
            </Grid>
        </Grid></div>
      </Container>
        <div  className="footer-l">
            <p >Copyright © 2022 Planex. All rights reserved.</p>
        </div>
      </div>
    )
  }
}
