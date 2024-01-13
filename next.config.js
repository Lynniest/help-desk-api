/** @type {import('next').NextConfig} */
const nextConfig = {
    
}

// module.exports = nextConfig
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Allow all origins
          },
        ],
      },
    ]
  },
}