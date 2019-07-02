let supermercado = {
  name: 'string',
  foto: 'url',
  slug: 'string', // identificador único do supermercado
  endereco: {
    rua: 'string',
    numero: 'number',
    bairro: 'string'
    cep: 'string'
  }
  horarioFunc: 'date'
  frete: 'number'
}

let cliente = {
  nome: 'string',
  endereco: {
    rua: 'string',
    numero: 'number',
    bairro: 'string',
    cep: 'string'
  },
  compras: ['Id de compra'],
  carrinho: 'Id de Carrinho',
  contato: ['string']
} 

let compras = {
  id: 'string',
  produtos: ['id'],
  valor: 'number',
  entrega: 'data',
  frete: 'numero',
  status: 'string'
}

let categoria = {
  pai: null | 'id',
  name: 'string',
  foto: 'url',
  sku: 'string'   // identificador único 
}

let produto = {
  name: 'string',
  preco: 'number',
  pai: 'id da categoria',
  sku: 'string', // identificador único (sku da categoria + algumas letras)
  marca: 'id',
  qtde: 'number',
  nivelMaturidade: 'id' | null,
  peso: 'number',
  vailable: true
}

let carrinho = {
  
}

let marcas = {
  id: 'id',
  nome: 'string'
}

let nivelMaturidade = {
  id: 'id',
  nivel: 'string'
}

