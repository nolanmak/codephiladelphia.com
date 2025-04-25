const express = require('express');
const path = require('path');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to fetch Meetup events
app.get('/api/meetup-events', (req, res) => {
  const options = {
    hostname: 'www.meetup.com',
    path: '/code-coffee-philly/',
    method: 'GET',
    headers: {
      'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-User': '?1',
      'Sec-Fetch-Dest': 'document',
      'Cookie': 'MEETUP_BROWSER_ID=id=96815eb7-367d-46b4-924f-aa51e4dc5ede; MEETUP_TRACK=id=d0e6a7ae-42e3-4226-92b0-c8d92203b386; SIFT_SESSION_ID=f035d201-34d0-4f69-b96c-d95c477d3401'
    }
  };

  const meetupReq = https.request(options, (meetupRes) => {
    let data = '';
    
    meetupRes.on('data', (chunk) => {
      data += chunk;
    });
    
    meetupRes.on('end', () => {
      res.send(data);
    });
  });
  
  meetupReq.on('error', (error) => {
    console.error('Error fetching Meetup events:', error);
    res.status(500).send('Error fetching Meetup events');
  });
  
  meetupReq.end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop the server`);
});
