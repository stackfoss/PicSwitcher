const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withPWA({
  images: {
    domains: ['images.unsplash.com'], 
  },
  // Other next.js config options
});

