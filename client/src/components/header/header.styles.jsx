import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Normal HTML items like divs/spans: styled.div
export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  /* Anything screen width less than 800px will inherit the following styles */
  @media screen and (max-width: 800px) {
    height: 60px;
    padding: 20px;
    margin-bottom: 20px;
  }
`;

/* Because LINK is a component, we use brackets like a function
  instead of a dot */
export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;

/* Anything screen width less than 800px will inherit the following styles */
 @media screen and (max-width: 800px) {
   width: 50px;
   padding: 0;
  }
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

 /* Anything screen width less than 800px will inherit the following styles */
 @media screen and (max-width: 800px) {
   width: 80%;
  }
`;

/* Because we have a conditional style that applies to both div and Link,
we define the styles first and then apply them to each */

/* Replacing OptionsDiv with <OptionLink as='div'> so don't need this anymore  */
// const OptionContainerStyles = css`
//   padding: 10px 15px;
//   cursor: pointer;
// `;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

// export const OptionDiv = styled.div`
//   ${ OptionContainerStyles }
// `;



/* .header {
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  .logo-container {
    height: 100%;
    width: 70px;
    padding: 25px;
  }

  .options {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .option {
      padding: 10px 15px;
      cursor: pointer;
    }
  }
} */
