inlets = 1;
outlets = 1;
autowatch = 1;

var dict;

var dictName;
var stemName;
var attributes = [];
var p = this.patcher;


function setDictName (name) {
  dictName = name;
  post("dictionary name: "+dictName+'\n');
  dict = createDict();
  outlet(0,["dictionary",dictName]);
}

function whatName () {
  post(dictName + '\n');
}

function createDict () {
  return new Dict(dictName);
}

function setStemName(name) {
  stemName = name;
  post("track: "+stemName);
  dict.replace(stemName);
}

function matrixcolnames () {
  attributes = arrayfromargs(arguments);
  post("attributes: "+attributes);
  for (var i = 0; i < attributes.length; i++) {
    dict.replace(stemName+'::'+attributes[i]);
  }
}

// 0.1 1 0.2 3 4.0
function setValues () {
  v = arrayfromargs(arguments);
  if(v.length !== attributes.length) {
    post("error. number of values = "+v.length+" number of attributes = "+attributes.length+"\n");
  } else {
    for (var i = 0; i < attributes.length; i++) {
      dict.append(stemName+'::'+attributes[i],v[i]);
    }
  }
  
}

function exportJson (filename) {
  dict.export_json(filename);
}

function clear() {
  dict.clear();
  bang();
}

function bang() {
  post(dictName+'\n');
  post(dict+'\n');
  post('attrs: '+attributes.length+'\n');
  post(stemName+'\n');
}



