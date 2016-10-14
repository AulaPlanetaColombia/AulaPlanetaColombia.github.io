// JavaScript con scripts para comprobación de CE
// Variables globales
var fsObject = new zip.fs.FS();
// Acciones y listeners globales automáticos
volverAnterior('.volver');
zip.workerScriptsPath = "/js/";
Dropzone.options.origenDropzone = {
    paramName: "origen",
    maxFilesize: 32768,
    clickable: true,
    dictDefaultMessage: "<i class='fa fa-arrow-circle-o-down fa-5x'></i><br>Arrastre y suelte el Cuaderno de estudio en formato ZIP sobre esta zona, o haga clic para seleccionar un archivo.",
    acceptedFiles: ".zip",
    uploadMultiple: false,
    autoProcessQueue: false,
    init: function() {
        this.on("addedfile", function(file) {
            if($('.dz-preview.dz-file-preview').length > 1) {
                $('.dz-preview.dz-file-preview')[0].remove();
            };
            $('.resultados button').removeAttr('disabled');
            cargaBlob(file);
        });
    }
};
// Funciones globales
function cargaBlob(blob) {
    fsObject.importBlob(blob, function(){
        var cuaderno = fsObject.find('cuadernoestudio.xml');
        var dir = fsObject.find('cuadernoestudio/images_xml');
        var cuerpoTabla = '<table class="table table-striped table-bordered"><thead><tr><th>Nombre</th><th>Correspondencia</th></tr></thead><tbody></tbody></table>';
        $('#imgEnZip').html(cuerpoTabla);
        $('#imgEnCE').html(cuerpoTabla);
        cuaderno.getText(function(data){
            // Obtenida de https://regex101.com/r/hZ6uN0/2
            var reg = /<(imagen|formula)\s(ampliable|alineacion)?(="[\w]+")?\s?src="([a-zA-Z0-9_\-\sáéíóúÁÉÍÓÚñÑüÜ]+)(\.(jpg|png|gif|JPG|PNG|GIF))">/g;
            var imgsCE = data.match(reg);
            var imgsXML = dir.children;
            imgsXML.forEach(function(val){
                var nombreXML = val.name;
                var coincide = false;
                var salida = '';
                imgsCE.forEach(function(val){
                    if (val.replace(reg, '$4$5') ==  nombreXML)
                        coincide = true;
                });
                salida += '<tr><td>'+nombreXML+'</td><td>';
                if (!coincide)
                    salida += 'No aparece en el CE';
                salida += '</td></tr>';
                $('#imgEnZip table tbody').append(salida);
            });
            imgsCE.forEach(function(val){
                var nombreCE = val.replace(reg, '$4$5');
                var coincide = false;
                var salida = '';
                imgsXML.forEach(function(val){
                    if (val.name ==  nombreCE)
                        coincide = true;
                });
                salida += '<tr><td>'+nombreCE+'</td><td>';
                if (!coincide)
                    salida += 'No aparece en imagenes_xml';
                salida += '</td></tr>';
                $('#imgEnCE table tbody').append(salida);
            });
        });
    }, function(error){
        console.log('Error: ' + error);
    });
}
