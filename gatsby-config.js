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
  plugins: [],
}
