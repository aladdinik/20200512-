/* IK my personal list of quick functions to use:
// PRINT DATA VALUE TO SCREEN AND CONSOLE - FUNCTION
// COLLECT ALL CSS .style INFORMATION OF THE ELEMENT (INCLUDING EXTERNAL SHEET) -FUNCTION
// ASCII ORDER - FUNCTION
// FIND ALL SAME SPECIFIC PATTERN 'INDEX NUMBER' IN AN ARRAY
// CHECK CSS PROPERTY:VALUE SUPPORT ON CURRENT BROWSER
// LIST ALL HTML ATTRIBUTE AND ATTRIBUTE VALUE OF THE DOM ELEMENT	
// SERIALIZE THE FORM DATA INTO A QUERY STRING (URL-encoded query string:)
// SERIALIZE JS OBJECT DATA INTO A QUERY STRING (URL-encoded query string:)
// CREATE A PERFECT CLONE OBJECT FROM THE ORIGINAL OBJECT.
// fetch() JSON WITH ERROR HANDLING SET UP
*/

/*============ MODULE EXPORT PATTERN ===========*/
const IK = (function(root) {
	const iKconsFunctionP = function() {

		this.root = root; /* just the window object from 'this' argument, might not necessarily need it, but just in case.*/

/* all the code will be stored in this constructor function. ensure you use the this.iKproperty set up for each codes */
/*==============================================*/


/************************************************************/

/* PRINT DATA VALUE TO SCREEN AND CONSOLE - FUNCTION */

this.printD = html => { 
	console.log(html);
//	html = html || "CHECK CONSOLE.LOGIK";
	document.write(`${html} <hr>`);
};

/* IK["printD"]( html ); */

/*************************************************************/

/* COLLECT ALL CSS .style INFORMATION OF THE ELEMENT (INCLUDING EXTERNAL SHEET) -FUNCTION */

this.everyStyles = (DOMelement) => {	/*1+*/
	const element = DOMelement;
	let outcome = "";
	const elementStyle = element.style;
	const computedStyle = window.getComputedStyle(element, null);

	for (let vPropName in elementStyle) {
	  if (elementStyle.hasOwnProperty(vPropName)) {
		outcome += `${vPropName} => " ${elementStyle[vPropName]} " <> " ${computedStyle[vPropName]} "\n`;
	  }
	}
	return console.log(outcome)
};

    /*1+ ensure DOMelement has already inserted index number if necessary */
    /* ${elementStyle[vPropName]}  = not sure what this does as it seem to make no difference if i delete it.*/

/* IK["everyStyles"]( DOMelement ); */

/*****************************************/

/* ASCII ORDER - FUNCTION 
       // this is a ascii table chart, for you to test which is greater according to the order list. so in doubt quickly use this to find out
        // var a = "z";
        // var b = "†";		*/

this.ascii = (a, b) => {
  if ( a > b ) {
	  this.printD(`ASCII result = "${a}" is > greater than "${b}"`);
	  }
  else if ( a === b ) {
	  this.printD(`ASCII result = "${a}" = equals "${b}"`);
	  }
  else if( a < b ) {
	  this.printD(`ASCII result = "${a}" < is less than "${b}"`);
	  }
};

/* IK["ascii"]("a", "b"); */

/*****************************************/

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

	while (ValueIndexN !== -1) {    
		patternIndexN.push(ValueIndexN);	/*1+*/ 
		ValueIndexN = array.indexOf(searchThisV, ValueIndexN + 1);	/*2+*/
	}
	this.printD( `${patternIndexN} are all the index number for ${searchThisV} in the array` );
};

	/*1+ records all the specific searchThisE index number
	2+ moves onto the next index number of searchThisE until there is no more. */

/*	IK["patternIndexNumber"]( iKarray, searchThisValue ); */

/****************************************************/

/* CHECK CSS PROPERTY:VALUE SUPPORT ON CURRENT BROWSER */

this.cssSupport = (cssProperty, cssValue) => {
	const cssPV = CSS.supports(cssProperty, cssValue);

	if (cssPV === true) {
		this.printD(`"true", your current browser accepts css ${cssProperty}: ${cssValue};`);
	}
	else if (cssPV === false) {
		this.printD(`"false", your current browser does not accept css ${cssProperty}: ${cssValue};`);
	}
};
		/* usually use in conjuction with @supports */

/* IK["cssSupport"]("cssProperty", "cssValue"); */

/****************************************************/

/* LIST ALL HTML ATTRIBUTE AND ATTRIBUTE VALUE OF THE DOM ELEMENT */

this.listAttributes = (DOMnode) => {
	/* First, let's verify that the DOMnode has any attributes */
	if (DOMnode.hasAttributes()) {
		const attrsz = DOMnode.attributes;
		let outputz = ``;
		for(let i = 0; attrsz.length > i; i++) {
			outputz += `${attrsz[i].name}="${attrsz[i].value}" -|- `;
		}
		IK.printD(outputz);
	} 
	else {
		IK.printD(`No html attributes to show`);
	}
};

/*	IK["listAttributes"]( DOMnode ); */

/****************************************************/

/* SERIALIZE THE FORM DATA INTO A QUERY STRING (URL-encoded query string:) */

this.serialize = function(form) {       /*1+*/
	let field, l, s = [];
	if (typeof form === 'object' && form.nodeName === "FORM") {
		const len = form.elements.length;
		for (let i=0; i<len; i++) {
			field = form.elements[i];
			if (field.name && !field.disabled && field.type !== 'file' && field.type !== 'reset' && field.type !== 'submit' && field.type !== 'button') {
				if (field.type === 'select-multiple') {
					l = form.elements[i].options.length; 
					for (let j=0; j<l; j++) {
						if(field.options[j].selected)
							s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
					}
				} 
				else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
					s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
				}
			}
		}  /*END of for loop*/
	}  /*END OF first if conditon*/
	return s.join('&').replace(/%20/g, '+');
};
		/*VIP-
		1+ VIP you must enter the <form> DOM node which will contain <input>/<textarea>/<select> (<option>) data.
		1+ VIP ensure all the form child elements have the attribute name="" set.
		1+ it appears you cannot use any other node except the form element. 
		+\ remember it will return nothing on console.log, you need to store it in a variable. then you can see it if you want. */
		
		/* The result is identical to what jQuery's $(formDOMlement).serialize() returns. 
			+\ you might be able to enter other forms DOM element too. but needs confirming
		+\ i slightly modified it so it was up to date with es6
		source = https://plainjs.com/javascript/ajax/serialize-form-data-into-a-query-string-45/ */

/*	IK["serialize"]( formDOMelement ); */

/****************************************************/

/* SERIALIZE JS OBJECT DATA INTO A QUERY STRING (URL-encoded query string:) */

this.serializeObject = function(obj) {
  const str = [];
  for (let p in obj)
	if (obj.hasOwnProperty(p)) {
	  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	}
  return str.join("&");
};

	/*eg-
//	console.log(serializeObject({
//	  foo: "hi there",
//	  bar: "100%"
//	}));
	// foo=hi%20there&bar=100%25	*/

		/*+\ no set up output on console.log, store in a variable to use how you want.*/

/*	IK["serializeObject"]( iKobject ); */

/****************************************************/

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

/****************************************************/

/*fetch() JSON WITH ERROR HANDLING SET UP */
this.fetchJson = apiUrlP => {
	try {
		return fetch( apiUrlP )
			.then( _responseObjectP => {
				if (_responseObjectP.status === 200) {
					try {
						const _responseJson = _responseObjectP.json();
						return _responseJson;
					} catch(_errorP) {
						throw 'tryCatchScope2 (check json conversion or properties/methods) >>>\n' + _errorP
					};
				} else {
					throw `ifStatementElse (check url pathname?) >>>\n ${_responseObjectP.status} : ${_responseObjectP.statusText}`;
				};
			})
			.then( _jsonP => _jsonP )
			.catch(_errorP => console.error( 'fetch.catch >>>\n' + new Error(_errorP) ) );
	} catch(_errorP) {
		console.error( new Error('Error tryCatchParent (check code referenceError?) >>>\n' + _errorP) );
	};
};

	/*iK you could lose the 200 status if you wanted but it is important to know you got a correct connection
	+\ it will console.error any errors, but if you want to set up your own .catch() then just return the errors here*/

/*	IK["fetchJson"](apiUrlP); */

/****************************************************/

/*  */


/*1+
2+
3+
4+
5+
*/

/*======== END OF MODULE EXPORT PATTERN ========*/
	}; /*END iKconsFunctionP */
	const IKOCF = new iKconsFunctionP();
	return IKOCF;
}(this)); /*END IK (module)*/

/* 'this' is the local window of the module, however i might not need it in this context. */
/*==============================================*/