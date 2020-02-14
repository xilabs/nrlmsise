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

n.doy=172;
n.year=0; /* without effect */
n.sec=29000;
n.alt=400;
n.g_lat=60;
n.g_long=-70;
n.lst=16;
n.f107A=150;
n.f107=150;
n.ap=4;
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
