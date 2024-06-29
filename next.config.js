const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  async rewrites() {
    return [
      {
        source: '/req/data',
        destination: 'https://api.vworld.kr/req/data',
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
