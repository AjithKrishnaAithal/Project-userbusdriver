	var wsurl = 'wss://ajithkserver.herokuapp.com/'; 
	/* var wsurl = 'ws://localhost:3000'; */
	var httpurl = 'http://192.168.1.104:3000';
	var curtime = new Date();
	var changetime = new Date();	
	
	var ws;
	var val22= true;
	var cd=3;
	var trigtog = false;
	var map, marker;
	var usertype = 2;
	var loc = [0, 0];
	var text1;
	var t,da,td;
	var mapq;
	var nearval;
	var dataserver;
	var act;
      var element = document.getElementById('geolocation');
		var serverResponse = document.getElementById('serverResponse');
		var trigname = document.getElementById('trig');
		var mySelect = document.getElementById('mySelect');
		document.getElementById('pan2').style.visibility = "hidden";
		document.getElementById('sample').style.visibility = "hidden";
		/* document.getElementById('sample12').style.visibility = "hidden"; */
		var p =document.getElementById('p');
		var p4 =document.getElementById('p4');
			var p5 =document.getElementById('p5');

	var buses = ['','Basaveshwara College','Kadirenahalli Cross','1st Cross Magadi Road','AGS Layout Arehalli',
				 'AGS Layout Cross','Banashankari','Bangalore High School','Bank Colony','Basavanagudi Police Station',
				 'Bashyam Circle (Rajajinagar)','Binny Mill','Binnypet','C R Police Ground','Chamarajapete',
				 'Chikkallasandra Aralimara','Chikkallasandra Bus Stand','Corporation','Dayananda Sagar College',
				 'Deepak Nursing Home','Devegowda Petrol Bunk','Gandhi Bazaar','Ganesha Bhavan','Gowdana Palya',
				 'Hanumanthangara Ward Office','Hoskerehalli Cross','Hunase Mara','Hunasemara Magadi Road',
				 'Indira Nursing Home','Ittamadu','Janatha Bazaar Banashankari','Jayanagar 6th Block','K R Market',
				 'K R circle','KEB Subramanyapura','KIMS','Kadirenahalli Cross ','Kaveri Nagara','Kempegowda Bus Station',
				 'Kohinoor Ground','Kumaraswamy Layout','Kumaraswamy Layout Police Station ','M M Industries',
				 'Magadi Road 10th Cross','Magadi Road 5th Cross','Mahalakshmi Layout','Mahalakshmi Layout Entrance',
				 'Maharanis College','Mahila Seva Samaja','Makkalakoota','Maruthi Circle','Monotype corporation','Mysore Bank',
				 'N R Colony','Nanda Talkies','National College','Navarang Talkies','Netakallappa Circle','Old Police station Rajajinagar',
				 'Padmanabha Nagara','Police Station Subramanyapura','Prarthana School','Prasanna Theatre','Rajajinagar 1st Block',
				 'Rajajinagar 1st Block(Diacon Hospital)','Rajajinagar 6th Block','Rajajinagar ESI Hospital','Ramakrishna Asharama',
				 'Rayan Circle','SLV Bakery','ST Marthas Hospital','Seetha Circle','Shasthri Bekary','Sirsi Circle','South End Circle',
				 'Srinivasa Kalyana Mantapa','Srinivasa Nagar','Srinivasa Temple','Subramanya Swamy Temple','Tata Silk Farm ',
				 'Thyagaraja Nagara','Town Hall','Uttarahalli','Vasanthapura','Vasanthapura Temple','Water Tank Chamarajpet','Yadalamma Nagara',
				 'Yarab Nagara ','Yediyur','post office Subramanyapura',
				
				 /*  'Mangaldevi jewellary','manjunath chats','1st house','green figo house','selvan house tamil',
				  'Nokia guy','1st swift','coconut guy house','dead end road','nandini milk booth','Ravi- tailor',
				  'Ashu house','Orange house','2070 house','Real estate end road' */
				  '601Pg coordinator room','602hod chamber','6031st class','604computer ise lab','6052nd class','6063rd class','607staff room 1','608staff room 3-shiv','Lift 1'
			
				 ];

	buses.forEach( function( i, j){
			var soption = document.createElement( "option");
			soption.value = i;
			soption.text = i;
			mySelect.appendChild( soption);
		});

		var buslen=buses.length;
	function onSuccess(position) {
		loc[0] = position.coords.latitude; 
		loc[1] = position.coords.longitude;
		con();
		
	}
function onError(error) {
		alert('code: '    + error.code    + '\n' +
			  'message: ' + error.message + '\n');
			  document.getElementById("p").innerHTML = 'code: '    + error.code    + '\n' + 'message: ' + error.message + '\n';
	}

	function getbus(){
		if (trigtog == false) {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
		trigtog = true;
		trigname.value = 'GetBus';
	} else {
		ws.close();
		ws = false;
		trigtog = false;
		trigname.value = 'GetBus';
		/* document.getElementById('sample12').style.visibility = "hidden";  */
	}
	}
	
		function liststops1(){
		document.getElementById('sample12').style.visibility = "visible";
		
		submit();
		var nameList="";
		
			function submit()
		{
			liststops.forEach(function(i,j)
			{
				nameList += "<li>" + liststops[j] + "</li>";
				console.log(liststops[j]);
				document.getElementById("sample12").innerHTML = nameList;
			});
		
		}
		
	}

function speak() {
		document.getElementById('pan2').style.visibility = "hidden";
		document.getElementById('sample').style.visibility = "hidden";
		document.getElementById('sample12').style.visibility = "hidden"; 

		 if(mySelect.value != "")
		 {
			 getbus();
			}
			else{
                var maxMatches = 5;
                var promptString = "Speak now";	// optional
                var language = "en-US";		
				// optional
                window.plugins.speechrecognizer.startRecognize(function(result){
				console.log('Inside function');					
					document.getElementById("p").innerHTML = result[0];
					for(var i=1;i<=buslen;i++)
					{	
						for (var k=0;k<=4;k++) {
							if(result[k].toLowerCase() == buses[i].toLowerCase()){
								text1 = buses[i];
								getbus();
								break;
							}
						}
					}
					text = "";
				}			 
                , function(errorMessage){
                    console.log("Error message: " + errorMessage);
                }, maxMatches, promptString, language);
            }
	 }
	 
	 
var init_center = new google.maps.LatLng(12.9775140, 77.5717800);

var map = new google.maps.Map(document.getElementById('sample'), {
	zoom: 12,
	center: init_center,
	mapTypeId: google.maps.MapTypeId.ROADMAP
});

var marker = new google.maps.Marker({
	position: init_center,
	map: map,
	icon: {
          url: "buspic.png",
       /*    size: {
          width: 60,
          height: 65
        } */
      }
});

function moveMarker( map, marker, lat, lng) {
	loadMap();
        marker.setPosition( new google.maps.LatLng( lat, lng ) );
        map.panTo( new google.maps.LatLng( lat, lng ) );
};

var path = [];
var liststops =[];

function loadMap() {
			
			var busnumbers2 = [ "77", "45D", "210P", "15E", "210E", "demo123"];
			var uni;
			var len = path1.length-2;
			
			busnumbers2.forEach( function( k, l){
						if(k==mapq){
							uni=l;
							path = path1[uni];
							liststops = names_buspath[uni];
							len = path.length;
						}
						
					});
					
	
					
	var lat=[];
    var lng=[];
	for( var j=0; j<len; j++){
	
	var lat1 = path[j][0];
	var lng1 = path[j][1];
	lat.push(lat1);
	lng.push(lng1);	
	}
	
	var poly = [];
    for (var j=0;j<lat.length;j++){
        var pos = new google.maps.LatLng(lat[j],lng[j])
        poly.push(pos);
    }

    console.log(poly);

    var Path = new google.maps.Polyline({
        path: poly,
        geodesic: true,
        strokeColor: '#ff004c',
        strokeOpacity: 1.0,
        strokeWeight: 5
    });
    Path.setMap(map);

}

	 
		/* function sp(){
		if(data[3] == "Bus Not available!")
		{
				serverResponse.innerHTML+="Live Bus Details : "+ data[3][0] +'<hr/>';
		}
		else if(data[4] < 1){
			dataserver = data[4];
			da = (((data[4]) * 1000).toFixed(3));
			document.getElementById("p4").innerHTML = data[5] +"data5 before";
			t = ((data[5]) * 60);
			
			if(t<1){ 
				t*=60;
				t=t.toFixed()
				serverResponse.innerHTML+="Live Bus Details : " +da+ "Metres"+'<hr/>' + "Bus Arrival Time : " + t + "Seconds" +'<hr/>';
			}
			else{
				t=t.toFixed()
				serverResponse.innerHTML+="Live Bus Details : " +da+ "Metres"+'<hr/>' + "Bus Arrival Time : " + t + "Minutes" +'<hr/>';
			}
			
		}else if(data[4] > 1){
			dataserver = data[4];
			da = ((data[4]).toFixed(2));
			 t=(((data[5] * 60)).toFixed());
			serverResponse.innerHTML+="Live Bus Details : " +da + "Kilo Metres"+'<hr/>' + "Bus Arrival Time : " + t + "Minutes" +'<hr/>';
			}
			
		} */

function con() {
	ws = new WebSocket(wsurl);

	ws.onopen = ws_onopen;

	ws.onmessage = ws_onmessage;


}

function ws_onopen() {	
	
	if(mySelect.value != "")
		{
		this.send( JSON.stringify([ usertype, mySelect.value]));
		}
		else if(text1.length >0){
			this.send( JSON.stringify([ usertype, text1]));
			text1="";
		}
		this.send(JSON.stringify( loc));

}

function ws_onmessage(event) {
	var data = JSON.parse(event.data);
	changetime.setHours(curtime.getHours(data[4]));
	element.innerHTML = loc + curtime;
	document.getElementById('pan2').style.visibility = "visible";
		document.getElementById('sample').style.visibility = "visible";
	/* serverResponse.innerHTML = data + ',' + changetime + '<hr/>'; */
	mapq = data[0];
	
		var d = "Bus Number is : " + data[0] +","+'<hr/>'+ 
									"Nearest Bus Stop is : " + data[1] + ","+ '<hr/>' + 
									"Distance to nearest Bus Stop is : " +(Math.round((data[2]) * 1000)) + " Metres," +'<hr/>';

					serverResponse.innerHTML = d;	
					
						sp();
		function sp()
		{	
		cd--;
				if( data[3] == 'Bus not found!'){
					serverResponse.innerHTML+="Live Bus Details : "+ data[3][0] +'<hr/>';
				}
					else if(data[3] !== 'Bus not found!'){ 
						if(data[4] < 1){	
								da = (((data[4]) * 1000).toFixed(3));
								t = ((data[5]) * 60);
							
								if((da < 3)||(da == 3) || (da == 2)|| (da == 2)|| (da == 1)){
									t=t.toFixed()
									serverResponse.innerHTML+="Live Bus Details : " +da+ "Metres"+'<hr/>' + "Bus Arrival Time : " + t + "Minutes" +'<hr/>';
									moveMarker( map, marker, data[6], data[7]);
									var arrived = "Bus Number is : " + data[0] + " Bus arrival time is " + data[5]+ "And it is arrived";
									trigtog = false;
									responsiveVoice.speak(arrived.toString());
								}
								else if(da < 10 && da >3){
									t=t.toFixed()
									serverResponse.innerHTML+="Live Bus Details : " +da+ "Metres"+'<hr/>' + "Bus Arrival Time : " + t + "Minutes" +'<hr/>';
									moveMarker( map, marker, data[6], data[7]);
									var arrived = "Bus Number is : " + data[0] + " Bus arrival time is " + data[5]+ "Bus is Near you";
									trigtog = false;
									responsiveVoice.speak(arrived.toString());
								}
								else if(da > 10){
									t=t.toFixed()
									serverResponse.innerHTML+="Live Bus Details : " +da+ "Metres"+'<hr/>' + "Bus Arrival Time : " + t + "Minutes" +'<hr/>';
									moveMarker( map, marker, data[6], data[7]);
										ak();
									function ak(){
										console.log("ak 10 loop");
										if(val22==true){
											console.log("Inside 1st val loop");
											var arrived = "Bus Number is : " + data[0] + " Bus arrival time is " + data[5];
												responsiveVoice.speak(arrived.toString());
												val22=false;
										}
										if(val22==false){
											console.log("ak 100 loop");
											if(cd == 0){
												val22=true;
												cd = 2;
												console.log(cd);
											}
										}
										
									}
								}
							
						}
						
						else if(data[4] > 1){
						
						da = ((data[4]).toFixed(2));
						 t=(((data[5] * 60)).toFixed());
						 
						serverResponse.innerHTML+="Live Bus Details : " +da + "Kilo Metres"+'<hr/>' + "Bus Arrival Time : " + t + "Minutes" +'<hr/>';
						moveMarker( map, marker, data[6], data[7]);
							ak();
						function ak(){
										console.log("ak loop");
										if(val22==true){
											console.log("Inside 1st val loop");
											var arrived = "Bus Number is : " + data[0] + " Bus arrival time is " + t;
												responsiveVoice.speak(arrived.toString());
												val22=false;
										}
										if(val22==false){
											console.log("Inside false akkkk loop");
											console.log(cd);
											if(cd == 0){
												console.log(cd + "inside true");
												val22=true;
												cd = 2;
											}
										}
										
									}
						}
					}

}

	
	//this.close();
	console.log(data);
	// responsiveVoice.speak(data.toString());
}


path1 =	[ [[12.9601640,77.5771710],[12.9604050,77.5679080],[12.9603320,77.5635760],[12.9603740,77.5591400],[12.9627700,77.5602270],
				[12.9646730,77.5616980],[12.9705690,77.5662110],[12.9753510,77.5649530],[12.9756390,77.5624400],[12.9757190,77.5603380],
				[12.9756200,77.5564470],[12.9754730,77.5523230],[12.9796160,77.5535870],[12.9844960,77.5542030],[12.9893220,77.5543040],
				[12.9904590,77.5524670],[12.9944000,77.5527460],[12.9982650,77.5509130],[13.0036200,77.5499650],[13.0044750,77.5489430],
				[13.0077470,77.5479640],[13.0082420,77.5450980],[13.0118900,77.5440210]],
	
				[[12.9124380, 77.5370250],[12.9135280, 77.5408780],[12.9195370, 77.5422220],[12.9212090, 77.5431530],[12.9239970, 77.5436310],
				 [12.9257990, 77.5442310],[12.9283120, 77.5457500],[12.9329470, 77.5454440],[12.9370780, 77.5487860],[12.9386390, 77.5531000],
				 [12.9381020, 77.5570960],[12.9434440, 77.5584910],[12.9435480, 77.5616760],[12.9440820, 77.5642300],[12.9465780, 77.5641920],
				 [12.9473530, 77.5663180],[12.9490090, 77.5676450],[12.9518040, 77.5674670],[12.9572090, 77.5680760],[12.9580420, 77.5738000],
				 [12.9614990, 77.5752540],[12.9638110, 77.5843410],[12.9684130, 77.5866790],[12.9726740, 77.5817610],[12.9775060, 77.5729120]],
	
				[[12.9150750,77.5520280],[12.9120660,77.5523500],[12.9114970,77.5556990],[12.9118340,77.5584700],[12.9182590,77.5596680],
				 [12.9227270,77.5602720],[12.9263660,77.5610140],[12.9292270,77.5644160],[12.9322670,77.5676920],[12.9379380,77.5689480],
				 [12.9396620,77.5723900],[12.9412930,77.5736480],[12.9457710,77.5706470],[12.9490090,77.5676450],[12.9518040,77.5674670],
				 [12.9572090,77.5680760],[12.9580420,77.5738000],[12.9614990,77.5752540],[12.9638110,77.5843410],[12.9684130,77.5866790],
				 [12.9726740,77.5817610],[12.9775140,77.5717800]],
				
				[[12.9775140,77.5717800],[12.977050,77.5859420],[12.9747260,77.5869100],[12.9696250,77.5871940],[12.9672410,77.5882810],
				 [12.9635760,77.5842610],[12.9636680,77.5773680],[12.9566100,77.5738330],[12.9536110,77.5738700],[12.9493340,77.5738150],
				 [12.9412720,77.5738210],[12.9358930,77.5738590],[12.9290630,77.5736960],[12.9231950,77.5736120],[12.9215590,77.5709810],
				 [12.9197310,77.5693550],[12.9167880,77.5690660],[12.9136800,77.5672650],[12.9094690,77.5652320],
				 [12.9053260,77.5628040],[12.9032410,77.5616730]],
	
				[[12.9775140,77.5717800],[12.977050,77.5859420],[12.9747260,77.5869100],[12.9672410,77.5882810],[12.9635760,77.5842610],
				 [12.9636680,77.5773680],[12.9566100,77.5738330],[12.9536110,77.5738700],[12.9493340,77.5738150],[12.9412720,77.5738210],
				 [12.9362400,77.5801900],[12.9324710,77.5802850],[12.9308740,77.5780760],[12.9308430,77.5764020],[12.9258890,77.5772330],
				 [12.9196980,77.5742280],[12.9173980,77.5729630],[12.9136800,77.5672650],[12.9115400,77.5581920],[12.9115290,77.5559830],
				 [12.9115040,77.5520140],[12.9051090,77.5433920],[12.9010030,77.5440530],[12.8987110,77.5440260],[12.8973450,77.5467550],
				 [12.8963710,77.5484260],[12.8962310,77.5526260],[12.8949320,77.5528350]],
				 
				 [[12.95487,77.574214],[12.9549,77.574171],[12.954903,77.574161],[12.954974,77.574129],[12.95516,77.574147],[12.955311,77.574195],[12.95533,77.574191],[12.955331,77.574191],[12.955335,77.57419]],
				 
				 
				 ];
				 
				 var names_buspath = [
						['K R Market','Rayan Circle','Water Tank Chamarajpet','Sirsi Circle','C R Police Ground','Binnypet','Binny Mill',
				   'Hunasemara Magadi Road','1st Cross Magadi Road','Magadi Road 5th Cross','Magadi Road 10th Cross',
				   'Prasanna Theatre','Rajajinagar 6th Block','Bashyam Circle (Rajajinagar)','Old Police station Rajajinagar',
				   'Rajajinagar ESI Hospital','Basaveshwara College','Navarang Talkies','Rajajinagar 1st Block(Diacon Hospital)',
				   'Rajajinagar 1st Block','Mahalakshmi Layout Entrance','Srinivasa Temple','Mahalakshmi Layout'],
	
				['AGS Layout Arehalli','AGS Layout Cross','Ittamadu','SLV Bakery','Ittamadu','Srinivasa Kalyana Mantapa','Janatha Bazaar Banashankari',
				 'Hoskerehalli Cross','Seetha Circle','Bank Colony','Srinivasa Nagar','Maruthi Circle','Subramanya Swamy Temple','Ganesha Bhavan',
				 'Hanumanthangara Ward Office','Kohinoor Ground','Ramakrishna Asharama','Bangalore High School','Chamarajapete',
				 'Makkalakoota','K R Market','Town Hall','Corporation','Mysore Bank','Kempegowda Bus Station'],
				
				['Chikkallasandra Bus Stand','Chikkallasandra Aralimara','Gowdana Palya','Prarthana School','Padmanabha Nagara','Devegowda Petrol Bunk',
				 'KIMS','Indira Nursing Home','Thyagaraja Nagara','N R Colony','Netakallappa Circle','Basavanagudi Police Station','Gandhi Bazaar',
				 'Ramakrishna Asharama','Bangalore High School','Chamarajapete','Makkalakoota','K R Market','Town Hall','Corporation',
				 'Mysore Bank','Kempegowda Bus Station'],
				
				['Kempegowda Bus Station','Maharanis College','K R circle','ST Marthas Hospital','Corporation','Town Hall','K R Market',
				 'Makkalakoota','Mahila Seva Samaja','National College','Basavanagudi Police Station','Tata Silk Farm ',
				 'M M Industries','Shasthri Bekary','Monotype corporation','Kaveri Nagara','Yarab Nagara ','Kadirenahalli Cross',
				 'Dayananda Sagar College','Kumaraswamy Layout Police Station ','Kumaraswamy Layout'],
	
				['Kempegowda Bus Station','Maharanis College','K R circle','Corporation','Town Hall','K R Market','Makkalakoota','Mahila Seva Samaja',
				 'National College','Basavanagudi Police Station','South End Circle','Nanda Talkies','Jayanagar 6th Block','Yediyur','Deepak Nursing Home',
				 'Hunase Mara','Banashankari','Kadirenahalli Cross','Prarthana school','Gowdana Palya','Chikkallasandra Aralimara','Uttarahalli',
				 'Police Station Subramanyapura','post office Subramanyapura','KEB Subramanyapura','Yadalamma Nagara','Vasanthapura Temple','Vasanthapura'],
				 
/* 				 ['a1','b2','c3','d4','e5','f6','g7','h8','i9','j10','k11','l12','m13','n14','o15','p16','q17','r18','s19','t20','u21','v22','w23',
				 'x24','y25','z26','27','28','29','30','31','32'] */
				
				/* ['Mangaldevi jewellary','manjunath chats','1st house','green figo house',
				'selvan house tamil','Nokia guy','1st swift','coconut guy house','dead end road','nandini milk booth',
				'Ravi- tailor','Ashu house','Orange house','2070 house','Real estate end road'
				]  */
				
				['601Pg coordinator room','602hod chamber','6031st class','604computer ise lab','6052nd class','6063rd class','607staff room 1','608staff room 3-shiv','Lift 1']
			]; 
