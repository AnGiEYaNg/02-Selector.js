// var traverseDomAndCollectElements = function(matchFunc, startEl) {
//   var resultSet = [];

//     if (typeof startEl === "undefined") {
//     startEl = document.body;
//   }


//   function recursion(matchFun,startE){
//     if (matchFun(startE)) {

//        resultSet.push(startE)

//     //return resultSet;
//     }

//     if(!startE.children) {

//     return
//     }
//     var array = startE.children

//     for(var i=0; i<array.length;i++){
//        recursion(matchFun, array[i])
//     }

//   }
//   recursion(matchFunc,startEl);

// return resultSet;

// };


// // detect and return the type of selector
// // return one of these types: id, class, tag.class, tag
// //
// var selectorTypeMatcher = function(selector) {
//   if (selector.charAt(0)==='#')
//     return 'id';
//   else if (selector.charAt(0)==='.')
//     return 'class';
//   else if (selector.indexOf('.')>0)
//     return 'tag.class'
//   else
//     return 'tag'
// };


// // NOTE ABOUT THE MATCH FUNCTION
// // remember, the returned matchFunction takes an *element* as a
// // parameter and returns true/false depending on if that element
// // matches the selector.

// var matchFunctionMaker = function(selector) {
//   var selectorType = selectorTypeMatcher(selector);
//   var matchFunction;
//   if (selectorType === "id") {
//     // define matchFunction for id
//     matchFunction=function(el){

//       return el.id && (el.id.toLowerCase()===selector.slice(1,selector.length).toLowerCase());
//     }

//   } else if (selectorType === "class") {
 
//     matchFunction=function(el){
//       var name = el.className.toLowerCase();
//       name = el.className.split(" ")
 
//       return name.indexOf(selector.slice(1).toLowerCase())>-1;
//     }
    

//   } else if (selectorType === "tag.class") {
//     // define matchFunction for tag.class
//     // var selector=selector.split(".");
//     //console.log(selector)
    
//       matchFunction=function(el){
//         var name = el.className.toLowerCase();
//         name = el.className.split(" ")

//         var word=el.tagName.toLowerCase()+"."+el.className;
//         return (selector.indexOf(word) != -1)
//       // var name = el.className.toLowerCase();
//       // name = el.className.split(" ")
//       //return el.tagName&&(el.tagName.toLowerCase()===selector[0].toLowerCase())&&el.className && (el.className.toLowerCase()===selector[1].toLowerCase());
//     }

//   } else if (selectorType === "tag") {
//     // define matchFunction for tag
//     matchFunction=function(el){

//       return el.tagName&&(el.tagName.toLowerCase()===selector.toLowerCase())
//     }

//   }
//   return matchFunction;
// };

// var $ = function(selector) {
//   var elements;
//   var selectorMatchFunc = matchFunctionMaker(selector);
//   elements = traverseDomAndCollectElements(selectorMatchFunc);
//   return elements;
// };

//Answer
var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];
    if (typeof startEl === "undefined") {
    startEl = document.body;
  }

    if (matchFunc(startEl))  resultSet.push(startEl)

    if(startEl.children.length !== 0) {
      children=[].slice.call(startEl.children); //=== Array.prototype.slice.call(argument)
      children.forEach(function (childElement) {
        resultSet=resultSet.concat(traverseDomAndCollectElements(matchFunc,childElement));
      });
    }

return resultSet;

};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag

var selectorTypeMatcher = function(selector) {
  if (selector.charAt(0)==='#') return 'id';
  else if (selector.charAt(0)==='.') return 'class';
  else if (selector.search(/\./)>0) return 'tag.class';
    //no diff using indexOf
  else return 'tag';
};

// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    // define matchFunction for id
    matchFunction=function(el){

      return el.id.toLowerCase()===selector.slice(1).toLowerCase();
    }

  } else if (selectorType === "class") {
 
    matchFunction=function(el){
      var className=selector.slice(1);
      return el.classList.contains(className);
    };
    

  } else if (selectorType === "tag.class") {
    // define matchFunction for tag.class
    
      matchFunction=function(el){
        var parts=selector.split(".");
        return el.tagName.toLowerCase() === parts[0].toLowerCase() 
        && el.classList.contains(parts[1]);
     }

  } else if (selectorType === "tag") {
    // define matchFunction for tag
    matchFunction=function(el){

      return el.tagName&&(el.tagName.toLowerCase()===selector.toLowerCase())
    }

  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
