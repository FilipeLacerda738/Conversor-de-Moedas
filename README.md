# Conversor-de-Moedas

Conversor de Moedas
Descrição
O Conversor de Moedas é uma aplicação web simples que permite aos usuários converter valores entre três moedas diferentes: Dólar (USD), Euro (EUR) e Real (BRL). O site calcula o valor convertido com base nas taxas de câmbio predefinidas.

Funcionalidades
Conversão de valores entre as moedas USD, EUR e BRL.
Interface simples e intuitiva para fácil inserção de dados.
Exibição imediata do valor convertido após a operação.
Tecnologias Utilizadas
HTML: Estruturação do conteúdo da página.
CSS: Estilização e layout da aplicação.
JavaScript: Manipulação de dados e lógica de conversão.
Como Usar
Insira o valor a ser convertido no campo "Valor".
Selecione a moeda de origem no campo "De".
Selecione a moeda de destino no campo "Para".
Clique no botão "Converter".
O valor convertido será exibido abaixo do botão.
Estrutura de Arquivos
graphql
Copiar código
/
├── index.html       # Arquivo HTML principal
├── styles.css       # Arquivo de estilo CSS
└── script.js        # Arquivo JavaScript para a lógica de conversão
index.html
Contém a estrutura principal do site, incluindo os campos de input, seletores de moedas e o botão de conversão.

styles.css
Responsável pela aparência do site, incluindo o layout centralizado, formatação dos textos e botões estilizados.

script.js
Contém a lógica para a conversão de moedas, utilizando taxas de câmbio predefinidas para calcular o valor convertido com base nas entradas do usuário.

Taxas de Câmbio
As taxas de câmbio usadas no projeto são definidas no arquivo JavaScript e podem ser atualizadas manualmente conforme necessário:

USD para BRL: 5.24
USD para EUR: 0.85
BRL para USD: 0.19
BRL para EUR: 0.16
EUR para USD: 1.17
EUR para BRL: 6.16
Melhorias Futuras
Atualização automática das taxas de câmbio a partir de uma API externa.
Adicionar mais moedas para conversão.
Suporte para conversões bidirecionais ao mesmo tempo.