const nrlmsise = require('./build/Release/nrlmsise');

class Nrlmsise {

	constructor() {

		this.switches=[

			true, // *    0 - output in meters and kilograms instead of centimeters and grams
			true, // *    1 - F10.7 effect on mean
			true, // *    2 - time independent
			true, // *    3 - symmetrical annual
			true, // *    4 - symmetrical semiannual
			true, // *    5 - asymmetrical annual
			true, // *    6 - asymmetrical semiannual
			true, // *    7 - diurnal
			true, // *    8 - semidiurnal
			true, // *    9 - daily ap [when this is set to -1 (!) the pointer
				  // *                  ap_a in struct nrlmsise_input must
				  // *                  point to a struct ap_array]
			true, // *   10 - all UT/long effects
			true, // *   11 - longitudinal
			true, // *   12 - UT and mixed UT/long
			true, // *   13 - mixed AP/UT/LONG
			true, // *   14 - terdiurnal
			true, // *   15 - departures from diffusive equilibrium
			true, // *   16 - all TINF var
			true, // *   17 - all TLB var
			true, // *   18 - all TN1 var
			true, // *   19 - all S var
			true, // *   20 - all TN2 var
			true, // *   21 - all NLB var
			true, // *   22 - all TN3 var
			true  // *   23 - turbo scale height var
		];

		// Somewhat arbitrary defaults come from the test
		this.doy=172;
		this.year=0; /* without effect */
		this.sec=29000;
		this.alt=3.048;
		this.g_lat=60;
		this.g_long=-70;
		this.lst=16;
		this.f107A=150;
		this.f107=150;
		this.ap=4;

		this.ap_array=[null,null,null,null,null,null,null];
	}

	gtd7(){


		return nrlmsise.gtd7(
			this.switches[0],
			this.switches[1],
			this.switches[2],
			this.switches[3],
			this.switches[4],
			this.switches[5],
			this.switches[6],
			this.switches[7],
			this.switches[8],
			this.switches[9],
			this.switches[10],
			this.switches[11],
			this.switches[12],
			this.switches[13],
			this.switches[14],
			this.switches[15],
			this.switches[16],
			this.switches[17],
			this.switches[18],
			this.switches[19],
			this.switches[20],
			this.switches[21],
			this.switches[22],
			this.switches[23],
			this.doy,
			this.year,
			this.sec,
			this.alt,
			this.g_lat,
			this.g_long,
			this.lst,
			this.f107A,
			this.f107,
			this.ap,
			this.ap_array[0],
			this.ap_array[1],
			this.ap_array[2],
			this.ap_array[3],
			this.ap_array[4],
			this.ap_array[5],
			this.ap_array[6]
			);
	}




	/**
	 * Set a switch
	 *
	 * @param {Number} n the switch index, [0..23]
	 * @param {boolean} val the value to set
	 * @throws Error
	 */
	set_switch(n, val) {

		if(typeof(val)!="boolean") throw new Error("Value must be boolean");
		if(n<0 || n>23) throw new Error(`Invalid switch index (${n})`);

		this.switches[n]=val;
	}


}

let n=new Nrlmsise();

console.log(`${JSON.stringify(n.gtd7())}`);