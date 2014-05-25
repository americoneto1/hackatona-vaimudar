'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Manifestacao Schema
 */
var ManifestacaoSchema = new Schema({
  titulo: String,
  dataHora: String,
  pontoEncontro: String,
  afavor: { type: Number, default: 0 },
  contra: { type: Number, default: 0 },
  tags: String,
  cidade: String,
  cadastro: { type: Date, default: Date.now },
  latlng: String
});

/**
 * Validations
 */
//ManifestacaoSchema.path('awesomeness').validate(function (num) {
//  return num >= 1 && num <= 10;
//}, 'Awesomeness must be between 1 and 10');

mongoose.model('Manifestacao', ManifestacaoSchema);
