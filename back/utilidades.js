
var getRandomName = function(callback,Name){
    Name.find({}, function(err, names) {
        let randomIndex1 = getRandomInt(0,names.length-1);
        let randomIndex2 = getRandomInt(0,names.length-1);
        
        callback(names[randomIndex1].firstname + names[randomIndex2].lastname);
    });
}

var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  module.exports.getRandomInt = getRandomInt;
  module.exports.getRandomName = getRandomName;
  