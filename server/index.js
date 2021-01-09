const path = require('path');
const express = require('express')
const app = express()
const axios = require('axios');
var cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT_PROXY;

const bodyParser = require ('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.json());
app.use(cors());

//product details
const portProductDetails = process.env.PORT_PRODUCT_DETAILS;
const serverProductDetails = process.env.SERVER_PRODUCT_DETAILS;
console.log(`productDetails is at ${serverProductDetails}:${portProductDetails}`);

// productSetails service - get a specific book /product/:isbn13
// send request to localhost: 5001 and return the response to the user
app.get('/products/:isbn13', (req, res) => {
  console.log('ProductDetails ISBN:', req.params.isbn13);
  axios.get(`http://${serverProductDetails}:${portProductDetails}/products/${req.params.isbn13}`)
    .then((response)=> {
    // handle success
      console.log('ProductDetails PROXY: get a specific book' /* ,response.data*/);
      res.status(200).send(response.data);
    })
    .catch((error)=> {
    // handle error
      console.log('ProductDetails PROXY error:', error);
      res.status(500).send(error);
    });
});

// productSetails service - get the author information by his/her author name
// send request to localhost: 5001 and return the response to the user

app.get('/author/:author', (req, res) => {
  console.log('author:', req.params.author);
  axios.get(`http://${serverProductDetails}:${portProductDetails}/author/${req.params.author}`)
  .then((response)=> {
    // handle success
      console.log('ProductDetails PROXY: get an author information his/her name' /* ,response.data*/);
      res.status(200).send(response.data);
    })
    .catch((error)=> {
    // handle error
      console.log('ProductDetails PROXY error:', error);
      res.status(500).send(error);
    });
});



// productDetails service - redirect to publisher page (an empty page)
app.get('/publisher', (req, res) => {
  axios.get(`http://${serverProductDetails}:${portProductDetails}/publisher`)
   .then ((response) => {
    console.log('ProductDetails publisher PROXY:', response.data);
    res.status(200).send(response.data);
   })
   .catch((error)=> {
      console.log('ProductDetails publisher PROXY error:', error);
      res.status(500).send(error);
    });
});

// productSetails service - redirect to series page (an empty page)
app.get('/series', (req, res) => {
  axios.get(`http://${serverProductDetails}:${portProductDetails}/series`)
   .then ((response) => {
    console.log('ProductDetails series PROXY:', response.data);
    res.status(200).send(response.data);
   })
   .catch((error)=> {
      console.log('ProductDetails series PROXY error:', error);
      res.status(500).send(error);
    });
});

// for future use by other group members
// productSetails service - get books by category
app.get('/category/:bookCategory', (req, res) => {
  console.log('ProductDetails bookCategory:', req.params.bookCategory);
  axios.get(`http://${serverProductDetails}:${portProductDetails}/category/${req.params.bookCategory}`)
  .then ((response) => {
    console.log('ProductDetails bookCategory PROXY:', response.data);
    res.status(200).send(response.data);
   })
   .catch((error)=> {
      console.log('ProductDetails bookCategory PROXY error:', error);
      res.status(500).send(error);
    });
});

// item selection
const portItemSelection = process.env.PORT_ITEM_SELECTION;
const serverItemSelection = process.env.SERVER_ITEM_SELECTION;
console.log(`itemSelection is at ${serverItemSelection}:${portItemSelection}`);

// itemSelection service - get formats of an specific book product/:isbn13/formats
// send request to localhost: 3001 and return the response to the user
app.get('/product/:isbn13/formats', (req, res) => {
  console.log('itemSelection ISBN:', req.params.isbn13);
  axios.get(`http://${serverItemSelection}:${portItemSelection}/product/${req.params.isbn13}/formats`)
    .then((response)=> {
    // handle success
      console.log('itemSelection PROXY: get a specific book foramts:', response.data);
      res.status(200).send(response.data);
    })
    .catch((error)=> {
    // handle error
      console.log('itemSelection PROXY error:', error);
      res.status(500).send(error);
    });
});


// reviews
const portReviews = process.env.PORT_REVIEWS;
const serverReviews = process.env.SERVER_REVIEWS;
console.log(`reviews is at ${serverReviews}:${portReviews}`);

// reviews service - getting reviews
app.get('/books/:identifier/reviews', (req, res) => {
  axios.get(`http://${serverReviews}:${portReviews}/${req.params.identifier}/reviews`)
  .then((response)=> {
  // handle success
    console.log('reviews PROXY:', response.data);
    res.status(200).send(response.data);
  })
  .catch((error)=> {
  // handle error
    console.log('reviews PROXY error:', error);
    res.status(500).send(error);
  });

});

// reviews servicev - getting reviews summary
app.get('/books/:identifier/reviews/summary', (req, res) => {
  axios.get(`http://${serverReviews}:${portReviews}/books/${req.params.identifier}/reviews/summary`)
  .then((response)=> {
  // handle success
    console.log('reviews summary PROXY:', response.data);
    res.status(200).send(response.data);
  })
  .catch((error)=> {
  // handle error
    console.log('reviews summary PROXY error:', error);
    res.status(500).send(error);
  });
});

// reviews service - update review
app.put('/books/:identifier/review/:id', (req, res) => {
  axios.put(`http://${serverReviews}:${portReviews}/books/${req.params.identifier}/review/${req.params.id}`, req.body)
  .then((response)=> {
  // handle success
    console.log('reviews update PROXY:', response.data);
    res.status(200).send(response.data);
  })
  .catch((error)=> {
  // handle error
    console.log('reviews update PROXY error:', error);
    res.status(500).send(error);
  });

});

// also bought service

const portAlsoBought = process.env.PORT_ALSO_BOUGHT;
const serverAlsoBought = process.env.PORT_ALSO_BOUGHT;
console.log(`alsoBought is at ${serverAlsoBought}:${portAlsoBought}`);

app.get('/products/:rootIsbn/alsoBought', (req, res) => {
  axios.get(`http://${serverAlsoBought}:${portAlsoBought}/products/${req.params.rootIsbn}/alsoBought`)
  .then((response)=> {
  // handle success
    console.log('also bought get PROXY:', response.data);
    res.status(200).send(response.data);
  })
  .catch((error)=> {
  // handle error
    console.log('also bought get PROXY error:', error);
    res.status(500).send(error);
  });
});


// ********serving bundle.js from the server instead of the index.html******



var getBundle = (service, internalUrl,successStr,failureStr) => {

  app.get(service, (req, res) => {
    axios.get(internalUrl)
    .then((response)=> {
    // handle success
      console.log(successStr);
      res.status(200).send(response.data);
    })
    .catch((error)=> {
    // handle error
      console.log(failureStr, error);
      res.status(500).send(error);
    });
  });
}

getBundle('/itemSelectionBundle.js', `http://${serverItemSelection}:${portItemSelection}/bundle.js`, 'In bundle.js 3001', 'bundle.js 3001 gets PROXY error:');

getBundle('/productDetailsBundle.js', `http://${serverProductDetails}:${portProductDetails}/bundle.js`, 'In bundle.js 5001', 'In bundle.js 5001 gets PROXY error:');

getBundle('/alsoBoughtBundle.js', `http://${serverAlsoBought}:${portAlsoBought}/bundle.js`,'In bundle.js 3004', 'bundle.js 3004 gets PROXY error:');

getBundle('/reviewsBundle.js',`http://${serverReviews}:${portReviews}/bundle.js`,'In bundle.js 8000','bundle.js 8000 gets PROXY error:');



app.use(express.static('public'));
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})