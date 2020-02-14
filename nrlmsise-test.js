const Nrlmsise=require("./index.js");
const printf=require("printf");

//console.log(`${JSON.stringify(n.gtd7())}`);

// An array for outputs
let output=new Array(17);

// An array with daily magnetic index values:
let aph=[100,100,100,100,100,100,100];

// An array with switches:
let flags=[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

// Create 17 objects and set default values;
let nrlmsise=[];
for (let i=0; i<17; i++){

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
	nrlmsise.push(n);
} 

// Set unique values for some objects:
nrlmsise[1].doy=81;
nrlmsise[2].sec=75000;
nrlmsise[2].alt=1000;
nrlmsise[3].alt=100;
nrlmsise[10].alt=0;
nrlmsise[11].alt=10;
nrlmsise[12].alt=30;
nrlmsise[13].alt=50;
nrlmsise[14].alt=70;
nrlmsise[16].alt=100;
nrlmsise[4].g_lat=0;
nrlmsise[5].g_long=0;
nrlmsise[6].lst=4;
nrlmsise[7].f107A=70;
nrlmsise[8].f107=180;
nrlmsise[9].ap=40;
nrlmsise[15].ap_a=aph;
nrlmsise[16].ap_a=aph;

// Evaluate 0 to 14 (normally we don't worry about setting switch 9 to -1 for 15 and 16 since it happenes automatically when we set ap_a values for those two.  But we have to be careful here to not rest it to 1)
for (let i=0;i<15;i++){			

	nrlmsise[i].switches=flags;
	output[i]=nrlmsise[i].gtd7();
}

flags[9]=-1;

// Evauate 15 and 16
for (let i=15;i<17;i++){			

	nrlmsise[i].switches=flags;
	output[i]=nrlmsise[i].gtd7();
}


	/* output type 1 */
	for (let i=0;i<17;i++) {			
		printf(process.stdout,"\n");
	
		for (let j=0;j<9;j++)
			printf(process.stdout,"%E ",output[i].d[j]);

		printf(process.stdout,"%E ",output[i].t[0]);
		printf(process.stdout,"%E \n",output[i].t[1]);
		/* DL omitted */
	}

	// /* output type 2 */
	for (i=0;i<3;i++) {
		printf(process.stdout,"\n");
		printf(process.stdout,"\nDAY   ");
		for (j=0;j<5;j++)
			printf(process.stdout,"         %3i",nrlmsise[i*5+j].doy);
	
		printf(process.stdout,"\nUT    ");
		for (j=0;j<5;j++)
			printf(process.stdout,"       %5.0f",nrlmsise[i*5+j].sec);

		printf(process.stdout,"\nALT   ");
		for (j=0;j<5;j++)
			printf(process.stdout,"        %4.0f",nrlmsise[i*5+j].alt);

		printf(process.stdout,"\nLAT   ");
		for (j=0;j<5;j++)
			printf(process.stdout,"         %3.0f",nrlmsise[i*5+j].g_lat);
		
		printf(process.stdout,"\nLONG  ");
		for (j=0;j<5;j++)
			printf(process.stdout,"         %3.0f",nrlmsise[i*5+j].g_long);
		
		printf(process.stdout,"\nLST   ");
		for (j=0;j<5;j++)
			printf(process.stdout,"       %5.0f",nrlmsise[i*5+j].lst);
		
		printf(process.stdout,"\nF107A ");
		for (j=0;j<5;j++)
			printf(process.stdout,"         %3.0f",nrlmsise[i*5+j].f107A);
		
		printf(process.stdout,"\nF107  ");
		for (j=0;j<5;j++)
			printf(process.stdout,"         %3.0f",nrlmsise[i*5+j].f107);
		
		printf(process.stdout,"\n\n");
		printf(process.stdout,"\nTINF  ");
		for (j=0;j<5;j++)
			printf(process.stdout,"     %7.2f",output[i*5+j].t[0]);
		
		printf(process.stdout,"\nTG    ");
		for (j=0;j<5;j++)
			printf(process.stdout,"     %7.2f",output[i*5+j].t[1]);
		
		printf(process.stdout,"\nHE    ");
		for (j=0;j<5;j++)
			printf(process.stdout,"   %1.3e",output[i*5+j].d[0]);
		
		printf(process.stdout,"\nO     ");
		for (j=0;j<5;j++)
			printf(process.stdout,"   %1.3e",output[i*5+j].d[1]);
		
		printf(process.stdout,"\nN2    ");
		for (j=0;j<5;j++)
			printf(process.stdout,"   %1.3e",output[i*5+j].d[2]);
		
		printf(process.stdout,"\nO2    ");
		for (j=0;j<5;j++)
			printf(process.stdout,"   %1.3e",output[i*5+j].d[3]);
		
		printf(process.stdout,"\nAR    ");
		for (j=0;j<5;j++)
			printf(process.stdout,"   %1.3e",output[i*5+j].d[4]);
		
		printf(process.stdout,"\nH     ");
		for (j=0;j<5;j++)
			printf(process.stdout,"   %1.3e",output[i*5+j].d[6]);
		
		printf(process.stdout,"\nN     ");
		for (j=0;j<5;j++)
			printf(process.stdout,"   %1.3e",output[i*5+j].d[7]);
		
		printf(process.stdout,"\nANM 0 ");
		for (j=0;j<5;j++)
			printf(process.stdout,"   %1.3e",output[i*5+j].d[8]);
		
		printf(process.stdout,"\nRHO   ");
		for (j=0;j<5;j++)
			printf(process.stdout,"   %1.3e",output[i*5+j].d[5]);
		printf(process.stdout,"\n");
	}
	printf(process.stdout,"\n");
