// Fonctions d'authentification
function showInscription() {
    const loginForm = document.querySelector('.auth-form:first-child');
    const inscriptionForm = document.getElementById('inscriptionForm');
    
    loginForm.style.display = 'none';
    inscriptionForm.style.display = 'block';
}

function showConnexion() {
    const loginForm = document.querySelector('.auth-form:first-child');
    const inscriptionForm = document.getElementById('inscriptionForm');
    
    loginForm.style.display = 'block';
    inscriptionForm.style.display = 'none';
}

// Gestion du formulaire de connexion
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        alert('Connexion réussie ! Bienvenue ' + email);
        // Simulation de connexion réussie
        showConnexion(); // Revenir au formulaire de connexion
    } else {
        alert('Veuillez remplir tous les champs');
    }
});

// Gestion du formulaire d'inscription
document.querySelector('#inscriptionForm form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('inscr-email').value;
    const password = document.getElementById('inscr-password').value;
    
    if (email && password) {
        alert('Inscription réussie ! Bienvenue ' + email);
        showConnexion(); // Revenir au formulaire de connexion
    } else {
        alert('Veuillez remplir tous les champs');
    }
});

// Gestion du formulaire de contact
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nom = document.getElementById('nom').value;
    const message = document.getElementById('message').value;
    
    if (nom && message) {
        alert('Message envoyé avec succès ! Nous vous répondrons rapidement.');
        // Vider le formulaire
        document.getElementById('nom').value = '';
        document.getElementById('message').value = '';
    } else {
        alert('Veuillez remplir tous les champs');
    }
});

// Fonction d'achat de jeu
function acheterJeu(nomJeu, prix) {
    const confirmation = confirm('Voulez-vous acheter ' + nomJeu + ' pour ' + prix + '€ ?');
    
    if (confirmation) {
        alert('Achat confirmé ! ' + nomJeu + ' a été ajouté à votre bibliothèque.');
        // Simulation d'achat réussi
    }
}

// Animation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter des animations subtiles
    const cards = document.querySelectorAll('.game-card, .contact-card, .auth-form');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
});

// Navigation fluide
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Ajouter une transition de page
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 300);
    });
});
