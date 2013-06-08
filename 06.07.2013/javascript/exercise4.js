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

function hermiteCircle(r,z){
	var domain = dom1D;	
	var t1 = [0, 2*r, 0];
	var t2 = [0, -2 * r, 0];

	var p0 = [
		[0, 0, z],
		[0+r, 0, z], t1, t2];
	var p1 = [
		[0, 0, z],
		[0+r, 0, z], t2, t1];
	
	var c0 = CUBIC_HERMITE(S0)(p0);
	var c1 = CUBIC_HERMITE(S0)(p1);
	return [c0, c1];
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}

function isPointInArray(point, array){
	var found = false;
	for(var i=0; i<array.length && !found;i++){
		if(array[i]==point){
			found = true;
		}
	}
	return found;
}
function checkPosition(ver,pos){
	good = true;
	var x = ver[pos][0];
	var y = ver[pos][1];
	if(x<=1 || x>=19){
		good = false;
	}
	if(y<=1 || y>=19){
		good =false;
	}
	return good;
}

function putTrees(ver,nr,xMax){
	var trees = [];
	var n = 0;
	while(n<nr){
		var tree = treeModel(0.2,1,0.8);
		pos = getRandomInt(1,ver.length-1-2*xMax);
		if(checkPosition(ver, pos) && !isPointInArray(pos, mountain.lakePoints) && !isPointInArray(pos, mountain.settlementPoints)){
			mountain.vertexes[pos][2]=1;
			trees.push(T([0,1])([ver[pos][0],ver[pos][1]])(tree));
			n++;
		}
	}
	return STRUCT(trees);
}

var treeModel = function(r,z,h){
	h=h*getRandomArbitary(0.7,1);
	r=r*getRandomArbitary(0.7,0.9);
	var treeBottom = hermiteCircle(r,z);
	var treeUp = hermiteCircle(r,z+h);
	var trunkA = MAP(BEZIER(S1)([treeUp[0],treeBottom[0]]))(dom2D);
	var trunkB = MAP(BEZIER(S1)([treeUp[1],treeBottom[1]]))(dom2D);
	var treeCrown = getRandomArbitary(0.2,0.5);
	var conicalBase = hermiteCircle(r+treeCrown,z+h);
	var conicalSupBase = MAP(BEZIER(S1)([conicalBase[0],conicalBase[1]]))(dom2D);
	var top = [0+r,0,z+h+0.75];
	var leavesA = MAP(CONICAL_SURFACE(top)(conicalBase[0]))(dom2D);
	var leavesB = MAP(CONICAL_SURFACE(top)(conicalBase[1]))(dom2D);
	return STRUCT([T([0])([treeCrown/2])(COLOR([150/255, 75/255, 0])(trunkA)),T([0])([treeCrown/2])(COLOR([150/255, 75/255, 0])(trunkB)),COLOR([0,1,0])(leavesA),COLOR([0,1,0])(leavesB),COLOR([0,1,0])(conicalSupBase)])
}

function makeSettlement(ver, xMax, start, rounds){
	var round = ver.length/xMax;
	var end = start+round*rounds
	var houses=[];
	while(start<=end){
		var streetDrawings = [];
		for(var i=start;i<start+rounds;i++){
			houses.push(T([0,1,2])([ver[i][0],ver[i][1],ver[i][2]])(house()));
		}
		start=start+round;
	}
	return STRUCT(houses);
}

//l'altezza della casa è randomizzata, cosi come l'altezza del tetto rispetto alla casa
function house(){
	randomHeight = getRandomArbitary(0.2,0.7);
	var points = [[0,0],[0.5,0],[0,0.7],[0.5,0.7],[0.25,0.7+1*randomHeight]];
	var body = [[0,1,2],[1,3,2]];
	var roof = [[2,3,4]];
	var house_body = (SIMPLICIAL_COMPLEX(points)(body));
	var house_roof = COLOR([1,0,0,1])(SIMPLICIAL_COMPLEX(points)(roof));
	var e3d = getRandomArbitary(0.6,0.9);
	var hbody3d = R([1,2])(PI/2)(EXTRUDE([e3d])(house_body));
	var hroof3d = R([1,2])(PI/2)(EXTRUDE([e3d])(house_roof));
	return STRUCT([hbody3d,hroof3d]);
}

var dom1D = INTERVALS(1)(15)
var dom2D = DOMAIN([[0,1],[0,1]])([15,15]);

var mountain = {};
mountain.vertexes = makeVertexes(20,20,5);
mountain.cells = makeCells(mountain.vertexes,20);
mountain.color = rgb01(107,66,38);
//mi segno dove sta il lago, cosi non ci metto alberi successivamente.
mountain.lakePoints = makeFlat(mountain.vertexes, 20, 150, 1, 4);
//mi segno dove stanno gli insediamenti urbani, cosi non ci metto alberi successivamente.
mountain.settlementPoints=makeFlat(mountain.vertexes, 20, 270, 1, 4);
mountain.settlementPoints2=makeFlat(mountain.vertexes, 20, 300, 1, 3);

var houseSettlement = makeSettlement(mountain.vertexes, 20, 270, 4);
var houseSettlement2 = makeSettlement(mountain.vertexes, 20, 300, 3);

mountain.makeModel = function () {
	var lake = COLOR(rgb01(2,157,116))(STRUCT(makeLake(mountain.vertexes, 20, 150, 4)));
	var treeCollection = (putTrees(mountain.vertexes, 20, 20));
	mountain = COLOR( mountain.color )(STRUCT([T([0])([-0.2])(CUBOID([0.2,19,4])),T([0])([19])(CUBOID([0.2,19,4])),T([1])([19])(CUBOID([19,0.2,4])),T([1])([-0.2])(CUBOID([19,0.2,4])), SIMPLICIAL_COMPLEX( mountain.vertexes )( mountain.cells )]));
	return STRUCT([lake, mountain, houseSettlement, houseSettlement2, treeCollection])
}; 

DRAW(mountain.makeModel())