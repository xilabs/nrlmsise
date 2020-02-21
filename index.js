const nrlmsise = require('./build/Release/nrlmsise');

/**
 * NRLMSISE-00 for Node.js
 * 
 */
class Nrlmsise {

	constructor() {

		this.parameters= [

			0,		//	0 - output in meters and kilograms instead of centimeters and grams
			1,		//	1 - F10.7 effect on mean
			1,		//	2 - time independent
			1,		//	3 - symmetrical annual
			1,		//	4 - symmetrical semiannual
			1,		//	5 - asymmetrical annual
			1,		//	6 - asymmetrical semiannual
			1,		//	7 - diurnal
			1,		//	8 - semidiurnal
			1,		//	9 - daily ap [when this is set to -1 (!) the pointer ap_a in struct nrlmsise_input must point to a struct ap_array]
			1,		//  10 - all UT/long effects
			1,		//  11 - longitudinal
			1,		//  12 - UT and mixed UT/long
			1,		//  13 - mixed AP/UT/LONG
			1,		//  14 - terdiurnal
			1,		//  15 - departures from diffusive equilibrium
			1,		//  16 - all TINF var
			1,		//  17 - all TLB var
			1,		//  18 - all TN1 var
			1,		//  19 - all S var
			1,		//  20 - all TN2 var
			1,		//  21 - all NLB var
			1,		//  22 - all TN3 var
			1,		//  23 - turbo scale height var

			0,		//	day of year
			0,  	//	year, currently ignored
			0,		//	seconds in day (UT)
			0,		//	altitude in kilometers
			0, 		//  geodetic latitude
			0,		//	geodetic longitude
			0,		//	local apparent solar time (hours), see note below
			0,		//	81 day average of F10.7 flux (centered on doy)
			0,		//	daily F10.7 flux for previous day
			0,		//	magnetic index(daily)

			0,	// These 7 AP values (daily ap) are used when switch 9 is set
			0,
			0,
			0,
			0,
			0,
			0
		];

	}

	gtd7(){

		return nrlmsise.gtd7.apply(null, this.parameters);
	}


	/**
	 * Set daily magnetic index
	 *
	 * @param {Number} val the value to set.
	 * @throws Error e error on error
	 */
	 set ap(val){	return this.set_paramter("ap", val); }


	/**
	 * Set day of year
	 *
	 * @param {Number} val the value to set.
	 * @throws Error e error on error
	 */
	 set doy(val){	return this.set_paramter("doy", val); }

	/**
	 * Set year (currently ignored)
	 *
	 * @param {Number} val the value to set.
	 * @throws Error e error on error
	 */
	 set year(val){	return this.set_paramter("year", val); }

	/**
	 * Set seconds in day (UT)
	 *
	 * @param {Number} val the value to set.
	 * @throws Error e error on error
	 */
	 set sec(val){	return this.set_paramter("sec", val); }

	/**
	 * Set altitude (km)
	 *
	 * @param {Number} val the value to set.
	 * @throws Error e error on error
	 */
	 set alt(val){	return this.set_paramter("alt", val); }

	/**
	 * Set geodetic latitude 
	 *
	 * @param {Number} val the value to set.  
	 * @throws Error e error on error
	 */
	 set g_lat(val){	return this.set_paramter("g_lat", val); }

	/**
	 * Set geodetic longitude
	 *
	 * @param {Number} val the value to set.
	 * @throws Error e error on error
	 */
	 set g_long(val){	return this.set_paramter("g_long", val); }

	/**
	 * Set lst, the local apparent solar time (hours)
	 *
	 * @param {Number} val the value to set.
	 * @throws Error e error on error
	 */
	 set lst(val){	return this.set_paramter("lst", val); }

	/**
	 * Set f107A, the 81 day average of F10.7 flux (centered on doy)
	 *
	 * @param {Number} val the value to set.
	 * @throws Error e error on error
	 */
	 set f107A(val){	return this.set_paramter("f107A", val); }

	/**
	 * Set f107, the daily F10.7 flux for previous day 
	 *
	 * @param {Number} val the value to set.
	 * @throws Error e error on error
	 */
	 set f107(val){	return this.set_paramter("f107", val); }

	/**
	 * Get daily magnetic index
	 *
	 * @return {Number} val the value
	 * @throws Error e error on error
	 */
	 get ap(){	return this.get_paramter("ap"); }

	/**
	 * Get day of year
	 *
	 * @return {Number} val the value
	 * @throws Error e error on error
	 */
	 get doy(){	return this.get_paramter("doy"); }

	/**
	 * Get year (currently ignored)
	 *
	 * @return {Number} val the value
	 * @throws Error e error on error
	 */
	 get year(){	return this.get_paramter("year"); }

	/**
	 * Get seconds in day (UT)
	 *
	 * @return {Number} val the value
	 * @throws Error e error on error
	 */
	 get sec(){	return this.get_paramter("sec"); }

	/**
	 * Get altitude (km)
	 *
	 * @return {Number} val the value
	 * @throws Error e error on error
	 */
	 get alt(){	return this.get_paramter("alt"); }

	/**
	 * Get geodetic latitude 
	 *
	 * @param {Number} val the value
	 * @throws Error e error on error
	 */
	 get g_lat(){	return this.get_paramter("g_lat"); }

	/**
	 * Get geodetic longitude
	 *
	 * @return {Number} val the value
	 * @throws Error e error on error
	 */
	 get g_long(){	return this.get_paramter("g_long"); }

	/**
	 * Get lst, the local apparent solar time (hours)
	 *
	 * @return {Number} val the value
	 * @throws Error e error on error
	 */
	 get lst(){	return this.get_paramter("lst"); }

	/**
	 * Get f107A, the 81 day average of F10.7 flux (centered on doy)
	 *
	 * @return {Number} val the value
	 * @throws Error e error on error
	 */
	 get f107A(){	return this.get_paramter("f107A"); }

	/**
	 * Get f107, the daily F10.7 flux for previous day 
	 *
	 * @return {Number} val the value
	 * @throws Error e error on error
	 */
	 get f107(){	return this.get_paramter("f107"); }

	/**
	 * Set AP array
	 *
	 * Set the AP array containing the following magneticvalues:
	 *   0 : daily AP
	 *   1 : 3 hr AP index for current time
	 *   2 : 3 hr AP index for 3 hrs before current time
	 *   3 : 3 hr AP index for 6 hrs before current time
	 *   4 : 3 hr AP index for 9 hrs before current time
	 *   5 : Average of eight 3 hr AP indicies from 12 to 33 hrs 
	 *           prior to current time
	 *   6 : Average of eight 3 hr AP indicies from 36 to 57 hrs 
	 *           prior to current time 
	 * 
	 * Note this will automatically set switch 9 to -1.  If you go back to an individual AP value, you must manually reset this switch.
	 *
	 * @param {Array} val the ap array to set.  Array must contain 7 numbers.  Values are copied.
	 * @throws Error e error on error
	 */
	 set ap_a(val){

	 	if(Array.isArray(val) && val.length==7) {

	 		for (let n=0; n<7; n++) {
	 			if(typeof(val[n])=="number") {

	 				this.parameters[34+n]=val[n];
	 			} else {

	 				throw new Error("passed array contains something besides a number");
	 			}
	 			this.parameters[9]=-1;	// Turn on daily AP switch
	 		}

	 	} else {

		 	throw new Error("Invalid argument passed - value must be an array of 7 numbers");
	 	}


	 }


	/**
	 * Set switches
	 *
	 * @param {Array} val the array to set.  Array must contain exactly 24 numbers.  Values are copied.
	 * @throws Error e error on error
	 */
	 set switches(val){

	 	if(Array.isArray(val) && val.length==24) {

	 		for (let n=0; n<24; n++) {
	 			if(typeof(val[n])=="number") {

	 				this.parameters[n]=val[n];
	 			} else {

	 				throw new Error("passed array contains something besides a number");
	 			}
	 		}

	 		return;
	 	}

		throw new Error("Invalid argument passed - value must be a number or an array of 7 numbers");
	 }



	/**
	* Get switches array
	*
	* @return {array} sw a copy of the switch values
	*
	* DELETED since it makes it too easy to accidentally "obj.switches[x]=y" etc
	*/
	 // get switches() {

	 // 	let sw=new Array(24);
	 // 	for(let n=0; n< 24; n++) sw[n]=this.parameters[n];
	 // 	return sw;
	 // }


	/**
	 * Set a switch
	 *
	 * @param {Number} n the switch index, [0..23]
	 * @param {Number} val the value to set
	 * @throws Error e error on error
	 */
	set_switch(n, val) {

		if(n<0 || n>23) throw new Error(`Invalid switch index (${n})`);
		if(val<-1 || val >1) throw new Error("val must be in the range [-1..1]");
		this.parameters[n]=val;
	}


	/**
	 * Set a parameter
	 *
	 * @param {String} name the name
	 * @param {Number} val the value to set
	 * @throws Error e error on error
	 */
	set_paramter(name, val) {

		let names=["doy", "year", "sec", "alt", "g_lat", "g_long", "lst", "f107A", "f107", "ap"];
		let idx=names.indexOf(name);
		if(idx==-1) {
			throw new Error("Invalid parameter name: "+name);
			return;
		}

		if(typeof(val)!="number") throw new Error("val must be a number");

		this.parameters[24+idx]=val;
	}


	/**
	 * Get a parameter
	 *
	 * @param {String} name the name
	 * @return {Number} val the value
	 * @throws Error e error on error
	 */
	get_paramter(name) {

		let names=["doy", "year", "sec", "alt", "g_lat", "g_long", "lst", "f107A", "f107", "ap"];
		let idx=names.indexOf(name);
		if(idx==-1) {
			throw new Error("Invalid parameter name: "+name);
			return;
		}

		return this.parameters[24+idx];
	}



}



module.exports=exports=Nrlmsise;

