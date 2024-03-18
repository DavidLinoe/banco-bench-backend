// const { apiPix } = require("./pix");

// const http = require("https");

// const options = {
//   "method": "POST",
//   "hostname": "api.openpix.com.br",
//   "port": null,
//   "path": "/api/v1/qrcode-static",
//   "headers": {
//     "content-type": "application/json",
//     "Authorization": "AppID"
//   }
// };

// const req = http.request(options, function (res) {
//   const chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//     console.log("res log data pix",chunk)
//   });

//   res.on("end", function () {
//     const body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });

// req.write(JSON.stringify({name: 'Pix QrCode Teste', correlationID: 'zr7833b4060c488a9b0f89811', value: 100, comment: 'qr teste'}));
// req.end();


// const headers = {
//     headers: {
//       "content-type": "application/json",
//       "Authorization": "AppID",
//     },
//   };


//  const postResponse = await apiPix.post
//       .post(`/api/v1/qrcode-static/`, headers)
//       .then((postResponse) => {
//         console.log(postResponse.data);
//       })
//       .catch((error) => {
//         console.log({ error });
//       });