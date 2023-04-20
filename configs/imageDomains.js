const imageDomains = [
  'lh3.googleusercontent.com',
  'lh4.googleusercontent.com',
  'lh5.googleusercontent.com',
  'lh6.googleusercontent.com',
  'lh7.googleusercontent.com',
  'lh8.googleusercontent.com',
  'google.com',
  'avatars.githubusercontent.com',
  process.env.HOSTNAME,
  process.env.IMAGE_DOMAIN || '',
  ...(process.env.NODE_ENV !== 'production' ? ['images.unsplash.com', 'tailwindui.com'] : []),
];

module.exports = imageDomains;
