/*
Scripts de aulaPlaneta
*/
var panelCont = $('.ajustarAPanel').parent();
var k = $('.ajustarAPanel').height()/$('.ajustarAPanel').width();
ajustaContenido();
function ajustaContenido() {
    $('.ajustarAPanel').width(panelCont.width());
    $('.ajustarAPanel').height(panelCont.width()*k);
}
$( window ).resize(function() {
    ajustaContenido();
});

/**/
var colFoto = 0;
var panel1 = '<div class="panel panel-default"><div class="panel-heading" role="tab" id="';
var panel2 = '"><h4 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#fotosStock" href="#';
var panel3 = '" aria-expanded="false" aria-controls="';
var panel4 = '">';
var panel5 = '</a></h4></div><!-- /.panel-heading --><div id="';
var panel6 = '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="';
var panel7 = '"><div class="panel-body">';
var panel8 = '</div><!-- /.panel-body (collapsible) --></div><!-- /.panel-collapse --></div><!-- /.panel -->';
var filaFoto1 = '<div class="row">';
var filaFoto2 = '</div><!-- /.row -->';
var foto1 = '<div class="col-md-4">';
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
                                salida = panel1+encabezado+panel2+contenido+panel3+contenido+panel4+'&nbsp;';
                                salida += content.name+panel5+contenido+panel6+encabezado+panel7;
                                carpeta.eachContent(function(archivo) {
                                    var rutaIMG = rutaFoto+content.name+'/'+archivo.name+'/med.jpg';
                                    if (colFoto == 0) {
                                        salida += filaFoto1;
                                    }
                                    salida += foto1+'<a href="'+rutaIMG+'" data-toggle="lightbox" data-title="'+archivo.name+'/med.jpg">';
                                    salida += '<img src="'+rutaIMG+'" class="img-thumbnail">';
                                    salida += '</a>'+foto2;
                                    if (colFoto == 0) {
                                        salida += filaFoto2;
                                    }
                                    colFoto++;
                                    if (colFoto > 2) {
                                        colFoto = 0;
                                    }
                                });
                                salida += panel8;
                                $('#iconosRecursos').append(salida);
                            });
                        }
                    });
                });
            });
        });
    })
});
/**/
