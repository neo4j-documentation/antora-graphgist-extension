'use strict'

const asciidoctor = require('@asciidoctor/core')()
const { register: registerJupyterConverter } = require('asciidoctor-jupyter')
const icypherInstructionExtension = require('./icypher-instruction-extension')

const registry = asciidoctor.Extensions.create()
icypherInstructionExtension.register(registry)
registerJupyterConverter(registry)

function convert(input) {
  return asciidoctor.convert(input, { backend: 'jupyter', extension_registry: registry })
}

module.exports = {
  convert
}
