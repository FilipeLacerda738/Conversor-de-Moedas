Conversor de Moedas 2.0
Um conversor de moedas moderno, dinâmico e responsivo, construído do zero com foco em design, performance e dados em tempo real.


 A Evolução: Do Estático ao Dinâmico
Este projeto é a segunda versão (2.0) de um conversor de moedas.

A primeira versão era um exercício fundamental de HTML e JS, mas possuía uma limitação crucial: todos os valores de conversão eram fixos (hard-coded) no JavaScript. Isso significava que as cotações ficavam desatualizadas instantaneamente, o app não tinha utilidade real e a adição de novas moedas era um processo manual e tedioso.

O Conversor de Moedas 2.0 é uma recriação completa, pensada para ser uma ferramenta profissional, eficiente e esteticamente agradável.

O que mudou?
API em Tempo Real: Adeus, valores fixos! Agora o projeto consome a API Frankfurter.app para buscar cotações de dezenas de moedas fiduciárias em tempo real.

Gráficos Históricos: Inspirado nos conversores modernos (como o do Google), o projeto agora exibe um gráfico dos últimos 30 dias para qualquer par de moedas selecionado, utilizando a biblioteca Chart.js.

UI/UX Moderna: A interface foi redesenhada com Bootstrap 5 para garantir responsividade total. Adicionamos um efeito glassmorphism (vidro fosco) e um fundo gradiente animado para uma aparência suave e moderna.

Código Limpo e Semântico: O código foi refatorado e separado em HTML, CSS e JS, seguindo as melhores práticas. O HTML agora é semântico (usando <main>, <section>, <output>) para melhor acessibilidade e SEO.

Performance: Todo o código JavaScript é assíncrono (async/await), garantindo que a interface nunca trave enquanto espera uma resposta da API.

 Recursos Principais
Conversão em tempo real entre dezenas de moedas.

Gráfico dinâmico com o histórico de cotação dos últimos 30 dias.

Design responsivo (mobile-first) que se adapta a qualquer tela, de celulares a TVs.

Interface moderna com efeito glassmorphism e fundo gradiente animado.

Botão de troca rápida para inverter as moedas de origem e destino.

Feedback visual com loader durante as chamadas de API.

Formatação de moeda correta para o padrão brasileiro (R$).

Exibição da data da última atualização da cotação.

 Tecnologias Utilizadas
HTML5: Estrutura semântica e acessível.

CSS3: Estilização moderna, animações (gradiente, fade-in) e glassmorphism.

Bootstrap 5: Componentes de UI e sistema de grid responsivo.

JavaScript (ES6+): Manipulação do DOM, lógica e chamadas async/await para a API.

Frankfurter.app API: Fornecimento de dados de cotação e históricos.

Chart.js: Renderização dos gráficos de histórico.


📄 Licença

Este projeto é distribuído sob a licença MIT.
