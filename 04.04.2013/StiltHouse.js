function rgb01(r, g, b){
var r0 = r/255.0;
var g0 = g/255.0;
var b0 = b/255.0;
return [r0, g0, b0];
}

function triplet(x){
	var transl = T([0])([3]);
	return STRUCT([x, transl(x),transl(transl(x))]);
};

function trasrot(x){
	var tras = T([0,1,2])([0,0.03,-0.08]);
	var rot = R([0,1])(PI/20);
	return rot(tras(x)); 
}

var colonna1s = (COLOR(rgb01(140,102,53))(CYL_SURFACE([0.2,3])([20,4])));
var colonne1 = triplet(colonna1s);
var colonna2s = T([1])([3])(colonna1s);
var colonne2 = triplet(colonna2s);
var colonna3s = T([1])([3])(colonna2s);
var colonne3 = triplet(colonna3s);

var mare = COLOR(rgb01(30,144,255))(SIMPLEX_GRID([[20],[20],[0.1]]));
var colonne = T([0,1])([6.9,6.9])(STRUCT([colonne1, colonne2, colonne3]));
var pavimento = T([0,1,2])([6.5,6.5,3])(COLOR(rgb01(97,63,41))(SIMPLEX_GRID([[7],[7],[0.15]])));
var aggiunta = T([0,1,2])([4.5,6.5,3])(COLOR(rgb01(97,63,41))(SIMPLEX_GRID([[2],[2],[0.15]])));

var paletto1 = T([0,1,2])([8.5,6.5,3.15])(COLOR(rgb01(140,102,53))(CUBOID([0.08,0.08,1])));
var paletto2 = T([0])([3.1])(paletto1);
var paletto3 = T([0])([-4])(paletto1);
var paletto0 = T([0])([-2])(paletto1);
var paletto4 = T([0])([4.9])(paletto1);
var staccionata = STRUCT([T([0,1,2])([4.5,6.5,4])(COLOR(rgb01(140,102,53))(CUBOID([9,0.08,0.08]))), paletto0, paletto1, paletto2, paletto3, paletto4]);

var paletto5 = T([1])([6.9])(paletto1);
var paletto6 = T([1])([6.9])(paletto2);
var paletto7 = T([1])([6.9])(paletto0);
var paletto8 = T([1])([6.9])(paletto4);
var staccionata2 = STRUCT([T([0,1,2])([6.5,13.4,4])(COLOR(rgb01(140,102,53))(CUBOID([7,0.08,0.08]))), paletto5, paletto6, paletto7, paletto8]);
var paletto9 = T([1])([-2])(paletto8);
var paletto10 = T([1])([-4])(paletto8);
var staccionata3 = STRUCT([T([0,1,2])([13.5,6.5,4])(ROTATE([0,1])(PI/2)(COLOR(rgb01(140,102,53))(CUBOID([7,0.08,0.08])))),paletto9,paletto10]);
var paletto13 = T([1])([1.9])(paletto3);
var paletto11 = T([0])([2])(paletto13);
var paletto12 = T([0])([-6.9])(paletto9);
var staccionata4 = STRUCT([T([0,1,2])([6.6,8.4,4])(ROTATE([0,1])(PI/2)(COLOR(rgb01(140,102,53))(CUBOID([5,0.08,0.08])))),paletto11,paletto12, paletto13]);
var staccionata5 = T([0,1,2])([4.5,8.4,4])(COLOR(rgb01(140,102,53))(CUBOID([2,0.08,0.08])));
var staccionate = STRUCT([staccionata, staccionata2, staccionata3, staccionata4, staccionata5]);
var base = STRUCT([staccionate, colonne, mare, pavimento, aggiunta]);

var muroL1 = T([0,1,2])([9,9,3])(CUBOID([4,0.15,2.6]));
var muroL2 = T([0,1,2])([9,13,3])(CUBOID([4,0.15,3.1]));
var tetto = T([0,1,2])([9,9,5.6])(CUBOID([4,4.15,0.12]));
var pool = T([0,1,2])([10,10,5.72])(COLOR(rgb01(14,113,194))(CUBOID([2.9,3,0.2])));
var portante = COLOR(rgb01(255,255,255))(STRUCT([muroL1, muroL2, tetto]));
var muroP1 = T([0,1,2])([12.9,9.9,5.72])(CUBOID([0.1,3.1,0.25]));
var muroP2 = T([0])([-3])(muroP1);
var muroP3 = T([0,1,2])([9.9,9.9,5.72])(CUBOID([3,0.1,0.25]));
var murProt1 = T([0,1,2])([9,9,5.72])(CUBOID([0.1,4,0.3]));
var murProt2 = T([0,1,2])([12.9,9,5.72])(CUBOID([0.1,0.9,0.3]));
var murProt3 = T([0,1,2])([9.9,9,5.72])(CUBOID([3,0.1,0.3]));
var murProt = COLOR(rgb01(68,68,69))(STRUCT([murProt1, murProt2, murProt3]));
var muriPool = COLOR(rgb01(8,6,84))(STRUCT([muroP1, muroP2, muroP3]));

var p = [[0,0], [4,0], [4,2.6], [0,2.6], [0.5,0.2], [3.5,0.2], [3.5,2.4], [0.5,2.4]];
var c = [[0,1,4,5], [1,2,5,6], [2,3,6,7], [0,3,4,7]];
var retro2d = SIMPLICIAL_COMPLEX(p)(c); 
var retro3d = COLOR(rgb01(255,255,255))(EXTRUDE([0.05])(retro2d));

var verticiVetro = [[0.5,0.2], [3.5,0.2], [3.5,2.4], [0.5,2.4]];
var celleVetro = [[0,1,2,3]];
var colorVetro = [0,0,1,0.5];
var vetro2d = SIMPLICIAL_COMPLEX(verticiVetro)(celleVetro); 
var vetro = COLOR(colorVetro)(EXTRUDE([0.05])(vetro2d));
var retro = T([0,1,2])([12.9,9,3])(R([0,1])(PI/2)(R([1,2])(PI/2)(STRUCT([vetro, retro3d]))));
var fronte = T([0])([-3.9])(retro);
var separe = COLOR(rgb01(68,68,69))(T([0,1,2])([8.9,11,3.2])(CUBOID([0.1,0.1,2.2])));

var pil1 = T([0,1,2])([9.2,8.9,3])(CYL_SURFACE([0.05,2.8])([100,4]));
var pil2 = T([0])([0.6])(pil1);
var pils = COLOR(rgb01(68,68,69))(STRUCT([pil1, pil2]));
var grad1 = COLOR(rgb01(68,68,69))(T([0,1,2])([9.2,8.8,3.5])(CUBOID([0.6,0.15,0.02])));
var grad2 = T([2])([0.3])(grad1);
var grad3 = T([2])([0.3])(grad2);
var grad4 = T([2])([0.3])(grad3);
var grad5 = T([2])([0.3])(grad4);
var grad6 = T([2])([0.3])(grad5);
var grad7 = T([2])([0.3])(grad6);
var grad8 = T([2])([0.3])(grad7);
var gradini = STRUCT([grad1, grad2, grad3, grad4, grad5, grad6, grad7, grad8]);
var scala = STRUCT([gradini, pils]);
var model = STRUCT([separe,retro, fronte, portante, muriPool, murProt, pool, base, scala]);

var scalino = COLOR(rgb01(68,68,69))(CUBOID([1.5,0.22,0.09]));
var scal1 = trasrot(scalino);
var scal2 = trasrot(scal1);
var scal3 = trasrot(scal2);
var scal4 = trasrot(scal3);
var scal5 = trasrot(scal4);
var scal6 = trasrot(scal5);
var scal7 = trasrot(scal6);
var scal8 = trasrot(scal7);
var scal9 = trasrot(scal8);
var scal10 = trasrot(scal9);
var scal11 = trasrot(scal10);
var scal12 = trasrot(scal11);
var scal13 = trasrot(scal12);
var scal14 = trasrot(scal13);
var scal15 = trasrot(scal14);
var scal16 = trasrot(scal15);
var scal17 = trasrot(scal16);
var scal18 = trasrot(scal17);
var scal19 = trasrot(scal18);
var scal20 = trasrot(scal19);
var scal21 = trasrot(scal20);
var scal22 = trasrot(scal21);
var scal23 = trasrot(scal22);
var scal24 = trasrot(scal23);
var scal25 = trasrot(scal24);
var scal26 = trasrot(scal25);
var scal27 = trasrot(scal26);
var scal28 = trasrot(scal27);
var scal29 = trasrot(scal28);
var scal30 = trasrot(scal29);
var scal31 = trasrot(scal30);
var scal32 = trasrot(scal31);
var scal33 = trasrot(scal32);
var scal34 = trasrot(scal33);
var scal35 = trasrot(scal34);
var scal36 = trasrot(scal35);
var scal37 = trasrot(scal36);

var palo = T([0,1])([4.55,6.5])(COLOR([0,0,0])(CYL_SURFACE([0.15,3])([100,4])));
DRAW(palo);

var chioccia = STRUCT([scalino, scal1, scal2, scal3, scal4, scal5, scal6, scal7, scal8, scal9, scal10,
	scal11, scal12, scal13, scal14, scal15, scal16, scal17, scal18, scal19, scal20, scal21, scal22, scal23,
	scal24, scal25, scal26, scal27, scal28, scal29, scal30, scal31, scal32, scal33, scal34, scal35, scal36, scal37]);
DRAW(T([0,1,2])([4.55,6.75,3])(R([0,1])(PI/2)(chioccia)));
DRAW(model);