function rgb01(r, g, b){
	var r0 = r/255.0;
	var g0 = g/255.0;
	var b0 = b/255.0;
	return [r0, g0, b0];
}

function makeVertexes(xMax, yMax, zMax){
	var ver = [];
	for(var y=0; y<yMax; y++){
		for(var x=0; x<xMax; x++){
			ver.push([x,y,Math.abs(zMax*SIN(x+0.1)*COS(y+0.1)*Math.random())]);
		}
	}
	return ver;
}

function makeCells(v,xMax){
	var cells = [];
	for(var i=0;i<v.length-1-xMax;i++){
		//se e' l'ultima della fila la salto, altrimenti lega con quella iniziale della row successiva.
		if(i-xMax-1+(xMax*(Math.floor(i/xMax)))!=0){
			cells.push([i,i+1,i+xMax,i+xMax+1]);
		}
	}
	return cells;
}

var mountain = {};
mountain.vertexes = makeVertexes(20,20,5);
mountain.cells = makeCells(mountain.vertexes,20);
mountain.color = rgb01(107,66,38);
mountain.makeModel = function () {
	return COLOR( mountain.color )(STRUCT(
		[T([0])([-0.2])(CUBOID([0.2,19,4])),T([0])([19])(CUBOID([0.2,19,4])),T([1])([19])(CUBOID([19,0.2,4])),T([1])([-0.2])(CUBOID([19,0.2,4])), SIMPLICIAL_COMPLEX( mountain.vertexes )( mountain.cells )]));
}; 

DRAW(mountain.makeModel())