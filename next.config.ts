/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://script.google.com/macros/s/AKfycbzcSrWWxktZrwnSEBP0RJx5Et6dlEHS71rWU7Fr6RqjyYbQZbASz7KUb5GYHH7S4CyEZw/exec/:path*',
      },
    ]
  },
}

module.exports = nextConfig 