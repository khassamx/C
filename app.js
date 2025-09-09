document.addEventListener('DOMContentLoaded', () => {
    const balanceDisplay = document.getElementById('balance-display');
    const transactionsList = document.getElementById('transactions-list');
    const depositBtn = document.getElementById('deposit-btn');
    const withdrawBtn = document.getElementById('withdraw-btn');
    const transferBtn = document.getElementById('transfer-btn');

    let balance = 20000;

    function formatCurrency(amount) {
        return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function updateBalanceDisplay() {
        balanceDisplay.textContent = formatCurrency(balance);
    }

    function addTransaction(type, description, amount) {
        const transactionItem = document.createElement('li');
        transactionItem.classList.add('transaction-item', type);
        
        const iconClass = type === 'income' ? 'fa-plus-circle' : 'fa-minus-circle';

        const today = new Date();
        const dateString = today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

        transactionItem.innerHTML = `
            <i class="fas ${iconClass}"></i>
            <div>
                <p>${description}</p>
                <p class="transaction-date">${dateString}</p>
            </div>
            <p class="amount">${type === 'income' ? '+' : '-'}${formatCurrency(amount)}</p>
        `;
        transactionsList.prepend(transactionItem);
    }

    depositBtn.addEventListener('click', () => {
        const amount = parseFloat(prompt("Ingrese la cantidad a depositar:"));
        if (!isNaN(amount) && amount > 0) {
            balance += amount;
            updateBalanceDisplay();
            addTransaction('income', 'Depósito en cuenta', amount);
            alert(`Depósito de ${formatCurrency(amount)} realizado con éxito.`);
        } else {
            alert("Cantidad no válida. Intente de nuevo.");
        }
    });

    withdrawBtn.addEventListener('click', () => {
        const amount = parseFloat(prompt("Ingrese la cantidad a retirar:"));
        if (!isNaN(amount) && amount > 0 && amount <= balance) {
            balance -= amount;
            updateBalanceDisplay();
            addTransaction('expense', 'Retiro de efectivo', amount);
            alert(`Retiro de ${formatCurrency(amount)} realizado con éxito.`);
        } else if (amount > balance) {
            alert("Fondos insuficientes.");
        } else {
            alert("Cantidad no válida. Intente de nuevo.");
        }
    });

    transferBtn.addEventListener('click', () => {
        const amount = parseFloat(prompt("Ingrese la cantidad a transferir:"));
        if (!isNaN(amount) && amount > 0 && amount <= balance) {
            const recipient = prompt("Ingrese el nombre del destinatario:");
            if (recipient) {
                balance -= amount;
                updateBalanceDisplay();
                addTransaction('expense', `Transferencia a ${recipient}`, amount);
                alert(`Transferencia de ${formatCurrency(amount)} a ${recipient} realizada con éxito.`);
            } else {
                alert("Destinatario no válido.");
            }
        } else if (amount > balance) {
            alert("Fondos insuficientes.");
        } else {
            alert("Cantidad no válida. Intente de nuevo.");
        }
    });

    // Actualiza el balance al cargar la página
    updateBalanceDisplay();
});
