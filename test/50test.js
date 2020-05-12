/* */
'use strict';
const kb = require('../zikBE/iKmodules/iKbe');
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const iKexpect = chai.expect;
chai.use(sinonChai);
/* + + + + + + + + + + node Main Codes ------------------------*/


/**/

// describe('test.js -', function() {
// 	let i;

// 	beforeEach(function() {

// 	});

// 	afterEach(function() {
// 		sinon.restore();
// 	});

// 	it('copy', function() {

// 	});

// }); /*END describe() */


/**************************************************************************/


/*IK FOR JEST AND JEST-DOM */
/*iK not completed for the browser yet, but when you do, than cdn/require()/import the correct link */


//import React from 'react';
//import { render } from '@testing-library/react';
//import KcomponentName1 from './KcomponentName1.js';

/*Jest*/
/*In cra jest expect() is already imported, but you will need to import for other SPA */

//describe('iKcomponentName1', () => {
//    let i;
//
//    beforeEach(function() {
//    });
//
//    afterEach(function() {
//    });
//
//    test('1+ test if react component element text rendered onto the page accordingly.', () => {
//        const { getByText } = render(<KcomponentName1 />); /*1+*/
//        const linkElement = getByText(/iKheader/i);
//        expect(linkElement).toBeInTheDocument();
//    }); /*END test 1+ */
//
//    test('2+', () => {
//    }); /*END test 2+ */
//
//}); /* END describe() */


/*1+ Alternatively you do not have to use render() , you could use 'data-testid' attribute props on the component element to connect to the react element.
  +\ <button data-testid="button" type="submit" disabled>submit</button>  =eg.
*/

/*1+
2+
3+
4+
5+
6+
7+
8+
9+
10+
*/


 /*OP */
/* **** d */
/*------------------- /node Main Codes ///////////////////////*/ /* 
	kb.ascii("a", "b");
	kb.patternIndexNumber( iKarray, searchThisValue );
	kb.cloneObject( iKobject );
	kb.getJson( apiUrlP );

const iKvar1 = "iKV1";
const iKarray1 = ["iKaV1", "iKaV2", "iKaV3"];
const iKobject1 = {iKoProperty1: "iKoV1", iKoProperty2: "iKoV2", iKoProperty3: "iKoV3"};
const iKmap1 = new Map([ ["iKmapProp1", "iKmapV1"], ["iKmapProp2", "iKmapV2"], ["iKmapProp3", "iKmapV3"] ]);
const iKset1 = new Set([ "iKsetV1", "iKsetV2", "iKsetV3" ]);
const iKconsFunction1 = function ( {iKpar1, iKpar2, iKpar3} = {} ) {
	this.iKconsFuncProp1 = iKpar1 || "iKdefaultPar1";
	this.iKconsFuncProp2 = iKpar2 || "iKdefaultPar2";
	this.iKconsFuncProp3 = iKpar3 || "iKdefaultPar3";
};
	const iKconsObject1 = new iKconsFunction1();
const iKasyncFunction1 = async () => {
	try {
		const iKpromise1 = await new Promise(function(resolve, reject) {
		});
		return iKpromise1;
	} catch(iKcatchError1) {
		throw new Error("iKerror >>> ", iKcatchError1);
	};
};
	iKasyncFunction1();	*/