var aria = aria || {};

/**
 * @desc
 *  Key code constants
 */
aria.KeyCode = {
  BACKSPACE: 8,
  TAB: 9,
  RETURN: 13,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46
};

aria.Utils = aria.Utils || {};

function json(obj) {
      var result = [];
      for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
              result.push(prop);
          }
      }
      return JSON.stringify(result, null, 2);
  };

  function ls(obj) {
      var result = '';
      for (var prop in obj) {
          if (obj.hasOwnProperty) {
              result += prop + ' : ' + obj[prop] + ", \n";
          }
      }
      return result;
  };

  function dir(obj) {
      var result = '';
      for (var prop in obj) {
          if (obj.hasOwnProperty) {
              result += prop + ", \n";
          }
      }
      return result;
  };

  function block() {


      function StringType() {}

      function NumberType() {}

      function BooleanType() {}

      function ErrorType() {}

      function NullType() {}

      function UndefinedType() {}

      function ArrayType() {}

      function ObjectType() {}

      function FunctionType() {}

      function parseError(er) {
          if (er instanceof SyntaxError) {
              console.error('SyntaxError');
          } else if (er instanceof RangeError) {
              console.error('RangeError');
          } else if (er instanceof ReferenceError) {
              console.error('ReferenceError')
          } else if (er instanceof TypeError) {
              console.error('TypeError');
          } else if (er instanceof EvalError) {
              console.error('EvalError');
          }
      }

      function whichType(value) {
          var type = '[object Object]';
          try {
              type = ({}).toString.call(value);
          } catch (e) { // only happens when typeof is protected (...randomly)

          }
          if (type === '[object String]') {
              return StringType;
          }
          if (type === '[object Number]') {
              return NumberType;
          }
          if (type === '[object Boolean]') {
              return BooleanType;
          }
          // if (type === '[object Set]' || type === '[object Map]') {
          //   return SetType;
          // }
          // if (type === '[object Promise]') {
          //   return PromiseType;
          // }
          if (value instanceof Error || type === '[object Error]') {
              return ErrorType;
          }
          if (value === undefined) {
              return UndefinedType;
          }
          if (value === null) {
              return NullType;
          }
          if (type === '[object Array]') {
              return ArrayType;
          }
          if (type === '[object Function]') {
              return FunctionType;
          }
          return ObjectType;
      }
  }

  (function (fragment, $main) {

      var ul, li, io;

      function input() {
          ul = $.create(fragment, 'ul', {
              class: 'prompt'
          });
          li = $.create(ul, 'li', {
              class: ''
          });
          io = $.create(li, 'input', {
             'tabindex': '0'
          });
          $.listen(io, 'keyup', handler, false);
          $.appendChild($main, fragment);
          if ($.qsa("ul").length > 1) {
              io.focus();
          }
      }

      function output(string, className) {
          ul = $.create(fragment, 'ul', {
              class: 'out'
          });
          li = $.create(ul, 'li', {
              class: ''
          });
          io = $.create(li, 'pre', {
              class: className
          }, _.template('<%= obj.string %>')({
              string: string
          }));
          $.appendChild($main, fragment);
      }

      function error(string, className) {
          ul = $.create(fragment, 'ul', {
              class: 'error'
          });
          li = $.create(ul, 'li', {
              class: ''
          });
          io = $.create(li, 'pre', {
              class: className
          }, _.template('<%= obj.string %>')({
              string: string
          }));
          $.appendChild($main, fragment);
      }

      function handler(event) {
          var target = event.target;
          var key = event.which;
          var value = target.value;

          if (key === 13 && value === 'test 1 2 3') {
              event.target.disabled = true;
              return reparse(event.target.value);
          }
          else if (key === 13 && value === 'text') {
            event.target.value = '';
            event.target.setAttribute('tabindex', '-1');
            nullfier = event.target;
            return text();
          }
          else if (key === 13) {
              event.target.disabled = true;
              return repl(event.target.value);
          }
      }

      function reparse(string) {
          var array = string.split(/\s+/),
              first = array[0],
              rest = _.rest(array).join(' ');
          output(first, 'string');
          output(rest, 'string');
          input();
      }

      function repl(string) {
          var result;
          output = _.memoize(output);
          error = _.memoize(error);
          try {
              result = eval.call(window, string);
              if (_.isDate(result)) {
                  output(result, "date");
              } else if (_.isFunction(result)) {
                  output(result, "function");
              } else if (_.isObject(result)) {
                  output(result, "object");
              } else if (_.isBoolean(result)) {
                  output(result, "boolean");
              } else if (_.isString(result)) {
                  output(result, "string");
              } else if (_.isNumber(result)) {
                  output(result, "number");
              } else if (_.isNull(result)) {
                  output(result, "null");
              } else if (_.isUndefined(result)) {
                  output(result, "undefined");
              }
          } catch (er) {
              result = er.stack;
              if (er instanceof SyntaxError) {
                  error("SyntaxError : " + er.message, 'syntax-error');
              } else if (er instanceof RangeError) {
                  error("RangeError : " + er.message, 'range-error');
              } else if (er instanceof ReferenceError) {
                  error("ReferenceError : " + er.message, 'reference-error');
              } else if (er instanceof TypeError) {
                  error("TypeError : " + er.message);
              } else if (er instanceof EvalError) {
                  error("EvalError : " + er.message);
              }
          } finally {
              input();
          }
      }
      input();

  })(new DocumentFragment(), $.id('main'));


  function text(cached){

      const section = document.createElement('section');
      const para = document.createElement('textarea');
      section.style.cssText = '\
      position:fixed;\
      top:1em;\
      left:1em;\
      bottom:1em;\
      right:1em;\
      z-index:10;\
      background-color:white;\
      ';
      para.setAttribute('tabindex', '0');
      para.addEventListener('blur', function(){
          document.body.removeChild(section);
          nullifier.setAttribute('tabindex', '0');
      }, false);

      section.appendChild(para);
      document.body.appendChild(section);
      
      para.focus();

  }

  (function(){
	
	const QUEENS = 8;
	const GRID = 64;
	
	function _calculateInterupts (array) {
		var index = 0, i, j;
		for(i = 0;i < QUEENS - 1;i++){
			for(j = i + 1;j < QUEENS;j++){	
				if(array[i].x == array[j].x){ index++; }			
				else if(array[i].y == array[j].y){ index++; }			
				else if(array[i].x + array[i].y == array[j].x + array[j].y){ index++; }
				else if(array[i].y - array[i].x == array[j].y - array[i].x){ index++; }
			}
		}
		return index;
	}

	function _checkRepetitions (array) {
		var i, j, length = array.length;
		for(i = 0;i < length - 1;i++){
			for(j = i + 1;j < length;j++){
				if(array[i].x === array[j].x && array[i].y === array[j].y){
					return true;
				}
			}
		}
		return false;
	}

	var position = [];

	function _generateRandomPositions () {
		var done = false, i;
		for(i = 0;i < QUEENS;i++){
			var repetitions = true;
			position[i] = {};
			while(repetitions){
				position[i].x = parseInt(Math.random() * 8);
				position[i].y = parseInt(Math.random() * 8);
				if(!_checkRepetitions(position)){
					repetitions = false;
				}
			}
		}
		return _calculateInterupts(position);
	}


})();