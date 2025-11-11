# Descrição do projeto

Este projeto é uma aplicação frontend completa para conversão de moedas.
A aplicação permite ao usuário converter valores entre diversas moedas, buscando as cotações mais recentes de uma API pública. Além disso, exibe um gráfico com o histórico dos últimos 30 dias para o par de moedas selecionado e salva as últimas 10 conversões em um histórico local.

## Funcionalidades

**Conversão em Tempo Real:** Converte um valor de uma moeda de origem para uma moeda de destino.

**Cotações Atuais:** Utiliza a API <ins>Frankfurter.app</ins> para buscar as taxas de câmbio mais recentes.

**Gráfico Histórico:** Exibe um gráfico de linha (via Chart.js) com a variação da cotação dos últimos 30 dias.

**Troca Rápida:** Um botão permite inverter rapidamente as moedas "De" e "Para".

**Histórico de Conversões:** Salva automaticamente as últimas 10 conversões no navegador.

**Página de Histórico:** Uma segunda página dedicada exibe a lista de conversões salvas.

**Limpar Histórico:** Permite ao usuário apagar todos os dados do histórico local.

## Tecnologias Usadas

**HTML:** Estruturação semântica do conteúdo.

**CSS:** Estilização customizada, variáveis CSS, animações e responsividade.

**JavaScript:** Manipulação do DOM, eventos, lógica da aplicação, chamadas async/await para a API e uso do localStorage.

**Bootstrap:** Framework CSS para layout, componentes e responsividade.

**Bootstrap Icons:** Biblioteca de ícones vetoriais.

**Chart.js:** Biblioteca JavaScript para a criação de gráficos interativos.

## O que aprendi com o projeto
Durante o desenvolvimento dessa aplicação, aprendi a integrar APIs externas de forma assíncrona e lidar com os dados retornados para atualizar a interface em tempo real. Também aprofundei meu entendimento sobre o funcionamento do `localStorage`, criação e manipulação de gráficos com o Chart.js e boas práticas de organização de código JavaScript. Além disso, refinei habilidades de responsividade com Bootstrap e CSS puro, garantindo uma experiência fluida tanto no desktop quanto no mobile.

## Gráficos e Visualização de Dados
    Aprender a usar a biblioteca Chart.js
 para gerar gráficos de linha interativos.

Entender como preparar dados de séries temporais (labels com datas, valores convertidos, cores e preenchimentos).

Lidar com a destruição e recriação do gráfico (meuGrafico.destroy()) pra evitar sobreposição e bugs visuais.

Configurar opções como `responsive, tension, fill, tooltip` e `legend` garantindo uma visualização elegante e intuitiva.

Aprender na prática o uso do elemento <canvas> no HTML e sua interação via contexto 2D.

## Fontes de estudo e referências úteis:
Documentação oficial: [Chart.js Docs](https://www.chartjs.org/docs/latest/)
Guia prático: [W3Schools - Chart.js](https://www.w3schools.com/graphics/plot_chartjs.asp?)
Tutorial: https://www.youtube.com/watch?v=sE08f4iuOhA
Tutorial complementar: (https://www.youtube.com/watch?v=cuEtnrL9-H0)


## Estilo

Usar Bootstrap pra construir uma interface responsiva e consistente, combinando com CSS personalizado para dar um toque próprio.

Aplicar ícones com Bootstrap Icons e microinterações para deixar a interface mais viva.

Criar um botão de “trocar moedas” funcional, um pequeno detalhe que melhora muito a usabilidade.

Aprimorar mensagens de erro, loaders e feedbacks visuais pra tornar o app mais intuitivo.