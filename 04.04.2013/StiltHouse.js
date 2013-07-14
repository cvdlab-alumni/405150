function rgb01(r, g, b){
var r0 = r/255.0;
var g0 = g/255.0;
var b0 = b/255.0;
return [r0, g0, b0];
}

function triplet(d, x){
	var transl = T([d])([3]);
	return STRUCT([x, transl(x),transl(transl(x))]);
};

function trasrot(x){
	var tras = T([0,1,2])([0,0.03,-0.08]);
	var rot = R([0,1])(PI/20);
	return rot(tras(x)); 
}
function dominioQuad(l, p){
    semiDominio= INTERVALS(l)(p)
    return PROD1x1([semiDominio,semiDominio]);
}

function pieceOfCircle(alpha, r , R){
    dom= PROD1x1([INTERVALS(alpha)(64), T([0])([r])(INTERVALS(R-r)(1))])
    function mapping(v){
            a=v[0]
            r=v[1]
            return [r*COS(a), r*SIN(a)]
            }
    model=MAP(mapping)(dom)
    return model
}

function torus(R, r){
          function torus(v){
              a = v[0]
              b = v[1]
  
              u = (r * COS(a) + R) * COS(b)
              v = (r * COS(a) + R) * SIN(b)
              w = (r * SIN(a))
              return [u,v,w]
            }
          return torus
}
//colonne
var colonna1s = (COLOR(rgb01(140,102,53))(CYL_SURFACE([0.2,3])([20,4])));
var colonne1 = triplet(0,colonna1s);
var colonna2s = T([1])([3])(colonna1s);
var colonne2 = triplet(0,colonna2s);
var colonna3s = T([1])([3])(colonna2s);
var colonne3 = triplet(0,colonna3s);
var colonne = T([0,1])([6.9,6.9])(STRUCT([colonne1, colonne2, colonne3]));
//colonne scala e piano inferiore
var colonnaM1 = T([0,1])([5.45,9.9])(COLOR(rgb01(92,64,51))(CYL_SURFACE([0.15,1.8])([20,4])));
var colonnaM2 = T([1])([3.1])(colonnaM1)
var colonnaM3 = T([0,1])([5.45,7])(COLOR(rgb01(92,64,51))(CYL_SURFACE([0.15,3.3])([20,4])));
var colonnaM4
var colonnaM5
var colonneAgg = STRUCT([colonnaM1,colonnaM2,colonnaM3])

//sostegni portanti
var stecca = T([0,1,2])([6.5,6.6,3])(CUBOID([7,0.6,0.3]))
var sostegni = triplet(1,stecca)

//mare
var mare = COLOR(rgb01(30,144,255))(SIMPLEX_GRID([[20],[20],[0.1]]));

//base piattaforma
var pavimento = T([0,1,2])([6.5,6.5,3])(COLOR(rgb01(97,63,41))(SIMPLEX_GRID([[7],[7],[0.15]])));
var aggiunta = T([0,1,2])([4.5,6.5,3])(COLOR(rgb01(97,63,41))(SIMPLEX_GRID([[2],[2],[0.15]])));

//piattaforma inferiore
var aggiunta2 = T([0,1,2])([4.5,9.4,1.8])(COLOR(rgb01(97,63,41))(SIMPLEX_GRID([[2],[4.1],[0.15]])));

//scala piattaforma inferiore
var scalino = T([0,1,2])([4.75,8.4,3.11])(COLOR(rgb01(68,68,69))(CUBOID([1.5,0.28,0.2])));
var scalini = STRUCT(REPLICA(7)([scalino,T([1,2])([0.2,-0.2])]));

//staccionata
var paletto1 = T([0,1,2])([8.5,6.5,3.15])(COLOR(rgb01(140,102,53))(CUBOID([0.08,0.08,1])));
var paletto2 = T([0])([3.1])(paletto1);
var paletto3 = T([0])([-4])(paletto1);
var paletto0 = T([0])([-2])(paletto1);
var paletto4 = T([0])([4.9])(paletto1);
var staccionata = STRUCT([T([0,1,2])([4.5,6.5,4])(COLOR(rgb01(140,102,53))(CUBOID([8.9,0.08,0.08]))), paletto0, paletto1, paletto2, paletto3, paletto4]);

var paletto5 = T([1])([6.9])(paletto1);
var paletto6 = T([1])([6.9])(paletto2);
var paletto7 = T([1])([6.9])(paletto0);
var paletto8 = T([1])([6.9])(paletto4);
var staccionata2 = STRUCT([T([0,1,2])([6.5,13.4,4])(COLOR(rgb01(140,102,53))(CUBOID([6.95,0.08,0.08]))), paletto5, paletto6, paletto7, paletto8]);

var paletto9 = T([1])([-2])(paletto8);
var paletto10 = T([1])([-4])(paletto8);
var staccionata3 = STRUCT([T([0,1,2])([13.48,6.5,4])(ROTATE([0,1])(PI/2)(COLOR(rgb01(140,102,53))(CUBOID([6.93,0.08,0.08])))),paletto9,paletto10]);

var paletto13 = T([1])([1.9])(paletto3);
var paletto11 = T([0])([2])(paletto13);
var paletto12 = T([0])([-6.9])(paletto9);
var staccionata4 = STRUCT([T([0,1,2])([6.58,8.4,4])(ROTATE([0,1])(PI/2)(COLOR(rgb01(140,102,53))(CUBOID([5,0.08,0.08])))),paletto11,paletto12, paletto13]);

var staccionata5 = T([0,1,2])([4.5,6.5,4])(COLOR(rgb01(140,102,53))(CUBOID([0.08,1.95,0.08])));

var staccionate = STRUCT([staccionata, staccionata2, staccionata3, staccionata4, staccionata5]);


var base = STRUCT([staccionate, T([2])([-0.3])(scalini), T([2])([-0.3])(colonneAgg), T([2])([-0.3])(aggiunta2), T([2])([-0.3])(sostegni), T([2])([-0.3])(colonne), T([2])([-0.3])(mare), pavimento, aggiunta]);

//casa
var muroL1 = T([0,1,2])([9,9,3.15])(CUBOID([4,0.15,2.6]));
var muroL2 = T([0,1,2])([9,13,3.15])(CUBOID([4,0.15,3.1]));
var tetto = T([0,1,2])([9,9.15,5.63])(CUBOID([4,3.85,0.12]));
var portante = COLOR(rgb01(255,255,255))(STRUCT([muroL1, muroL2,tetto]));

//piscina
var pool = T([0,1,2])([10,10,5.75])(COLOR(rgb01(14,113,194))(CUBOID([2.9,3,0.2])));
//muri piscina
var muroP1 = T([0,1,2])([9.9,9.9,5.75])(CUBOID([0.1,3.1,0.25]));
var muroP3 = T([0,1,2])([9.9,9.9,5.75])(CUBOID([3,0.1,0.25]));
var muriPool = COLOR(rgb01(8,6,84))(STRUCT([muroP1, muroP3]));
//muretti di protezione sul tetto
var murProt1 = T([0,1,2])([9,9,5.75])(CUBOID([0.1,4,0.3]));
var murProt2 = T([0,1,2])([12.9,9,5.75])(CUBOID([0.1,4,0.3]));
var murProt3 = T([0,1,2])([9.9,9,5.75])(CUBOID([3,0.1,0.3]));
var murProt = COLOR(rgb01(68,68,69))(STRUCT([murProt1, murProt2, murProt3]));

//muro posteriore
var p = [[0,0], [4,0], [4,2.6], [0,2.6], [0.5,0.2], [3.5,0.2], [3.5,2.4], [0.5,2.4]];
var c = [[0,1,4,5], [1,2,5,6], [2,3,6,7], [0,3,4,7]];
var retro2d = SIMPLICIAL_COMPLEX(p)(c); 
var retro3d = COLOR(rgb01(255,255,255))(EXTRUDE([0.05])(retro2d));

//vetro
var verticiVetro = [[0.5,0.2], [3.5,0.2], [3.5,2.4], [0.5,2.4]];
var celleVetro = [[0,1,2,3]];
var colorVetro = [0,0,1,0.5];
var vetro2d = SIMPLICIAL_COMPLEX(verticiVetro)(celleVetro); 
var vetro = COLOR(colorVetro)(EXTRUDE([0.05])(vetro2d));

//retro con finestra 
var retro = T([0,1,2])([12.95,9,3.15])(R([0,1])(PI/2)(R([1,2])(PI/2)(STRUCT([vetro, retro3d]))));

//muro anteriore
var fronte = T([0])([-3.95])(retro);
var separe = COLOR(rgb01(68,68,69))(T([0,1,2])([8.9,11,3.35])(CUBOID([0.1,0.1,2.2])));

//scala per il tetto
var pil1 = T([0,1,2])([9.2,8.9,3])(CYL_SURFACE([0.05,2.8])([100,4]));
var pil2 = T([0])([0.6])(pil1);
var pils = COLOR(rgb01(68,68,69))(STRUCT([pil1, pil2]));

var gradino = COLOR(rgb01(68,68,69))(T([0,1,2])([9.2,8.8,3.5])(CUBOID([0.6,0.15,0.02])));
var gradini = STRUCT(REPLICA(8)([gradino,T([2])([0.3])]));
var scala = STRUCT([gradini, pils]);

var dom1D = INTERVALS(1)(25);
var dom2D = PROD1x1([dom1D,dom1D]);

//lettino, parte orizzontale
ca1 = [[0.3,0.3,0.2],[1.8,0.3,0],[3.3,0.3,0.2]];
ca0 = [[0.3,0.3,0],[1.8,0.3,0],[3.3,0.3,0]];
cb0 = [[0.3,0.4,0],[1.8,0.4,0],[3.3,0.4,0]];
c1 = [[0.3,0.4,0.2],[1.8,0.4,0],[3.3,0.4,0.2]];
c2 = [[0.3,6.4,0.2],[1.8,6.4,0],[3.3,6.4,0.2]];
c0a = [[0.3,6.5,0],[1.8,6.5,0],[3.3,6.5,0]]
c0b = [[0.3,6.4,0],[1.8,6.4,0],[3.3,6.4,0]]
c1a = [[0.3,6.5,0.2],[1.8,6.5,0],[3.3,6.5,0.2]];

l1 = CUBOID([0.3,6.5,0.2]);
l2 = T([0])([3.3])(CUBOID([0.3,6.5,0.2]));

cm1 = BEZIER(S0)(c1);
cm2 = BEZIER(S0)(c2);
cm1a = BEZIER(S0)(c1a);
cm0a = BEZIER(S0)(c0a);
cm0b = BEZIER(S0)(c0b);
cma0 = BEZIER(S0)(ca0);
cma1 = BEZIER(S0)(ca1);
cmb0 = BEZIER(S0)(cb0);

var out1 = MAP(BEZIER(S1)([cm2,cm1a]))(dom2D);
var out2 = MAP(BEZIER(S1)([cm1a,cm0a]))(dom2D);
var out3 = MAP(BEZIER(S1)([cm0a,cm0b]))(dom2D);
var out4 = MAP(BEZIER(S1)([cm2,cm0b]))(dom2D);
var out5 = MAP(BEZIER(S1)([cm1,cma1]))(dom2D);
var out6 = MAP(BEZIER(S1)([cma1,cma0]))(dom2D);
var out7 = MAP(BEZIER(S1)([cma0,cmb0]))(dom2D);
var out8 = MAP(BEZIER(S1)([cm1,cmb0]))(dom2D);

//lettino, parte inclinata
pb1 = [[0.3,0,0.2],[1.8,0,0],[3.3,0,0.2]];
pb10 = [[0.3,0,0],[1.8,0,0],[3.3,0,0]];
pb20 = [[0.3,0.15,0],[1.8,0.15,0],[3.3,0.15,0]];
p1 = [[0.3,0.15,0.2],[1.8,0.15,0],[3.3,0.15,0.2]];
p2 = [[0.3,3,0.2],[1.8,3,0],[3.3,3,0.2]];
pa1 = [[0.3,3.1,0.2],[1.8,3.1,0],[3.3,3.1,0.2]]
pa10 = [[0.3,3.1,0],[1.8,3.1,0],[3.3,3.1,0]]
pa20 = [[0.3,3,0],[1.8,3,0],[3.3,3,0]];

pl1 = CUBOID([0.3,3,0.2]);
pl2 = T([0])([3.3])(CUBOID([0.3,3,0.2]));

mpb1 = BEZIER(S0)(pb1);
mpb10 = BEZIER(S0)(pb10);
mpb20 = BEZIER(S0)(pb20);
mp1 = BEZIER(S0)(p1);
mp2 = BEZIER(S0)(p2);
mpa1 = BEZIER(S0)(pa1);
mpa10 = BEZIER(S0)(pa10);
mpa20 = BEZIER(S0)(pa20);

var out9 = MAP(BEZIER(S1)([mp1,mp2]))(dom2D);
var out10 = MAP(BEZIER(S1)([mp1,mpb1]))(dom2D);
var out11 = MAP(BEZIER(S1)([pb1,mpb10]))(dom2D);
var out12 = MAP(BEZIER(S1)([mpb10,mpb20]))(dom2D);
var out13 = MAP(BEZIER(S1)([mpb20,mp1]))(dom2D);
var out14 = MAP(BEZIER(S1)([mp2,mpa1]))(dom2D);
var out15 = MAP(BEZIER(S1)([mpa1,mpa10]))(dom2D);
var out16 = MAP(BEZIER(S1)([mpa10,mpa20]))(dom2D);
var out17 = MAP(BEZIER(S1)([mpa20,mp2]))(dom2D);

var poggia = COLOR(rgb01(140,102,53))(R([1,2])(-PI/6)(T([1,2])([-3,0.05])(STRUCT([out10,out11,out12,out13,out14,out15,out16,out17,pl1,pl2]))));

var out = MAP(BEZIER(S1)([cm1,cm2]))(dom2D);

//game del lettino
var gamba = T([1,2])([6.4,-0.8])(CUBOID([0.3,0.1,0.8]))
var gamba2 = T([0])([3.3])(gamba);
var gamba3 = T([0,1,2])([0.3,-0.35,-0.6])(R([1,2])(-(PI/5))(CUBOID([0.05,0.12,0.9])));
var gamba4 = T([0])([2.95])(gamba3);

var bordoLegno = COLOR(rgb01(140,102,53))(STRUCT([l1,l2,out1,out2,out3,out4,out5,out6,out7,out8,gamba,gamba2,gamba3,gamba4]))

var strutt = STRUCT([ R([1,2])(-PI/6)(T([1,2])([-3,0.05])(out9)), out, poggia, bordoLegno])

//ruote del lettino
var innerCircle=EXTRUDE([1])(pieceOfCircle(2*PI, 1, 1.3))
var radius=T([0,2])([1.2,0.5])(R([0,2])(PI/2)(CYL_SURFACE([0.1,3])(36)))
var rays = STRUCT(REPLICA(16)([radius,R([0,1])(PI/8)]));
var externCircle=EXTRUDE([1])(pieceOfCircle(2*PI, 4, 4.3))
var tire=COLOR([0,0,0,1])(T([2])([0.5])(MAP(torus(6.5,2.2))(dominioQuad(2*PI, 64))))
var mast = COLOR(rgb01(92,64,51))(T([2])([0])(CYL_SURFACE([1,50])(36)))
var wheel=STRUCT([COLOR(rgb01(92,64,51))(innerCircle),COLOR([0.45,0.43,0.44,1])(rays),COLOR(rgb01(92,64,51))(externCircle),tire])
var ruota = STRUCT([wheel, mast, T([2])([49])(wheel)]);
var ruote = (T([1,2])([-0.3,-0.65])(S([0,1,2])([0.07,0.07,0.07])(R([0,1])(PI/2)(R([1,2])([PI/2])(ruota)))));
var lettino = STRUCT([strutt, ruote])
var let = T([0,1,2])([9.3,9.5,6.19])(S([0,1,2])([0.1,0.1,0.1])(lettino))

var mod = T([2])([0.3])(STRUCT([separe, fronte, retro, portante, muriPool, murProt, pool, base, scala]));

var model = STRUCT([mod, T([0,1])([15,-3.6])(R([0,1])(PI/3)(let)),let])

DRAW(model);