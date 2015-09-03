var recuperarDenuncias = function() {

	var Denuncia = Parse.Object.extend('Denuncia');
	var query = new Parse.Query(Denuncia);

	// query.equalTo("playerName", "Dan Stemkoski");

	query.find({
		success: function(results) {
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				aumentarListaDenuncias(results[i]);
			}
		},
		error: function(Errorror) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
};

var aumentarListaDenuncias = function(denuncia) {
	var list = $('#posts_list');

	var newItem = $('<li>');
	var newItem1 = $('<li>');
	var newItem2 = $('<li>');
	var newItem3 = $('<li>');
	var newItem4 = $('<li>');
	var newItem5 = $('<li>');

	var agresor = denuncia.attributes.nombre_agresor;
	var victima = denuncia.attributes.nombre_victima;
	var email = denuncia.attributes.email_victima;
	var telefono = denuncia.attributes.telefono_fijo_victima;
	var celular = denuncia.attributes.telefono_movil_victima;
	var agresion = denuncia.attributes.descripcion

	/*if (denuncia.attributes.image) {
		itemContent += ' <img class="image image--small" src="' + denuncia.attributes.image._url + '">';
	}*/

	newItem.html(agresor);
	newItem1.html(victima);
	newItem2.html(email);
	newItem3.html(telefono);
	newItem4.html(celular);
	newItem5.html(agresion);

	console.log(list);
	console.log(newItem);
	console.log(denuncia);
	console.log(denuncia.attributes.text);

	list.append(newItem);
	list.append(newItem1);
	list.append(newItem2);
	list.append(newItem3);
	list.append(newItem4);
	list.append(newItem5);

};

$(document).on('ready', function() {
	recuperarDenuncias();
});