'use strict'

const asciidoctor = require('@asciidoctor/core')()
const { register: registerJupyterConverter } = require('asciidoctor-jupyter')
const icypherInstructionExtension = require('./icypher-instruction-extension')

function register(logger) {
  const registry = asciidoctor.Extensions.create()
  icypherInstructionExtension.register(registry)
  registerJupyterConverter(registry, { logger })
  return registry
}


function convert(input, registry) {
  return asciidoctor.convert(input, { backend: 'jupyter', extension_registry: registry })
}

module.exports = {
  register,
  convert
}
