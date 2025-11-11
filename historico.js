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

 
    function carregarHistorico() {
        const historico = JSON.parse(localStorage.getItem(CHAVE_HISTORICO)) || [];
        console.log('Dados puxados com sucesso');
        
        while (listaHistoricoEl.firstChild && listaHistoricoEl.firstChild !== historicoVazioEl) {
            listaHistoricoEl.removeChild(listaHistoricoEl.firstChild);
        }
        
        if (historico.length === 0) {
            historicoVazioEl.style.display = 'block'; 
        } else {
            historicoVazioEl.style.display = 'none'; 
            
            
            historico.forEach(registro => {
                const itemEl = document.createElement('div');
                itemEl.className = 'list-group-item history-item'; 
                
                const valorDeFormatado = formatarMoeda(registro.valorDe, registro.de);
                const valorParaFormatado = formatarMoeda(registro.valorPara, registro.para);
                const dataFormatada = formatarData(registro.data);

               
                itemEl.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <span class="from">${valorDeFormatado}</span>
                        <span class="date">${dataFormatada}</span>
                    </div>
                    <div class="to">${valorParaFormatado}</div>
                `;
                
                
                listaHistoricoEl.insertBefore(itemEl, historicoVazioEl);
            });
        }
    }

    
    function limparHistorico() {
  
        const confirmado = confirm('Tem certeza que deseja limpar todo o histórico?');
        console.log('Confirmação de limpeza do histórico:', confirmado);
        
        if (confirmado) {
            localStorage.removeItem(CHAVE_HISTORICO); 
            carregarHistorico(); 
        }
    }

   
    btnLimpar.addEventListener('click', limparHistorico);

 
    carregarHistorico();
});