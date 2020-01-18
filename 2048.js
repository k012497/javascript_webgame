var table = document.getElementById('table');
var data = [];

function initSetting(param){ 
    var fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(function(){
        var colData = [];
        data.push(colData);
        var tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(function () { 
            colData.push(0);
            var td = document.createElement('td');
            tr.appendChild(td);
         });
         fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}

function makeRandom(){
    var blankArray = [];
    data.forEach(function(colData, i){
        colData.forEach(function (rowData, j) { 
            if(!rowData){
                blankArray.push([i, j]);
            }
         });
    });
    var randomCell = blankArray[Math.floor(Math.random() * blankArray.length)];
    data[randomCell[0]][randomCell[1]] = 2;
    console.log("randomCell", randomCell);
    drawing();
}

function drawing(){
    data.forEach(function(rowData, i){
        rowData.forEach(function(rowData, j){
            if(rowData > 0){
                table.children[i].children[j].textContent = rowData;
            }else{
                table.children[i].children[j].textContent = '';
            }
        })
    })
}

initSetting();
makeRandom();
drawing();