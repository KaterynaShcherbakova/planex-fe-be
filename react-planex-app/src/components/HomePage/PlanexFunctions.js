import React, { Component } from 'react';
import './PlanexFunctions.css';
import "animate.css/animate.min.css";
import { Carousel } from 'react-bootstrap'
import { Grid, Paper } from '@mui/material';
import {AnimatedOnScroll} from "react-animated-css-onscroll";
import imgpl_p1 from "./img/planex-ph-1.png"
import imgpl_p2 from "./img/planex-ph-2.jpg"

const classes = {
  rootPlFunc: {
    flexGrow: 1,
  },
  paperPlFunc: {
    padding: 20,
    fontFamily: "Roboto",
    backgroundColor: 'transparent',
    boxShadow: "none",
    backgroundSize:"cover",
    backgroundPosition:"center",
  }
};

export default class PlanexFunctions extends Component {
  render() {
    return (
      <>
      
      <div style={classes.rootPlFunc}>
      <Grid container direction="row"   justifyContent="flex-start" alignItems="flex-start">
        <Grid item xs={12} sm={7}>
        <div className='planex-func-back'>
        <AnimatedOnScroll animationIn="fadeInLeft" animationOut="fadeOut" animationInDelay={200}><h1 className='text-h2'>Functions</h1></AnimatedOnScroll>
      </div>
          <Paper style={classes.paperPlFunc}>      
            <AnimatedOnScroll animationIn="fadeInLeft" animationOut="fadeOut" animationInDelay={200} >
              <h2 className='text-funct-h2'>The best way to organize your life</h2>
            </AnimatedOnScroll>
            <AnimatedOnScroll animationIn="fadeInRight" animationOut="fadeOut" animationInDelay={200}>
              <p className='text-funct'>Organize your tasks, lists and reminders in one easy to use app.</p>
            </AnimatedOnScroll>
          </Paper>
          <Paper style={classes.paperPlFunc}>      
            <AnimatedOnScroll animationIn="fadeInLeft" animationOut="fadeOut" animationInDelay={200}>
              <h2 className='text-funct-h2'>A calendar you won’t be able to live without</h2></AnimatedOnScroll>
            <AnimatedOnScroll animationIn="fadeInRight" animationOut="fadeOut" animationInDelay={200}>
              <p className='text-funct'>Keep track of your progress. Add smart reminders so you never forget a thing. With beautiful themes and turbo-charging powers, you’re guaranteed to save time and achieve great things.</p>
            </AnimatedOnScroll>        
          </Paper>
          <Paper style={classes.paperPlFunc}>      
              <AnimatedOnScroll animationIn="fadeInLeft" animationOut="fadeOut" animationInDelay={200}> 
                <h2 className='text-funct-h2'>Organize anything with anyone, anywhere</h2></AnimatedOnScroll>
              <AnimatedOnScroll animationIn="fadeInRight" animationOut="fadeOut" animationInDelay={200}>
              <p className='text-funct'>Wherever you are, take your to do list with you. Access Planex on mobile, laptop, desktop, tablet and even your watch! Your tasks are automatically synced across all of your devices, giving you ultimate control.</p>
            </AnimatedOnScroll>  
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper style={classes.paperPlFunc} >
          <Carousel className="pl-img-carbox-ph">
            <Carousel.Item className="pl-img-carosel-ph">
                <img className="d-block w-100 pl-img-carosel-ph" src={imgpl_p1} alt="planex"/>
            </Carousel.Item>
            <Carousel.Item className="pl-img-carosel-ph">
              <img className="d-block w-100 pl-img-carosel-ph" src={imgpl_p2} alt="planex"/>
            </Carousel.Item>
          </Carousel>
          </Paper>
        </Grid>
      </Grid>
      </div>
      <div className='gr-box'></div>
      </>
    )
  }
}
