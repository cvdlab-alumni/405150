from pyplasm import *
import sys
sys.path.append("/Users/skad/Desktop/larpy")
from lar import *

#### VEDERE DA RIGA 272 PER L'ESERCIZIO 5 ####

def DOM2(args):
  model = ([[]],[[0]])
  for k,steps in enumerate(args):
    model = larExtrude(model,steps*[1])
  V,cells = model
  verts = AA(list)(scipy.array(V)/AA(float)(args))
  return MKPOL([verts,AA(AA(lambda h:h+1))(cells),None])

def bezierCilinder(x,r):
  domain1 = INTERVALS(1)(24)
  domain2 = DOM2([25,25])
  t1 = [2 * r, 0, 0]
  t2 = [-2 * r, 0, 0]

  p0 = [
    [0, 0, 0],
    [0, 0, r], t1, t2]
  p1 = [
    [0, x, 0],
    [0, x, r], t1, t2]
  p2 = [
    [0, 0, 0],
    [0, 0, r], t2, t1]
  p3 = [
    [0, x, 0],
    [0, x, r], t2, t1]

  c0 = CUBICHERMITE(S1)(p0)
  c1 = CUBICHERMITE(S1)(p1)
  surf1 = BEZIER(S2)([c1, c0])

  c2 = CUBICHERMITE(S1)(p2)
  c3 = CUBICHERMITE(S1)(p3)
  surf2 = BEZIER(S2)([c2, c3])
  surf3 = BEZIER(S2)([c3,c1])
  surf4 = BEZIER(S2)([c0,c2])
  return STRUCT([MAP(surf1)(domain2), MAP(surf2)(domain2),MAP(surf3)(domain2),MAP(surf4)(domain2)])

dom1D = INTERVALS(1)(24)
dom2D = DOM2([25,25])

##volante

st1 = [[1.5,0,0.0],[1.5,1,0.5],[1.5,3,0.5],[1.5,4,0]]
st1a = [[1.5,0,0.0],[1.5,1,-0.5],[1.5,3,-0.5],[1.5,4,0]]

st2 = [[1.5,0,0.0],[1.8,1,0],[1.8,3,0],[1.5,4,0]]
st3 = [[-1,0,0.0],[-1,1,0.5],[-1,3,0.5],[-1,4,0]]
st3a = [[-1,0,0.0],[-1,1,-0.5],[-1,3,-0.5],[-1,4,0]]

st1b = [[0,1,0.0],[0,1,0.5],[0,3,0.5],[0,3,0]]
st1c = [[0,1,0.0],[0,1,-0.5],[0,3,-0.5],[0,3,0]]

stl1 = [[1.5,0,0],[1,-1.5,-0.5],[-0.5,-1.5,-0.5],[-1,0,0.0]]
stl2 = [[1.5,0,0],[1,-1.5,0.5],[-0.5,-1.5,0.5],[-1,0,0.0]]
stl3 = [[1.5,0,0],[1,-0.2,0.3],[-0.5,-0.2,0.3],[-1,0,0.0]]
stl3b = [[1.5,0,0],[1,-0.2,-0.3],[-0.5,-0.2,-0.3],[-1,0,0.0]]

stl4 = [[-0.3,0,0],[-0.2,-0.1,0.1],[-0.1,-0.2,0.1],[0,0,0]]
stl4a = [[-0.3,0,0],[-0.2,-0.1,-0.1],[-0.1,-0.2,-0.1],[0,0,0]]

stl5 = [[-0.3,0.8,0],[-0.2,0.9,0.1],[-0.1,0.9,0.1],[0,0.8,0]]
stl5a = [[-0.3,0.8,0],[-0.2,0.9,-0.1],[-0.1,0.9,-0.1],[0,0.8,0]]

str1 = [[1.5,4,0],[1,5.5,-0.5],[-0.5,5.5,-0.5],[-1,4,0]]
str2 = [[1.5,4,0],[1,5.5,0.5],[-0.5,5.5,0.5],[-1,4,0]]
str3 = [[1.5,4,0],[1,4.2,0.3],[-0.5,4.2,0.3],[-1,4,0.0]]
str3b = [[1.5,4,0],[1,4.2,-0.3],[-0.5,4.2,-0.3],[-1,4,0.0]]

up = COLOR([0.45,0.43,0.44,1])(MAP(BEZIER(S2)([BEZIER(S1)(st1),BEZIER(S1)(st1b),BEZIER(S1)(st3)]))(dom2D))
down =  COLOR([0.45,0.43,0.44,1])(MAP(BEZIER(S2)([BEZIER(S1)(st3a),BEZIER(S1)(st1c),BEZIER(S1)(st1a)]))(dom2D))
top1 = COLOR([0,0,0,1])(MAP(BEZIER(S2)([BEZIER(S1)(st2),BEZIER(S1)(st1)]))(dom2D))
top2 = COLOR([0,0,0,1])(MAP(BEZIER(S2)([BEZIER(S1)(st1a),BEZIER(S1)(st2)]))(dom2D))
bottom = COLOR([0,0,0,1])(MAP(BEZIER(S2)([BEZIER(S1)(st3),BEZIER(S1)(st3a)]))(dom2D))
left1 = COLOR([0.45,0.43,0.44,1])(MAP(BEZIER(S2)([BEZIER(S1)(stl1),BEZIER(S1)(stl3b)]))(dom2D))
left2 = COLOR([0.45,0.43,0.44,1])(MAP(BEZIER(S2)([BEZIER(S1)(stl3),BEZIER(S1)(stl2)]))(dom2D))
left3 = COLOR([0,0,0,1])(MAP(BEZIER(S2)([BEZIER(S1)(stl2),BEZIER(S1)(stl1)]))(dom2D))
left4 = MAP(BEZIER(S2)([BEZIER(S1)(stl4),BEZIER(S1)(stl5)]))(dom2D)
left5 = MAP(BEZIER(S2)([BEZIER(S1)(stl5a),BEZIER(S1)(stl4a)]))(dom2D)
left6 = MAP(BEZIER(S2)([BEZIER(S1)(stl4a),BEZIER(S1)(stl4)]))(dom2D)
left7 = MAP(BEZIER(S2)([BEZIER(S1)(stl5),BEZIER(S1)(stl5a)]))(dom2D)
left8 = COLOR([0,0,0,1])(MAP(BEZIER(S2)([BEZIER(S1)(stl3b),BEZIER(S1)(stl3)]))(dom2D))
right1 = COLOR([0.45,0.43,0.44,1])(MAP(BEZIER(S2)([BEZIER(S1)(str3b),BEZIER(S1)(str1)]))(dom2D))
right2 = COLOR([0.45,0.43,0.44,1])(MAP(BEZIER(S2)([BEZIER(S1)(str2),BEZIER(S1)(str3)]))(dom2D))
right3 = COLOR([0,0,0,1])(MAP(BEZIER(S2)([BEZIER(S1)(str1),BEZIER(S1)(str2)]))(dom2D))
right4 = COLOR([0,0,0,1])(MAP(BEZIER(S2)([BEZIER(S1)(str3),BEZIER(S1)(str3b)]))(dom2D))


manopola = COLOR(RED)(STRUCT([left4, left5, left6,left7]))
bottone = (R([2,3])(PI/2)(bezierCilinder(0.1,0.25)))
steeringWheel = S([1,2,3])([0.2,0.2,0.2])(R([1,3])(1)(R([1,2])(PI)(STRUCT([T([1,2,3])([0,3,0.3])(COLOR([0,0,1,1])(bottone)), T([1,2,3])([0,1,0.3])(COLOR([0,0,1,1])(bottone)), T([1,2,3])([0,3.2,-0.1])(R([2,3])(-PI/8)(manopola)),down,up,top1,top2,bottom, T([1,2,3])([-0,-0,-0.4])(R([2,3])(PI/8)(manopola)), left1, left2, left3, left8, right1,right2,right3, right4]))))
steeringMast = COLOR([0,0,0,1])(T([1,2,3])([12,-1.5,1.75])(R([1,3])(4.5)(CYLINDER([0.1,5])(36))))

### SEGUE ESERCIZIO 3 ###

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
sp3 = [[0.5,3,2],[1,3,1.2],[1.5,3,1.1]]
sp4 = [[0.5,2,2],[1,2,1.2],[1.5,2,1.1]]

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
#sx
pl1 = [[0.0,0,0.5],[4,0,2],[6,0,2.5],[8,0,2]]
pl2 = [[8,0,2],[7.5,0,1.7],[7,0,1.4],[8.5,0,0.5]]
pl3 = [[0.0,0,0.5],[4,0,0.5],[8.5,0,0.5],[8.5,0,0.5]]
pl3b = [[8,0,2],[7,0,1.5],[6.5,0,1],[6,0,0.5]]
pl3c = [[0.0,0,0.5],[2,0,0.5],[5,0,0.5],[6,0,0.5]]
#dx
pl1a = [[0.0,-3,0.5],[4,-3,2],[6,-3,2.5],[8,-3,2]]
pl2a = [[8,-3,2],[7.5,-3,1.7],[7,-3,1.4],[8.5,-3,0.5]]
pl3a = [[0.0,-3,0.5],[4,-3,0.5],[8.5,-3,0.5],[8.5,-3,0.5]]
pl3d = [[8,-3,2],[7,-3,1.5],[6.5,-3,1],[6,-3,0.5]]
pl3e = [[0.0,-3,0.5],[2,-3,0.5],[5,-3,0.5],[6,-3,0.5]]

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

#### SUPERFICI #####

##superficie alettone anteriore
ab1 = MAP(BEZIER(S2)([BEZIER(S1)(curve18),BEZIER(S1)(curve17)]))(dom2D)
ab2 = MAP(BEZIER(S2)([BEZIER(S1)(sp1),BEZIER(S1)(sp2)]))(dom2D)
ab2a = MAP(BEZIER(S2)([BEZIER(S1)(sp4),BEZIER(S1)(sp3)]))(dom2D)
ab2b = MAP(BEZIER(S2)([BEZIER(S1)(sp3),BEZIER(S1)(sp1)]))(dom2D)
ab2c = MAP(BEZIER(S2)([BEZIER(S1)(sp2),BEZIER(S1)(sp4)]))(dom2D)
ab3 = MAP(BEZIER(S2)([BEZIER(S1)(vert1),BEZIER(S1)(vert3)]))(dom2D)
ab4 = MAP(BEZIER(S2)([BEZIER(S1)(vert2),BEZIER(S1)(vert4)]))(dom2D)
ab5 = MAP(BEZIER(S2)([BEZIER(S1)(rect15v1),BEZIER(S1)(rect15v2)]))(dom2D)

bSpoilerSurface = COLOR([0.95,0.105,0.105,1])(T([3])(-0.1)(STRUCT([T([1,3])([-1.5,1.5])(ab1),T([1,2,3])([-1.5,-4,1])(ab2),T([1,2,3])([-1.5,-4,1])(ab2a),T([1,2,3])([-1.5,-4,1])(ab2b),T([1,2,3])([-1.5,-4,1])(ab2c),T([1,3])([-1.5,1.5])(ab3),T([1,3])([-1.5,1.5])(ab4),T([1,3])([-1.5,1.5])(ab5)])))

##superficie alettone anteriore
al1 = MAP(BEZIER(S2)([BEZIER(S1)(rect13),BEZIER(S1)(curve16)]))(dom2D)
al2 = MAP(BEZIER(S2)([BEZIER(S1)(curve16a),BEZIER(S1)(rect13a)]))(dom2D)
al3 = MAP(BEZIER(S2)([BEZIER(S1)(rect13a),BEZIER(S1)(rect13)]))(dom2D)
al4 = MAP(BEZIER(S2)([BEZIER(S1)(rect14),BEZIER(S1)(rect14a)]))(dom2D)
al5 = MAP(BEZIER(S2)([BEZIER(S1)(rect12a),BEZIER(S1)(rect12)]))(dom2D)
al6 = MAP(BEZIER(S2)([BEZIER(S1)(curve16),BEZIER(S1)(curve16a)]))(dom2D)

fSpoilerSurface = COLOR([0.95,0.105,0.105,1])(STRUCT([al1,al2,al3,al4,al5,al6]))

## superficie centrale rialzata dietro il pilota

hc1 = MAP(BEZIER(S2)([BEZIER(S1)(pl1a),BEZIER(S1)(pl1)]))(dom2D)
hc2 = MAP(BEZIER(S2)([BEZIER(S1)(pl2a),BEZIER(S1)(pl2)]))(dom2D)
hc3 = MAP(BEZIER(S2)([BEZIER(S1)(pl3),BEZIER(S1)(pl3a)]))(dom2D)
hc4 = MAP(BEZIER(S2)([BEZIER(S1)(pl1),BEZIER(S1)(pl3c)]))(dom2D)
hc5 = MAP(BEZIER(S2)([BEZIER(S1)(pl2),BEZIER(S1)(pl3b)]))(dom2D)
hc6 = MAP(BEZIER(S2)([BEZIER(S1)(pl3e),BEZIER(S1)(pl1a)]))(dom2D)
hc7 = MAP(BEZIER(S2)([BEZIER(S1)(pl3d),BEZIER(S1)(pl2a)]))(dom2D)

highClosureSurface = COLOR([0.95,0.105,0.105,1])(T([3])([1.5])(STRUCT([hc1,hc2,hc3,hc4,hc5,hc6,hc7])))

## profili 
vertProf = STRUCT([vertProf1,vertProf2,vertProf3,vertProf4,vertProf5,vertProf6])
pilotSiegeUp = STRUCT([c23,c24,c25,c26,c27])
pilotSiegeDown = STRUCT([c28,c29,c30,c31,c32])
profileDown = STRUCT([c1,c2,c3,c4,c5,c6])
profileUp = STRUCT([c7,c8,c9,c10,c11,c12])

VIEW(STRUCT([highClosureSurface, vertProf, T([1,2,3])([12,-1.1,1.75])(steeringWheel), steeringMast, forwardWheels, T([1,2])([-18,0.5])(S([1,2,3])([1.25,1.25,1.25])(forwardWheels)), T([1,2])([10,-0.5])(pilotSiegeUp), T([1,2])([10,-0.5])(pilotSiegeDown), profileDown, profileUp, bSpoilerSurface,T([1,2,3])([20,1.5,0.5])(fSpoilerSurface)]))
