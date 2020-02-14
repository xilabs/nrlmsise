#include <assert.h>
#include <stdio.h>
#include <node_api.h>
#include "nrlmsise-00.h"
#include <string>

// Thanks to https://github.com/nodejs/node-addon-examples 

// I'm only going to check status on things that might be reasonably expected to fail...

char msg[100];
//#define DEBUG

const char* type_name(napi_valuetype vt);

napi_value wrap_gt7(napi_env env, napi_callback_info info) {

	int n;
	#define ARGCOUNT 41

	// Set up the nrlmsise structures
	struct nrlmsise_output output;
	struct nrlmsise_input input;
	struct nrlmsise_flags flags;
	struct ap_array ap_array;
	input.ap_a=&ap_array;

	// A place to store the args
	size_t argc=ARGCOUNT;
	napi_value args[ARGCOUNT];

	// Get arguments
	napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

	// Verify total argument count
	if(argc != ARGCOUNT) {
		napi_throw_type_error(env, nullptr, "Wrong number of arguments");
		return nullptr;
	}

	// Make sure switch arguments look right, and get them
	for(n=0; n<24; n++) {

		napi_valuetype vt;
		assert(napi_ok==napi_typeof(env, args[n], &vt));
		
		if(vt != napi_number) {

			sprintf(msg,"Argument %d is of type %s, should be Number",n, type_name(vt));
			napi_throw_type_error(env, nullptr, msg);
			return nullptr;
		}

		int32_t sw;
		napi_get_value_int32(env, args[n], &sw);
		flags.switches[n]=(int)sw;

		#ifdef DEBUG
		printf("switch %d=%d\n",n,sw);
		#endif
	}


	// Make sure the normal arguments look right, and get them
	for(n=24; n<41; n++) {

		napi_valuetype vt;
		assert(napi_ok==napi_typeof(env, args[n], &vt));

		#ifdef DEBUG
		printf("param %d type is %d : ",n,vt);
		#endif


		if(vt != napi_number) {
			sprintf(msg,"Argument %d is of type %s, should be Number",n, type_name(vt));
			napi_throw_type_error(env, nullptr, msg);
			return nullptr;
		}

		double param;
		assert(napi_ok==napi_get_value_double(env, args[n], &param));

		#ifdef DEBUG
		printf("value = %f\n",param);
		#endif

		switch(n){

			case 24: input.doy=(int)param;	break;
			case 25: input.year=(int)param;	break;// Currently ignored
			case 26: input.sec=param;		break;
			case 27: input.alt=param;		break;
			case 28: input.g_lat=param;		break;
			case 29: input.g_long=param;	break;
			case 30: input.lst=param;		break;
			case 31: input.f107A=param;		break;
			case 32: input.f107=param;		break;
			case 33: input.ap=param;		break;
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40: 
					ap_array.a[n-34]=param;	break;
		}
	}



	// Call gtd7
	gtd7(&input, &flags, &output);

	// #ifdef DEBUG
	// int j;
	// for (j=0;j<9;j++)
	// 	printf("%E ",output.d[j]);
	// #endif


	// Build the output object
	napi_value obj;
	assert(napi_ok==napi_create_object(env, &obj));

	// A value to use for holding values
	napi_value val;


	// Get densities
	napi_value d;
	assert(napi_ok==napi_create_array_with_length(env, 9, &d));
	for (n=0; n<9; n++){
		assert(napi_ok==napi_create_double(env, output.d[n], &val));
		assert(napi_ok==napi_set_element(env, d, n, val));
		switch(n){
			case 0:	napi_set_named_property(env, obj, "HE", val);
			case 1:	napi_set_named_property(env, obj, "O", val);
			case 2:	napi_set_named_property(env, obj, "N2", val);
			case 3:	napi_set_named_property(env, obj, "O2", val);
			case 4:	napi_set_named_property(env, obj, "AR", val);
			case 5:	napi_set_named_property(env, obj, "total", val);
			case 6:	napi_set_named_property(env, obj, "H", val);
			case 7:	napi_set_named_property(env, obj, "N", val);
			case 8:	napi_set_named_property(env, obj, "anomalous_oxygen", val);
		}
	}
	napi_set_named_property(env, obj, "d", d);

	napi_value t;
	assert(napi_ok==napi_create_array_with_length(env, 2, &t));

	for (n=0; n<2; n++){
		assert(napi_ok==napi_create_double(env, output.t[n], &val));
		assert(napi_ok==napi_set_element(env, t, n, val));
		switch(n){
			case 0: napi_set_named_property(env, obj, "exospheric_temperature", val);	break;
			case 1:	napi_set_named_property(env, obj, "temperature", val);				break;
		}
	}
	napi_set_named_property(env, obj, "t", t);


	return obj;
}

#define DECLARE_NAPI_METHOD(name, func)  {name, 0, func, 0, 0, 0, napi_default, 0 }

napi_value init (napi_env env, napi_value exports) {

  napi_property_descriptor desc = DECLARE_NAPI_METHOD("gtd7", wrap_gt7);
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


