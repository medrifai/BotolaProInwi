document.addEventListener('DOMContentLoaded', function() {
    
    const signupButton = document.getElementById('signup');
    const loginButton = document.getElementById('login');
    const logoutButton = document.getElementById('logout');
    const calendrierMenuItem = document.getElementById('calendrierMenuItem');
    const classementMenuItem = document.getElementById('classementMenuItem');
    const guestButtons = document.getElementById('guestButtons');
    const userPanel = document.getElementById('userPanel');
    const header = document.querySelector('.header'); 
    const userPhoto = document.getElementById('userPhoto');
    const userFormModal = document.getElementById('userFormModal');
    const closeModal = document.querySelector('.modal .close');
    const userForm = document.getElementById('userForm');

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        console.log(user);
        showUserUI(user);
    } else {
        showGuestUI();
    }

    if (signupButton) {
        signupButton.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = 'signup.html';
        });
    } else {
        console.error('Signup button not found');
    }

    if (loginButton) {
        loginButton.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = 'login.html';
        });
    } else {
        console.error('Login button not found');
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('user');
            showGuestUI();
        });
    }

    if(userPhoto){
        userPhoto.addEventListener('click', function(event){
            event.preventDefault();
            showUserFormulaire();
            userFormModal.style.display = 'block';
        });
    }

    closeModal.addEventListener('click', function() {
        userFormModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == userFormModal) {
            userFormModal.style.display = 'none';
        }
    });

    function showUserFormulaire(){
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            document.getElementById('formFirstname').value = user.first_name || '';
            document.getElementById('formLastname').value = user.last_name || '';
            document.getElementById('formDateOfBirth').value = user.date_of_birth || '';
            document.getElementById('formCountry').value = user.country || '';
            document.getElementById('formPhone').value = user.phone_number || '';
        }
    }

    userForm.addEventListener('submit', function(event){
        event.preventDefault();
        const updateUser = {
            username: user.username,
            email: user.email,
            first_name : document.getElementById('formFirstname').value,
            last_name : document.getElementById('formLastname').value,
            date_of_birth : document.getElementById('formDateOfBirth').value,
            country : document.getElementById('formCountry').value,
            phone_number : document.getElementById('formPhone').value,
            photo: document.getElementById('formPhoto').files[0] ? URL.createObjectURL(document.getElementById('formPhoto').files[0]) : user.photo
        };

        fetch('http://localhost:3000/api/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            showUserUI(updateUser);
            userFormModal.style.display = 'none';
        })
        .catch(error => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
            alert('Erreur lors de la mise à jour de l\'utilisateur. Veuillez réessayer.');
        });

    });

    function showGuestUI() {
        guestButtons.style.display = 'block';
        userPanel.style.display = 'none';
        calendrierMenuItem.style.display = 'none';
        classementMenuItem.style.display = 'none';
    }

    function showUserUI(user) {
        guestButtons.style.display = 'none';
        userPanel.style.display = 'flex';
        calendrierMenuItem.style.display = 'block';
        classementMenuItem.style.display = 'block';
        document.getElementById('userName').textContent = user.username;
        document.getElementById('email').textContent = user.email;
        document.getElementById('userPhoto').src = user.photo || 'default_photo_url';
        document.getElementById('userCountry').textContent = user.country;
        
        header.classList.add('logged-in');
    }
});
