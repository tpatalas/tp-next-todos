const scriptSources = [
  'https://apis.google.com',
  'https://ajax.cloudflare.com', // rocket loader, mirage
  'https://cloudflareinsights.com', // web analytics
  'https://static.cloudflareinsights.com', // web analytics
  'http://cdnjs.cloudflare.com',
];

module.exports = scriptSources.join(' ');
