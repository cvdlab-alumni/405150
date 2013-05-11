from pyplasm import *

dom1D = INTERVALS(1)(24)

def dominioQuad(l, p):
    semiDominio= INTERVALS(l)(p)
    return PROD([semiDominio,semiDominio]);

def pieceOfCircle(alpha, r , R):
    dom= PROD([INTERVALS(alpha)(64), T(1)(r)(INTERVALS(R-r)(1))])
    def mapping(v):
            a=v[0]
            r=v[1]
            return [r*COS(a), r*SIN(a)]
    model=MAP(mapping)(dom)
    return model

def torus(R, r):
          def torus(v):
              a = v[0]
              b = v[1]
  
              u = (r * COS(a) + R) * COS(b)
              v = (r * COS(a) + R) * SIN(b)
              w = (r * SIN(a))
              return [u,v,w]
          return torus

innerCircle1=pieceOfCircle(2*PI, 1, 1.3)
innerCircle=PROD([innerCircle1, Q(1)])

baseRadius=R([1,3])(PI/2)(CYLINDER([0.1,3])(36))
radiusP=T(3)(0.5)(baseRadius)
radius=T(1)(-1.2)(radiusP)
rays=STRUCT([radius,R([1,2])(PI/8),radius,R([1,2])(PI/8),radius,R([1,2])(PI/8),
              radius,R([1,2])(PI/8),radius,R([1,2])(PI/8),radius,R([1,2])(PI/8),radius,
              R([1,2])(PI/8),radius,R([1,2])(PI/8),radius,R([1,2])(PI/8),radius,R([1,2])(PI/8),radius,
              R([1,2])(PI/8),radius,R([1,2])(PI/8),radius,R([1,2])(PI/8),radius,R([1,2])(PI/8),radius,R([1,2])(PI/8),radius])
externCircle1=pieceOfCircle(2*PI, 4, 4.3)
externCircle=PROD([externCircle1, Q(1)])

tire=COLOR(BLACK)(T(3)(0.5)(MAP(torus(6.5,2.2))(dominioQuad(2*PI, 64))))
mast = COLOR([0,0,0,1])(T([3])([0])(CYLINDER([1,30])(36)))
wheel=STRUCT([COLOR([0.95,0.105,0.105,1])(innerCircle),COLOR([0.45,0.43,0.44,1])(rays),COLOR([0.95,0.105,0.105,1])(externCircle),tire])

wheel = S([1,2,3])([0.2,0.2,0.2])(R([2,3])(PI/2)(wheel))
mast = COLOR([0,0,0,1])(R([2,3])(PI/2)(CYLINDER([0.2,7.2])(36)))
forwardWheels = STRUCT([T([1,2,3])([17,2,0.75])(mast), T([1,2,3])([17,-5,0.75])(wheel), T([1,2,3])([17,2,0.75])(wheel)])


######### SEGUE ES. 1 - PROFILO MACCHINA ############
##profile DOWN
rect11 = [[0,0,0],[0,-1.5,0],[0,-3,0]]
curve11 = [[0,0,0],[8,0,0],[6,3,0],[12,3,0]]
curve12 = [[0,-3,0],[8,-3,0],[6,-6,0],[12,-6,0]]
curve13 = [[12,3,0],[12,0.2,0],[15,0.1,0],[20,0,0]]
curve14 = [[12,-6,0],[12,-3.2,0],[15,-3.1,0],[20,-3,0]]
curve15 = [[20,0,0],[24,-1,0],[24,-2,0],[20,-3,0]]

##profile UP
rect21 = [[0,0,2],[0,-1.5,2],[0,-3,2]]
curve21 = [[0,0,2],[8,0,2],[6,3,2],[12,3,2]]
curve22 = [[0,-3,2],[8,-3,2],[6,-6,2],[12,-6,2]]
curve23 = [[12,3,2],[12,0.2,2],[15,0.1,1.5],[20,0,1]]
curve24 = [[12,-6,2],[12,-3.2,2],[15,-3.1,1.5],[20,-3,1]]
curve25 = [[20,0,1],[24,-1,1],[24,-2,1],[20,-3,1]]

## linee verticale di chiusura fra i piani
v1 = [[0,0,0],[0,0,1],[0,0,2]]
v2 = [[0,-3,0],[0,-3,1],[0,-3,2]]
v3 = [[12,3,0],[12,3,1],[12,3,2]]
v4 = [[12,-6,0],[12,-6,1],[12,-6,2]]
v5 = [[20,0,0],[20,0,0.5],[20,0,1]]
v6 = [[20,-3,0],[20,-3,0.5],[20,-3,1]]

vertProf1 = MAP(BEZIER(S1)(v1))(dom1D)
vertProf2 = MAP(BEZIER(S1)(v2))(dom1D)
vertProf3 = MAP(BEZIER(S1)(v3))(dom1D)
vertProf4 = MAP(BEZIER(S1)(v4))(dom1D)
vertProf5 = MAP(BEZIER(S1)(v5))(dom1D)
vertProf6 = MAP(BEZIER(S1)(v6))(dom1D)

vertProf = STRUCT([vertProf1,vertProf2,vertProf3,vertProf4,vertProf5,vertProf6])

c1 = MAP(BEZIER(S1)(rect11))(dom1D)
c2 = MAP(BEZIER(S1)(curve11))(dom1D)
c3 = MAP(BEZIER(S1)(curve12))(dom1D)
c4 = MAP(BEZIER(S1)(curve13))(dom1D)
c5 = MAP(BEZIER(S1)(curve14))(dom1D)
c6 = MAP(BEZIER(S1)(curve15))(dom1D)

c7 = MAP(BEZIER(S1)(rect21))(dom1D)
c8 = MAP(BEZIER(S1)(curve21))(dom1D)
c9 = MAP(BEZIER(S1)(curve22))(dom1D)
c10 = MAP(BEZIER(S1)(curve23))(dom1D)
c11 = MAP(BEZIER(S1)(curve24))(dom1D)
c12 = MAP(BEZIER(S1)(curve25))(dom1D)

##alettone anteriore
#profile DOWN
rect12 = [[0,0,0],[1,0,0],[2,0,0]] 
rect13 = [[2,0,0],[3,-3,0],[2,-6,0]]
rect14 = [[0,-6,0],[1,-6,0],[2,-6,0]] 
curve16 = [[0,0,0],[1.5,-3,0],[0,-6,0]]
#profile UP
rect12a = [[0,0,0.3],[1,0,0.3],[2,0,0.2]] 
rect13a = [[2,0,0.3],[3,-3,0.3],[2,-6,0.2]]
rect14a = [[0,-6,0.3],[1,-6,0.3],[2,-6,0.2]] 
curve16a = [[0,0,0.3],[1.5,-3,0.3],[0,-6,0.2]]

c13 = MAP(BEZIER(S1)(rect12))(dom1D)
c14 = MAP(BEZIER(S1)(rect13))(dom1D)
c15 = MAP(BEZIER(S1)(rect14))(dom1D)
c16 = MAP(BEZIER(S1)(curve16))(dom1D)
c13a = MAP(BEZIER(S1)(rect12a))(dom1D)
c14a = MAP(BEZIER(S1)(rect13a))(dom1D)
c15a = MAP(BEZIER(S1)(rect14a))(dom1D)
c16a = MAP(BEZIER(S1)(curve16a))(dom1D)

#alettone posteriore
rect15 = [[0,0,1.5],[0.5,0,1.5],[1,0,1.5]]
rect15v1 = [[0,0,1.5],[0,-1.5,1.5],[0,-3,1.5]]
rect15v2 = [[1,0,1.5],[1,-1.5,1.5],[1,-3,1.5]]
rect15v3 = [[0,0,2.5],[0,-1.5,2.5],[0,-3,2.5]]
rect16 = [[0,0,2.5],[0.5,0,2.5],[1,0,2.5]]
rect17 = [[0,-3,1.5],[0.5,-3,1.5],[1,-3,1.5]]
rect18 = [[0,-3,2.5],[0.5,-3,2.5],[1,-3,2.5]]
curve17 =[[0,0,2.5],[0.5,0,2.2],[1,0,2]]
curve18 =[[0,-3,2.5],[0.5,-3,2.2],[1,-3,2]]
oriz1 = [[1,0,2],[1,-1.5,2],[1,-3,2]]
vert1 = [[0,0,1.5],[0,0,2],[0,0,2.5]]
vert2 = [[0,-3,1.5],[0,-3,2],[0,-3,2.5]]
vert3 = [[1,0,1.5],[1,0,2],[1,0,2.5]]
vert4 = [[1,-3,1.5],[1,-3,2],[1,-3,2.5]]

##supporto alettone posteriore
sp1 = [[0.5,3,2],[1,3,1.1],[1.5,3,1]]
sp2 = [[0.5,2,2],[1,2,1.1],[1.5,2,1]]
spSupport1 = MAP(BEZIER(S1)(sp1))(dom1D)
spSupport2 = MAP(BEZIER(S1)(sp2))(dom1D)

cvert1 = MAP(BEZIER(S1)(vert1))(dom1D)
cvert2 = MAP(BEZIER(S1)(vert2))(dom1D)
cvert3 = MAP(BEZIER(S1)(vert3))(dom1D)
cvert4 = MAP(BEZIER(S1)(vert4))(dom1D)
coriz1 = MAP(BEZIER(S1)(oriz1))(dom1D)

c17=MAP(BEZIER(S1)(rect15))(dom1D)
c18=MAP(BEZIER(S1)(rect16))(dom1D)
c19=MAP(BEZIER(S1)(rect17))(dom1D)
c20=MAP(BEZIER(S1)(rect18))(dom1D)
c21=MAP(BEZIER(S1)(curve17))(dom1D)
c22=MAP(BEZIER(S1)(curve18))(dom1D)
c19a=MAP(BEZIER(S1)(rect15v1))(dom1D)
c20a=MAP(BEZIER(S1)(rect15v2))(dom1D)
c21a=MAP(BEZIER(S1)(rect15v3))(dom1D)

#pozzetto Pilota
#profile UP
rect00 = [[-1,0,2],[0.5,0,2],[1,0,2]]
rect01 = [[-1,-2,2],[0.5,-2,2],[1,-2,2]]
rect02 = [[-1,0,2],[-1,-1,2],[-1,-2,2]]
curve00 = [[1,0,2],[1.6,0.8,2],[2.8,0,2],[2.8,-1,2]]
curve01 = [[1,-2,2],[1.6,-2.8,2],[2.8,-2,2],[2.8,-1,2]]
#profile DOWN
rect00a = [[-1,0,0.2],[0.5,0,0.2],[1,0,0.2]]
rect01a = [[-1,-2,0.2],[0.5,-2,0.2],[1,-2,0.2]]
rect02a = [[-1,0,0.2],[-1,-1,0.2],[-1,-2,0.2]]
curve00a = [[1,0,0.2],[1.6,0.8,0.2],[2.8,0,0.2],[2.8,-1,0.2]]
curve01a = [[1,-2,0.2],[1.6,-2.8,0.2],[2.8,-2,0.2],[2.8,-1,0.2]]

c23=MAP(BEZIER(S1)(rect00))(dom1D)
c24=MAP(BEZIER(S1)(rect01))(dom1D)
c25=MAP(BEZIER(S1)(rect02))(dom1D)
c26=MAP(BEZIER(S1)(curve00))(dom1D)
c27=MAP(BEZIER(S1)(curve01))(dom1D)

c28=MAP(BEZIER(S1)(rect00a))(dom1D)
c29=MAP(BEZIER(S1)(rect01a))(dom1D)
c30=MAP(BEZIER(S1)(rect02a))(dom1D)
c31=MAP(BEZIER(S1)(curve00a))(dom1D)
c32=MAP(BEZIER(S1)(curve01a))(dom1D)

##curva in alto dietro al pozzetto pilota
pl1 = [[0.0,0,0.5],[4,0,2],[6,0,2.5],[8,0,2]]
pl2 = [[8,0,2],[7.5,0,1.7],[7,0,1.4],[8.5,0,0.5]]
pl3 = [[0.0,0,0.5],[4,0,0.5],[8.5,0,0.5],[8.5,0,0.5]]
mappingpl1 = MAP(BEZIER(S1)(pl1))(dom1D)
mappingpl2 = MAP(BEZIER(S1)(pl2))(dom1D)
mappingpl3 = MAP(BEZIER(S1)(pl3))(dom1D)

highClosure = T([3])([1.5])(STRUCT([mappingpl1,mappingpl2,mappingpl3]))
spoilerSupport = STRUCT([spSupport1,spSupport2])
pilotSiegeUp = STRUCT([c23,c24,c25,c26,c27])
pilotSiegeDown = STRUCT([c28,c29,c30,c31,c32])
back_spoiler = STRUCT([c17,c18,c19,c20,c21,c22,c19a,c20a,c21a,cvert1,cvert2,cvert3,cvert4,coriz1])
front_spoiler = STRUCT([c13,c14,c15,c16,c13a,c14a,c15a,c16a])
profileDown = STRUCT([c1,c2,c3,c4,c5,c6])
profileUp = STRUCT([c7,c8,c9,c10,c11,c12])

VIEW(STRUCT([T([1,2,3])([-1.5,-4,1])(spoilerSupport), highClosure, vertProf, T([2])([-3])(highClosure), forwardWheels, T([1,2])([-18,0.5])(S([1,2,3])([1.25,1.25,1.25])(forwardWheels)), T([1,2])([10,-0.5])(pilotSiegeUp), T([1,2])([10,-0.5])(pilotSiegeDown), profileDown, profileUp, T([1,3])([-1.5,1.5])(back_spoiler), T([1,2,3])([20,1.5,0.5])(front_spoiler)]))