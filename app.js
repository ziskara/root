document.addEventListener('DOMContentLoaded', () => {
  //card options
  const cardArray = [
    {
      frontText: 'ბალახი',
      backText: 'დაჟარ'
    },
    {
      frontText: 'არის',
      backText: 'და'
    },
    {
      frontText: 'პირი',
      backText: 'ბაქ'
    },
    {
      frontText: 'არ',
      backText: 'ცო'
    },
    {
      frontText: 'აქვს_მაგრამ',
      backText: 'ბაე'
    },
    {
      frontText: 'კბილები',
      backText: 'ცარკი'
    },,
    {
      frontText: 'აქვს',
      backText: 'ჲა'
    },
    {
      backText: 'დაჟარ'
    },
    {
      backText: 'და'
    },
    {
      backText: 'ბაქ'
    },
    {
      backText: 'ცო'
    },
    {
      backText: 'ბაე'
    },
    {
      backText: 'ცარკი'
    },
    {
      backText: 'ჲა'
    }
  ]

  cardArray.sort(() => 0.5 - Math.random())  //იმავე მასივში არსებული მონაცემები შემთხვევითად ირევა
  console.log("hi im console")
  const grid = document.querySelector('.grid')
  const dict = document.querySelector('.dict')
  const pointsDisplay = document.querySelector('#points')
  let cardsChosen = [] //ინახება შერჩეული 2 ბარათი
  let cardsChosenId = []  //ინახება შერჩეული 2 ბარათის ID
  let cardsWon = []  //გამოცნობილი სიტყვები
  var iSorted = 0  //გამოცნობილი სიტყვების მთვლელი
  var attempt = 0  //მცდელობების რაოდენობა
  
  createBoard()

  //create your board
  function createBoard() {  //მასივში არეული მონაცემებს იღებს, ქმნის ბარათებს და აწყობს ეკრანზე
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('word')  //ცვლადი თითოეული ახალი ბარათისთვის
      if(cardArray[i].frontText){  //თუ მასივის წევრს ქართული მნიშვნელობა აქვს, ბარათს საწყის ტექსტს აწერს
        console.log(cardArray[i].frontText + "two")
        card.textContent = cardArray[i].frontText, ''
        console.log(cardArray[i].backText)
      }else{
        console.log(cardArray[i].frontText + "one")
      }
      card.setAttribute('data-id', i)
      card.classList.add("word")
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    console.log(cardId)
    console.log(cardArray[cardId].backText)
    cardsChosen.push(cardArray[cardId].backText)
    cardsChosenId.push(cardId)
    this.textContent = cardArray[cardId].backText
    
    console.log(cardArray[cardId].backText + " " + cardArray[cardId].frontText + " flipcard")
    if (cardsChosen.length == 2) {
      setTimeout(checkForMatch, 5)
    }
  }
  
  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('word')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]    
    if(cardsChosenId[0] == cardsChosenId[1]) {
      alert('You have clicked the same image!')
      console.log("იგივე სურათია")
      cards[optionOneId].textContent = cardArray[cardsChosenId[0]].frontText
      cards[optionTwoId].textContent = cardArray[cardsChosenId[1]].frontText      //alert('Sorry, try again')
    }else if (cardsChosen[0] == cardsChosen[1]) {
      cards[optionOneId].className = "wonWord"
      cards[optionTwoId].className = "wonWord"

      
      const translated = document.createElement('translatedWord')  //ცვლადი თითოეული ახალი ბარათისთვის
      translated.textContent = cardArray[optionTwoId].frontText + " - " + cardArray[optionOneId].backText
      translated.setAttribute('data-id', iSorted)
      translated.classList.add("translatedWord")
      dict.appendChild(translated)
      cardsWon.push(cardsChosen)
      iSorted++
    }
    else {
      cards[optionOneId].textContent = cardArray[cardsChosenId[0]].frontText
      cards[optionTwoId].textContent = cardArray[cardsChosenId[1]].frontText      //alert('Sorry, try again')
    }
    cardsChosen = []
    cardsChosenId = []
    attempt++
    pointsDisplay.textContent = `${iSorted}/${attempt} = ${iSorted/attempt}` 

    if  (cardsWon.length == cardArray.length/2) {
      grid.textContent = "YOU WON"
    }
  }

  

})