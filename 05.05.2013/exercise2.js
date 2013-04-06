

function makeCurveFloor(alpha, r, R){

   var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}

var floor_1_curve1 = T([0,1])([4.95,2.85])(R([0,1])(PI)(makeCurveFloor(PI,0,0.85)));
var floor_1_curve2 = T([0,1])([15.6,7.7])(R([0,1])(-PI/2)(makeCurveFloor(PI,0,1.9)));
var floor_1_points = [[15.6,7.5],[15.6,9.6],[2,9.6],[2,7.5],[4.1,7.5],[4.1,5.8],[4.1,4.6],[4.1,3.3],
			[4.1,2.8],[5.8,2.8],[5.8,3.3],[14.1,3.3],[14.1,5.8],[15.6,5.8]];
var floor_1_cells = [[0,1,2,3],[4,5,0,13],[5,7,11,12],[7,8,9,10]];
var floor_1_2d = STRUCT([(SIMPLICIAL_COMPLEX(floor_1_points)(floor_1_cells)), floor_1_curve1, floor_1_curve2]);
var floor1 = EXTRUDE([0.5])(floor_1_2d);

var floor2_grid0 = SIMPLEX_GRID([[-2,16.1],[7.65]]);
var floor2_grid1 = SIMPLEX_GRID([[-2,6.7],[-7.65,2]]);
var floor2_grid2 = SIMPLEX_GRID([[-0.4,1.6],[-7.65,1.6]]);
var floor2_grid3 = SIMPLEX_GRID([[-13.7,4.4],[-7.65,2]]);
var floor2_grid4 = SIMPLEX_GRID([[-8.7,5],[-9.3,0.35]]);
var floor2 = T([2])([3])(EXTRUDE([0.5])(STRUCT([floor2_grid0,floor2_grid1,floor2_grid2,floor2_grid3,floor2_grid4])));


var floor_3_grid = SIMPLEX_GRID([[-2,16.1],[7.65,-1.5,0.5]]);
var floor_3_grid2 = SIMPLEX_GRID([[-2,0.5],[-7.65,2]]);
var floor_3_grid3 = SIMPLEX_GRID([[-9.7,8.4],[-7.65,2]]);
var floor3= T([2])([6])(EXTRUDE([0.5])(STRUCT([floor_3_grid, floor_3_grid2, floor_3_grid3])));

var floor_4_grid0 = SIMPLEX_GRID([[-2,7.9],[9.65]]); //vert
var floor_4_grid1 = SIMPLEX_GRID([[-9.9,0.35],[9.65]]); //vert
var floor_4_grid3 = SIMPLEX_GRID([[-2,7.9],[-9.45,0.2]]);
var floor_4_grid4 = SIMPLEX_GRID([[-10.25,7.85],[7.65]]);
var floor_4_grid5 = SIMPLEX_GRID([[-10.25,7.85],[-9.30,0.35]]);
var floor_4_grid6 = SIMPLEX_GRID([[-14.65,3.5],[-7.65,1.65]]);
var floor4 = T([2])([9])(EXTRUDE([0.5])(STRUCT([floor_4_grid0,floor_4_grid1,floor_4_grid3,floor_4_grid4,floor_4_grid5,floor_4_grid6])));

var floor_5_grid0 = SIMPLEX_GRID([[-2,16.1],[1.9]]);
var floor_5_grid1 = SIMPLEX_GRID([[-2,8.2],[-1.9,7.75]]);
var floor_5_grid2 = SIMPLEX_GRID([[-17.6,0.5],[9.65]]);
var floor_5_grid3 = SIMPLEX_GRID([[-8.2,9.9],[-9.1,0.5]]);

var floor5 = T([2])([12])(EXTRUDE([0.5])(STRUCT([floor_5_grid0,floor_5_grid1,floor_5_grid2,floor_5_grid3])));
var floors = STRUCT([floor1, floor2, floor3, floor4, floor5]);

est0 = SIMPLEX_GRID([ [-2.2,7.8],[0.5],[-3,7.1,-1.2,0.7]])
est1 = SIMPLEX_GRID([[-10,0.4],[0.5],[-3,9]]);
est2 = SIMPLEX_GRID([ [-10.4,3.5],[0.5],[-3,1.3,-1.2,1.7,-1.2,1.7,-1.2,0.7]])
est3 = SIMPLEX_GRID([ [-13.9,4.3],[0.5],[-3,9]])
est4 = SIMPLEX_GRID([[-2,0.2],[0.5],[-3,9]])

estwall = T([2])([0])(STRUCT([est0,est1,est2,est3,est4]));

west1 = SIMPLEX_GRID([[-2.5,2.5],[0.5],[3]])
west2 = SIMPLEX_GRID([[-5,0.8],[0.5],[2.1,-0.7,0.2]])
west3 = SIMPLEX_GRID([[-5.8,10.3],[0.5],[3]])
west4 = SIMPLEX_GRID([[2.1,-0.2,0.7],[0.5],[-3,9]])
west5 = SIMPLEX_GRID([[-2.1,0.2],[0.5],[-3,5,-1,3]])
west6 = SIMPLEX_GRID([[-3.2,4],[0.5],[-3,1.4,-1.5,0.1,6]])
west7 = SIMPLEX_GRID([[-7.2,8.9],[0.5],[-3,9]])

westwall = R([0,1])([PI])(T([0,1])([-18.1,-9.65])(STRUCT([west1,west2,west3,west4,west5,west6,west7,T([0])([0.9])(west5)])));
north1 = SIMPLEX_GRID([[-0.4,7.1],[0.5],[-3,1.3,-1.2,1.7,-1.2,1.7,-1.2,1.2]])
north0 = SIMPLEX_GRID([[0.4,-7.1,1.3,-0.3,0.5],[0.5],[-3,9.5]])
north2 = SIMPLEX_GRID([[-8.8,0.4],[0.5],[-3,0.6,-2.4,0.6,-2.4,0.5,-2.4,0.6]])

northwall = R([0,1])([PI/2])(T([1])([-18.5])(STRUCT([north1, north2, north0])));

south0 = SIMPLEX_GRID([[0.4,-1.3,0.3,-7,0.6],[0.5],[-3,9.5]])
south1 = SIMPLEX_GRID([[-2,7.2],[0.5],[-3,0.8,-1.65,1.2,-1.65,1.6,-1.5,1.1]])
south2 = SIMPLEX_GRID([[-0.4,1.3],[0.5],[-3,0.5,-2,0.5,3.9,-1.5,1.1]])
wallsouth = R([0,1])([-PI/2])(T([0,1])([-9.6,1.5])(STRUCT([south0, south1, south2])));

var walls = STRUCT([westwall,estwall, northwall,wallsouth]);
var building = STRUCT([walls, floors]);
DRAW(building)
