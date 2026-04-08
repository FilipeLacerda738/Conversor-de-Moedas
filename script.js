document.addEventListener("DOMContentLoaded", () => {
  // Chamada da API
  const API_URL = "https://api.frankfurter.dev/v1";

  // Variaveis do Histórico
  const CHAVE_HISTORICO = "conversorHistorico"; // Chave do localStorage
  const LIMITE_HISTORICO = 10; // Limite de 10 conversões
  // Elementos da DOM
  const campoValor = document.getElementById("valor"); // Campo de valor
  const seletorDe = document.getElementById("moeda-de"); // Seletor "de"
  const seletorPara = document.getElementById("moeda-para"); // Seletor "para"
  const botaoTroca = document.getElementById("botao-troca"); // Botão de troca
  const textoResultado = document.getElementById("texto-resultado"); // Texto do resultado
  const valorResultado = document.getElementById("valor-resultado"); // Valor do resultado
  const loader = document.getElementById("loader"); // carregamento
  const tituloGrafico = document.getElementById("titulo-grafico"); // Título do gráfico
  const dataAtualizacao = document.getElementById("data-atualizacao"); // Data de atualização
  // Contexto do gráfico
  const contextoGrafico = document
    .getElementById("grafico-moedas")
    .getContext("2d");
  let meuGrafico;
  // Função para carregar as moedas na interface
  async function carregarMoedas() {
    try {
      // Busca a lista de moedas da API
      const resposta = await fetch(`${API_URL}/currencies`);
      const moedas = await resposta.json();
      // Popula os seletores com as moedas
      const moedasPadrao = {
        BRL: "Real Brasileiro",
        USD: "Dólar Americano",
        EUR: "Euro",
      };
      const todasMoedas = { ...moedasPadrao, ...moedas };
      console.log("Moedas disponíveis:", todasMoedas); // Log das moedas carregadas
      // Adiciona as opções aos seletores
      for (const [codigo, nome] of Object.entries(todasMoedas)) {
        const optionDe = new Option(`${codigo} - ${nome}`, codigo); // Cria a opção
        const optionPara = new Option(`${codigo} - ${nome}`, codigo);
        seletorDe.add(optionDe); // Adiciona seletor "de"
        seletorPara.add(optionPara); // Adiciona seletor "para"
      }

      seletorDe.value = "BRL"; // Define Real como padrão
      seletorPara.value = "USD"; // Define Dolar como padrão

      await converterMoeda(); // Converte ao carregar
      console.log("Moedas carregadas."); // Log de sucesso
    } catch (erro) {
      console.error("Erro ao carregar moedas:", erro); // Log do erro
      alert("Não foi possível carregar a lista de moedas."); // Alerta ao usuário
    }
  }

  // Função principal de conversão
  async function converterMoeda() {
    const valor = parseFloat(campoValor.value);
    const moedaDe = seletorDe.value;
    const moedaPara = seletorPara.value;

    // Validação
    if (isNaN(valor) || valor <= 0 || !moedaDe || !moedaPara) {
      textoResultado.textContent = "Por favor, insira um valor válido.";
      valorResultado.textContent = "";
      return;
    }

    // Validação
    if (moedaDe === moedaPara) {
      textoResultado.textContent = `${formatarMoeda(valor, moedaDe)} =`;
      valorResultado.textContent = formatarMoeda(valor, moedaPara);
      exibirDataAtualizacao(new Date().toISOString().split("T")[0]);

      // Salva no histórico
      salvarNoHistorico(moedaDe, moedaPara, valor, valor);

      await carregarGrafico(moedaDe, moedaPara);
      return;
    }

    // Mostra o loader
    loader.style.display = "block";
    textoResultado.textContent = "Calculando...";
    valorResultado.textContent = "";

    try {
      // Busca a taxa de câmbio na API
      const resposta = await fetch(
        `${API_URL}/latest?amount=${valor}&from=${moedaDe}&to=${moedaPara}`,
      );
      const dados = await resposta.json();
      // Pega a taxa convertida
      const taxaConvertida = dados.rates[moedaPara];
      // Exibe o resultado formatado

      textoResultado.textContent = `${formatarMoeda(valor, moedaDe)} =`;
      valorResultado.textContent = formatarMoeda(taxaConvertida, moedaPara);

      // Exibe a data da última atualização
      exibirDataAtualizacao(dados.date);

      // Salva a conversão bem-sucedida no histórico
      salvarNoHistorico(moedaDe, moedaPara, valor, taxaConvertida);

      await carregarGrafico(moedaDe, moedaPara);
      // Fim do try
    } catch (erro) {
      // Captura erros de rede ou API
      console.error("Erro ao converter moeda:", erro);
      textoResultado.textContent = "Erro ao converter.";
      valorResultado.textContent = "Tente novamente.";
    } finally {
      // Loader sempre some depois de tentativa bem sucedida ou falha
      loader.style.display = "none";
    }
  }

  function salvarNoHistorico(moedaDe, moedaPara, valorDe, valorPara) {
    // Validação
    if (!moedaDe || !moedaPara || isNaN(valorDe) || isNaN(valorPara)) {
      return;
    }

    const registro = {
      de: moedaDe,
      para: moedaPara,
      valorDe: valorDe,
      valorPara: valorPara,
      data: new Date().toISOString(), // Salva a data exata da conversão
    };

    // Puxa o histórico atual do localStorage
    let historico = JSON.parse(localStorage.getItem(CHAVE_HISTORICO)) || [];

    // Adiciona o novo registro no início
    historico.unshift(registro);

    // Mantém apenas os últimos LIMITE_HISTORICO registros
    historico = historico.slice(0, LIMITE_HISTORICO);

    try {
      localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historico));
    } catch (e) {
      console.error("Erro ao salvar no localStorage:", e);
      alert("Não foi possível salvar o histórico de conversões.");
    }
  }

  // Função para carregar o gráfico de histórico
  async function carregarGrafico(moedaDe, moedaPara) {
    tituloGrafico.textContent = `Histórico ${moedaDe} para ${moedaPara} (Últimos 30 dias)`;

    // Calcula a data de 30 dias atrás
    const data = new Date();
    data.setDate(data.getDate() - 30);
    const dataInicio = data.toISOString().split("T")[0];

    // Busca os dados da API
    try {
      const resposta = await fetch(
        `${API_URL}/${dataInicio}..?from=${moedaDe}&to=${moedaPara}`,
      );
      const dados = await resposta.json(); // Pega os dados retornados
      const taxas = dados.rates;
      // Prepara os dados para o gráfico
      const labels = Object.keys(taxas).sort(
        (a, b) => new Date(a) - new Date(b),
      );

      // Dados do gráfico
      const dadosGrafico = labels.map((data) => {
        // Verifica se a taxa existe para a data
        if (taxas[data][moedaPara]) {
          return taxas[data][moedaPara];
        }
        return 1;
      });

      // Formata para formato Brasileiro dia/mês/ano
      const labelsFormatados = labels.map((data) => {
        const d = new Date(data);
        return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}`;
      });

      // Remove gráfico anterior se existir
      if (meuGrafico) {
        meuGrafico.destroy();
        console.log("Gráfico anterior destruído.");
      }

      // Cria o gráfico
      meuGrafico = new Chart(contextoGrafico, {
        type: "line",
        data: {
          labels: labelsFormatados,
          datasets: [
            {
              label: `1 ${moedaDe} = X ${moedaPara}`,
              data: dadosGrafico,
              borderColor: "rgba(13, 110, 253, 1)",
              backgroundColor: "rgba(13, 110, 253, 0.1)",
              fill: true,
              tension: 0.2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            y: { title: { display: true, text: `Valor (${moedaPara})` } },
          },
        },
      });
      // Fim da criação do gráfico
    } catch (erro) {
      console.error("Erro ao carregar gráfico:", erro);
      tituloGrafico.textContent = "Não foi possível carregar o histórico.";
    }
  }

  // Formata um valor numérico como moeda.
  function formatarMoeda(valor, moeda) {
    try {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: moeda,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(valor);
    } catch (e) {
      // moedas não reconhecidas
      return `${valor.toFixed(2)} ${moeda}`;
      console.error("Erro ao formatar moeda:", e);
    }
  }

  // Exibe a data da última atualização em formato dia/mês/ano
  function exibirDataAtualizacao(dataApi) {
    const [ano, mes, dia] = dataApi.split("-");
    // Formata e exibe
    dataAtualizacao.textContent = `Última atualização: ${dia}/${mes}/${ano}`;
  }

  // Eventos
  campoValor.addEventListener("input", converterMoeda);
  seletorDe.addEventListener("change", converterMoeda);
  seletorPara.addEventListener("change", converterMoeda);

  // Troca as moedas ao clicar no botão
  botaoTroca.addEventListener("click", () => {
    const temp = seletorDe.value;
    seletorDe.value = seletorPara.value;
    seletorPara.value = temp;

    // Converte novamente após a troca
    converterMoeda();
  });
  // Carrega as moedas ao iniciar a página
  carregarMoedas();
});
