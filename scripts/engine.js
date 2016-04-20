//debug
function print(text){
    console.log(text);
}

//SoundTracks
SoundIntro = document.getElementById("intro");
SoundBackground = document.getElementById("background");
SoundExplosion = document.getElementById("explosion");
SoundUp = document.getElementById("up");
SoundLose = document.getElementById("lose");

SoundIntro.volume-=0.8
SoundBackground.volume-=0.8

//Variáveis do jogo
var canvas, context, LARGURA, ALTURA, img, GameStatus = 0, record, GRAVITY = 2, life = 3, score = 0, sound = false, frames = 0,

quiz = {
    name: " ",
    simbol: null
},

Status = {
    start: 0,
    playing: 1,
},


elemento = {
    _obs: [],
    elementDelay: 0,
    baseLevel: 100,

    insere: function(){
        this._obs.push({
            width: 150,
            height: 150,
            gravity: GRAVITY,
            velocity: 0,
            x: 300 + Math.floor(571 * Math.random()),
            y: 0,
            name: PeriodTable[Math.floor(PeriodTable.length * Math.random())].name,
            simbol: PeriodTable[Math.floor(PeriodTable.length * Math.random())].id
        });
        this.elementDelay = this.baseLevel +  Math.floor(51 * Math.random());
    },

    update: function(){
        if(this.elementDelay == 0) {
            this.insere();
            if(this.baseLevel >= 30)
                this.baseLevel--;
        }else
            this.elementDelay--;

        for(var i = 0, tam = this._obs.length; i < tam; i++) {
            var obs = this._obs[i];
            obs.velocity += obs.gravity;
            obs.y = obs.velocity;
            limit = ALTURA - obs.height/2 - 110;

            if(obs.y >= limit) {
                this._obs.splice(i, 1);
                tam--;
                i--;
                if(life > 0 && obs.simbol == quiz.simbol){
                    elementSort();
                    life--;
                    SoundExplosion.play();
                }
                if(life == 0)
                    SoundLose.play();
            }
        }
    },

    draw: function(){
        for(var i = 0, tam = this._obs.length; i < tam; i++) {
            var obs = this._obs[i];
            element.print(obs.x, obs.y);

            context.fillStyle = "#890305";
            context.textAlign = "center";
            context.font = "25px Passion One, Arial";
            context.fillText(obs.simbol, (obs.x+obs.width/2)-10, (obs.y+obs.height/2)-5);
        }
    },

    click: function(event){
        var pos = {
            x: event.clientX - canvas.getBoundingClientRect().left,
            y: event.clientY - canvas.getBoundingClientRect().top
        }
        for(var i = 0, tam = this._obs.length; i < tam; i++) {
            var obs = this._obs[i];
            if ((pos.x >= obs.x) && (pos.x <= (obs.x + obs.width)) && (pos.y >= obs.y) && (pos.y <= (obs.y + obs.height))) {
                this._obs.splice(i, 1);
                tam--;
                i--;
                if(life > 0 && obs.simbol == quiz.simbol){
                    score++;
                    elemento._obs = [];
                    GRAVITY += 0.1;
                    elementSort();
                    SoundUp.play();
                }else{
                    if(life > 0)
                        life--;
                    SoundExplosion.play();
                }
                if(life == 0)
                    SoundLose.play();
            }
        }
    }
},

panel = {
    QuizElement: function(){
        context.fillStyle = "#fffc00";
        context.textAlign = "center";
        context.font = "25px Sigmar One, Arial";
        context.fillText(quiz.name, 127, 286);
    },
    PointsBoard: function(){
        pointBoard.print(41, 0);
        context.fillStyle = "#fff";
        context.textAlign = "center";
        context.font = "18px Arial";
        context.fillText("Record: "+record, 155, 67);
        context.font = "40px Arial";
        context.fillText(score, 153, 115);
        lifeHeart[life].print(103, 130);
    },
    SplashScreen: function(){
        playButton.print(56, -50);
    },
    draw: function(){
        this.QuizElement();
        this.PointsBoard();
    }
};

function elementSort(){
    var rand = Math.floor(PeriodTable.length * Math.random());
    quiz.name = PeriodTable[rand].name;
    quiz.simbol = PeriodTable[rand].id;
}

function play(){
	frames++;
	background.print(0, 0);
    panel.draw();

    if(life == 0) {
        GameStatus = Status.start;
    }

    if(GameStatus == Status.start) {
        record = localStorage.getItem("record");
        if(record == null)
            record = 0;
        if(score > record)
            localStorage.setItem("record", score);

        panel.SplashScreen();
        quiz.name = "";
        SoundBackground.pause();
        SoundIntro.play();
        canvas.onclick = function(event){
            score = 0;
            life = 3;
            elemento._obs = [];
            elementSort();
            alert("Olá!\n\nEste jogo foi desenvolvido pelos alunos de Engenharia da Computação: Allex Lima, Daniel Bispo, Paulo Moraes e Renan Barroncas!\n\nTrabalho solicitado pela Profª Drª Rebeca Freire.\n\n\nDivirta-se!")
            GameStatus = Status.playing;
        }
    }else if(GameStatus == Status.playing){
        elemento.draw();
        elemento.update();
        SoundIntro.pause();
        SoundBackground.play();
        canvas.onclick = function(event){
            elemento.click(event);
        }
    }

    window.requestAnimationFrame(play);
}

function main(){
	ALTURA = window.innerHeight;
	LARGURA = window.innerWidth;

	canvas = document.createElement("canvas");
	canvas.width = 1000;
	canvas.height = 600;

	context = canvas.getContext("2d");
	document.body.appendChild(canvas);

	img = new Image();
	img.src = "sprites/images.png";

    GameStatus = Status.start;
	play();
}

//Inicia o jogo
main();