# NRLMSISE-00 for Node.js

The NRLMSIS-00 empirical atmosphere model was developed by Mike Picone, Alan Hedin, and Doug Drob based on the MSISE90 model.

### Background

The authors of the NRLMSISE-00 model have released a FORTRAN version which is available at http://uap-www.nrl.navy.mil/models_web/msis/msis_home.htm
Based on the Official Beta Release 1.0 (NRLMSISE-00.DIST12.TXT) Dominik Brodowski wrote an implementation in C which is available on http://www.brodo.de/english/pub/nrlmsise/ . This release is based on the Official Beta Release 2.0 
Based on the C version, this Node port was created using source C files can be found at git://git.linta.de/~brodo/nrlmsise-00.git . The C port was converted to C++ and compiled into a NodeJS module using N-API.

The MSISE90 model describes the neutral temperature and densities in Earth's atmosphere from ground to thermospheric heights. Below 72.5 km the model is primarily based on the MAP Handbook (Labitzke et al., 1985) tabulation of zonal average temperature and pressure by Barnett and Corney, which was also used for the CIRA-86. Below 20 km these data were supplemented with averages from the National Meteorological Center (NMC). In addition, pitot tube, falling sphere, and grenade sounder rocket measurements from 1947 to 1972 were taken into consideration. Above 72.5 km MSISE-90 is essentially a revised MSIS-86 model taking into account data derived from space shuttle flights and newer incoherent scatter results. For someone interested only in the
thermosphere (above 120 km), the author recommends the MSIS-86 model. MSISE is also not the model of preference for specialized tropospheric work. It is rather for studies that reach across several atmospheric boundaries. (quoted from http://nssdc.gsfc.nasa.gov/space/model/atmos/nrlmsise00.html)


### Installation and testing
```bash
$ npm install
$ npm run install
$ npm run test
```


### Usage example
```node
let Nrlmsise=require("nrlmsise");

let n=new Nrlmsise();

n.doy=172;		/* day of year */
n.year=0; 		/* year, currently ignored */
n.sec=29000;	/* seconds in day (UT) */
n.alt=400;		/* altitude in kilometers */
n.g_lat=60;		/* geodetic latitude */
n.g_long=-70;	/* seconds in day (UT) */
n.lst=16;		/* local apparent solar time (hours), see note below */
n.f107A=150;	/* 81 day average of F10.7 flux (centered on doy) */
n.f107=150;		/* daily F10.7 flux for previous day */
n.ap=4;			/* magnetic index(daily) */
n.switches=[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];	// Actually unnecessary, since this is the default.  We could also use n.set_switch(n, val)

console.log(JSON.stringify(n.gtd7()));

```
output: 
```json
{
  "HE": 666517.690495152,
  "O": 113880555.97522168,
  "N2": 19982109.255734544,
  "O2": 402276.3585712511,
  "AR": 3557.464994515886,
  "total": 4.074713532757222e-15,
  "H": 34753.12399717142,
  "N": 4095913.2682930017,
  "anomalous_oxygen": 26672.73209335869,
  "d": [
    666517.690495152,
    113880555.97522168,
    19982109.255734544,
    402276.3585712511,
    3557.464994515886,
    4.074713532757222e-15,
    34753.12399717142,
    4095913.2682930017,
    26672.73209335869
  ],
  "exospheric_temperature": 1250.5399435607994,
  "temperature": 1241.4161300191206,
  "t": [
    1250.5399435607994,
    1241.4161300191206
  ]
}
```

### Notes on input variables (from nrlmsise-00.h):
UT, Local Time, and Longitude are used independently in the model and are not of equal importance for every situation.  For the most physically realistic calculation these three variables should be consistent (lst=sec/3600 + g_long/15). The Equation of Time departures from the above formula for apparent local time can be included if available but are of minor importance.
f107 and f107A values used to generate the model correspond to the 10.7 cm radio flux at the actual distance of the Earth from the Sun rather than the radio flux at 1 AU.  The following site provides both classes of values: ftp://ftp.ngdc.noaa.gov/STP/SOLAR_DATA/SOLAR_RADIO/FLUX/
f107, f107A, and ap effects are neither large nor well established below 80 km and these parameters should be set to 150., 150., and 4. respectively.


### Notes
do *not* try to set switches directly, it won't work.  
```
nrlmsise.switches[5]=0;						// Error
nrlmsise.set_switch(5,0);					// Do this instead
nrlmsise.switches=[1,2,3,4 /* ,... */, 24]; // or this
```

gt7d() is not implemented - send me a message if you would like it added, I just haven't done it yet...

### Code documentation
<a name="Nrlmsise"></a>

## Nrlmsise
NRLMSISE-00 for Node.js

**Kind**: global class  

* [Nrlmsise](#Nrlmsise)
    * [.ap](#Nrlmsise+ap)
    * [.doy](#Nrlmsise+doy)
    * [.year](#Nrlmsise+year)
    * [.sec](#Nrlmsise+sec)
    * [.alt](#Nrlmsise+alt)
    * [.g_lat](#Nrlmsise+g_lat)
    * [.g_long](#Nrlmsise+g_long)
    * [.lst](#Nrlmsise+lst)
    * [.f107A](#Nrlmsise+f107A)
    * [.f107](#Nrlmsise+f107)
    * [.ap](#Nrlmsise+ap) ⇒ <code>Number</code>
    * [.doy](#Nrlmsise+doy) ⇒ <code>Number</code>
    * [.year](#Nrlmsise+year) ⇒ <code>Number</code>
    * [.sec](#Nrlmsise+sec) ⇒ <code>Number</code>
    * [.alt](#Nrlmsise+alt) ⇒ <code>Number</code>
    * [.g_lat](#Nrlmsise+g_lat)
    * [.g_long](#Nrlmsise+g_long) ⇒ <code>Number</code>
    * [.lst](#Nrlmsise+lst) ⇒ <code>Number</code>
    * [.f107A](#Nrlmsise+f107A) ⇒ <code>Number</code>
    * [.f107](#Nrlmsise+f107) ⇒ <code>Number</code>
    * [.ap_a](#Nrlmsise+ap_a)
    * [.switches](#Nrlmsise+switches)
    * [.set_switch(n, val)](#Nrlmsise+set_switch)
    * [.set_paramter(name, val)](#Nrlmsise+set_paramter)
    * [.get_paramter(name)](#Nrlmsise+get_paramter) ⇒ <code>Number</code>

<a name="Nrlmsise+ap"></a>

### nrlmsise.ap
Set daily magnetic index

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| val | <code>Number</code> | the value to set. |

<a name="Nrlmsise+doy"></a>

### nrlmsise.doy
Set day of year

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| val | <code>Number</code> | the value to set. |

<a name="Nrlmsise+year"></a>

### nrlmsise.year
Set year (currently ignored)

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| val | <code>Number</code> | the value to set. |

<a name="Nrlmsise+sec"></a>

### nrlmsise.sec
Set seconds in day (UT)

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| val | <code>Number</code> | the value to set. |

<a name="Nrlmsise+alt"></a>

### nrlmsise.alt
Set altitude (km)

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| val | <code>Number</code> | the value to set. |

<a name="Nrlmsise+g_lat"></a>

### nrlmsise.g\_lat
Set geodetic latitude

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| val | <code>Number</code> | the value to set. |

<a name="Nrlmsise+g_long"></a>

### nrlmsise.g\_long
Set geodetic longitude

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| val | <code>Number</code> | the value to set. |

<a name="Nrlmsise+lst"></a>

### nrlmsise.lst
Set lst, the local apparent solar time (hours)

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| val | <code>Number</code> | the value to set. |

<a name="Nrlmsise+f107A"></a>

### nrlmsise.f107A
Set f107A, the 81 day average of F10.7 flux (centered on doy)

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| val | <code>Number</code> | the value to set. |

<a name="Nrlmsise+f107"></a>

### nrlmsise.f107
Set f107, the daily F10.7 flux for previous day

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| val | <code>Number</code> | the value to set. |

<a name="Nrlmsise+ap"></a>

### nrlmsise.ap ⇒ <code>Number</code>
Get daily magnetic index

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Returns**: <code>Number</code> - val the value  
**Throws**:

- Error e error on error

<a name="Nrlmsise+doy"></a>

### nrlmsise.doy ⇒ <code>Number</code>
Get day of year

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Returns**: <code>Number</code> - val the value  
**Throws**:

- Error e error on error

<a name="Nrlmsise+year"></a>

### nrlmsise.year ⇒ <code>Number</code>
Get year (currently ignored)

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Returns**: <code>Number</code> - val the value  
**Throws**:

- Error e error on error

<a name="Nrlmsise+sec"></a>

### nrlmsise.sec ⇒ <code>Number</code>
Get seconds in day (UT)

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Returns**: <code>Number</code> - val the value  
**Throws**:

- Error e error on error

<a name="Nrlmsise+alt"></a>

### nrlmsise.alt ⇒ <code>Number</code>
Get altitude (km)

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Returns**: <code>Number</code> - val the value  
**Throws**:

- Error e error on error

<a name="Nrlmsise+g_lat"></a>

### nrlmsise.g\_lat
Get geodetic latitude

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| val | <code>Number</code> | the value |

<a name="Nrlmsise+g_long"></a>

### nrlmsise.g\_long ⇒ <code>Number</code>
Get geodetic longitude

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Returns**: <code>Number</code> - val the value  
**Throws**:

- Error e error on error

<a name="Nrlmsise+lst"></a>

### nrlmsise.lst ⇒ <code>Number</code>
Get lst, the local apparent solar time (hours)

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Returns**: <code>Number</code> - val the value  
**Throws**:

- Error e error on error

<a name="Nrlmsise+f107A"></a>

### nrlmsise.f107A ⇒ <code>Number</code>
Get f107A, the 81 day average of F10.7 flux (centered on doy)

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Returns**: <code>Number</code> - val the value  
**Throws**:

- Error e error on error

<a name="Nrlmsise+f107"></a>

### nrlmsise.f107 ⇒ <code>Number</code>
Get f107, the daily F10.7 flux for previous day

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Returns**: <code>Number</code> - val the value  
**Throws**:

- Error e error on error

<a name="Nrlmsise+ap_a"></a>

### nrlmsise.ap\_a
Set AP array

Set the AP array containing the following magneticvalues:
  0 : daily AP
  1 : 3 hr AP index for current time
  2 : 3 hr AP index for 3 hrs before current time
  3 : 3 hr AP index for 6 hrs before current time
  4 : 3 hr AP index for 9 hrs before current time
  5 : Average of eight 3 hr AP indicies from 12 to 33 hrs 
          prior to current time
  6 : Average of eight 3 hr AP indicies from 36 to 57 hrs 
          prior to current time 

Note this will automatically set switch 9 to -1.  If you go back to an individual AP value, you must manually reset this switch.

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| val | <code>Array</code> | the ap array to set.  Array must contain 7 numbers.  Values are copied. |

<a name="Nrlmsise+switches"></a>

### nrlmsise.switches
Set switches

**Kind**: instance property of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| val | <code>Array</code> | the array to set.  Array must contain exactly 24 numbers.  Values are copied. |

<a name="Nrlmsise+set_switch"></a>

### nrlmsise.set\_switch(n, val)
Set a switch

**Kind**: instance method of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | the switch index, [0..23] |
| val | <code>Number</code> | the value to set |

<a name="Nrlmsise+set_paramter"></a>

### nrlmsise.set\_paramter(name, val)
Set a parameter

**Kind**: instance method of [<code>Nrlmsise</code>](#Nrlmsise)  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name |
| val | <code>Number</code> | the value to set |

<a name="Nrlmsise+get_paramter"></a>

### nrlmsise.get\_paramter(name) ⇒ <code>Number</code>
Get a parameter

**Kind**: instance method of [<code>Nrlmsise</code>](#Nrlmsise)  
**Returns**: <code>Number</code> - val the value  
**Throws**:

- Error e error on error


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name |


