const canvas = document.getElementById( "canvas" );
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext( "2d" );
const nHeight = canvas.height / 2;

class SpringRod extends Spring{
	constructor(nl, o){
		super(nl);
		this.origin = o;
		let r = Math.random() * 255;
		let g = Math.random() * 255;
		let b = Math.random() * 255;
		this.color = `rgba(${r}, ${g}, ${b})`;
	}
	draw( ctx ){
		ctx.save();
		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.color;
		ctx.translate( this.origin.x, this.origin.y );
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0, -this.length);
		ctx.fillRect(-5, -this.length, 10, 10 );
		ctx.stroke();
		ctx.restore();	
	}
}



let count = 35;
let rods = [];

for( let i = 0; i < count; i++ ){
	let s = new SpringRod( nHeight, { x : i * canvas.width / count + 5 , y : canvas.height});
	
	//Paramters for each string
	//s.pull( Math.random() * canvas.height/2 - canvas.height / 4 );
	//s.damp = ( Math.random()  + 0.1)/ 100 ;
	//s.stiff =( Math.random() + 0.1)/ 10;
	let harmonic = 2;
	s.pull( Math.sin( i / count * harmonic * Math.PI) * 100 );
	s.damp = 0.01;
	rods[i] = s;
}
function update(){	
	for ( s in rods )
		rods[s].update();
}

function draw(){
	ctx.clearRect( 0, 0,  canvas.width, canvas.height );
	for( s in rods )
		rods[s].draw( ctx );
}

function gameloop(){
	update();
	draw();
	requestAnimationFrame( gameloop );
}
function start(){
	gameloop();
}

start();
window.onresize = function(){
	location.reload();
}
