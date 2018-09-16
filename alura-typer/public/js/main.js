var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");
var frase = $("frase").text;

campo.on("input",function(){
    var digitado = campo.val();
    console.log(frase);
    console.log(digitado);
});


//$(document).ready(function(){});
$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
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
            }
        },1000);
    });
}


function reiniciaJogo(){
    $("#botao-reiniciar").click(function(){
        campo.attr("disabled",false);
        campo.val("");
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0")
        $("#tempo-digitacao").text(tempoInicial);
        inicializaCronometro();
        campo.toggleClass("campo-desativado")
    });
}
