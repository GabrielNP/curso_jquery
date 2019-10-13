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
    $(this).parent().parent().remove();
}

$(".botao-remover").click(function(event){
    event.preventDefault();
    $(this).parent().parent().remove();
})