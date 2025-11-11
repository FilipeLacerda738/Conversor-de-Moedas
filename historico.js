document.addEventListener('DOMContentLoaded', () => {

    
    const CHAVE_HISTORICO = 'conversorHistorico';

 
    const listaHistoricoEl = document.getElementById('lista-historico');
    const historicoVazioEl = document.getElementById('historico-vazio');
    const btnLimpar = document.getElementById('btn-limpar-historico');

    
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
            console.error('Erro ao formatar moeda:', e);
        }
    }

    
    function formatarData(dataIso) {
        const data = new Date(dataIso);
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        const hora = data.getHours().toString().padStart(2, '0');
        const min = data.getMinutes().toString().padStart(2, '0');
        return `${dia}/${mes}/${ano} ${hora}:${min}`;
    }

    // Função para carregar o histórico do localStorage e exibir na página
    function carregarHistorico() {
        const historico = JSON.parse(localStorage.getItem(CHAVE_HISTORICO)) || [];
        console.log('Dados puxados com sucesso'); // Log de sucesso ao carregar o histórico
        
        while (listaHistoricoEl.firstChild && listaHistoricoEl.firstChild !== historicoVazioEl) {
            listaHistoricoEl.removeChild(listaHistoricoEl.firstChild); // Limpa itens antigos
        }
        
        if (historico.length === 0) {
            historicoVazioEl.style.display = 'block'; // Mostra a mensagem de histórico vazio
        } else {
            historicoVazioEl.style.display = 'none'; // Esconde a mensagem de histórico vazio
            
            // Adiciona cada registro do histórico à lista
            historico.forEach(registro => {
                const itemEl = document.createElement('div'); // Cria um novo elemento para o item do histórico
                itemEl.className = 'list-group-item history-item'; 
                
                const valorDeFormatado = formatarMoeda(registro.valorDe, registro.de); // Formata o valor de origem
                const valorParaFormatado = formatarMoeda(registro.valorPara, registro.para); // Formata o valor convertido
                const dataFormatada = formatarData(registro.data);

               // Preenche o conteúdo do item do histórico
                itemEl.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <span class="from">${valorDeFormatado}</span>
                        <span class="date">${dataFormatada}</span>
                    </div>
                    <div class="to">${valorParaFormatado}</div>
                `;
                
                // Insere o item antes do elemento de histórico vazio
                listaHistoricoEl.insertBefore(itemEl, historicoVazioEl);
            });
        }
    }

    
    function limparHistorico() {
  
        const confirmado = confirm('Tem certeza que deseja limpar todo o histórico?');
        console.log('Confirmação de limpeza do histórico:', confirmado); // Log da confirmação
        
        if (confirmado) {
            localStorage.removeItem(CHAVE_HISTORICO); 
            carregarHistorico(); 
        }
    }

   // Adiciona o evento de clique ao botão de limpar histórico
    btnLimpar.addEventListener('click', limparHistorico);

 
    carregarHistorico();
});