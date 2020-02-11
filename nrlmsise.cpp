#include <assert.h>
#include <stdio.h>
#include <node_api.h>
#include "nrlmsise-00.h"
#include <string>

// Thanks to https://github.com/nodejs/node-addon-examples 

// I'm only going to check status on things that might be reasonably expected to fail...

char msg[100];

const char* type_name(napi_valuetype vt);

napi_value wrap_gt7d(napi_env env, napi_callback_info info) {

	int n;

	// Set up the nrlmsise structures
	struct nrlmsise_output output;
	struct nrlmsise_input input;
	struct nrlmsise_flags flags;

	// A place to store the args
	size_t argc=34;
	napi_value args[34];

  	// Get arguments
	napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

	// Verify total argument count
  	if(argc != 41) {
  		napi_throw_type_error(env, nullptr, "Wrong number of arguments");
  		return nullptr;
  	}

	// Make sure switch arguments look right, and get them
  	for(n=0; n<24; n++) {

	  	napi_valuetype vt;
  		assert(napi_ok==napi_typeof(env, args[n], &vt));
  		

  		if(vt != napi_boolean) {

  			//std::string msg ("Switches must be boolean");// + std::to_string(n);
  			sprintf(msg,"Switches must be boolean (switch %d is of type %s)",n, type_name(vt));
  			napi_throw_type_error(env, nullptr, msg);
  			return nullptr;
  		}

		bool sw;
  		napi_get_value_bool(env, args[n], &sw);
		flags.switches[n]=sw?1:0;
  	}

	// Make sure the normal arguments look right, and get them
  	for(n=24; n<34; n++) {

	  	napi_valuetype vt;
  		assert(napi_ok==napi_typeof(env, args[n], &vt));

  		if(vt != napi_number) {

  			//std::string msg ("Switches must be boolean");// + std::to_string(n);
  			sprintf(msg,"Argument %d is of type %s, should be Number",n, type_name(vt));
  			napi_throw_type_error(env, nullptr, msg);
  			return nullptr;
  		}

		double param;
  		napi_get_value_double(env, args[n], &param);

  		switch(n){

  			case 24: input.year=(int)param;	// Currently ignored
  			case 25: input.doy=(int)param;
  			case 26: input.sec=param;
  			case 27: input.alt=param;
  			case 28: input.g_lat=param;
  			case 29: input.g_long=param;
  			case 30: input.lst=param;
  			case 31: input.f107A=param;
  			case 32: input.f107=param;
  		}
  	}



  	// Call gtd7
	gtd7(&input, &flags, &output);

	// Build the output object
  	napi_value obj;
  	assert(napi_ok==napi_create_object(env, &obj));

  	// Get densities
  	napi_value d;
  	for (n=0; n<9; n++){
  		assert(napi_ok==napi_create_double(env, output.d[n], &d));
  		switch(n){
  			case 0:	napi_set_named_property(env, obj, "HE", d);
  			case 1:	napi_set_named_property(env, obj, "O", d);
  			case 2:	napi_set_named_property(env, obj, "N2", d);
  			case 3:	napi_set_named_property(env, obj, "O2", d);
  			case 4:	napi_set_named_property(env, obj, "AR", d);
  			case 5:	napi_set_named_property(env, obj, "total", d);
  			case 6:	napi_set_named_property(env, obj, "H", d);
  			case 7:	napi_set_named_property(env, obj, "N", d);
  			case 8:	napi_set_named_property(env, obj, "anomalous_oxygen", d);
  		}
  	}

  	napi_value t;
  	for (n=0; n<2; n++){
  		assert(napi_ok==napi_create_double(env, output.t[n], &t));
  		switch(n){
  			case 0:	napi_set_named_property(env, obj, "exospheric_temperature", t);
  			case 1:	napi_set_named_property(env, obj, "temperature", t);
  		}
  	}


  	return obj;
}

#define DECLARE_NAPI_METHOD(name, func)  {name, 0, func, 0, 0, 0, napi_default, 0 }

napi_value init (napi_env env, napi_value exports) {

  napi_property_descriptor desc = DECLARE_NAPI_METHOD("gtd7", wrap_gt7d);
  napi_define_properties(env, exports, 1, &desc);
  return exports;
}


NAPI_MODULE(NODE_GYP_MODULE_NAME, init);


const char* type_name(napi_valuetype vt) {

	switch(vt){

		case napi_undefined: return "Undefined";
		case napi_null:		 return "Null";
		case napi_boolean:	 return "boolean";
		case napi_number:	 return "Number";
		case napi_string:	 return "String";
		case napi_symbol:	 return "Symbol";
		case napi_object:	 return "object";
		case napi_function:	 return "function";
		case napi_external:	 return "external";
		case napi_bigint:	 return "bigint";
	}

	return "unknown";
}


