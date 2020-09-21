const express = require('express');
const app = express();
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;
const PERPAGE = process.env.PERPAGE;
const ACCESSKEY = process.env.ACCESSKEY;
const BASEURL = process.env.BASEURL;

app.get('/', (req, res) => {
  res.send(`
    <h3>View images</h3>
    <ul>
      <li><a href='/view?s=tree'>Trees</a></li>
      <li><a href='/view?s=plant'>Plants</a></li>
      <li><a href='/view?s=house'>Houses</a></li>
    </ul>
  `);
});

app.get('/json', (req, res) => {
  const query = req.query.s || null;
  if (query) {
    getImages(query).then(output => {
      res.send(`${JSON.stringify(output.results, null, 2)}`);
    });
  } else {
    res.send('Error: no results');
  }
});

app.get('/view', (req, res) => {
  const query = req.query.s || null;
  if (query) {
    getImages(query).then(output => {
      res.send(
        `<h3>Unsplash search results</h3>
        <ul>
          <li>You searched for the term: '${query}'</li>
          <li>Returning ${output.total.toLocaleString()} images</li>
          <li><a href='/json?s=${query}'>See results as JSON</a></li>
        </ul>
        <details>
          <summary style="cursor:pointer;outline:none;">View the first ${PERPAGE} images</summary>
          ${renderImages(output.results)}
        </details>
      `);
    });
  } else {
    res.send('Error: no results');
  }
});

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

function getImages(query) {
  const url = `${BASEURL}?page=1&query=${query}&per_page=${PERPAGE}&client_id=${ACCESSKEY}`
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(result => result.json())
    .then(data => {
      resolve(data);
    }).catch(error => {
      reject(error);
    });
  });
}

function renderImages(array) {
  const params = `&w=200&h=200&fit=crop&fm=jpg&q=95" style="margin:5px;object-fit:cover;width:200px;height:200px;"`;
  return array.map(item => `<img src="${item.urls.regular}${params}">`).join('');
}