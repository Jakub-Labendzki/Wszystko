$(document).ready(function() {
    let score = 0;
    const totalCards = 20;
    const bombCount = 3;
    const cards = [];

    // Generowanie kart z losowymi wartościami (diamenty i bomby)
    function generateCards() {
        for (let i = 0; i < totalCards - bombCount; i++) {
            cards.push('diamond');
        }
        for (let i = 0; i < bombCount; i++) {
            cards.push('bomb');
        }
        shuffle(cards);
    }

    // Tasowanie tablicy kart
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
    
        // Przechodzimy przez tablicę od końca do początku
        while (currentIndex != 0) {
            // Wybieramy losowy indeks z pozostałych elementów
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
    
        return array;
    }
    

    // Tworzenie planszy
    function createBoard() {
        for (let i = 0; i < totalCards; i++) {
            const card = $('<div class="card"></div>');
            card.data('index', i);
            $('#board').append(card);
        }
    }

    // Odsłanianie kart po kliknięciu
    function revealCard(cardElement) {
        const index = cardElement.data('index');
        const cardValue = cards[index];
        
        if (cardValue === 'diamond') {
            cardElement.text('💎').addClass('clicked');
            score++;
            $('#score').text('Wynik: ' + score);
        } else if (cardValue === 'bomb') {
            cardElement.text('💣').addClass('clicked');
            $('#message').text('Przegrałeś! Twój wynik to: ' + score);
            $('.card').off('click'); // Dezaktywacja kart po przegranej
        }
    }

    // Inicjalizacja gry
    function initGame() {
        generateCards();
        createBoard();
        $('.card').on('click', function() {
            if (!$(this).hasClass('clicked')) {
                revealCard($(this));
            }
        });
    }

    initGame();
});
