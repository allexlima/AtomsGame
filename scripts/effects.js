function Sprite(x, y, largura, altura) {
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;

	this.print = function(xCanvas, yCanvas) {
		context.drawImage(img, this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura);
	}
}

//Sprites
var background = new Sprite(0, 0, 1000, 600);
var element = new Sprite(1057, 141, 130, 130);
var pointBoard = new Sprite(1024, 377, 209, 196);
var playButton = new Sprite(1309, 18, 961, 522);
var lifeHeart = [
	new Sprite(1075, 106, 94, 26),
	new Sprite(1075, 81, 94, 26),
	new Sprite(1075, 56, 94, 26),
	new Sprite(1075, 31, 94, 26)
];
