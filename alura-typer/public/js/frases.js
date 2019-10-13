$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases", trocaFrase)
    .fail(function(){
        $(".erro").toggle();
        setTimeout(function(){
            $(".erro").toggle();
        },3000);
    })
    .always(function(){
        // $("#spinner").toggle();
        setTimeout(function(){
            $("#spinner").toggle();
        },3000);
    });
    ;
}

function trocaFrase(data){
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase(){
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();
    var dados = { id: fraseId };

    $.get("http://localhost:3000/frases",dados,trocaFrase)
    .fail(function(){
        $(".erro").toggle();
        setTimeout(function(){
            $(".erro").toggle();
        },3000);
    })
    .always(function(){
        // $("#spinner").toggle();
        setTimeout(function(){
            $("#spinner").toggle();
        },3000);
    });
    ;
}

function trocaFrase(data){

}