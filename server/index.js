const path = require('path');
const express = require('express')
const app = express()
const axios = require('axios');
var cors = require('cors');
const port = 9009;

const bodyParser = require ('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.json());
app.use(cors());

// productSetails service - get a specific book /product/:isbn13
// send request to localhost: 5001 and return the response to the user
app.get('/products/:isbn13', (req, res) => {
  console.log('ProductDetails ISBN:', req.params.isbn13);
  axios.get(`http://localhost:5001/products/${req.params.isbn13}`)
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

// productDetails service - redirect to publisher page (an empty page)
app.get('/publisher', (req, res) => {
  axios.get('http://localhost:5001/publisher')
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
  axios.get('http://localhost:5001/series')
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
  axios.get(`http://localhost:5001/category/${req.params.bookCategory}`)
  .then ((response) => {
    console.log('ProductDetails bookCategory PROXY:', response.data);
    res.status(200).send(response.data);
   })
   .catch((error)=> {
      console.log('ProductDetails bookCategory PROXY error:', error);
      res.status(500).send(error);
    });
});

// itemSelection service - get formats of an specific book product/:isbn13/formats
// send request to localhost: 3001 and return the response to the user
app.get('/product/:isbn13/formats', (req, res) => {
  console.log('itemSelection ISBN:', req.params.isbn13);
  axios.get(`http://localhost:3001/product/${req.params.isbn13}/formats`)
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

// reviews service - getting reviews
app.get('/books/:identifier/reviews', (req, res) => {
  axios.get(`http://localhost:8000/books/${req.params.identifier}/reviews`)
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
  axios.get(`http://localhost:8000/books/${req.params.identifier}/reviews/summary`)
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
  axios.put(`http://localhost:8000/books/${req.params.identifier}/review/${req.params.id}`, req.body)
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
app.get('/products/:rootIsbn/alsoBought', (req, res) => {
  axios.get(`http://localhost:3004/products/${req.params.rootIsbn}/alsoBought`)
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

// app.get('/?isbn=:isbn',function(req,res) {
//   console.log("PROXY: Got ISBN", req.params.isbn);
//   res.sendFile(path.join(__dirname+'/../public/index.html'));
// });

app.use(express.static('public'));
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})