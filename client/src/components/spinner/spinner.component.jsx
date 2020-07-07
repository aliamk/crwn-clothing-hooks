import React from 'react'

import { SpinnerContainer, SpinnerOverlay } from './spinner.styles'

// Presentational component that can be rendered by App.js within Suspense library's FALLBACK  
const Spinner = () => (
 <SpinnerOverlay>
   <SpinnerContainer />
 </SpinnerOverlay>
)


export default Spinner