function converter() {
    const deMoeda = document.getElementById('de-moeda').value;
    const paraMoeda = document.getElementById('para-moeda').value;
    const valor = parseFloat(document.getElementById('valor').value);

    const taxasDeCambio = {
        USD: { BRL: 5.24, EUR: 0.85 },
        BRL: { USD: 0.19, EUR: 0.16 },
        EUR: { USD: 1.17, BRL: 6.16 }
    };

    const taxa = taxasDeCambio[deMoeda][paraMoeda];
    const valorConvertido = valor * taxa;

    document.getElementById('resultado').textContent = `Valor convertido: ${valorConvertido.toFixed(2)}`;
}

document.getElementById('converter').addEventListener('click', converter);
