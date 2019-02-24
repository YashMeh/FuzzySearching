const client=require("./connection.js");
//Index Creation
// client.indices.create({  
//     index: 'diseases'
//   },function(err,resp,status) {
//     if(err) {
//       console.log(err);
//     }
//     else {
//       console.log("create",resp);
//     }
//   });

//Bulk indexing
var csv = require('csv'); 
var obj = csv(); 
function MyCSV(Fone, Ftwo, Fthree) {
    this.serial=Fone;
    this.name = Ftwo;
    this.description = Fthree;
}; 
var MyData = []; 
obj.from.path('list.csv').to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
        MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2]));
    }
    console.log(MyData);
    for(var i=0;i<MyData.length;i++)
    {
        client.index({  
            index: 'diseases',
            id: i+1,
            type: 'diseaseDescription',
            body: {
              "name": MyData[i].name,
              "description":MyData[i].description
              
            }
          },function(err,resp,status) {
              console.log(resp);
          });
    }
});