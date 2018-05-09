function createVal(){
    console.log(`Called createVal`);
    return Math.random();
};

fun = (function fun( val =  createVal()){
    // Do something with val...
    function c() {
        return createVal();
    }
    return c;
})();

//fun();
fun(5);