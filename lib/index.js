'use strict'

const { getLiveGraphGists } = require('./graphgists/graphql-api')
const {
  addGraphGistPages,
  addGraphGistCategoryPages,
  generateJupyterNotebookAttachments,
  assignPageAttributes,
  createGraphGistIndexPage,
} = require('./graphgists')

// The name of the package in order to give the Antora logger a useful name
const { name: packageName } = require('../package.json')

function register () {

  const logger = this.getLogger(packageName)

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
      const jupyterNotebookAttachments = generateJupyterNotebookAttachments(graphGists, logger)
      for (const jupyterNotebookAttachment of jupyterNotebookAttachments) {
        contentCatalog.addFile(jupyterNotebookAttachment)
      }
      addGraphGistCategoryPages(graphGists, pages, contentCatalog, siteAsciiDocConfig)
      assignPageAttributes(graphGists, contentCatalog, siteAsciiDocConfig)
      contentCatalog.addFile(createGraphGistIndexPage(graphGists, contentCatalog, siteAsciiDocConfig))
    }
  })
}

module.exports = { register }

