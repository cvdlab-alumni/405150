function lar( model ) {
        var vertices = [];
        var faces = [];
        var num = 0;
        for ( var j = 0; j < model.vertices.length; j++ ) {
                vertices.push( model.vertices[j] );
        };
        for ( var i = 0; i < model.faces.length; i++ ) {
                faces.push( model.faces[i].map( function (x) {
                            return num + x;
                         } ) );
                };
                num = num + model.vertices.length;
        return [ vertices, faces ];
};
 
function obj( lar ) {
        var out = "";
        var vertices = lar[0];
        var faces = lar[1];
        var i, j;
        for ( i = 0; i < vertices.length; i++ ) {
                out = out + "v " + vertices[i][0] + " " + vertices[i][1] + " " + vertices[i][2] + "\n";
        };
        for ( i = 0; i < faces.length; i++ ) {
                out = out + "f ";
                for ( j = 0; j < faces[i].length; j++ ) {
                        out = out + faces[i][j] + " ";
                };
                out = out + "\n";
        };
        return out;
};

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

var mountain = {};
mountain.vertices = makeVertexes(20,20,5);
mountain.faces = makeCells(mountain.vertices,20);

console.log( obj( lar( mountain ) ) );