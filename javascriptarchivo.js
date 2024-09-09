document.getElementById('evaluation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    let initialInvestment = parseFloat(document.getElementById('initial-investment').value);
    let cashFlows = document.getElementById('cash-flows').value.split(',').map(Number);
    let discountRate = parseFloat(document.getElementById('discount-rate').value) / 100;

    // Calcular VAN
    let van = -initialInvestment;
    for (let i = 0; i < cashFlows.length; i++) {
        van += cashFlows[i] / Math.pow(1 + discountRate, i + 1);
    }
    
    // Calcular TIR (simplificado)
    let tir = calculateIRR(cashFlows, initialInvestment);
    
    // Mostrar resultados
    document.getElementById('van-result').textContent = `VAN: ${van.toFixed(2)}`;
    document.getElementById('tir-result').textContent = `TIR: ${tir.toFixed(2)}%`;
});

function calculateIRR(cashFlows, initialInvestment) {
    let guess = 0.1;
    let irr = guess;
    let epsilon = 0.0001;
    
    while (true) {
        let npv = -initialInvestment;
        for (let i = 0; i < cashFlows.length; i++) {
            npv += cashFlows[i] / Math.pow(1 + irr, i + 1);
        }
        if (Math.abs(npv) < epsilon) break;
        irr += epsilon;
    }
    return irr * 100;
}
