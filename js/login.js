document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();

        const emailAdresse = document.getElementById('emailAdresse').value;
        const password = document.getElementById('password').value;
        const terms = document.getElementById('terms').checked;

        if (!terms) {
            alert('You must agree to the terms and conditions.');
            return;
        }

        if (emailAdresse && password) {
            const userData = { email: emailAdresse, password };

            fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    alert("Login successfully!");
                    window.location.href = 'index.html';
                } else {
                    alert('Error login. Please try again.');
                }
            })
            .catch(error => {
                console.log('Error:', error);
                alert('Error login. Please try again.');
            });
        } else {
            alert('Please fill in all fields.');
        }
    });
});
