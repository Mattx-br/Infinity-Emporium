// ************************************************
// API do Carrinho
// ************************************************

var carrinhoCompras = (function() {
 
  carrinho = [];
  
  // Construção
  function Item(nome, preco, contagem) {
    this.nome = nome;
    this.preco = preco;
    this.contagem = contagem;
  }
  
  // Salvar carrinho
  function salvarCarrinho() {
    sessionStorage.setItem('carrinhoCompras', JSON.stringify(carrinho));
  }
  
    // Carregamento do carrinho
  function carregarCarrinho() {
    carrinho = JSON.parse(sessionStorage.getItem('carrinhoCompras'));
  }
  if (sessionStorage.getItem("carrinhoCompras") != null) {
    carregarCarrinho();
  }
  
// --------------- //

  var obj = {};
  
  // Adicionar ao carrinho

  obj.addItemAoCarrinho = function(nome, preco, contagem) {
    for(var item in carrinho) {
      if(carrinho[item].nome === nome) {
        carrinho[item].contagem ++;
        salvarCarrinho();
        return;
      }
    }
    var item = new Item(nome, preco, contagem);
    carrinho.push(item);
    salvarCarrinho();
  }
  // Definir a contagem pelo item

  obj.setContagemForItem = function(nome, contagem) {
    for(var i in carrinho) {
      if (carrinho[i].nome === nome) {
        carrinho[i].contagem = contagem;
        break;
      }
    }
  };
  // Remover item do carrinho

  obj.removeItemDoCarrinho = function(nome) {
      for(var item in carrinho) {
        if(carrinho[item].nome === nome) {
          carrinho[item].contagem --;
          if(carrinho[item].contagem === 0) {
            carrinho.splice(item, 1);
          }
          break;
        }
    }
    salvarCarrinho();
  }

  // Remover todos os itens do carrinho

  obj.removeItemDoCarrinhoTodos = function(nome) {
    for(var item in carrinho) {
      if(carrinho[item].nome === nome) {
        carrinho.splice(item, 1);
        break;
      }
    }
    salvarCarrinho();
  }

  // Limpar carrinho

  obj.limparCarrinho = function() {
    carrinho = [];
    salvarCarrinho();
  }

  // Contagem do carrinho

  obj.totalContagem = function() {
    var totalContagem = 0;
    for(var item in carrinho) {
      totalContagem += carrinho[item].contagem;
    }
    return totalContagem;
  }

  // Total do carrinho

  obj.totalCarrinho = function() {
    var totalCarrinho = 0;
    for(var item in carrinho) {
      totalCarrinho += carrinho[item].preco * carrinho[item].contagem;
    }
    return Number(totalCarrinho.toFixed(2));
  }

  // Listar carrinho

  obj.listarCarrinho = function() {
    var carrinhoCopia = [];
    for(i in carrinho) {
      item = carrinho[i];
      itemCopia = {};
      for(p in item) {
        itemCopia[p] = item[p];

      }
      itemCopia.total = Number(item.preco * item.contagem).toFixed(2);
      carrinhoCopia.push(itemCopia)
    }
    return carrinhoCopia;
  }

  // carrinho : Array
  // Item : Objeto/Classe
  // addItemAoCarrinho : Function
  // removeItemDoCarrinho : Function
  // removeItemDoCarrinhoTodos : Function
  // limparCarrinho : Function
  // contarCarrinho : Function
  // totalCarrinho : Function
  // listarCarrinho : Function
  // salvarCarrinho : Function
  // carregarCarrinho : Function
  return obj;
})();


// *****************************************
// Eventos / Engatilhadores
// ***************************************** 
// Adicionar Item

$('.add-ao-carrinho').click(function(event) {
  event.preventDefault();
  var nome = $(this).data('nome');
  var preco = Number($(this).data('preco'));
  carrinhoCompras.addItemAoCarrinho(nome, preco, 1);
  mostrarCarrinho();
  alert('Item adicionado ao carrinho!');
});

// Limpar itens
$('.limpar-carrinho').click(function() {
  carrinhoCompras.limparCarrinho();
  mostrarCarrinho();
});


function mostrarCarrinho() {
  var arrayCarrinho = carrinhoCompras.listarCarrinho();
  var saida = "";
  for(var i in arrayCarrinho) {
    saida += "<tr>"
      + "<td>" + arrayCarrinho[i].nome + "</td>" 
      + "<td>(" + arrayCarrinho[i].preco + ")</td>"
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-nome=" + arrayCarrinho[i].nome + ">-</button>"
      + "<input type='number' class='item-contagem form-control' data-nome='" + arrayCarrinho[i].nome + "' value='" + arrayCarrinho[i].contagem + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-nome=" + arrayCarrinho[i].nome + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-nome=" + arrayCarrinho[i].nome + ">X</button></td>"
      + " = " 
      + "<td>" + arrayCarrinho[i].total + "</td>" 
      +  "</tr>";
  }
  $('.mostrar-carrinho').html(saida);
  $('.total-carrinho').html(carrinhoCompras.totalCarrinho());
  $('.total-contagem').html(carrinhoCompras.totalContagem());
}



// Botão de deletar item

$('.mostrar-carrinho').on("click", ".delete-item", function(event) {
  var nome = $(this).data('nome')
  carrinhoCompras.removeItemDoCarrinhoTodos(nome);
  mostrarCarrinho();
})

// -1
$('.mostrar-carrinho').on("click", ".minus-item", function(event) {
  var nome = $(this).data('nome')
  carrinhoCompras.removeItemDoCarrinho(nome);
  mostrarCarrinho();
})
// +1
$('.mostrar-carrinho').on("click", ".plus-item", function(event) {
  var nome = $(this).data('nome')
  carrinhoCompras.addItemAoCarrinho(nome);
  mostrarCarrinho();
})

// Contagem de item
$('.mostrar-carrinho').on("change", ".item-contagem", function(event) {
   var nome = $(this).data('nome');
   var contagem = Number($(this).val());
  carrinhoCompras.setContagemForItem(nome, contagem);
  mostrarCarrinho();
});

mostrarCarrinho();