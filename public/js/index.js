const trainerCards = document.querySelectorAll('.trainer-card');

trainerCards.forEach((x, i, a) => {
    x.addEventListener('click', function() {               
        x.classList.toggle('selected');
    });
});
