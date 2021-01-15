/* IK my personal list of quick functions to use for backend js:
// ASCII ORDER - FUNCTION
// FIND ALL SAME SPECIFIC PATTERN 'INDEX NUMBER' IN AN ARRAY
// CREATE A PERFECT CLONE OBJECT FROM THE ORIGINAL OBJECT.
// get() REQUEST JSON WITH ERROR HANDLING SET UP

/*============ MODULE EXPORT PATTERN ===========*/
const iKconsFunctionP = function() {

/* all the code will be stored in this constructor function. ensure you use the this.iKproperty set up for each codes */
/*==============================================*/


/************************************************************/

/* ASCII ORDER - FUNCTION 
       // this is a ascii table chart, for you to test which is greater according to the order list. so in doubt quickly use this to find out
        // var a = "z";
        // var b = "†";		*/

this.ascii = (a, b) => {
  if ( a > b ) {
	  console.log(`ASCII result = "${a}" is > greater than "${b}"`);
	  }
  else if ( a === b ) {
	  console.log(`ASCII result = "${a}" = equals "${b}"`);
	  }
  else if( a < b ) {
	  console.log(`ASCII result = "${a}" < is less than "${b}"`);
	  }
};

/* IK["ascii"]("a", "b"); */

/************************************************************/

/* FIND ALL SAME SPECIFIC PATTERN 'INDEX NUMBER' IN AN ARRAY */

/* this is example incase you want more understanding. follow the bottom one to get your result */

	/* ideal for prompt through list */
	/* Finding all the occurrences of an element. copied from MDN
//  var indices = [];
//  var array = ['a', 'b', 'a', 'c', 'a', 'd'];
//  var element = 'a';
//  var idx = array.indexOf(element); // used as index number, starts at 0

//  while (idx != -1) {    // only after it passes "d" that it becomes -1
//    indices.push(idx);     // records all the "a" index number
//    idx = array.indexOf(element, idx + 1); // BIM you can insert an index number after the value and even +1  to continue the loop
//  };

//  printD(indices); // [0, 2, 4]
// useful if you want to find all the same values in an array.	*/


/* use this function to get all the same value index numbers in the array */
this.patternIndexNumber = (iKarray, searchThisValue) => {
	const patternIndexN = [];
	const array = iKarray;
	const searchThisV = searchThisValue;
	let ValueIndexN = array.indexOf(searchThisV); 

	while (ValueIndexN != -1) {    
		patternIndexN.push(ValueIndexN);	/*1+*/ 
		ValueIndexN = array.indexOf(searchThisV, ValueIndexN + 1);	/*2+*/
	}
	console.log( `${patternIndexN} are all the index number for ${searchThisV} in the array` );
};

	/*1+ records all the specific searchThisE index number
	2+ moves onto the next index number of searchThisE until there is no more. */

/*	IK["patternIndexNumber"]( iKarray, searchThisValue ); */

/************************************************************/

/* CREATE A PERFECT CLONE OBJECT FROM THE ORIGINAL OBJECT  */
this.cloneObject = function (iKobject) {
	const iKclone = Object.defineProperties(
		{}, 
		Object.getOwnPropertyDescriptors(iKobject)
	);
	return iKclone;
}; /*END cloneObject */

		/*+\ ideal if you want all the property flags to be the same.
		+\ however normally for loops are just fine but sometimes you might have different property flags setting in the object and you want them all to be the same, than this could be the right function to use. */

/*	IK["cloneObject"](iKobject); */

/************************************************************/

/*get() REQUEST JSON WITH ERROR HANDLING SET UP */
this.getJson = function (apiUrlP) {
	const _https = require('https');
	const _http = require('http');

	const _promise = new Promise( (resolve, reject) => {
		try {
			_https.get( apiUrlP, _responseObjectP => {
				if (_responseObjectP.statusCode === 200) {
					let _responseString = '';
					_responseObjectP.on('data', _dataPacketP => _responseString += _dataPacketP.toString() );
					_responseObjectP.on('end', () => {
						try {
							const _responseJson = JSON.parse(_responseString);
							resolve( _responseJson );
						} catch (_errorP) {
							reject( 'reject tryCatchScope2 (check json conversion or properties/methods) >>>\n' + _errorP );
						};
					});
				} else {
					reject( `iKreject ifStatementElse (check url pathname?) >>>\n ${_responseObjectP.statusCode} : ${_http.STATUS_CODES[_responseObjectP.statusCode]}` );
				};
				_responseObjectP.on('error', _errorP => reject('reject onError handler >>>\n' + _errorP));
			}); /*END _https.get() */
		} catch(_errorP) {
			reject( 'reject tryCatchScope1 (check protocol?) >>>\n' + _errorP );
		};
	})
		.then( _jsonP => _jsonP )
		.catch(_errorP => console.error( 'iKpromise >>> ' + new Error(_errorP) ) );

	return _promise;
};

/*iK you could lose the 200 status if you wanted but it is important to know you got a correct connection
+\ it will console.error any errors, but if you want to set up your own .catch() then just return the errors here*/

/************************************************************/

/* */

// this.IKEnterANewPropertyIK = "iK any Value";




/*1+
2+
3+
4+
5+
*/

/************************************************************/

/* */

// this.IKEnterANewPropertyIK = "iK any Value";




/*1+
2+
3+
4+
5+
*/

/************************************************************/

/*======== END OF MODULE EXPORT PATTERN ========*/
}; /*END iKconsFunctionP */
const IKOCF = new iKconsFunctionP();


module.exports.ascii = IKOCF.ascii;
module.exports.patternIndexNumber = IKOCF.patternIndexNumber;
module.exports.cloneObject = IKOCF.cloneObject;
module.exports.getJson = IKOCF.getJson;
/*==============================================*/