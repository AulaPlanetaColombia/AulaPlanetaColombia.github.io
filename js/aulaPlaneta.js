/*
Scripts de aulaPlaneta
*/
function ajustaContenido() {
    var panelCont = $('.ajustarAPanel').parent();
    var k = $('.ajustarAPanel').height() / $('.ajustarAPanel').width();
    $('.ajustarAPanel').width(panelCont.width());
    $('.ajustarAPanel').height(panelCont.width() * k);
}
ajustaContenido();
$(window).resize(function () {
    ajustaContenido();
});
function iniciaNews() {
    if (Cookies.get('ap-news') !== 'ok') {
        $('.new01').popover({
            container: 'body',
            html: true,
            placement: 'right',
            title: '<h4>Algo ha cambiado por aquí...</h4>',
            trigger: 'manual',
            content: '<p>Todas las opciones, ventanas y presentaciones de esta página siguen aquí, pero en forma de vínculos en este <strong>Índice de recursos</strong>.</p><button class="btn btn-primary btn-block abreNew02">Siguiente</button>'
        });
        $('.new02').popover({
            container: 'body',
            html: true,
            placement: 'left',
            title: '<h4>¡No olvide suscribirse!</h4>',
            trigger: 'manual',
            content: '<p>Para mantenerse informado de todas las novedades del proyecto aulaPlaneta, de las nuevas herramientas y de las últimas noticias del proyecto.</p><button class="btn btn-primary btn-block abreNew03">Siguiente</button>'
        });
        $('.new03').popover({
            container: 'body',
            html: true,
            placement: 'right',
            title: '<h4>Nueva herramienta</h4>',
            trigger: 'manual',
            content: '<p>Herramienta para facilitar la labor de revisión final en plataforma de los editores. Si usted es un editor, lea atentamente este panel.</p><button class="btn btn-primary btn-block cierraNews">Entendido</button>'
        });
        $('.container').after('<div id="fondoNews" class="modal-backdrop fade in" style="height: 798px;"></div>');
        $('#fondoNews').click(function(){
            $('.new01').popover('hide');
            $('.new02').popover('hide');
            $('.new03').popover('hide');
            $('#fondoNews').remove();
        });
        $('.new01').popover('show');
        $('.abreNew02').click(function(){
            $('.new01').popover('hide');
            $('.new02').popover('show');
            $('.abreNew03').click(function(){
                $('.new01').popover('hide');
                $('.new02').popover('hide');
                $('.new03').popover('show');
                $('.cierraNews').click(function(){
                    $('.new03').popover('hide');
                    $('#fondoNews').remove();
                    Cookies.set('ap-news', 'ok', { expires: 30 });
                });
            });
        });
    }
}
function activaCargaForm(origen, destino) {
    $(destino).children().hide();
    $(origen + ' button').click(function(){
        $(destino).children('.' + $(this).attr('data-destino')).show();
        $(origen).hide();
    });
}
function activaModal(nombreModal){
    $(nombreModal).on('shown.bs.modal', function (e) {
        var origen = e.relatedTarget;
        var titulo = $(origen).attr('title');
        var contenido = $(origen).attr('data-cont');
        var k = $(contenido).attr('height') / $(contenido).attr('width');
        var cuerpo = $(this).find('.modal-body');
        $(this).find('.modal-title').html(titulo);
        $(cuerpo).html(contenido);
        $(cuerpo).children().width($(cuerpo).width());
        $(cuerpo).children().height($(contenido).attr('width') * k);
        console.log(k);
    });
}
function cargaConvertidor(origen, spin, destino) {
    function inicia() {
        $(origen + ' input').val('');
        $(origen).show();
        $(spin).hide();
        $(destino).hide();
    }
    function reemplazo(match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, offset, string){
        return '/BCRedir.aspx?URL=' + p3 + p4 + p5 + p6 + p7 + 'ruta=Buscador';
    }
    inicia();
    $(origen + ' button').click(function(){
        $(origen).hide();
        $(spin).show();
        var valOrigen = $(origen + ' input').val();
        var salida = valOrigen.replace(/(http:\/\/[a-z]+\.[a-z]+\.com)(\/BCRedir\.aspx\?URL=)?(\/encyclopedia\/default\.asp\?)(id[a-z]*=[0-9A-Z]*&)?(amp;)?(id[a-z]*=[0-9A-Z]*&)?(amp;)?(ruta=[A-Z]?[a-z]*&?(amp;)?)([^"]*)/, reemplazo);
        /* Guardado en https://regex101.com/r/wM4uS2/2 */
        $(destino + ' textarea').html(salida);
        $(spin).hide();
        $(destino).show();
        $(destino + ' button').click(function(){
            inicia();
        });
    });
}
function cargaArchivos(ruta, nombreRepo, nombreRama, nombreUsuario, destino, icono, nomArchivo, esWeb) {
    var usuario = new Gh3.User(nombreUsuario); // Usuario
    var repo = new Gh3.Repository(nombreRepo, usuario); // Repo
    var rutaArchivo = 'https://raw.githubusercontent.com/'+nombreUsuario+'/'+nombreRepo+'/'+nombreRama+'/'+ruta+'/';
    var rutaWeb = 'http://htmlpreview.github.io/?https://github.com/'+nombreUsuario+'/'+nombreRepo+'/'+nombreRama+'/'+ruta+'/';
    var directorios = ruta.split('/');

    repo.fetch(function(err,res) {
        if(err) { throw "Error..." }
        repo.fetchBranches(function(err,res){
            if(err) { throw "Error..." }
            var rama = repo.getBranchByName(nombreRama);
            var numDir = directorios.length;
            var i = 0;
            iteraDir(rama,directorios,numDir,i);
        });
    });

    function iteraDir(base,dirs,numDir,i){
        if (i<numDir) {
            var dir;
            base.fetchContents(function(err,res){
                if(err) { throw "Error..." }
                dir = base.getDirByName(dirs[i]);
                i++;
                iteraDir(dir,dirs,numDir,i);
            });
        } else {
            if (nomArchivo != undefined) {
                listaDir(base);
            } else {
                listaArchivos(base);
            }
        }
    }
    function listaDir(base) {
        base.fetchContents(function(err,res){
            if(err) { throw "Error..." }
            var rutaFinal = (esWeb ? rutaWeb : rutaArchivo);
            base.eachContent(function(dir){
                if (dir.type == "dir") {
                    $('.precarga').remove();
                    $('#'+destino).append('<p><a href="'+rutaFinal+dir.name+'/'+nomArchivo+'" target="_blank">'+icono+' '+dir.name+'</a></p>');
                }
            });
        });
    }
    function listaArchivos(base){
        base.fetchContents(function(err,res){
            if(err) { throw "Error..." }
            base.eachContent(function(arch){
                if (arch.type == "file") {
                    $('.precarga').remove();
                    $('#'+destino).append('<p><a href="'+rutaArchivo+arch.name+'" target="_blank">'+icono+' '+arch.name+'</a></p>');
                }
            });
        });
    }
}
function cargaIconos() {
    var colFoto = 0;
    var panel1 = '<div class="panel panel-default"><div class="panel-heading" role="tab" id="';
    var panel2 = '"><h4 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#iconosRecursos" href="#';
    var panel3 = '" aria-expanded="false" aria-controls="';
    var panel4 = '">';
    var panel5 = '</a></h4></div><!-- /.panel-heading --><div id="';
    var panel6 = '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="';
    var panel7 = '"><div class="panel-body">';
    var panel8 = '</div><!-- /.panel-body (collapsible) --></div><!-- /.panel-collapse --></div><!-- /.panel -->';
    var filaFoto1 = '<div class="row">';
    var filaFoto2 = '</div><!-- /.row -->';
    var foto1 = '<div class="col-md-3">';
    var foto2 = '</div>';
    var rutaFoto = 'https://raw.githubusercontent.com/AulaPlanetaColombia/RecursosGenerales/master/graficos/iconosRecursos/';
    var usuario = new Gh3.User("AulaPlanetaColombia"); // Usuario
    var repo = new Gh3.Repository("RecursosGenerales", usuario); // Repo
    var salida = '';
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });

    repo.fetch(function (err, res) {
        if(err) { throw "outch ..." }
        repo.fetchBranches(function (err, res) {
            if(err) { throw "outch ..." }
            var master = repo.getBranchByName("master");
            master.fetchContents(function (err, res) {
                if(err) { throw "outch ..." }
                var dir = master.getDirByName('graficos');
                dir.fetchContents(function (err, res) {
                    if(err) { throw "outch ..." }
                    var img = dir.getDirByName('iconosRecursos');
                    img.fetchContents(function(err,res) {
                        if(err) {throw "D'oh..."}
                        img.eachContent(function (content) { // Se iteran los directorios que contienen las fotos
                            if (content.type == "dir") {
                                var carpeta = img.getDirByName(content.name);
                                carpeta.fetchContents(function(err,res){
                                    var encabezado = 'enc'+content.name;
                                    var contenido = 'cont'+content.name;
                                    var nombreArea = content.name.replace(/([a-z|A-Z])([a-z]*)([A-Z]?)([a-z]*)/, function(match, p1, p2, p3, p4){
                                        return p1.toUpperCase()+p2+" "+p3.toUpperCase()+p4;
                                    });
                                    salida = panel1+encabezado+panel2+contenido+panel3+contenido+panel4+'&nbsp;';
                                    salida += nombreArea+panel5+contenido+panel6+encabezado+panel7;
                                    carpeta.eachContent(function(archivo) {
                                        var rutaIMG = rutaFoto+content.name+'/'+archivo.name+'/med.';
                                        if (archivo.name.substr(-1) == 'F') {
                                            rutaIMG += 'png';
                                        } else {
                                            rutaIMG += 'jpg';
                                        }
                                        var rutaThumb = rutaIMG.replace(/(.*)(med)(\.[a-z]{3})/, "$1thumb$3");
                                        var nombreIcono = archivo.name.replace(/([a-z|A-Z])([a-z]*)([A-Z]?)([a-z]*)/, function(match, p1, p2, p3, p4){
                                            return p1.toUpperCase()+p2+" "+p3.toUpperCase()+p4;
                                        });
                                        // ----->  Inicia carga de imagen med
                                        if (colFoto == 0) {
                                            salida += filaFoto1;
                                        }
                                        salida += foto1+'<a href="'+rutaIMG+'" data-toggle="lightbox" data-title="'+nombreIcono+' - Med" data-footer="Haga clic derecho y seleccione la opción <strong>Guardar imagen como...</strong> para descargar la imagen.">';
                                        salida += '<figure class="thumbnail"><img src="'+rutaIMG+'" class="img-responsive">';
                                        salida += '<figcaption class="caption">'+nombreIcono+' - Med</figcaption>';
                                        salida += '</figure></a>'+foto2;
                                        if (colFoto == 3) {
                                            salida += filaFoto2;
                                        }
                                        colFoto++;
                                        if (colFoto > 3) {
                                            colFoto = 0;
                                        }
                                        // --------> Inicia carga de imagen thumb
                                        if (colFoto == 0) {
                                            salida += filaFoto1;
                                        }
                                        salida += foto1+'<a href="'+rutaThumb+'" data-toggle="lightbox" data-title="'+nombreIcono+' - Thumb" data-footer="Haga clic derecho y seleccione la opción <strong>Guardar imagen como...</strong> para descargar la imagen.">';
                                        salida += '<figure class="thumbnail"><img src="'+rutaThumb+'" class="img-responsive">';
                                        salida += '<figcaption class="caption">'+nombreIcono+' - Thumb</figcaption>';
                                        salida += '</figure></a>'+foto2;
                                        if (colFoto == 3) {
                                            salida += filaFoto2;
                                        }
                                        colFoto++;
                                        if (colFoto > 3) {
                                            colFoto = 0;
                                        }
                                    });
                                    colFoto = 0;
                                    salida += panel8;
                                    $('.precarga').remove();
                                    $('#iconosRecursos').append(salida);
                                });
                            }
                        });
                        $('#tablaRecursos').after('<br>');
                    });
                });
            });
        })
    });
}
