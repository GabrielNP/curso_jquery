// contadores do enunciado
var frase = jQuery(".frase").text();
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);
var numCaracteres = frase.length;
$("#tamanho-caracteres").text(numCaracteres);

// contadores dos inputs do usuário
var campo= $(".campo-digitacao");
campo.on("input",function(){
    var conteudo = campo.val();

    var qtdeCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdeCaracteres);

    var qtdePalavras = conteudo.split(/\S+/).length-1;
    $("#contador-palavras").text(qtdePalavras);    
});

// decréscimo do tempo
var tempoRestante = $("#tempo").text();
campo.one("focus", function(){
    var cronometroID = setInterval(function(){
        tempoRestante--;
        $("#tempo").text(tempoRestante);
       
        if(tempoRestante < 1){
            campo.attr("disabled", true);

        clearInterval(cronometroID);
        }
        
    },1000);
});