// helper globals
var currX, currY; // current position
var dx, dy, vx, vy, stepX, stepY;
var ax = 0, ay = 0;
var mouseposX =0; mouseposY = 0;

// config variables
var t = 0.5; //in seconds
var a = 0.5; // acceleration constant
var ux = 0,uy = 1; // initial velocity
var vmax = 5; // max velocity
var da = 0; // de acceleration

function engine() {

	dy = mouseposY - currY;
	dx = mouseposX - currX;      
	   
	if(mouseposX != 0){ 
		// accelerate
		ax = a * ( dx/ Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)));
		ay = a * ( dy/ Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)));
	} else {
		// apply brakes
		ax = ux > 0 ? -da : da;  // sign of ux
		ay = uy > 0 ? -da : da;
	}

	// calculate velocity
	vx = ux + ax * t;
	vy = uy + ay * t;
		 
	// limit max velocity
	if(Math.abs(vx) > vmax)
		vx = vx > 0 ? vmax : -vmax;
	
	if(Math.abs(vy) > vmax)
		vy = vy > 0 ? vmax : -vmax;


	// set new velocities
	ux = vx;
	uy = vy;

	// velocity is distance travelled per unit time
	stepX = Math.round(vx); // distance travelled in unit time
	stepY = Math.round(vy);	
			
	currX += stepX;
	currY += stepY;	

	// update car ui
	update(currX, currY);
	
}



function update(x, y) {
	erase_frame();
	draw_circle(x, y);	
}




function stopturn(){
	mouseposX = mouseposY = 0;
}




function turn(evt) {

    if(!evt){
	evt=document.event;
	}
	  
	mouseposX=evt.clientX;
	mouseposY=evt.clientY;
}


function init() {

	// change cursor
	document.body.style.cursor="crosshair";

	// create game area
  	mycanvas = document.createElement('canvas');
  	document.body.appendChild(mycanvas);

  	mycanvas.width = document.width;
  	mycanvas.height = document.height;

	// event bindings
  	mycanvas.addEventListener('mousedown', turn);
  	mycanvas.addEventListener('mouseup', stopturn);

  	mycontext = mycanvas.getContext('2d');

  	// initials
  	currY = 10;
  	currX = 10;

  	// start engine
	timeout = setInterval(engine, 50);
}




function draw_circle(x, y) {
	mycontext.fillStyle = "#666"; //"#f00";
	mycontext.beginPath();
	mycontext.arc(x, y, 5, 0, Math.PI * 2, true);
	mycontext.fill();
}





function erase_frame() {
	mycanvas.width = mycanvas.width;
}


window.onload = init;

// 	t += 0.05; //in seconds
// 	var a = 0.005;