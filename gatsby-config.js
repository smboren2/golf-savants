/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Golf Savants`,
    menuLinks:[
          {
            name: 'schedule',
            link: '/schedule'
          },
          {
            name: 'rankings',
            link: '/rankings'
          },
          {
            name: 'research',
            link: '/research'
          }
        ],
    siteUrl: `https://www.golfsavants.com`
    },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'coursehist',
        path: `${__dirname}/src/data`
      }
    },
    'gatsby-transformer-csv',
  ],
}
