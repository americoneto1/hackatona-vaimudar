'use strict';

var mongoose = require('mongoose'),
    Manif = mongoose.model('Manifestacao');

/**
 * Get manifestacoes
 */
exports.manifestacoes = function(req, res) {
  return Manif.find().limit(4).sort("-cadastro").exec(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

exports.cadastro = function(req, res) {
	var data = req.body;
	Manif.create(data, function(err) {
		return res.send(err);
	});
}

exports.votacao = function(req, res) {
	var inc = {};
	if (req.params.bit == 1) {
		inc.afavor = 1;
	} else {
		inc.contra = 1;
	}

	Manif.update( { _id: req.params.id },
                  { $inc: inc }, function(err) {
                  	return res.send(err);
                  }
                );
}