import React, { useEffect, lazy, Suspense } from 'react' 
import { Switch, Route, Redirect } from 'react-router-dom' 
import { connect } from 'react-redux' 
import { createStructuredSelector } from 'reselect' 

// import './App.css' 
import { GlobalStyle } from './global.styles'
//REPLACED BY LAZY
// import HomePage from './pages/homepage/homepage.component' 
// import ShopPage from './pages/shop/shop.component' 
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component' 
// import CheckoutPage from './pages/checkout/checkout.component' 
import Header from './components/header/header.component' 
import Spinner from './components/spinner/spinner.component.jsx'

//import { auth, createUserProfileDocument /*addCollectionAndDocuments*/ } from './firebase/firebase.utils' 

// import { setCurrentUser } from './redux/user/user.actions' 
import { selectCurrentUser } from './redux/user/user.selectors' 
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors' 
import { checkUserSession } from './redux/user/user.actions'



const HomePage = lazy(() => import('./pages/homepage/homepage.component'))
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'))

const App = ({ checkUserSession, currentUser }) => {
  
  // Replace componentDidMount
  useEffect(() => {
    checkUserSession() // only want this to render once, after SIGN_IN_SUCCESS
  }, [checkUserSession]) // dependancy array
  
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Suspense>
      </Switch>
    </div>
  ) 
}


/* RENDER is a JS invocation, allows us to use JS in place of component,
determines which component to return: If this.props.currentUser is true, 
redirect to the homepage  if false then redirect to sign-in page */

/* Redirect a signed-in user away from the sign-in page by getting access
to this.props.currentUser */

/* Added mapStateToProps in App.js because all routing to and from pages
happens on the app component */

// ({ user }) "Destructure off our userReducer"
/* const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})  */

/* redux: this function tells the app to look to the userReducer for 
information on state changes instead of App.js */

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  /*collectionsArray: selectCollectionsForPreview*/
}) 

/* Dispatch assumes that every object that it receives 
is an action and passes it on to the reducers */

/* When a user signs-in, the user info is dispatched to the reducers via 
user.action and updates the state from null to the user 
For user persistence, adding checkUserSession which is just a call to dispatch it to 
the user.reducer
*/
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(
  mapStateToProps,  /* this would be null if not for the sign-in redirect */
  mapDispatchToProps 
)(App) 