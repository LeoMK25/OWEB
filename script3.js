//From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function resetGame(){
    firstQuess = null
    guess = true
    tries = 0



    resetTimer()
    updateStats()

    shuffle(card);
    cardBoard.forEach(function(element){
        element.setAttribute('src', '/Images/background.svg')
    })

    card.forEach(function(card){
        card.paired = false
    })
}

function updateStats(){
    var stats = document.getElementById("stats")
    stats.innerHTML = "Games won: "+wins+"<br>Tries: " +tries
}

function startTimer(){
    if(!timer){
        timer = setInterval(function(){
            seconds++
            document.getElementById("timer").innerText = "Time: " + seconds +"s"
        },1000)
    }
}

function stopTimer(){
    clearInterval(timer)
    timer = null
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    document.getElementById("timer").innerText = "Time: 0s";
}

var card = [

    {value:'bird', image:'/Images/bird.svg', paired:false},
    {value:'boar', image:'/Images/boar.svg', paired:false},
    {value:'butterfly', image:'/Images/butterfly.svg', paired:false},
    {value:'crane', image:'/Images/crane.svg', paired:false},
    {value:'deer', image:'/Images/deer.svg', paired:false},
    {value:'phoenix', image:'/Images/phoenix.svg', paired:false},

    {value:'bird', image:'/Images/bird.svg', paired:false},
    {value:'boar', image:'/Images/boar.svg', paired:false},
    {value:'butterfly', image:'/Images/butterfly.svg', paired:false},
    {value:'crane', image:'/Images/crane.svg', paired:false},
    {value:'deer', image:'/Images/deer.svg', paired:false},
    {value:'phoenix', image:'/Images/phoenix.svg', paired:false},

]

shuffle(card);

var cardBoard = document.querySelectorAll(".card");
var firstQuess = null
var quess = true
var wins = 0
var tries = 0
var seconds = 0
var timer = null
updateStats()
cardBoard.forEach(function(element,index){
    element.addEventListener('click',function(){


        if (index == firstQuess || card[index].paired || !quess){
            return
        }
        var selected = card[index];
        element.setAttribute('src', selected.image)        
        if(firstQuess == null){
            startTimer()
            firstQuess = index
        }
        else{
            
            if(card[firstQuess].value==card[index].value){
                card[firstQuess].paired = true
                card[index].paired = true
                firstQuess = null
                tries++
                updateStats()

                var allPaired = card.every(function(cardItem){
                    return cardItem.paired === true;
                })
                if(allPaired){
                    wins++
                    stopTimer()
                    updateStats()

                    setTimeout(function(){
                        alert("You have won in "+tries+" tries!!!")
                        resetGame()
                    },100)
                    
                }


                
            }
            else{
                quess = false
                tries++
                updateStats()
                setTimeout(function(){
                    cardBoard[firstQuess].setAttribute('src','/Images/background.svg')
                    cardBoard[index].setAttribute('src','/Images/background.svg')
                    firstQuess = null
                    quess = true
                },750)
                
            }
        }
        
    })

    
})

