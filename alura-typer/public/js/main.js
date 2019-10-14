var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");
var i = 0;

//$(document).ready(function(){});
$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();
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
    campo.one("focus", function(){
        var tempoRestante = $("#tempo-digitacao").text();
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
        // $("#tempo-digitacao").text(10);
        campo.attr("disabled",false);
        campo.val("");
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0")
        $("#tempo-digitacao").text(tempoInicial);
        inicializaCronometro();
        campo.toggleClass("campo-desativado")
        campo.removeClass("campo-errado");
        campo.removeClass("campo-correto");
        console.log("cliquei");
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

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}
