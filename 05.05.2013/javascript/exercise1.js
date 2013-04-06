function makeCurvePillar(start, end, r, R, height){

var dom = DOMAIN([[start,end],[start,end]])([24,36]);

var x = function (R,r){
	return function(v){
		return [(r*COS(v[0])+R)*COS(v[1])];
	};
};

var y = function (R,r){
	return function(v){
		return [(r*COS(v[0])+R)*SIN(v[1])];
	};
};

var mapping = x(r,R);
var mapping1 = y(r,R);
var model = MAP([mapping,mapping1])(dom);
return (EXTRUDE([height])(model));
}

var pillar = (CUBOID([0.35,0.35,2.5]));
var curvePillar = makeCurvePillar(0,2*PI,0.09,0.09,2.5);
var smallPillar = CUBOID([0.2,0.2,2.5]);

var pillar_0_rect_spare = T([0,1])([4.1,7.5])(pillar);
var pillars_0_rect = T([0,1])([5.9,7.5])(STRUCT(REPLICA([3])([pillar,T([0])([3.9])])));
var pillars_0_curv = T([0,1])([2.18,0.18])(STRUCT(REPLICA([5])([curvePillar,T([0])([3.9])])));
var pillar_0_curv_spare = T([0,1])([2.18,7.68])(curvePillar);
var pillars0 = STRUCT([pillars_0_rect,pillar_0_rect_spare,pillars_0_curv, pillar_0_curv_spare]);

var pillars_1_rect_row_0 = T([0,2])([2,3])(STRUCT(REPLICA([5])([pillar,T([0])([3.9])])));
var pillars_1_rect_row_1 = T([0,1,2])([2,7.5,3])(STRUCT(REPLICA([3])([pillar,T([0])([3.9])])));
var pillar_1_smallRect_spare = T([0,1,2])([3.1,7.5,3])(smallPillar);
var pillar_1_rect_spare = T([0,1,2])([17.6,7.5,3])(pillar);
var pillar_1_curv_spare = T([0,1,2])([13.88,7.68,3])(curvePillar);
var pillars1 = STRUCT([pillar_1_rect_spare, pillar_1_smallRect_spare, pillars_1_rect_row_0, pillars_1_rect_row_1, pillar_1_curv_spare]);

var pillars_2_rect_row_0 = T([0,2])([2,6])(STRUCT(REPLICA([2])([pillar,T([0])([3.9])])));
var pillars_2_rect_row_1 = T([0,1,2])([2,7.5,6])(STRUCT(REPLICA([5])([pillar,T([0])([3.9])])));
var pillar_2_rect_spare = T([0,2])([17.6,6])(pillar);
var pillars2 = STRUCT([pillars_2_rect_row_0, pillars_2_rect_row_1, pillar_2_rect_spare]);

var pillars_3_rect_row_0 = T([0,2])([9.8,9])(STRUCT(REPLICA([2])([pillar,T([0])([7.8])])));
var pillars_3_rect_row_1 = T([0,1,2])([9.8,7.5,9])(STRUCT(REPLICA([3])([pillar,T([0])([3.9])])));
var pillars_3_smallRect_row_1 = T([0,1,2])([2,7.5,9])(STRUCT(REPLICA([3])([smallPillar,T([0])([3.9])])));
var pillars3 = STRUCT([pillars_3_rect_row_0, pillars_3_rect_row_1, pillars_3_smallRect_row_1]);
var pillars = T([2])([0.5])(STRUCT([pillars0, pillars1, pillars2, pillars3]));
var building = pillars;
DRAW(building);