var res = '\n';
var row = 10;
var col = 10;

for (var i=1; i<=row; i++){
	for (var j=1; j<=col; j++){
		if (j==col) {
			res +=i*j + '\t'; 
		}
		else{
			res +=i*j +',' + '\t'; 
		}
	}
	res += '\n';
}

console.log(res);