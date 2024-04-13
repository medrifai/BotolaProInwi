const rows = document.querySelectorAll('.rows');

// Parcourir chaque élément .rows
rows.forEach(row => {
    // Récupérer le numéro de classement
    const numClassement = parseInt(row.querySelector('#num-classement').innerText);

    // Vérifier si le numéro de classement est impair
    if (numClassement % 2 !== 0) {
        // Si pair, définir le fond 
        row.style.backgroundColor = '#7777';
    }
});