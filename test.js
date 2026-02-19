function Calc(arr){
    numPositif = 0
    for (i=0 ; i<arr.lenght; i++){
        
        if(arr[i] >= 0){
            numPositif ++
        }
    }
    return numPositif;

}

let tab=[1 ,2 ,3 ,-4];
console.log(tab[2]);
 Calc(tab);