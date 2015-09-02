
var allowedFileExtensions = [
	'jpg',
	'png',
	'gif',
	'jpeg',
];

var crearDenuncia = function() {

	var agresor = $('#agresor').val();
	var victima = $('#victima').val();
	var email = $('#e-mail').val();
	var agresion = $('#agresion').val();
	var telefono = $('#telefono').val();
	var celular = $('#celular').val();

	if (agresion === '') {
		return;
	}

	var fileUploadControl = $('#denuncia_image_input')[0];

	// Verificar si hay un archivo
	if (fileUploadControl.files.length > 0) {

		var file = fileUploadControl.files[0];

		var fileExtension = file.name.substr(file.name.lastIndexOf('.') + 1);
		fileExtension = fileExtension.toLowerCase();

		if (allowedFileExtensions.indexOf(fileExtension) < 0) {
			alert('Ese tipo de archivo no está permitido! Por favor, asegúrate de subir un archivo de imagen.');
			return;
		}

		var parseFile = new Parse.File(file.name, file);
		parseFile.save().then(function(file) {

			// Una vez subido el archivo, guardar la denuncia
			crearDenunciaFin(agresor, victima, email, agresion, telefono, celular, file);

		}, function(error) {
			console.log(error);
			alert('Lo siento, ocurrio un error al subir la imagen!');
		});

	} else {
		// Crear la denuncia sin imagen
		crearDenunciaFin(agresor, victima, email, agresion, telefono, celular);
	}

};

var crearDenunciaFin = function(agresor, victima, email, agresion, telefono, celular, image) {

	var nuevaDenuncia = {
		nombre_agresor: agresor,
		nombre_victima: victima,
		email_victima: email,
		descripcion: agresion,
		telefono_fijo_victima: telefono,
		telefono_movil_victima: celular
	};

	if (image) {
		nuevaDenuncia.image = image;
	}

	var Denuncia = Parse.Object.extend('Denuncia');
	var nuevaDenunciaParse = new Denuncia();

	nuevaDenunciaParse.save(nuevaDenuncia).then(function(object) {
		// Limpiar los campos después de crear una denuncia
		$('#denuncia_text_input').val('');
		var fileUploadControl = $('#denuncia_image_input');
		fileUploadControl.replaceWith($('#denuncia_text_input').val('').clone(true));

		alert('Tu denuncia creada, gracias por no callar el maltrato!');
	});
};


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
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
};

var aumentarListaDenuncias = function(denuncia) {
	var list = $('#posts_list');

	var newItem = $('li');

	newItem.html(denuncia.text);

	list.append(newItem);
};
