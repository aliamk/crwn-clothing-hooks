/* IMPORT LIBRARIES INSTALLED BY PACKAGE.JSON */
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path') // this is a native module (doesn't need including in the package.json file)

/* SET UP THE EXPRESS SERVER AND DOTENV */
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY) // Refer to the .env file for the secret key

const app = express() // Instantiate a new Express application 
const port = process.env.PORT || 5000 // On deployment, Heroku can assign a port; when using locally, the server should use port 5000 (the localhost will remain on 3000)

/* LEVERAGE THE LIBRARIES THAT'VE BEEN IMPORTED ABOVE */
app.use(bodyParser.json()) // '.use' is Express syntax -> pass all requests into Express and convert the body into JSON
app.use(bodyParser.urlencoded({ extended: true })) // Handle problem characters like spaces

app.use(cors()) // Stop browsers blocking Cross Origin Requests.

// Using the static middleware, join the particular file name thats currently being used to the url path (using the path library) and then run the build script (client's package.json)
if (process.env.NODE_ENV === 'production') { 
  app.use(express.static(path.join(__dirname, 'client/build')))
  // whichever url the user hits, pass a function that returns a request and response
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html')) // send the static files to the frontend and name it 'index.html'
  })
}

/* HANDLE PORT ERRORS */
app.listen(port, error => {
  if (error) throw error
  console.log('Server running on port ' + port)
})

/* HANDLE ROUTING FOR STRIPE PAYMENTS */
app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  }

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr })
    } else {
      res.status(200).send({ success: stripeRes })
    }
  })
})