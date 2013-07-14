function rgb01(r, g, b){
var r0 = r/255.0;
var g0 = g/255.0;
var b0 = b/255.0;
return [r0, g0, b0];
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
DRAW(lettino);