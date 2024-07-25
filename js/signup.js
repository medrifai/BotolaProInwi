document.addEventListener('DOMContentLoaded', function() {
    const createAccountButton = document.getElementById('createAccountButton');
    
    createAccountButton.addEventListener('click', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const emailAdresse = document.getElementById('emailAdresse').value;
        const password = document.getElementById('password').value;
        const terms = document.getElementById('terms').checked; 

        if (!terms) {
            alert('You must agree to the terms and conditions.');
            return;
        }

        if (username && emailAdresse && password) { 
            const userData = { username, email: emailAdresse, password };

            fetch('http://localhost:3000/api/signup', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.text()) 
            .then(data => {
                console.log(data);
                alert("Account created successfully!");
                window.location.href = 'login.html';
            })
            .catch(error => {
                console.log('Error: ', error);
                alert('Error creating account. Please try again.');
            });
        } else {
            alert('Please fill in all fields.');
        }
    });
});
