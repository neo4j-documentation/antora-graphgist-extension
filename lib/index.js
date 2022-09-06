'use strict'

const { getLiveGraphGists } = require('./graphgists/graphql-api')
const {
  addGraphGistPages,
  generateGraphGistCategoryPages,
  generateJupyterNotebookAttachments,
  assignPageAttributes,
  createGraphGistIndexPage,
} = require('./graphgists')

function register () {

  let graphGists
  this.on('contentClassified', async ({ contentCatalog, siteAsciiDocConfig }) => {
    const siteComponent = siteAsciiDocConfig.attributes['site-component'] || ''
    if (siteComponent=== 'graphgists') {
      graphGists = await getLiveGraphGists()
      addGraphGistPages(graphGists, contentCatalog, siteAsciiDocConfig)
    }
  })
  this.on('documentsConverted', async ({ contentCatalog, siteAsciiDocConfig }) => {
    if (graphGists) {
      const pages = contentCatalog.getPages((page) => page.out)
      assignPageAttributes(graphGists, contentCatalog, siteAsciiDocConfig)
      contentCatalog.addFile(generateJupyterNotebookAttachments(graphGists))
      contentCatalog.addFile(generateGraphGistCategoryPages(graphGists, pages, contentCatalog, siteAsciiDocConfig))
      contentCatalog.addFile(createGraphGistIndexPage(graphGists, contentCatalog, siteAsciiDocConfig))
    }
  })
}

module.exports = { register }

