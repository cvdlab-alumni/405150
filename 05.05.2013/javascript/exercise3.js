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

var building = walls;

DRAW(walls);