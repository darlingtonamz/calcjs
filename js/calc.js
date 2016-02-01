/*Reference:
http://thecodeplayer.com/walkthrough/javascript-css3-calculator
*/

var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;
var eqn = [];
var input = $("#res");
input.val('');

$(document).on('click', '.calc-row button', function(e) {
  handler($(this).text());
});

function handler(btnVal){
		var inputVal = Boolean(input.val()) && (input.val() != '-') ? input.val() : 0;

		if(btnVal == 'C') {
			input.val('');
			eqn = [];
			decimalAdded = false;
		}else if(btnVal == 'sin()' || btnVal == 'cos()' || btnVal == 'tan()'){
			eqn.push(inputVal);
			decimalAdded = false;

			if(btnVal == 'sin()') {
				input.val(Math.sin(doBodmas(eqn)));
			}else if(btnVal == 'cos()') {
				input.val(Math.cos(doBodmas(eqn)));
			}else if(btnVal == 'tan()') {
				input.val(Math.tan(doBodmas(eqn)));
			}
		}else if(btnVal == '=') {
			eqn.push(inputVal);
			var res = doBodmas(eqn);
			input.val(res);
		}
		else if(operators.indexOf(btnVal) > -1) {
			var lastChar = inputVal[inputVal.length - 1];

			if(inputVal == '' && btnVal == '-'){
				input.val(input.val() +''+ btnVal);
			}

			if((inputVal != '' && operators.indexOf(lastChar) == -1) ){
				eqn.push(inputVal,btnVal);
				updatePrev();
				input.val('');
			}
			decimalAdded =false;
		}

		else if(btnVal == '.') {
			if(!decimalAdded) {
				input.val(input.val() +''+ btnVal);
				decimalAdded = true;
			}
		}

		else {
			input.val(input.val() +''+ btnVal);;
		}

		return false;
}

function doBodmas(eq){
	//var cArr = ['1', '*', '4', '-', '12', '/', '2'] ;
    //1*4-12/2
    console.log('Before: '+eq);
    //Handle Multiply
    for (i = 0; i <= eq.length; i++) {
        cItem = eq[ i ];
        if (cItem == 'x') {
            tLeft = parseFloat(eq[ i - 1 ]);
            tRight = parseFloat(eq[ i + 1 ]);

            nVal = tLeft * tRight;
            eq[ i - 1 ] = nVal;
            eq.splice(i, 2);
            i = eq.length;
        }
    }

    //Handle Divide
    for (i = 0; i <= eq.length; i++) {
        cItem = eq[ i ];
        if (cItem == '÷') {
            tLeft = parseFloat(eq[ i - 1 ]);
            tRight = parseFloat(eq[ i + 1 ]);

            nVal = tLeft / tRight;
            eq[ i - 1 ] = nVal;
            eq.splice(i, 2);
            i = eq.length;
        }
    }

    //Handle Plus and Minus
    for (i = 1; i < eq.length; i++) {
    	var tResult = parseFloat(eq[ i-1 ]);
        if (eq[ i ] == '+') {
            tResult = tResult + parseFloat(eq[ i + 1 ]);
        } else if (eq[ i ] == '-') {
            tResult = tResult - parseFloat(eq[ i + 1 ]);
        }

        eq[ i - 1 ] = tResult;
        eq.splice(i, 2);
        i--;
    }

    console.log(eq);
    var out = eq[0];
	updatePrev();
	eqn = [];
	decimalAdded = true;
    return out;
}

function updatePrev(){
	$('#preview').text(eqn.join(''));
}