'use strict';

var mongoose = require('mongoose'),
  Manif = mongoose.model('Manifestacao');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Manif.find({}).remove(function() {
  Manif.create({
        titulo: "Movimento dos Sem Teto (MST)1",
        dataHora: "22/05 às 14h",
        pontoEncontro: "Av. Paulista (MASP)",
        afavor: 123,
        contra: 40,
        tags: '#moradia #copa',
        cidade: 'São Paulo',
        estado: 'SP'
      },
      {
        titulo: "Movimento dos Sem Teto (MST)2",
        dataHora: "20/05 às 14h",
        pontoEncontro: "Av. Paulista (MASP)",
        afavor: 20,
        contra: 10,
        tags: '#educacao #transporte',
        cidade: 'São Paulo',
        estado: 'SP'
      },
      {
        titulo: "Movimento dos Sem Teto (MST)3",
        dataHora: "22/05 às 14h",
        pontoEncontro: "Av. Paulista (MASP)",
        afavor: 123,
        contra: 90,
        tags: '#preconceito #transporte',
        cidade: 'São Paulo',
        estado: 'SP'
      },
      {
        titulo: "Movimento dos Sem Teto (MST)4",
        dataHora: "22/05 às 14h",
        pontoEncontro: "Av. Paulista (MASP)",
        afavor: 123,
        contra: 90,
        tags: '#copa #pecs',
        cidade: 'São Paulo',
        estado: 'SP'
      }, function() {
      console.log('finished populating things');
    }
  );
});
