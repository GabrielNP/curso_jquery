var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");
var i = 0;
// var linha = console.log("linha inserida: ",i++);


//$(document).ready(function(){});
$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
// contadores do enunciado
    var frase = jQuery(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
    var numCaracteres = frase.length;
    $("#tamanho-caracteres").text(numCaracteres);
}

function inicializaContadores(){
// contadores dos inputs do usuário
    campo.on("input",function(){
        var conteudo = campo.val();

        var qtdeCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdeCaracteres);

        var qtdePalavras = conteudo.split(/\S+/).length-1;
        $("#contador-palavras").text(qtdePalavras);    
    });
}

function inicializaCronometro(){
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function(){
        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);       
            $("#botao-reiniciar").attr("disabled",true)
            if(tempoRestante < 1){
                campo.attr("disabled", true);   
                clearInterval(cronometroID);
                $("#botao-reiniciar").attr("disabled",false);
                campo.toggleClass("campo-desativado");
                inserePlacar();
            }
        },1000);
    });
}

function reiniciaJogo(){
    $("#botao-reiniciar").click(function(event){
        //$("#tempo-digitacao").text(4);
        campo.attr("disabled",false);
        campo.val("");
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0")
        $("#tempo-digitacao").text(tempoInicial);
        inicializaCronometro();
        campo.toggleClass("campo-desativado")
        campo.removeClass("campo-errado");
        campo.removeClass("campo-correto");
        console.log("linha inserida: ",i++);
    });
}

function inicializaMarcadores(){
    campo.on("input",function(){
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0 , digitado.length);
        if(digitado == comparavel) {
            campo.addClass("campo-correto");
            campo.removeClass("campo-errado");
        } else {
            campo.addClass("campo-errado");
            campo.removeClass("campo-correto");
        }
            /*Essa if poderia ser escrita da seguinte forma:
            var ehCorreto = (digitado == comparavel);
            campo.toggleClass("borda-verde", ehCorreto);
            campo.toggleClass("borda-vermelha", !ehCorreto);
            
            ou então

            if( frase.startsWith(digitado)) {
                campo.addClass("borda-verde");
                } else {
                campo.addClass("borda-vermelha");
            }
            */
    });
}

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "gabrielnp";
    var numPalavras = $("#contador-palavras").text();
    var qtdeCaracteres = $("#contador-caracteres").text();
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>"
    var linha = novaLinha(usuario, numPalavras, qtdeCaracteres);
                /*"<tr>"+
                    "<td>"+ usuario + "</td>"+
                    "<td>"+ numPalavras + "</td>"+
                    "<td>"+ qtdeCaracteres+ "</td>"+
                    "<td>"+ botaoRemover + "</td>"+
                "</tr>";*/

    linha.find(".botao-remover").click(removeLinha);
    
    corpoTabela.append(linha);
}

function novaLinha(usuario, palavras, caracteres){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaQtdeCaracteres = $("<td>").text(caracteres);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    // Icone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os quatro <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaQtdeCaracteres);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event){
    event.preventDefault();
    $(this).parent().parent().remove();
}

$(".botao-remover").click(function(event){
    event.preventDefault();
    $(this).parent().parent().remove();
})