//Dry Run
let totalTasks = 4;
let currentHour = 9;
let greetingMessage = 'Hey, bunch of emacs losers! My name is ';
let myName = 'Renato Afonso';

console.log(greetingMessage + myName + '!');

//Recruitment task 1 
let totalTries = 4;
let timesAsked = 0;
let failedAttemptMessage = 'Yes. I eat the fish.';
let sinkIsClean = false;
let askJian = 'Do you understand?';
let swearingJian = 'I clean sink? Next time you clean sink, you round eye bitch!'

//Recruitment task 2 
let taskInstructions = ['Fix a bug and something something remote', 'Must push the new version to the cloud'];
let actualTask = 'Fix a bug and push the new version to the remote';
let taskFix;

//Recruitment task 3 
let ball = ['blue', 'yellow'];

//Recruitment task 4 
let validValues = ["0", "1"];
let corruptData = [
    ["0", "2", "0", "E", "1", "1", "u", "0", "1", "0", ":", "1"],
    ["0", "0", "1", "9", "0", "}", "1", "l", "1", "1", "1", "˜"],
    ["x", ".", "d", "2", "|", "[", "z", "8", "s", "d", "2", "5"],
    ["r", "8", "c", "]", "2", "Z", "H", ";", "Á", "l", "4", "?"],
    ["Y", "0", "0", "1", "1", "K", "1", ".", "0", "v", "0", "1"]
];
let validData = [];

function checkTasks() {
  if (currentHour < 18 && totalTasks > 0) {
    console.log('Task cleared');
  } else if (currentHour > 18 && totalTasks > 0) {
    console.log('You took too long! Maybe you should try Hooli instead...');
  } else if (currentHour < 18 && totalTasks === 0) {
    console.log('Welcome to Pied Piper, motherfucker!');
  }
}

function cleanSink() {
  if (timesAsked < totalTries) {
    console.log(askJian);
    console.log(failedAttemptMessage);
    timesAsked += 1;
    currentHour += 3;
  } else {
    sinkIsClean = true;
    console.log(askJian);
    console.log(swearingJian);
    currentHour += 2;
    totalTasks -= 1;
    checkTasks();
  }
}

function fixString() {
  taskFix = taskInstructions[0].substr(0, 12) + taskInstructions[1].substr(5, 37);
  if (actualTask === taskFix) {
    currentHour += 2;
    console.log("Yes, that's exactly it!");
  } else {
    currentHour += 2;
    console.log('Hmm... Maybe we should just wait for Richard.');
  }
  checkTasks();
}

function ballRoll() {
  let random = ball[Math.floor(Math.random() * ball.length)];
  let blueRollCount = 0;
  let randomArray = [];
  
  while (blueRollCount < 3) {
    if (random === 'blue') {
      randomArray.push(random);
      blueRollCount += 1;
    } else {
      randomArray = [];
      blueRollCount = 0;
    }
  }
  console.log('ALWAYS BLUE! ALWAYS BLUE!')
  currentHour += 2;
  checkTasks();
}

function fixData() {
  for (let i = 0; i < corruptData.length; i++) {
    for (let j = 0; j < 12; j++) {
      currentHour += 2;
    }
  }
}