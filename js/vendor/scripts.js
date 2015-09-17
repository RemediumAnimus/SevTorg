window.onload = function(){


var user = {
  firstName: "Вася",
  sayHi: function() {
    alert( this );
  }
};


(function(f){
      f();
})(user.sayHi);
};
