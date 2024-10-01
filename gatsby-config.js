module.exports = {
  siteMetadata: {
    title: `Golf Savants`,
    menuLinks: [
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
      },
      {
        name: 'tools',
        link: '/tools',
        subItems: [
          {
            name: 'Course History',
            link: '/course-history'
          },
          {
            name: 'Matchup Tool',
            link: '/matchup-tool'
          },
          {
            name: 'Tournament Predictor',
            link: '/tools/tournament-predictor'
          }
        ]
      }
    ]
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/static/data/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `golf-savants`,
        short_name: `savants`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`,
      },
    },
  ],
}