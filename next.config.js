/** @type {import('next').NextConfig} */
// const nextConfig = {} //Commented out because the linter was not happy 'nextConfig' is assigned a value but never used. (no-unused-vars)

module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  output: 'standalone'

}
