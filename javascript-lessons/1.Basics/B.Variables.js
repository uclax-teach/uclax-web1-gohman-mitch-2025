/*===================================
||
|| Variables
||
===================================*/
console.group("Variables");

/*
    A variable is a reference to a value so it can be used over and over,
    or referenced later on
*/

// Let can be changed
let favColor = "Blue";
console.log(favColor);
favColor = "Red";
console.log(favColor);

// Const cannot be changed
const firstName = "Mitch";
console.log(firstName);
// firstName = "David";
// console.log(firstName);

console.groupEnd();
