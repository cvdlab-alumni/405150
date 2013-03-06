var res = '\n';
var row = 10;
var col = 10;

for (var i = 0; i <=row; i++) {
	for (var j = 0; j <= col; j++) {
		if (i==j){
			if(j===col) {
				res += 1 ; 
    		}
    		else {
    			res+='1, ';
    		}
    	}
   		else {
    		if(j===col){
    			res += 0; 
    		}
    		else { 
    			res+='0, ';
    		}
  		}
	}
 	res += '\n';
}

console.log(res);