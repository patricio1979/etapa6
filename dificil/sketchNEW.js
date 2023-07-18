/*
USE SAFARI

SATe type paradigm

The current combinations are:
1 - 2 - 3 - 4

Shortcuts: 
f - fullScreen
s (right pedal) - Start
spaceBar (left pedal) - record Answer
esc - exit all processes
*/

//Global variables
let subject = '', strin, sequenceComplete = [], fwd = 0,
// mic, recorder, soundFile, on = true, off = false,

//current stimulus
letter = 0, showStim, fact = 0.5,

//counters
currFrame = 0,

//seq bools
fix = false, img = false, question = false, sequence = false, posterior = false, final = false,

//timing
currentMillisecond = 0, currentDate, oldSecond = 0, timeStamp,
reactTime = 0,

//keys
spaceDown = false, spaceUp = false, teclas = false, teclasSpace = false,

//GUI staff
butt11, fieldCode, fieldName, code = 0, checkk = false, ready = false, 
previous = true, fs = false,

//CSV tables
tableReaction, tableMarkers;

function setup() {
    //Canvas
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    frameRate(8);
    textFont("times new roman");
    textSize(35);
    textAlign(CENTER);

    //GUI
    fieldName = createInput();
    fieldName.position(0, 15);
    fieldCode = createInput();
    fieldCode.position(0, 45);

    butt11 = createButton("Enter");
    butt11.position(0, 70);
    butt11.mousePressed(changeBG);

    tableReaction = new p5.Table();
    tableReaction.addColumn('Stimulus ID');
    tableReaction.addColumn('Reaction Time');

    tableMarkers = new p5.Table();
    tableMarkers.addColumn('Marker Type and ID');
    tableMarkers.addColumn('Time Format');

    // //Audio recording
    // mic = new p5.AudioIn();
    // mic.start();
    // recorder = new p5.SoundRecorder();
    // recorder.setInput(mic);
    // soundFile = new p5.SoundFile();
}

function draw() {
    background(0);
    fill(170);

    //PREVIOUS
    if (previous) {
        teclasSpace = false;
        fill(170);
        textSize(25);
        textAlign(LEFT)
        text(`Nombre del sujeto y\ncódigo`, 160, 32);
        textSize(35);

        textAlign(CENTER)
        text(`\nInstrucciones para la primera parte:

        Identifica los pedales IZQUIERDO y DERECHO.
        
        Iniciando el experimento verás un punto para fijar la mirada (un signo + ).
        Después aparecerá la imagen de un intervalo de alturas.
        Cuando lo hayas indentificado, mantén presionado el pedal DERECHO y 
        mencionas en voz alta qué intervalo viste (distancia y cualidad, por ejemplo 
        "Cuarta Justa", "Tercera Mayor", "Sexta Menor", etc.) y luego sueltas el pedal.
        Otro intervalo aparecerá y el proceso es el mismo.

        Cuando presiones UNA sola vez el pedal IZQUIERDO, empezamos.`, 0.5 * windowWidth, 80);
    }

    if (posterior) {
        teclasSpace = false;
        text(`¡Muchas gracias!

        Ahora pasaremos a la siguiente etapa.
        Toma tu flauta por favor.

        Igual que antes verás una serie de intervalos,
        pero ahora vamos a entonarlos.

        Cuando lo identifiques presiona y mantén presionado el pedal DERECHO.
        Mientras esté presionado entona el intervalo con la flauta 
        (sin tempo específico, libre) y sueltas el pedal cuando hayas terminado.

        Cuando presiones UNA vez el pedal IZQUIERDO, empezamos.
        `, 0.5 * windowWidth, 100);
    }

    if (final) {
        teclasSpace = false;
        text(`¡Terminamos! De nuevo, ¡Muchas Gracias!

        Espéranos por favor.
        `, 0.5 * windowWidth, 100)

        currentDate = new Date();
        timeStamp = nf(currentDate.getFullYear(),4) + '-' + nf(currentDate.getMonth()+1,2) + '-' + nf(currentDate.getDate(),2) + ' ' + nf(currentDate.getHours(),2) + ':' + nf(currentDate.getMinutes(),2) + ':' + nf(currentDate.getSeconds(),2) + '.' + nf(currentDate.getMilliseconds(),3)
        
        off = true;

        noLoop();
    }

    //EPOCS_DISPLAY STIMULI
    if (fix) { //fix sum sign
        textSize(45);
        text("+", 0.5 * windowWidth, 0.5 * windowHeight);
        textSize(35);
    }
    if (img) { //Melodic interval drawing
        teclasSpace = true;
        image(
        stim[sequenceComplete[letter]-1], 
        0.5 * windowWidth, 0.5 * windowHeight, 
        fact * windowWidth,
        (fact * stim[sequenceComplete[letter]-1].height * windowWidth) / stim[sequenceComplete[letter]-1].width);
        //console.log(sequenceComplete[letter]-1)
    }
    if (question) {  //show question while space bar pressed
        text("Menciona o entona el intervalo", 0.5 * windowWidth, 0.5 * windowHeight);
    }

    //SEQUENCE-----------------------------------
    if (sequence) {
        //print("Sequence on ", currFrame);
        //print(letter)

        if (currFrame == 8) { //EPOC1 Fixation Point
            //print("fixation");
            fix = true;
            img = false;
            question = false;
        }
        if (currFrame == 88) { //EPOC2 baseLine
            //print('baseLine');
            fix = false;
            img = false;
            question = false;

            currentDate = new Date();
            timeStamp = nf(currentDate.getFullYear(),4) + '-' + nf(currentDate.getMonth()+1,2) + '-' + nf(currentDate.getDate(),2) + ' ' + nf(currentDate.getHours(),2) + ':' + nf(currentDate.getMinutes(),2) + ':' + nf(currentDate.getSeconds(),2) + '.' + nf(currentDate.getMilliseconds(),3)

            let newMarkerRow = tableMarkers.addRow()
            newMarkerRow.setString('Marker Type and ID', 'baseLine' + '_' + letter);
            newMarkerRow.setString('Time Format', timeStamp);
        }
        if (currFrame == 96) { //EPOC3 stimulus
            //print('stimulus')
            fix = false;
            question = false;
            img = true;
            reactTime = millis();

            currentDate = new Date();
            timeStamp = nf(currentDate.getFullYear(),4) + '-' + nf(currentDate.getMonth()+1,2) + '-' + nf(currentDate.getDate(),2) + ' ' + nf(currentDate.getHours(),2) + ':' + nf(currentDate.getMinutes(),2) + ':' + nf(currentDate.getSeconds(),2) + '.' + nf(currentDate.getMilliseconds(),3)

            let newMarkerRow = tableMarkers.addRow()
            newMarkerRow.setString('Marker Type and ID', 'Stimulus' + '_' + letter);
            newMarkerRow.setString('Time Format', timeStamp);
        }
        if (spaceDown) { //EPOC4 question
            //print("spaceDown, question");
            fix = false;
            img = false;
            question = true;
        }
        if (spaceUp) { //End Of Phase
            //print('spaceUp, toBaseline');
            spaceDown = false;
            spaceUp = false;
            img = false;
            question = false;
            fix = false;
            currFrame = 87;
            letter++;
            fwd++;
        }
        if (fwd == 20) {
            //print('ready to second stage')
            fix = false;
            img = false;
            question = false;
            spaceDown = false;
            spaceUp = false;
            sequence = false;
            posterior = true;
            fwd++;
        }

        if (fwd == 41) {
            print('final')
            fix = false;
            img = false;
            question = false;
            spaceDown = false;
            spaceUp = false;
            sequence = false;
            posterior = false;
            final = true;
        }
        currFrame++;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    //SPACEBAR
    if (teclas && teclasSpace && key == " ") {
        //print("spacebar pressed");
        spaceDown = true;
        reactTime = millis() - reactTime;

        currentDate = new Date();
        timeStamp = nf(currentDate.getFullYear(),4) + '-' + nf(currentDate.getMonth()+1,2) + '-' + nf(currentDate.getDate(),2) + ' ' + nf(currentDate.getHours(),2) + ':' + nf(currentDate.getMinutes(),2) + ':' + nf(currentDate.getSeconds(),2) + '.' + nf(currentDate.getMilliseconds(),3)

        let newMarkerRow = tableMarkers.addRow()
        newMarkerRow.setString('Marker Type and ID', 'StimulusStop' + '_' + letter);
        newMarkerRow.setString('Time Format', timeStamp);

        let newReactionRow = tableReaction.addRow()
        newReactionRow.setString('Stimulus ID', letter);
        newReactionRow.setString('Reaction Time', reactTime);
    }
    //ESCAPE
    if (keyCode === ESCAPE) {
        fullscreen(!fs);
        remove();
    }
    //S for START
    if (teclas && key == "s") {
        currFrame = 8;
        butt11.hide();
        fieldName.hide();
        fieldCode.hide();
        previous = false;
        posterior = false;
        final = false;
        sequence = true;
    }
    // if (key == "s" && on){
    //     if(mic.enabled){
    //         print('audioRecording = on')
    //         recorder.record(soundFile);
    //         on = false;
    //     }
    // }
    //F for FullScreen
    if (teclas && key == "f") {
        fs = fullscreen();
        fullscreen(!fs);
    }

    //Save data into computer
    // if (off && key == ","){        
    //     saveTable(tableMarkers, subject + '_' + strin + '_' + timeStamp + '_' + 'tableMarkers.csv')
    // }
    if (off && key == ","){        
        saveTable(tableReaction, subject + '_' + strin + '_' + timeStamp + '_' + 'tableReaction.csv')
    }
    // if (off && key == "-"){
    //     recorder.stop()
        
    //     setTimeout( () => {
    //         saveSound(soundFile, subject + '_' + strin + '_' + timeStamp + '_' + 'audioRecording.wav')
    //     }, 5000 )  
    // }
}

function keyReleased() {
    if (teclas && teclasSpace && key == " ") {
        spaceUp = true;
    }
}
function changeBG() {
    strin = fieldCode.value();
    subject = fieldName.value();
    teclas = true;
    switch (strin) {
        case "1":
          console.log("Condición 1a, fácil-difícil");
          sequenceComplete = stimCondOne
          break;
        case "2":
          console.log("Condición 1b, fácil-difícil");
          sequenceComplete = stimCondTwo
          break;
        case "3":
            console.log("Condición 2a, difícil-fácil");
            sequenceComplete = stimCondThree
          break;
        case "4":
            console.log("Condición 2b, difícil-fácil");
            sequenceComplete = stimCondFour
          break;
    }
    print(subject, strin, sequenceComplete);
}