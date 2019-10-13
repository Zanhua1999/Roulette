var kleuren = ["red", "black","red","black","red","black","red","black","red","black","black","red","black","red", "black","red","black","red","red","black","red","black","red", "black","red","black","red",
              "black","black","red","black","red","black","red","black","red",];  
var cijfers = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"];   
var startAngle = 0; /*Beginpunt van een circle*/
var arc = Math.PI / 18; /*zorgen ervoor dat het in 36 stuks wordt verdeelt*/
var spinTime = 0;  
var spinTimeTotal = 0;    
var ctx;    
function draw() {    /*wheel tekenen*/
  drawRouletteWheel();  
}    
function drawRouletteWheel() {    
  var canvas = document.getElementById("wheelcanvas");    /*koppelen met id wheelcanvas van html*/
  if (canvas.getContext) {      
	  var outsideRadius = 200;      
	  var textRadius = 160;      
	  var insideRadius = 125;            
	  ctx = canvas.getContext("2d");     /*teken type is 2d*/ 
	  ctx.clearRect(0,0,500,500); /*zorg ervoor dat de rechthoekig gebied werd verwijderd*/
	  ctx.strokeStyle = "white";   /*kleur van lijnen*/   
	  ctx.lineWidth = 5;            
      ctx.font = '15px sans-serif';  
      var num = 36;   /*array van cijfers*/       
	  for(var i = 0; i < num; i++) {       /*zolang het aantal onder 36 is blijf die een loop draaien, en elke rond +1 tot dat hij 36 breikt*/
		  var angle = startAngle + i * arc;  /*angle is gelijk aan beginpunt + i x arc*/      
		  ctx.fillStyle = kleuren[i];                
		  ctx.beginPath();        
		  ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);         
		  ctx.arc(250, 250, insideRadius, angle + arc, angle, true);        
		  ctx.stroke();        
		  ctx.fill();                
		  ctx.save();       
	    
		  ctx.fillStyle = "white";    /*kluer van cijfers*/    
		  ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);     /*laten alle onderdelen van de wheel draaien*/   
		  ctx.rotate(angle + arc / 2 + Math.PI / 2);        
		  var text = cijfers[i];        
		  ctx.fillText(text, -ctx.measureText(text).width / 2, 0);       /*fontsize*/ 
		  ctx.restore();      
		  }             
		  //Pijl
		  ctx.fillStyle = "purple";      
		  ctx.beginPath();      
		  ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));      
		  ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));      
		  ctx.lineTo(250 + 4, 250 - (outsideRadius - 5)); 
		  ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));      
		  ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));     
		  ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));      
		  ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));      
		  ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));      
		  ctx.fill();    
		  } 
}    
         //Draai snelheid en tijd
function spin() {    
	spinAngleStart = Math.random() * 10 + 10;    
	spinTime = 0;    
	spinTimeTotal = Math.random() * 3 + 4 * 1000;   
	rotateWheel();  
}    
        //Stop tijd na het drukken op spin knop
function rotateWheel() {    
	spinTime += 30;    
	if(spinTime >= spinTimeTotal) {      
		stopRotateWheel();      
		return;    
	}    
	var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);    
	startAngle += (spinAngle * Math.PI / 180);
	drawRouletteWheel();    spinTimeout = setTimeout('rotateWheel()', 30); 
}    
function stopRotateWheel() {    
	clearTimeout(spinTimeout);    
	var degrees = startAngle * 180 / Math.PI + 90;    
	var arcd = arc * 180 / Math.PI;    
	var index = Math.floor((360 - degrees % 360) / arcd);    ctx.save();
	ctx.font = 'bold 30px sans-serif';    
	var text = cijfers[index]    
	ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);    ctx.restore();  
}    
function easeOut(t, b, c, d) {    /*beweging animatie*/
	var ts = (t/=d)*t;    
	var tc = ts*t;    
	return b+c*(tc + -3*ts + 3*t);  
}    
draw();