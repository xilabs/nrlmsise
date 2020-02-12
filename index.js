const nrlmsise = require('./build/Release/nrlmsise');

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

			172,		//	day of year
			0,  	//	year, currently ignored
			29000,	//	seconds in day (UT)
			3.048,	//	altitude in kilometers
			60, 	//  geodetic latitude
			-70,	//	geodetic longitude
			16,		//	local apparent solar time (hours), see note below
			150,	//	81 day average of F10.7 flux (centered on doy)
			150,	//	daily F10.7 flux for previous day
			4,		//	magnetic index(daily)

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
	 * Set a switch
	 *
	 * @param {Number} n the switch index, [0..23]
	 * @param {Number} val the value to set
	 * @throws Error
	 */
	set_switch(n, val) {

		if(n<0 || n>23) throw new Error(`Invalid switch index (${n})`);
		if(val<-1 || val >1) throw new Error("val must be in the range [-1..1]");
		this.parameters[n]=val;
	}


}

module.exports=exports=Nrlmsise;

