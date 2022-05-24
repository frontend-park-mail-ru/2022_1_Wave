const openGraph = (props) => (
  Object.entries(props).map(([key, val]) => (
    `<meta property="og:${key}" content="${val}"/>`
  )).join('\n')
)

module.exports = openGraph;
