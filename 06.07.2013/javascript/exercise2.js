var dom1D = INTERVALS(1)(15)
var dom2D = DOMAIN([[0,1],[0,1]])([15,15]);

function rgb01(r, g, b){
	var r0 = r/255.0;
	var g0 = g/255.0;
	var b0 = b/255.0;
	return [r0, g0, b0];
}

function generateKnot(controlPoints){
  lun = controlPoints.length + 2 + 1;
  var nodeSeq = []
  nodeSeq[0] = 0;
  nodeSeq[1] = 0;
  nodeSeq[2] = 0;
  for (i = 3; i <= lun - 4 ; i++) {
    nodeSeq[i] = i-2;
  };
  nodeSeq[lun-1] = i-2
  nodeSeq[lun-2] = i-2
  nodeSeq[lun-3] = i-2
  return nodeSeq
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
		if(i-xMax-1+(xMax*(Math.floor(i/xMax)))!=0){
		cells.push([i,i+1,i+xMax,i+xMax+1]);
		}
	}
	return cells;
}

//rende un'area pianeggiante, ma non completamente
function makeFlat(ver, xMax, start, h, rounds){
	var round = ver.length/xMax;
	var curves = [];
	var curves2 = [];
	var end = start+round*rounds
	var flatPoints = [];
	while(start<=end){
		var points=[];
		var points2=[];
		for(var i=start;i<start+rounds;i++){
			ver[i][2]=h+(Math.random()/4);
			flatPoints.push(i);
		}
		start=start+round;
	}
	return flatPoints;
}

// il lago segue il profilo del terreno sottostante
function makeLake(ver, xMax, start, rounds){
	var round = ver.length/xMax;
	var curves = [];
	var curves2 = [];
	var end = start+round*rounds
	while(start<=end){
		var points=[];
		var points2=[];	
		for(var i=start;i<start+rounds;i++){
			var temp1=[ver[i][0],ver[i][1],ver[i][2]];
			points.push(temp1);
			var temp2=[ver[i][0],ver[i][1],ver[i][2]+0.15];
			points2.push(temp2);
		}
		var knots = generateKnot(points);
		var knots2 = generateKnot(points2);
		var nubs = NUBS(S0)(2)(knots)(points);
		var nubs2 = NUBS(S0)(2)(knots2)(points2);
		curves.push(nubs);
		curves2.push(nubs2);
		start=start+round;

	}
	var drawings = [];
	for(var q=0; q<curves.length-1; q++){
		drawings.push(MAP(BEZIER(S1)([curves[q],curves[q+1]]))(dom2D))
		drawings.push(MAP(BEZIER(S1)([curves2[q],curves2[q+1]]))(dom2D))
	}
	drawings.push(MAP(BEZIER(S1)([curves[0],curves2[0]]))(dom2D))
	drawings.push(MAP(BEZIER(S1)([curves[curves.length-1],curves2[curves.length-1]]))(dom2D))
	return drawings;
}

var mountain = {};
mountain.vertexes = makeVertexes(20,20,5);
mountain.cells = makeCells(mountain.vertexes,20);
mountain.color = rgb01(107,66,38);
//mi segno dove sta il lago, cosi non ci metto alberi successivamente.
mountain.lakePoints = makeFlat(mountain.vertexes, 20, 150, 1, 4);

mountain.makeModel = function () {
	var lake = COLOR(rgb01(2,157,116))(STRUCT(makeLake(mountain.vertexes, 20, 150, 4)));
	mountain = COLOR( mountain.color )(STRUCT([T([0])([-0.2])(CUBOID([0.2,19,4])),T([0])([19])(CUBOID([0.2,19,4])),T([1])([19])(CUBOID([19,0.2,4])),T([1])([-0.2])(CUBOID([19,0.2,4])), SIMPLICIAL_COMPLEX( mountain.vertexes )( mountain.cells )]));
	return STRUCT([lake, mountain])
}; 

DRAW(mountain.makeModel())