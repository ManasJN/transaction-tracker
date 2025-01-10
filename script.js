// Access the form and list
const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");
const totalDisplay = document.getElementById("total");

// Transactions array (initialize from local storage if available)
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Save transactions to local storage
function saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Update the transaction list
function updateTransactionList() {
    if (transactions.length === 0) {
        transactionList.innerHTML = '<p>No transactions yet.</p>';
        return;
    }

    transactionList.innerHTML = '<h3>Transaction History</h3>';
    const totals = {};

    transactions.forEach((transaction) => {
        totals[transaction.friendName] = (totals[transaction.friendName] || 0) + transaction.amount;
    });

    transactions.forEach((transaction) => {
        const item = document.createElement("div");
        item.classList.add("transaction-item");
        item.innerHTML = `
            <p><strong>Friend:</strong> ${transaction.friendName}</p>
            <p><strong>Amount:</strong> ₹${transaction.amount}</p>
            <p><strong>Date:</strong> ${transaction.date}</p>
            <p><strong>Note:</strong> ${transaction.note || "None"}</p>
        `;
        transactionList.appendChild(item);
    });

    totalDisplay.innerHTML = "<h3>Total Amounts:</h3>";
    for (let friend in totals) {
        totalDisplay.innerHTML += `<p><strong>${friend}:</strong> ₹${totals[friend]}</p>`;
    }
}

// Handle form submission
transactionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const friendName = document.getElementById("friend-name").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;
    const note = document.getElementById("note").value;

    if (!friendName || !amount || !date) {
        alert("Please fill out all required fields.");
        return;
    }

    const transaction = {
        friendName,
        amount,
        date,
        note,
    };

    transactions.push(transaction);
    saveToLocalStorage();
    updateTransactionList();
    transactionForm.reset();
});

// Initialize the app
updateTransactionList();
