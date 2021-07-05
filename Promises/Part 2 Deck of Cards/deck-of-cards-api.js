function start(){
  let url = 'https://deckofcardsapi.com/api/deck';
  const res = axios.get(`${url}/new/draw/`).then(data => {
    let { suit, value } = data.data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)})
    // console.log(data.data.cards[0])

  let firstCard = null;
  const res_hand = axios.get(`${url}/new/draw/`)
    .then(data => {
      firstCard = data.data.cards[0];
      let deckId = data.data.deck_id;
      return axios.get(`${url}/${deckId}/draw/`);
    })
    .then(data => {
      let secondCard = data.data.cards[0];
      [firstCard, secondCard].forEach(function(card) {
        console.log(
          `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
      });
    });

  let deckId = null;
  const $btn = $('button');
  const $cards = $('#cards');

  axios.get(`${url}/new/shuffle/`).then(data => {
    deckId = data.data.deck_id;
    $btn.show();
  });

  $btn.on('click', function() {
    axios.get(`${url}/${deckId}/draw/`).then(data => {
      let src = data.data.cards[0].image;
      console.log(src)
      const angle = Math.random() * 90 - 45;
      const x = Math.random() * 40 - 20;
      const y = Math.random() * 40 - 20;
      $cards.append(
        $('<img>', {
          src: src,
          css: {
            transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`
          }
        })
      );
      if (data.data.remaining === 0) {
      	$btn.remove();
      	setTimeout(() => {
      		location.reload();
      	},2000);
      }
    });
  });
}


if (!document.readyState === "loading") {
    document.addEventListener("DomContentLoaded", start())
}else {
    start();
}
 