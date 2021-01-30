// binary - decimal conversion

//binary -> decimal

// 1     0    1    0
// 2^3  2^2  2^1   2^0

//    1*2^3 + 0 + 1*2^1 + 0
//    8 + 0 + 2 + 0 = 10

// 1     0     0
// 2^2  2^1   2^0
// 1*4 + 0 + 0 = 4


// 1      1      0       1      0
// 2^4   2^3    2^2    2^1      2^0

// 16 + 8 + 0 + 2 + 0 = 26

// 26 yes

// decimal -> binary

//5 - 4 = 1 - 1 = 0

//  0    1   0     1
// 2^3  2^2  2^1   2^0
// 8    4    2      1



// 24 - 16 = 8 - 8 = 0
// 00011000


//  0     1    1   0     0    0
// 2^5  2^4  2^3  2^2  2^1   2^0
// 32   16   8    4    2      1



//29 - 16 = 13 - 8 = 5 - 4 = 1
// 00011101

// 0    0    0    1    1    1    0     1
// 2^7  2^6  2^5  2^4  2^3  2^2  2^1   2^0
// 128  64    32   16   8    4    2     1



// hexidecimal
// 6   10

// decimal       hexidecimal
//    0              0
//    1              1
//    2              2
//    3              3
//    4              4
//    5              5
//    6              6
//    7              7
//    8              8
//    9              9
//    10             A
//    11             B
//    12             C
//    13             D
//    14             E
//    15             F


// hexidecimal -> decimal

// 3     4     E
// 16^2 16^1 16^0

// 3*16^2 + 4*16 + 14*1
// 3*256 + 64 + 14 = 846
