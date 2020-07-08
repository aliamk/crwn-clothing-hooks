import React, { Profiler } from 'react';
import Directory from '../../components/directory/directory.component'

// import './homepage.styles.scss' 
/* REPLACING WITH STYLED-COMPONENTS */
import { HomePageContainer } from './homepage.styles'

// const HomePage = () => (
//   <div className="homePage">
//     <Directory />
//   </div>
// )

const HomePage = () => (
  <HomePageContainer>
    <Profiler id="Directory" onRender={( id, phase, actualDuration ) => {
      console.log({
        id,
        phase,
        actualDuration
      })
    }}>
      <Directory />
    </Profiler>
  </HomePageContainer>
)

/* 
FOR CHECKING WHETHER THE ERROR-BOUNDARY WORKS
const HomePage = () => {
  throw Error
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  )
} */

export default HomePage