document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'https://api.frankfurter.app';

    const campoValor = document.getElementById('valor');
    const seletorDe = document.getElementById('moeda-de');
    const seletorPara = document.getElementById('moeda-para');
    const botaoTroca = document.getElementById('botao-troca');
    const textoResultado = document.getElementById('texto-resultado');
    const valorResultado = document.getElementById('valor-resultado');
    const loader = document.getElementById('loader');
    const tituloGrafico = document.getElementById('titulo-grafico');
    const dataAtualizacao = document.getElementById('data-atualizacao');

    const contextoGrafico = document.getElementById('grafico-moedas').getContext('2d');
    let meuGrafico;

    async function carregarMoedas() {
        try {
            const resposta = await fetch(`${API_URL}/currencies`);
            const moedas = await resposta.json();

            const moedasPadrao = { 'BRL': 'Real Brasileiro', 'USD': 'Dólar Americano', 'EUR': 'Euro' };
            const todasMoedas = { ...moedasPadrao, ...moedas };

            for (const [codigo, nome] of Object.entries(todasMoedas)) {
                const optionDe = new Option(`${codigo} - ${nome}`, codigo);
                const optionPara = new Option(`${codigo} - ${nome}`, codigo);
                seletorDe.add(optionDe);
                seletorPara.add(optionPara);
            }

            seletorDe.value = 'BRL';
            seletorPara.value = 'USD';

            await converterMoeda();

        } catch (erro) {
            console.error('Erro ao carregar moedas:', erro);
            alert('Não foi possível carregar a lista de moedas. Tente recarregar a página.');
        }
    }

    async function converterMoeda() {
        const valor = parseFloat(campoValor.value);
        const moedaDe = seletorDe.value;
        const moedaPara = seletorPara.value;

        if (isNaN(valor) || valor <= 0 || !moedaDe || !moedaPara) {
            textoResultado.textContent = 'Por favor, insira um valor válido.';
            valorResultado.textContent = '';
            return;
        }

        if (moedaDe === moedaPara) {
            textoResultado.textContent = `${formatarMoeda(valor, moedaDe)} =`;
            valorResultado.textContent = formatarMoeda(valor, moedaPara);
            exibirDataAtualizacao(new Date().toISOString().split('T')[0]);
            await carregarGrafico(moedaDe, moedaPara);
            return;
        }

        loader.style.display = 'block';
        textoResultado.textContent = 'Calculando...';
        valorResultado.textContent = '';

        try {
            const resposta = await fetch(`${API_URL}/latest?amount=${valor}&from=${moedaDe}&to=${moedaPara}`);
            const dados = await resposta.json();

            const taxaConvertida = dados.rates[moedaPara];

            textoResultado.textContent = `${formatarMoeda(valor, moedaDe)} =`;
            valorResultado.textContent = formatarMoeda(taxaConvertida, moedaPara);
            
            exibirDataAtualizacao(dados.date);

            await carregarGrafico(moedaDe, moedaPara);

        } catch (erro) {
            console.error('Erro ao converter moeda:', erro);
            textoResultado.textContent = 'Erro ao converter.';
            valorResultado.textContent = 'Tente novamente.';
        } finally {
            loader.style.display = 'none';
        }
    }

    async function carregarGrafico(moedaDe, moedaPara) {
        tituloGrafico.textContent = `Histórico ${moedaDe} para ${moedaPara} (Últimos 30 dias)`;

        const data = new Date();
        data.setDate(data.getDate() - 30);
        const dataInicio = data.toISOString().split('T')[0];

        try {
            const resposta = await fetch(`${API_URL}/${dataInicio}..?from=${moedaDe}&to=${moedaPara}`);
            const dados = await resposta.json();
            const taxas = dados.rates;

            const labels = Object.keys(taxas).sort((a, b) => new Date(a) - new Date(b));

            const dadosGrafico = labels.map(data => {
                if (taxas[data][moedaPara]) {
                    return taxas[data][moedaPara];
                }
                return 1;
            });

            const labelsFormatados = labels.map(data => {
                const d = new Date(data);
                return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`;
            });

            if (meuGrafico) {
                meuGrafico.destroy();
            }

            meuGrafico = new Chart(contextoGrafico, {
                type: 'line',
                data: {
                    labels: labelsFormatados,
                    datasets: [{
                        label: `1 ${moedaDe} = X ${moedaPara}`,
                        data: dadosGrafico,
                        borderColor: 'rgba(13, 110, 253, 1)',
                        backgroundColor: 'rgba(13, 110, 253, 0.1)',
                        fill: true,
                        tension: 0.2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: true },
                        tooltip: { mode: 'index', intersect: false }
                    },
                    scales: {
                        y: { title: { display: true, text: `Valor (${moedaPara})` } }
                    }
                }
            });

        } catch (erro) {
            console.error('Erro ao carregar gráfico:', erro);
            tituloGrafico.textContent = 'Não foi possível carregar o histórico.';
        }
    }

    function formatarMoeda(valor, moeda) {
        try {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: moeda,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(valor);
        } catch (e) {
            return `${valor.toFixed(2)} ${moeda}`;
        }
    }

    function exibirDataAtualizacao(dataApi) {
        const [ano, mes, dia] = dataApi.split('-');
        dataAtualizacao.textContent = `Última atualização: ${dia}/${mes}/${ano}`;
    }

    campoValor.addEventListener('input', converterMoeda);
    seletorDe.addEventListener('change', converterMoeda);
    seletorPara.addEventListener('change', converterMoeda);

    botaoTroca.addEventListener('click', () => {
        const temp = seletorDe.value;
        seletorDe.value = seletorPara.value;
        seletorPara.value = temp;
        
        converterMoeda();
    });

    carregarMoedas();

});