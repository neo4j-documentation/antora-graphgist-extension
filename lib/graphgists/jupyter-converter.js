'use strict'

const asciidoctor = require('@asciidoctor/core')()
const JupyterConverter = require('asciidoctor-jupyter')
const icypherInstructionExtension = require('./icypher-instruction-extension')

// register the converter
asciidoctor.ConverterFactory.register(JupyterConverter, ['jupyter'])

const registry = asciidoctor.Extensions.create()
icypherInstructionExtension.register(registry)

function convert(input) {
  return asciidoctor.convert(input, { backend: 'jupyter', extension_registry: registry })
}

module.exports = {
  convert
}
