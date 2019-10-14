$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "gabrielnp";
    var numPalavras = $("#contador-palavras").text();
    var qtdeCaracteres = $("#contador-caracteres").text();
    var linha = novaLinha(usuario, numPalavras, qtdeCaracteres);
                /*"<tr>"+
                    "<td>"+ usuario + "</td>"+
                    "<td>"+ numPalavras + "</td>"+
                    "<td>"+ qtdeCaracteres+ "</td>"+
                    "<td>"+ botaoRemover + "</td>"+
                "</tr>";*/

    linha.find(".botao-remover").click(removeLinha);
    
    corpoTabela.append(linha);
    $(".placar").slideDown(1000);
    scrollPlacar();
}

function novaLinha(usuario, palavras, caracteres){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaQtdeCaracteres = $("<td>").text(caracteres);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href","#");
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

function removeLinha(){
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function(){
        linha.remove();
    }, 1000);
    
}

$(".botao-remover").click(function(){
    event.preventDefault();
    $(this).parent().parent().remove();
    // .fadeOut(1000);
    // setTimeout(function(){
    //     removerLinha.remove();
    // }, 1000);
})


function mostraPlacar(){
    $(".placar").stop().slideToggle(2000);
}

/* NOT WORKING */
function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("body").animate(
        {
            scrollTop: posicaoPlacar+"px"
        }, 1000);
}

function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        var caracteres = $(this).find("td:nth-child(3)").text();
        var score = {
            usuario: usuario,
            palavras: palavras,
            caracteres: caracteres            
        };

        placar.push(score);

        var dados = {
            placar: placar
        };

        $.post("http://localhost:3000/placar",dados,function(){
            console.log("Placar gravado!");
        });
    });
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario,this.palavras,this.caracteres);
            $("tbody").append(linha);
        });
    });
}