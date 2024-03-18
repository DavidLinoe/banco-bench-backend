const axios = require ('axios')

const apiPix = axios.create({
  baseURL: process.env.URL_PIX_API,
  timeout: 5000,
  
});

module.exports = { apiPix }    