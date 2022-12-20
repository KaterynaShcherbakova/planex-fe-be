import React, {useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import HomeHeader from '../components/HomePage/HomeHeader';
import { Grid, Paper } from '@mui/material';
import '../components/HomePage/MainHome.css';
import PlanexFunctions from '../components/HomePage/PlanexFunctions';
import CarouselBoxPlanex from '../components/HomePage/CarouselBoxPlanex';
import MovingComponent from 'react-moving-text';
import { RegisterForms } from '../components/Validation/RegisterForms';
import AboutUs from '../components/HomePage/AboutUs';
import CarouselReviews from '../components/HomePage/CarouselReviews';
import FooterHome from '../components/HomePage/FooterHome';


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
    margin-left: 1.5%;
    z-index: 10;
    position: fixed;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: stretch;
    align-content: center;
    flex-direction: row;
    @media only screen and (max-width: 950px) {
      flex-direction: column;
      margin-left:10%;
    }
`;
const HomePageContainer = styled.div`
    filter: ${props => props.isBlured? 'blur(15px)': 'blur(0)'};
`;

const Home = () => {
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
      <HomeHeader/>
      <main>      
        {clickedLogIn && (<><FormsContainer>
          <div className="flex-items-blur-cont" onClick={uBlurPage && showLogIn}><RegisterForms def_form={'login'} /></div> {/*k*/}
          <div className="flex-items-blur-cont" ><RegisterForms def_form={'login'} /></div>
          <div className="flex-items-blur-cont" onClick={uBlurPage && showLogIn}><RegisterForms def_form={'login'} /></div> {/*k*/}
           </FormsContainer></>)}
        {clickedSignUp && (<><FormsContainer>
          <div className="flex-items-blur-cont" onClick={uBlurPage && showSignUp}><RegisterForms  def_form={'signup'}/></div>
          <div className="flex-items-blur-cont"><RegisterForms  def_form={'signup'}/></div>
          <div className="flex-items-blur-cont" onClick={uBlurPage && showSignUp}><RegisterForms  def_form={'signup'}/></div>
        </FormsContainer></>)}
      {clickedLogIn || clickedSignUp ? (isBluredBool = true) :  (isBluredBool = false)}
      {clickedUBlur && (isBluredBool = false)}
        <HomePageContainer isBlured={isBluredBool}>
      <div>

      
      <div className='main-css' id="planex">
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

      </div>
        <PlanexFunctions/>
        <AboutUs/>
        <CarouselReviews/>
        <FooterHome/>
        </HomePageContainer>
      </main>
      
      </div>
    );
}
export { Home };
