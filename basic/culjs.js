var lastclick = 0;
var operations_p = [];
var operation;
var minus =0;
var point = 0;
var numbers = [];
var smallOperations = [[],[]];
var historyList = [];
var equal = 0;
var historyvar = 0;
function numclick(a){
    if(equal == 1){
        ac()
        equal = 0
    }
    if(point == 1){
        operations_p[operations_p.length-1] = operations_p[operations_p.length-1] + a
        point = 0
        if(lastclick == 0){
            operations_p.push('0.' + a)
        }
        document.getElementById('operations').innerHTML = operations_p.join(' ')
    }
    else{
        if(operations_p.length - 1 >= 0){
            if(lastclick == 1){
                var z;
                z = operations_p[operations_p.length-1];
                z = z + a;
                operations_p[operations_p.length-1] = z;
            }
            else{
                operations_p.push(a);
            }
        }
        else{
            operations_p.push(a);
            z = operations_p[operations_p.length-1];
        }
        if(minus == 1){
            operations_p[operations_p.length-1] = '-' + operations_p[operations_p.length-1]
            minus = 0;
        }
    }
    document.getElementById('operations').innerHTML = operations_p.join(' ')
    lastclick = 1;
}
function operationFirst(){
    for(i=0; i<operations_p.length; i++){
        if(operations_p[i] == "/" || operations_p[i] == "×" || operations_p[i] == "+" || operations_p[i] == "-"){
            for(q=0; q<smallOperations.length; q++){
                if(smallOperations[q] == ""){
                    if(i == 1){
                        smallOperations[q].push(operations_p[i-1])
                        smallOperations[q].push(operations_p[i])
                        smallOperations[q].push(operations_p[i+1])
                        break;
                    }
                    else{
                        smallOperations[q].push(operations_p[i])
                        smallOperations[q].push(operations_p[i+1])
                        break;
                    }
                }
                else{
                    smallOperations.push([])
                    Math
                }
            }
        }
    }
    sendOperationFun();
    equal = 1;
}
function sendOperationFun(){
    for(i=0; i<smallOperations.length; i++){
        var index = smallOperations[i];
        if(i==0){
            if(index[1] == "+"){
                sumFun(index , i)
            }
            else if(index[1] == "-"){
                subFun(index , i)
            }
            else if(index[1] == "×"){
                mpFun(index , i)
            }
            else if(index[1] == "/"){
                divFun(index , i)
            }
        }
        else{
            if(index[0] == "/" || index[0] == "×"){
                if(index[0] == "/"){
                    divFun(index , i)
                }
                else{
                    mpFun(index , i)
                }
            }
            else if(index[0] == "+" || index[0] == "-"){
                if(index[0] == "+"){
                    sumFun(index , i)
                }
                else{
                    subFun(index , i)
                }
            }
        }
    }
    var p = [operations_p.join(" ") , smallOperations.join(' ')]
    historyList.push(p.join(" = "));
}
function operclick(q){
    if(equal == 1){
        operations_p = []
        operations_p.push(smallOperations[0])
        operations_p.push(q)
        equal = 0
        smallOperations.shift()
    }
    else if(lastclick != 0){
        operations_p.push(q)
    }
    lastclick = 0
    document.getElementById('operations').innerHTML = operations_p.join(' ')
}
function extraclick(w){
    if(w=='%'){
        operations_p[operations_p.length-1]=operations_p[operations_p.length-1]/100
    }
    else if(w=='+/-'){
        if(minus == 0){
            if(lastclick != 0){
                operations_p[operations_p.length-1]= '-' + operations_p[operations_p.length-1]
            }
            else{
                minus =1;
            }
        }
    }
    else if(w == '.'){
        if(point == 0){
            if(lastclick == 0){
                point = 1
            }
            else if(lastclick == 1){
                operations_p[operations_p.length-1] = operations_p[operations_p.length-1] + '.'
                point = 1
            }
        }
    }
    document.getElementById('operations').innerHTML = operations_p.join(' ');    
}
function ac(){
    lastclick = 0;
    operations_p=[]
    operation;
    minus =0;
    point = 0;
    numbers = [];
    document.getElementById('operations_rasult').innerHTML = "0"
    document.getElementById('operations').innerHTML = ""
    smallOperations = [[],[]];
    equal = 0;
    historyvar = 0;
}
function sumFun(array , num){
    var result;
    if(num == 0){
        result = parseFloat(array[0]) + parseFloat(array[2])
        smallOperations[num] = result
    }
    else{
        result = parseFloat(smallOperations[num - 1]) + parseFloat(array[1])
        smallOperations[num] = result
    }
    document.getElementById('operations_rasult').innerHTML = result
}
function subFun(array , num){
    var result;
    if(num == 0){
        result = parseFloat(array[0]) - parseFloat(array[2])
        smallOperations[num] = result
    }
    else{
        result = parseFloat(smallOperations[num - 1]) - parseFloat(array[1])
        smallOperations[num] = result
    }
    document.getElementById('operations_rasult').innerHTML = result
}
function mpFun(array , num){
    var result;
    if(num == 0){
        result = parseFloat(array[0]) * parseFloat(array[2])
        smallOperations[num] = result
    }
    else{
        result = parseFloat(smallOperations[num - 1]) * parseFloat(array[1])
        smallOperations[num] = result
    }
    document.getElementById('operations_rasult').innerHTML = result
}
function divFun(array , num){
    var result;
    if(num == 0){
        result = parseFloat(array[0]) / parseFloat(array[2])
        smallOperations[num] = result
    }
    else{
        result = parseFloat(smallOperations[num - 1]) / parseFloat(array[1])
        smallOperations[num] = result
    }
    document.getElementById('operations_rasult').innerHTML = result
}
function Cbutton(){
    var op = operations_p.pop()
    if(op =='/'||op == '×' || op == '-'|| op == '+'){
        lastclick = 1 
    }
    document.getElementById('operations').innerHTML = operations_p.join(' ');
}
function historyFun(){
    if(historyvar == 0){
        document.getElementById('buttons_div').style.display = 'none';
        document.getElementById('style').style.background = '#f8f8f8'
        document.getElementById('history-div').style.display = 'block';
        for(i=0; i<historyList.length; i++){
            document.getElementById('history-ul').innerHTML += '<li>' + historyList[i] + '</ul>'
        }
        historyvar = 1;
    }
    else{
        document.getElementById('buttons_div').style.display = 'block';
        document.getElementById('style').style.background = 'linear-gradient(#00b4ff,#f8f8f8)'
        document.getElementById('history-div').style.display = 'none';
        historyvar = 0;
    }
    console.log("history   " + historyList.join('   |||   '))
    
}