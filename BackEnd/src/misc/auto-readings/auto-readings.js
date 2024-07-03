const https = process.env.SECURE?require('https'): require('http');
const tags = [
  'PGA-CAL01',
  'VH-CAL01',
  'VA-CAL01',
  'A-CAL01',
  'BA01-CAL01',
  'BA02-CAL01',
  'BC-CAL01',
  'BD-CAL01',
];

const sendReading = (selectedTag)=>{
  
    const data = JSON.stringify({
        iotId: 'IOT1',
        assetTag: selectedTag,
        readings: [
          {
            type: 'AUTO',
            tag: 'HS_MARCHA',
            value: String(Math.floor(Math.random() * 301)),
            unit: 'seg.', 
          },
          {
            type: 'AUTO',
            tag: 'CANTIDAD_MANIOBRAS',
            value: String(Math.floor(Math.random() * 21)),
            unit: 'un.'
          },
        ],
      });
    
      const options = {
        hostname: process.env.HOST,
       // port: parseInt(process.env.PORT) | 80,
        path: '/api/reading',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length,
        },
      };
    
      const req = https.request(options, (res) => {
     
    
        res.on('data', (d) => {
          process.stdout.write(d);
        });
      });
    
      req.on('error', (error) => {
        console.error(error);
      });
    
      req.write(data);
      req.end();
}


if(process.env.SECURE) 
setInterval(() => {
tags.forEach((tag)=>{
    sendReading(tag);
})  
}, 30000);
