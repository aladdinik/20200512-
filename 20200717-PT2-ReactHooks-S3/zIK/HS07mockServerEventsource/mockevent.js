/*source: eloyz/mockevent (github).
+\ iK copy and paste the bottom part of the codes to your script for 5 eventsource object.

+\ I have not adjusted the main codes.
	+\ iK however I have also included at the bottom the extra code that came with it.
		+\ it is commented out because I did not want to trigger eventsource everytime I use a new html file, especially if I do not want to use eventsource.
			+\ iK if you want to use eventsource than copy and paste the bottom commented codes to your main script and make adjustment if necessary.
				+\ BIM you will also need the underscore.js file too for it to work.

+\ iK this is a mock evensource, you would not use this file in the real world.
	+\ this file is only if you want to practice incoming eventsource.
		+\ it will send eventsource like a server would do in the real world. */
(function(window, undefined){

    window.MockEventGlobals = {
        setTimeout: 0,
        setInterval: 0,
        verbose: false,
        on: true
    }

    var mockHandlers = [];
    var missed = [];

    var baseHandler = {

        id: null,
        url: '',
        setInterval: MockEventGlobals.setInterval,
        responses: [],
        response: null,
        proxy: null,
        on: MockEventGlobals.on,
        allResponses: [],

        initialize: function(){
            this.allResponses = this.allResponses.concat(this.responses);
        },
        headers: function(){
            return {
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'Content-type,Authorization',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Origin': window.location.protocol + '//' + window.location.host,
                'Access-Control-Expose-Headers': '*',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Content-type': 'text/event-stream',
                'Date': (new Date()).toString()
            }
        },
        urlMatches: function(url){
            if (_.isFunction(this.url.test)) {
                // The user provided a regex for the url, test it
                if (!this.url.test(url)) {
                    return false;
                }
            } else {
                var star = this.url.indexOf('*');
                if (this.url !== url && star === -1 ||
                        !new RegExp(this.url.replace(/[-[\]{}()+?.,\\^$|#\s]/g, '\\$&').replace(/\*/g, '.+')).test(url)) {
                    return false;
                }
            }
            return true;
        },
        clear: function(){
            mockHandlers[this.id] = null;
            delete this;
        },
        dispatchEvent: function(event){
            return window.dispatchEvent(event);
        },
        send: function(response){
            if(!(response.name && response.data)){
                this.dispatchError('`name` and `data` are required on mock handler response object');
            } else {
                var evt = new Event(response.name)
                evt.data = JSON.stringify(response.data);
                this.dispatchEvent(evt);
            }
        },
        errorEventName: function(){
            return 'mock-event-'+this.id+'-error';
        },
        dispatchError: function(errorMessage){
            var evt = new Event(this.errorEventName());
            evt.error = errorMessage;
            this.dispatchEvent(evt);
        },
        stream: function(responses){
            /* Handling the stream output via this.setInterval attribute, 
            ironically it's being handled with the `setTimeout` function. */
            var self = this;

            var streamIt = function(){
                if(responses.length){
                    var response = responses.shift();
                    if(self.evtSource.readyState === self.evtSource.OPEN){
                        self.lastResponseId = response.id;
                        self.send(response);
                        self.stream(responses);
                    } else {
                        if(MockEventGlobals.verbose) console.warn("Missed response because EventSource.close()", response);
                        self.dispatchError("`EventSource` instance closed while sending.");
                    }
                } else {
                    clearTimeout(timeoutId);
                    timeoutId = false;
                }
            };

            if(!timeoutId){
                if(self.setInterval instanceof Array){
                    var min = self.setInterval[0];
                    var max = self.setInterval[1];
                    var timeoutValue = Math.random() * (max - min) + min;
                    var timeoutId = setTimeout(streamIt, timeoutValue);
                } else {
                    var timeoutValue = self.setInterval;
                    var timeoutId = setTimeout(streamIt, timeoutValue);
                }

                // Logging on `verbose` = True
                if(MockEventGlobals.verbose && responses.length){
                    console.info("Send stream in " + timeoutValue + " milliseconds.");
                }
            }
        },

        stop: function(){
            this.on = false;
        },
        start: function(){
            this.on = true;
        }
    };

    window.EventSource = function(url, settings){
        var self = this;

        self.url = url;
        self.settings = settings;

        self.CONNECTING = 0;
        self.OPEN = 1;
        self.CLOSED = 2;

        self.readyState = null;

        self.headers = function(){
            return {
                'Accept': 'text/event-stream',
                'Accept-Encoding': 'gzip, deflate, sdch',
                'Accept-Language': window.navigator.languages.join(','),
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                // 'Cookie': docCookies.cookiesToString(),
                'Host': window.location.host,
                // 'Last-event-id': this.handler.lastResponseId || '',
                'Origin': window.location.protocol + '//' + window.location.host,
                'Referer': window.location.protocol + '//' + window.location.host,
                'User-Agent': window.navigator.userAgent
            }
        };

        // Creates event of type `error`
        self.error = function(message){
            var evt = new Event('error');
            evt.error = message;
            if(self.onerror){
                self.onerror(evt);
            }
        };

        self.close = function(){
            self.readyState = self.CLOSED;
        };

        self.addEventListener = function(name, fn){
            return window.addEventListener(name, fn, false);
        };

        self.listenForErrors = function(mockHandler){
            self.addEventListener(mockHandler.errorEventName(), function(event){
                self.error(event.error);
            });
        }

        self.responses = [];

        // Properties are set in several statements
        // waiting for all properties to be set
        setTimeout(function(){

            // No `MockEvent` instances detected
            if(mockHandlers.length === 0) missed.push(self);

            _.each(mockHandlers, function(mockHandler){

                // `MockEvent` instance deleted
                if(mockHandler === null) return;

                if(!mockHandler.urlMatches(self.url)){
                    missed.push(self);
                    return;
                }

                self.handler = mockHandler;
                mockHandler.evtSource = self;

                // mockHandler dispatches error event
                // EventSource calls `onerror` method
                self.listenForErrors(mockHandler);

                if(self.readyState === null){
                    self.readyState = self.CONNECTING;                    
                }

                if(self.readyState == self.CONNECTING){
                    if(self.onopen){
                        self.onopen({
                            message: "You're open!", 
                            apology:"I didn't know what else to say."
                        });   
                    }
                    self.readyState = self.OPEN;
                }

                if(!(mockHandler.allResponses.length || mockHandler.response)){
                    self.error('Handler ' + mockHandler.url + ' requires response type attribute');
                }

                if(mockHandler.response){
                    mockHandler.response(mockHandler, self);
                }

                if(mockHandler.responses){
                    mockHandler.stream(_.clone(mockHandler.responses));
                }
            })

            if(self.handler === undefined){
                /* A handler was never found for this `EventSource`
                instance. In this case we send a Timeout Error. */
                self.error("Timeout Error");
            }

        }, MockEventGlobals.setTimeout);
    };
    window.MockEvent = function(settings){
        var i = mockHandlers.length;
        mockHandlers[i] = _.extend({}, baseHandler, settings, {id: i});
        mockHandlers[i].initialize();
        return mockHandlers[i];
    };

    MockEvent.clear = function(i) {
        if ( i || i === 0 ) {
            mockHandlers[i] = null;
        } else {
            mockHandlers = [];
        }
    };

    MockEvent.handlers = function(i){
        if ( i || i === 0 ) {
            return mockHandlers[i];
        } else {
            return mockHandlers;
        }
    };

    MockEvent.missed = function(){
        return missed;
    };

})(window);


/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%% IK %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/


/* IK COPY AND PASTE THE COMMENTED (//) CODES TO YOUR MAIN SCRIPT IF YOU WANT TO USE EVENTSOURCE OBJECT */
/*iK I made adjustment so it would be quicker for me to understand. */

///* Instantiate a `MockeEvent` ----------*/
//const mockEvent = new MockEvent({
//    url: '/iKpathName',	/*iKadjustable*/
//    setInterval: 1300,	/*iKadjustable*/
//    responses: [
//        {name: 'message', data: 'iKeventSourceV1'},	/*iKadjustable*//*1+*/
//        {name: 'iKcustomEventType1', data: 'iKeventSourceV2'},
//        {name: 'iKcustomEventType1', data: 'iKeventSourceV3'}, /*2+*/
//        {name: 'iKcustomEventType3', data: 'iKeventSourceV4'},
//        {name: 'iKcustomEventType1', data: 'iKeventSourceV5'}
//    ]
//});
//
//
///* Instantiate an `EventSource` ---------- */
//const iKeventSource = new EventSource("/iKpathName");
//
///* Listening for open and error events */
//iKeventSource.onopen = event => console.log("iKeventsource CONNECTION IS OPEN", event);
//
//iKeventSource.onerror = event => console.log("iKeventsource CONNECTION ERROR", event.message); /*3+*/
//
///* Listening to specific event names and handling them */
//iKeventSource.addEventListener(		/*iKadjustable*/
//	'message',		/*4+*/
//	event => console.log( event.type, event.data, event ), /*5+*/
//	false	/*6+*/
//);
//
//iKeventSource.addEventListener(
//	"iKcustomEventType1",	/*7+*/
//	event => console.log( event.type, event.data, event ),
//	false
//);
//
//iKeventSource.addEventListener(
//	"iKcustomEventType3",
//	event => console.log( event.type, event.data, event ),
//	false
//);

/*OP
	"message , iKeventSourceV1" , event object
	"iKcustomEventType1 , iKeventSourceV2" , event object
	"iKcustomEventType1 , iKeventSourceV3" , event object
	"iKcustomEventType3 , iKeventSourceV4" , event object
	"iKcustomEventType1 , iKeventSourceV5" , event object */


/*1+ Think of name: as the custom type of event the client will have to use if they want to get the .data of the eventsource.
1+ iK I used "message" because I think normally if the server did not set up the event type, than you would use .onmessage / "message" (.addEventListener) .
	+\ iK however beware that in this case you are not allowed to use .onmessage event listener.
		+\ iK but you can use .addEventListenr("message", ...);
2+ notice there is 2 "iKcustomEventType1" . but server will still send repeated event type  to the client synchronously with each separate value.
3+ the error event also collects if the user closes the connection with .close() .
	+\ as there seem to be no close event for the eventsource object.
4+ set the type of event it requires from the server.
5+ IK however I notice if I would use IK.printD() or document.write(), it will prevent the other iKeventSource.addEventListener() from running. And I do not know why?
	+\ perhap you should push the values into a new array or something as it will work that way.
6+ not necessary, it bubbling/capturing.
7+ will call all the "iKcustomEventType1", but in the synchronous order of the server layout. 
+\ just remember you can use the .close() method to close the connection of the eventsource object. */