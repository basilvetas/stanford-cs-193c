// I've included both the universities full names and their nicknames
// use the nicknames for this assignment.  I've included the full names
// so those who aren't familiar with Bay Area universities will know
// what the names of the universities actually are.

"use strict";

var univArray = new Array
(
		{name: "Stanford University", nickname: "Stanford", ownership: "private", SATh: 1570, SATl: 1380, tuition: 44757},
		{name: "University of California, Berkeley", nickname: "UC Berkeley", ownership: "public", SATh: 1500, SATl: 1250, tuition: 13844},
		{name: "University of California, Santa Cruz", nickname: "UC Santa Cruz", ownership: "public", SATh: 1280, SATl: 1000, tuition: 13398},
		{name: "San Francisco State University", nickname: "SFSU", ownership: "public", SATh: 1110, SATl: 880, tuition: 6468},
		{name: "San Jose State University", nickname: "SJSU", ownership: "public", SATh: 1160, SATl: 880, tuition: 9496},
		{name: "Sonoma State University", nickname: "Sonoma State", ownership: "public", SATh: 1090, SATl: 880, tuition: 7276},
		{name: "California State University, East Bay", nickname: "CalState East Bay", ownership: "public", SATh: 1010, SATl: 800, tuition: 6550, room: 6435},
		{name: "University of San Francisco", nickname: "USF", ownership: "private", SATh: 1270, SATl: 1070, tuition: 41450},
		{name: "Santa Clara University", nickname: "SCU", ownership: "private", SATh: 1380, SATl: 1190, tuition: 43812},
		{name: "Mills College", nickname: "Mills College", ownership: "private", SATh: 1250, SATl: 1040, tuition: 42918}
);

var table = document.getElementById("colleges");
var tr, td1, td2, td3, td4, schoolType, maxTuition, maxHighSat, minLowSat;

/*
 * Initially loads table with all schools
 */
function loadTable()
{
	for(var j = 0; j < univArray.length; j++)
		addRow(j);
}

/*
 * Updates the table of Bay Area colleges based on the search criteria
 */
function updateColleges()
{
	// clear old table rows so we can update a blank table
	for(var j = table.rows.length; j > 1; j--)
		table.deleteRow(j-1);

	// get search criteria or set default values if NaN
	schoolType = document.ownership.type.value;
	maxTuition = parseFloat(document.getElementById("maxTuition").value);
	if(isNaN(maxTuition))
		maxTuition = 1000000;	// default max value that is greater than any possible tuition
	maxHighSat = parseFloat(document.getElementById("maxHighSat").value);
	if(isNaN(maxHighSat))
		maxHighSat = 1000000;	// default max value that is greater than any possible SATh
	minLowSat = parseFloat(document.getElementById("minLowSat").value);
	if(isNaN(minLowSat))
		minLowSat = 0;	// default min value that is less than any possible SATl

	for(var i = 0; i < univArray.length; i++)
	{
		if(schoolType !== "dontCare")
		{
			if((univArray[i].ownership === schoolType) && (univArray[i].tuition <= maxTuition) &&
					(univArray[i].SATh <= maxHighSat) && (univArray[i].SATl >= minLowSat))
				addRow(i);
		}
		else
			if((univArray[i].tuition <= maxTuition) && (univArray[i].SATh <= maxHighSat) && (univArray[i].SATl >= minLowSat))
				addRow(i);
	}
}

/*
 * Helper method that adds a new row to the rable containing data about a single university
 */
function addRow(index)
{
	tr = table.insertRow(table.rows.length);
  td1 = tr.insertCell(0);
  td1.innerHTML = univArray[index].tuition;
  td2 = tr.insertCell(0);
  td2.innerHTML = univArray[index].SATl;
  td3 = tr.insertCell(0);
  td3.innerHTML = univArray[index].SATh;
  td4 = tr.insertCell(0);
  td4.innerHTML = univArray[index].nickname;
}


