const express = require('express');
const apiHandler = require('./api/index');
const app = express();

app.use(express.static('public'));

// Setup Routes as requested
app.get('/proxy', apiHandler);           // ?url=...
app.get('/proxy/base64/*', apiHandler);  // /base64/...
app.get('/proxy/*', apiHandler);         // /https://...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Shrina Proxy v5 God-Mode Active on Port ${PORT}`));
