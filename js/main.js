const canvas = document.getElementById( "canvas" );
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext( "2d" );
const nHeight = canvas.height / 2;

class SpringRod extends Spring{
	constructor(nl, o){
		super(nl);
		this.origin = o;
		let r = 1, g = 36, b = 50;
		//r = Math.random() * 255;
		//g = Math.random() * 255;
		//b = Math.random() * 255;
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
		ctx.fillRect(-1, -this.length, 2, 2 );
		ctx.stroke();
		ctx.restore();	
	}
}



let count = 100;
let rods = [];
let leftDifference = [], rightDifference = [];

for( let i = 0; i < count; i++ ){
	let s = new SpringRod( nHeight, { x : i * canvas.width / count + 5 , y : canvas.height});
	
	//Paramters for each string
	//s.pull( Math.random() * canvas.height/2 - canvas.height / 4 );
	//s.damp = ( Math.random()  + 0.1)/ 100 ;
	//s.stiff =( Math.random() + 0.1)/ 10;
	let harmonic = 3;
	//s.pull( Math.sin( i / count * harmonic * Math.PI) * 100 );
	s.damp = 0.001;
	rods[i] = s;
}


leftDifference[0] = rightDifference[ count - 1 ] = 0;

function pull(){
    for( let i = 0; i < count/10; i++ ){   
        rods[ count / 2 + i].pull(-50 - i );
        rods[ count / 2 - i].pull( 50 + i);
    }

}

pull();
const SPREAD = 2;
function calcDel(){
    for( let i = 1; i < rods.length; i++){
        leftDifference[i] = rods[i].length - rods[i-1].length;
        leftDifference[i] *= -rods[i].stiff * SPREAD;
    }
    
    for( let i = 0; i < rods.length - 1; i++){
        rightDifference[i] = rods[i].length - rods[i+1].length;
        rightDifference[i] *= -rods[i].stiff * SPREAD;
    }
}
function update(){
    let prevHeight = rods[ count /2 ].length; 
    calcDel();
	for ( s in rods ){
        rods[s].extA =  (leftDifference[s] + rightDifference[s]);
		rods[s].update();
	}

    if( Math.abs(rods[count /2 ].length - prevHeight) < 0.01 ){
        //pull();
    }
}

function draw(){
	ctx.clearRect( 0, 0,  canvas.width, canvas.height );
	ctx.beginPath();
    ctx.moveTo( -10, -rods[0].length + rods[0].origin.y);
    for( i in rods ){
        ctx.lineTo( rods[i].origin.x, -rods[i].length + rods[i].origin.y);
    }
    ctx.stroke();
    for( s in rods ){
		rods[s].draw( ctx );
    }
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
