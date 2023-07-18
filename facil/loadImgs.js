//StimuliImgs
let stim = [], stimCondOne, stimCondTwo, stimCondThree, stimCondFour;

function preload(){
  stim[0] = loadImage('stims/01.jpg');
  stim[1] = loadImage('stims/02.jpg');
  stim[2] = loadImage('stims/03.jpg');
  stim[3] = loadImage('stims/04.jpg');
  stim[4] = loadImage('stims/05.jpg');
  stim[5] = loadImage('stims/06.jpg');
  stim[6] = loadImage('stims/07.jpg');
  stim[7] = loadImage('stims/08.jpg');
  stim[8] = loadImage('stims/09.jpg');
  stim[9] = loadImage('stims/10.jpg');
  stim[10] = loadImage('stims/11.jpg');
  stim[11] = loadImage('stims/12.jpg');
  stim[12] = loadImage('stims/13.jpg');
  stim[13] = loadImage('stims/14.jpg');
  stim[14] = loadImage('stims/15.jpg');
  stim[15] = loadImage('stims/16.jpg');
  stim[16] = loadImage('stims/17.jpg');
  stim[17] = loadImage('stims/18.jpg');
  stim[18] = loadImage('stims/19.jpg');
  stim[19] = loadImage('stims/20.jpg');
  stim[20] = loadImage('stims/21.jpg');
  stim[21] = loadImage('stims/22.jpg');
  stim[22] = loadImage('stims/23.jpg');
  stim[23] = loadImage('stims/24.jpg');
  stim[24] = loadImage('stims/25.jpg');
  stim[25] = loadImage('stims/26.jpg');
  stim[26] = loadImage('stims/27.jpg');
  stim[27] = loadImage('stims/28.jpg');
  stim[28] = loadImage('stims/29.jpg');
  stim[29] = loadImage('stims/30.jpg');
  stim[30] = loadImage('stims/31.jpg');
  stim[31] = loadImage('stims/32.jpg');
  stim[32] = loadImage('stims/33.jpg');
  stim[33] = loadImage('stims/34.jpg');
  stim[34] = loadImage('stims/35.jpg');
  stim[35] = loadImage('stims/36.jpg');
  
  randomSeed(1024);
  
  let easyS = Array.from({length: 6}, (_, i) => i + 1),
    easyF = Array.from({length: 6}, (_, i) => i + 19),
    
    interS = Array.from({length: 6}, (_, i) => i + 7),
    interF = Array.from({length: 6}, (_, i) => i + 25),
    
    diffS = Array.from({length: 6}, (_, i) => i + 13),
    diffF = Array.from({length: 6}, (_, i) => i + 31);
  
  shuffleArray(easyS)
  shuffleArray(easyF)
  shuffleArray(interS)
  shuffleArray(interF)
  shuffleArray(diffS)
  shuffleArray(diffF)
  //print(easyS,interS,diffS,easyF,interF,diffF)
  
  easy = [].concat(easyS).concat(easyF)
  inter = [].concat(interS).concat(interF)
  diff = [].concat(diffS).concat(diffF)
  shuffleArray(easy)
  shuffleArray(inter)
  shuffleArray(diff)
  //print(easy,inter,diff)
  
  easyGroupOne = easy.slice(0, 6);
  easyGroupTwo = easy.slice(6);
  interGroupOne = inter.slice(0, 6);
  interGroupTwo = inter.slice(6);
  diffGroupOne = diff.slice(0, 6);
  diffGroupTwo = diff.slice(6);
  //print(easyGroupOne,easyGroupTwo,interGroupOne,interGroupTwo,diffGroupOne,diffGroupTwo)
  
  stimCondOne = [].concat(easyGroupOne).concat(interGroupOne).concat(diffGroupOne).concat(easyGroupTwo).concat(interGroupTwo).concat(diffGroupTwo)
  stimCondTwo = [].concat(easyGroupTwo).concat(interGroupTwo).concat(diffGroupTwo).concat(easyGroupOne).concat(interGroupOne).concat(diffGroupOne)
  stimCondThree = [].concat(diffGroupOne).concat(interGroupOne).concat(easyGroupOne).concat(diffGroupTwo).concat(interGroupTwo).concat(easyGroupTwo)
  stimCondFour = [].concat(diffGroupTwo).concat(interGroupTwo).concat(easyGroupTwo).concat(diffGroupOne).concat(interGroupOne).concat(easyGroupOne)
  //print(stimCondOne,stimCondTwo,stimCondThree,stimCondFour)

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
  }
}