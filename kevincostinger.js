"use strict";

document.getElementById('expenses').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        const row = e.target.closest('tr');
        const amountText = row.cells[1].textContent;
        const amount = parseFloat(
            amountText.replace(/[€\s]/g, '').replace('.', '').replace(',', '.')
        );
        sumExpenses -= amount;
        document.getElementById('expenseSum').textContent = formatEuro(sumExpenses);
        row.remove();
    }
});

document.querySelector('form').addEventListener('submit', submitForm);
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     You - 2026-03-25
 *******************************************************/
let sumExpenses = 0; //Use this variable to keep the sum up to date.
// variable die auf null gesetzt ist, sich aber ändern darf, wenn neue dinge auf die Liste kommen. zählt aber auch runter wenn man dinge löscht

function showError(input, message) {
    input.style.border = "2px solid red";
    input.style.outline = "none";

    let existingError = input.parentElement.querySelector('.error-message');
    if (!existingError) {
        let errorMsg = document.createElement('span');
        errorMsg.classList.add('error-message');
        errorMsg.style.color = "red";
        errorMsg.style.fontSize = "9pt";
        errorMsg.textContent = message;
        input.parentElement.appendChild(errorMsg);
    }
}
function submitForm(e) { //funktion, die nix macht bis ich sie aufrufe, (e) ist event objekt
    e.preventDefault(); //verhindert, dass nach jedem submit die seite neu lädt und alle einträge gelöscht werden

    const dateInput = document.getElementById('date'); //document.get.. sucht im HTML nach element mit der ID
    const amountInput = document.getElementById('amount');
    const expenseInput = document.getElementById('expense');

    const dateValue = dateInput.value; //eigetippter text
    const amountValue = parseFloat(amountInput.value); //macht text zu kommazahl
    const expenseValue = expenseInput.value.trim(); //entf. leerzeichen am anfang und ende

    if (isEmpty(dateValue)) { //ist Datum leer? ja-cursor springt ins datumsfeld-funktion bricht ab
        dateInput.focus();
        return;
    }

    if (isNaN(amountValue) || amountValue < 0.01) { //keine gültige zahl? betrag min. 1cent
        amountInput.focus();
        return;
    }

    if (expenseValue.length < 3) { //zählt anzahl der zeichen(min. 3)
        expenseInput.focus();
        return;
    }

    const tbody = document.querySelector('#expenses tbody');
    const newRow = document.createElement('tr'); //neue talellenzeile
    newRow.innerHTML = `
        <td>${dateValue}</td>
        <td>${formatEuro(amountValue)}</td>
        <td>${expenseValue}</td>
        <td><button class="delete">X</button></td>
    `;
    tbody.appendChild(newRow);

    sumExpenses += amountValue; //addiert neuen betrag zu ges. summe
    document.getElementById('expenseSum').textContent = formatEuro(sumExpenses); //ändert angezeigten text d. summe

    e.target.reset(); //leert alle felder im formular



    //TODO: Prevent the default behavior of the submit button.
    //TODO: Validate the form. If everything is fine, add the expense to the tracker and reset the form.
}


/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 ****************************/


/*******************************************************
 *     Checks if variable is empty
 *     @param {any} variable - Variable which you want to check.
 *     @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function(variable) {
    if(Array.isArray(variable))
        return (variable.length === 0);
    else if(typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 *     Converts number into currency string.
 *     @param {Number} number - Any numeric value.
 *     @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}