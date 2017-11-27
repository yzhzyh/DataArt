// Your Google Map API Key
var key = 'AIzaSyDkv3GqF2jjXPCofqAn-HWP7cRRlaTYnjc';

// Create a new Mappa instance using Mapboxgl.
var mappa = new Mappa('Google', key);

var myMap;
var canvas;

var complaints = [];
var past_day_complaints = [];
var past_week_complaints = [];
var weekday_complaints = [];
var weekends_complaints = [];

var accidents=[];
var past_day_accidents = [];
var past_week_accidents = [];
var weekday_accidents = [];
var weekends_accidents = [];


function setup() { 
	canvas = createCanvas(800,450);


	loadJSON("https://data.cityofnewyork.us/resource/8bei-psrw.json", complaints_loaded);
	loadJSON("https://data.cityofnewyork.us/resource/ehqi-g294.json", accidents_loaded);
	myMap = mappa.tileMap(40.73,-73.91,11); // lat 0, lng 0, zoom 10
	myMap.overlay(canvas);
	//myMap.onChange(drawbikeData);
	//myMap.onChange(drawaccidentData);
}

function isWeekday(cur_created_date) {
	if(cur_created_date.getDay()<=5 && cur_created_date.getDay()>=1)
		return true;
}

function isWeekends(cur_created_date) {
	if(cur_created_date.getDay()==0 || cur_created_date.getDay()==6)
		return true;
}

function isPastDay(cur_time, cur_created_date) {
	var houroffset=(cur_time.getTime() - cur_created_date.getTime()) / 1000 / 3600 ;
	if(houroffset<48){
		if(cur_time.getDay() - cur_created_date.getDay() == 1) return true;
		if((cur_time.getDay()==0)&&(cur_time.getDay()-cur_created_date.getDay()==-6)) return true;
	}

}

function isPastWeek(cur_time,cur_created_date){
	var dayoffset=(cur_time.getTime()-cur_created_date.getTime())/1000/3600/24;
	var cur_Day=cur_time.getDay();//current weekday
	var cur_create_Day=cur_created_date.getDay();// to tell which weekday it is from each data array


	switch(cur_Day){
		case 1:
		if(dayoffset<8 && dayoffset>0){
			if(dayoffset<1 && cur_create_Day==0)
				return true;
			if(dayoffset>7 &&cur_create_Day==1)
				return true;
			if(dayoffset<=7 && dayoffset>=1)
				return true;
		}
		break;

		case 2:
		if(dayoffset<9 && dayoffset>1){
			if(dayoffset<2 && cur_create_Day==0)
				return true;
			if(dayoffset>8 &&cur_create_Day==1)
				return true;
			if(dayoffset<=8 && dayoffset>=2)
				return true;
		}
		break;

				case 3:
		if(dayoffset<10 && dayoffset>2){
			if(dayoffset<3 && cur_create_Day==0)
				return true;
			if(dayoffset>9 &&cur_create_Day==1)
				return true;
			if(dayoffset<=9 && dayoffset>=3)
				return true;
		}
		break;


			case 4:
		if(dayoffset<11 && dayoffset>3){
			if(dayoffset<4 && cur_create_Day==0)
				return true;
			if(dayoffset>10 &&cur_create_Day==1)
				return true;
			if(dayoffset<=10&& dayoffset>=4)
				return true;
		}
		break;


			case 5:
		if(dayoffset<12 && dayoffset>4){
			if(dayoffset<5 && cur_create_Day==0)
				return true;
			if(dayoffset>11 &&cur_create_Day==1)
				return true;
			if(dayoffset<=11 && dayoffset>=5)
				return true;
		}
		break;



			case 6:
		if(dayoffset<13 && dayoffset>5){
			if(dayoffset<6 && cur_create_Day==0)
				return true;
			if(dayoffset>12 &&cur_create_Day==1)
				return true;
			if(dayoffset<=12 && dayoffset>=6)
				return true;
		}
		break;

	

			case 0:
		if(dayoffset<14 && dayoffset>6){
			if(dayoffset<7 && cur_create_Day==0)
				return true;
			if(dayoffset>13 &&cur_create_Day==1)
				return true;
			if(dayoffset<=13 && dayoffset>=7)
				return true;
		}
		

	}


}

//-------------------accidents data view function---------------------//

function accView() {
	myMap.onChange(drawaccidentData);

}
function pastDayAccView() {
	myMap.onChange(drawPastDayAccData);
}

function pastWeekAccView() {
	myMap.onChange(drawPastWeekAccData);
}

function WeekdayAccView() {
	myMap.onChange(drawWeekdayAccData);
}

function WeekendsAccView() {
	myMap.onChange(drawWeekendsAccData);
}

//-------------------complaints data view function---------------------//

function compView() {
	myMap.onChange(drawbikeData);
}

function pastDayCompView() {
	myMap.onChange(drawPastDayCompData);
}

function pastWeekCompView() {
	myMap.onChange(drawPastWeekCompData);
}

function WeekdayCompView() {
	myMap.onChange(drawWeekdayCompData);
}

function WeekendsCompView() {
	myMap.onChange(drawWeekendsCompData);
}

//------------------load complaints data and push to each filter array---------------//
function complaints_loaded(new_complaints){
	// var cur_time = new Date("2017-09-07T10:00:26");
	var cur_time = new Date();

	for(idx in new_complaints){
		complaints.push(new_complaints[idx]);

		var cur_created_date = new Date(new_complaints[idx].created_date);
		if (isPastDay(cur_time, cur_created_date)) {
			past_day_complaints.push(new_complaints[idx]);
		}
		if (isPastWeek(cur_time, cur_created_date)) {
			past_week_complaints.push(new_complaints[idx]);
		}
		if (isWeekday(cur_created_date)) {
			weekday_complaints.push(new_complaints[idx]);
		}
		if (isWeekends(cur_created_date)) {
			weekends_complaints.push(new_complaints[idx]);
		}

	}
}

//------------------load accidents data and push to each filter array---------------//
function accidents_loaded(new_accidents){
	// var cur_time = new Date("2017-09-07T10:00:26");
	var cur_time = new Date();
	for(idx in new_accidents){
		accidents.push(new_accidents[idx]);

		var cur_created_date = new Date(new_accidents[idx].date);
		print(new_accidents[idx]);
		if (isPastDay(cur_time, cur_created_date)) {
			past_day_accidents.push(new_accidents[idx]);
		}
		if (isPastWeek(cur_time, cur_created_date)) {
			past_week_accidents.push(new_accidents[idx]);
		}
		if (isWeekday(cur_created_date)) {
			weekday_accidents.push(new_accidents[idx]);
		}
		if (isWeekends(cur_created_date)) {
			weekends_accidents.push(new_accidents[idx]);
		}
	}
}

//------------------------draw accidents data----------------------------//

function drawaccidentData(){
	return drawData(accidents, function () {
		return fill(224, 22, 69, 125);
	});
}

function drawPastDayAccData() {
	return drawData(past_day_accidents, function() {
		return fill(224, 22, 69, 125);
	});
} 

function drawPastWeekAccData() {
	return drawData(past_week_accidents, function() {
		return fill(224, 22, 69,125);
	});
} 
function drawWeekdayAccData() {
	return drawData(weekday_accidents, function() {
		return fill(224, 22, 69,125);
	});
} 

function drawWeekendsAccData() {
	return drawData(weekends_accidents, function() {
		return fill(224, 22, 69, 125);
	});
} 


//----------------draw complaints data---------------------------------//

function drawbikeData(){
	return drawData(complaints, function() {
		return fill(242, 158, 33, 125);
	});
}

function drawPastDayCompData() {
	return drawData(past_day_complaints, function() {
		return fill(242, 158, 33, 125);
	});
} 

function drawPastWeekCompData() {
	return drawData(past_week_complaints, function() {
		return fill(242, 158, 33, 125);
	});
} 
function drawWeekdayCompData() {
	return drawData(weekday_complaints, function() {
		return fill(242, 158, 33, 125);
	});
} 

function drawWeekendsCompData() {
	return drawData(weekends_complaints, function() {
		return fill(242, 158, 33, 125);
	});
} 

//-------------------basic draw data function---------------------//
function drawData(data, fillFunc){
	clear();

	print("data",data);

	for(var i = 0; i < data.length; i++){
		var longitude = Number(data[i].longitude);
		var latitude = Number(data[i].latitude);
		console.log(latitude,longitude);
		

		if(myMap.map.getBounds().contains( { lat:  latitude, lng: longitude }  ) ){
			var pos = myMap.latLngToPixel(latitude, longitude);
			fillFunc();
			noStroke();
			ellipse( pos.x, pos.y ,8,8);
		}
	}
}


function draw() { 
  // background(0,0,220);
}
