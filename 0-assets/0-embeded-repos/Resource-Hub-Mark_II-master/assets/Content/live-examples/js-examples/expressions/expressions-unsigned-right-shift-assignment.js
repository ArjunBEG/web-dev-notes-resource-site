let a = 5; //  00000000000000000000000000000101

a >>>= 2;  //  00000000000000000000000000000001
console.log(a);
// expected output: 1

let b = -5; // -00000000000000000000000000000101

b >>>= 2;   //  00111111111111111111111111111110
console.log(b);
// expected output: 1073741822
