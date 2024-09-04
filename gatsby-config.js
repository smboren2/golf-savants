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
            name: 'Score Calculator',
            link: '/tools/score-calculator'
          },
          {
            name: 'Player Comparison',
            link: '/tools/player-comparison'
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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