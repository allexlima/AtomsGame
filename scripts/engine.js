
//Variáveis do jogo
var canvas, context, LARGURA, ALTURA, GRAVITY = 2, img, frames = 0;


elemento = {
	width: 130,
	height: 130,
	gravity: GRAVITY,
	x: 500,
	y: 0, 
	velocity: 0,
	name: "Exemplo",
	id: "Ex",

	update: function(){
		this.velocity += this.gravity;
		this.y = this.velocity;	

		if(this.y > canvas.height - 95 - this.height)
			this.y = canvas.height - 95 - this.height;
	},

	draw: function(){
		element.desenha(this.x, this.y);
	},

	click: function(event){
		var pos = {
		        x: event.clientX - canvas.getBoundingClientRect().left,
		        y: event.clientY - canvas.getBoundingClientRect().top
			}
		if(	(pos.x >= this.x) && (pos.x <= (this.x + this.width)) && (pos.y >= this.y) && (pos.y <= (this.y + this.height))){
			alert(this.name)
		}
	}
}

function play(){
	frames++;

	background.desenha(0, 0);

	//context.fillStyle = "#34495e";
	//context.fillRect(0, 0, LARGURA, ALTURA);

	elemento.update();
	elemento.draw();

	canvas.onclick = function(event){
	    elemento.click(event);
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
	play();
}

//Inicia o jogo
main();