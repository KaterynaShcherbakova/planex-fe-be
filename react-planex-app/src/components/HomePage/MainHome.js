import React, { useState} from 'react'
import { Grid, Paper } from '@mui/material';
import './MainHome.css';
import styled from "styled-components";
import CarouselBoxPlanex from './CarouselBoxPlanex';
import MovingComponent from 'react-moving-text';
import { RegisterForms } from '../Validation/RegisterForms';

const classes = {
  rootMainHome: {
    flexGrow: 1,
  },
  paperMainHome: {
    padding: 20,
    textAlign: "center",
    backgroundColor: 'transparent',
    boxShadow: "none",
    backgroundSize:"cover",
    backgroundPosition:"center",
    paddingTop: "20vh"
  }
};
const Button = styled.button`
  background-color: #171717;
  color: white;
  font-size: 150%;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const FormsContainer = styled.div`
    z-index: 10;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: 2% auto auto auto;
    position: fixed;
    pointer-events:auto;

`;
const HomePageContainer = styled.div`
    filter: ${props => props.isBlured? 'blur(17px)': 'blur(0)'};
    
`;
const MainHome = () => {
    const [clickedLogIn, setClickLogIn] = useState(false);
    const showLogIn = () => {
      setClickLogIn(!clickedLogIn);
    }
    const [clickedSignUp, setClickSignUp] = useState(false);
    const showSignUp = () => {
      setClickSignUp(!clickedSignUp);
    }
    let isBluredBool = false 
    const [clickedUBlur, setClickUBlur] = useState(false);
    const uBlurPage = () => {
      setClickUBlur(!clickedUBlur);
    };
    return (
      <div>
      {clickedLogIn && (<FormsContainer onClick={uBlurPage && showLogIn}>
        <RegisterForms  def_form={'login'}/></FormsContainer>)}
      {clickedSignUp && (<FormsContainer onClick={uBlurPage && showSignUp}>
        <RegisterForms  def_form={'signup'}/></FormsContainer>)}
      {clickedLogIn || clickedSignUp ? (isBluredBool = true) :  (isBluredBool = false)}
      {clickedUBlur && (isBluredBool = false)}
      <HomePageContainer isBlured={isBluredBool}>
      <div className='main-css'>
        <div style={classes.rootMainHome}>
        <Grid container direction="row" justifyContent="space-around" alignItems="stretch">
        <Grid item xs={12} sm={12} md={5}>
          <Paper style={classes.paperMainHome}>
          <MovingComponent type="fadeIn" duration="2000ms" delay="0s"  direction="normal" timing="ease" iteration="1" fillMode="none">
            <h1 className='text-h1'>Planex</h1></MovingComponent>
            <div>
              <Button className='btn-1' onClick={uBlurPage &&  showLogIn}>Log in</Button>
                
            </div>
              <Button className='btn-2' onClick={uBlurPage && showSignUp}>Sign up</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper style={classes.paperMainHome}>
                <CarouselBoxPlanex></CarouselBoxPlanex>
          </Paper>
        </Grid>
      </Grid>
    </div>
      </div>
    </HomePageContainer>
      </div>
    );
};
export { MainHome };