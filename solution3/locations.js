// data for optional find location extension to maps assignment
// x and y coordinates are for map-xl.gif, you should scale them
// in your program based on the current map resolution

"use strict";

var locationArray = new Array(
		{names: ["Gates"], x: 1558, y: 1461},
		{names: ["MemChu","Memorial Church"], x: 1845, y: 1883},
		{names: ["Tresidder Union", "Tresidder"], x: 1804, y: 2225},		
		{names: ["Florence Moore Hall", "Florence Moore", "FloMo"], x: 1705, y: 2496},
		{names: ["Bookstore", "Book Store"], x: 2022, y: 2144},
		{names: ["MemAud", "Memorial Auditorium", "Memorial Hall"], x: 2262, y: 1600},
		{names: ["Green Library", "Green"], x: 2173, y: 1898},
		{names: ["Meyer Library", "Meyer"], x: 2157, y: 2026}			
	);

var mapsArray = ["map-xl.gif", "map-l.gif", "map-m.gif", "map-s.gif"];

var map = document.getElementById("map");
var mapFrame = document.getElementById("mapFrame");
var isClicked = false;
var preload = false;
var xOld;
var yOld;

document.addEventListener("mousemove",handleMouseMove,false); 
document.addEventListener("mousedown",handleMouseDown,false); 
document.addEventListener("mouseup",handleMouseUp,false); 
document.addEventListener("dblclick",handleDblClick,false);
window.addEventListener("resize",handleResize,false);

/*
 * Preload map images 
 */
function preloadImages() 
{
	for(var i = 0; i < mapsArray.length; i++)
	{
		try 
	  {
	    var tempImg = new Image();
	    tempImg.src = mapsArray[i];
	  } 
	  catch (e) { }
	}
}

/*
 * Resize the gallery when the window is resized
 */
function handleResize(evt)
{
	// preload the images only once during onload
	if(!preload)
	{
		preloadImages();
		preload = true;
	}

	var pageWidth = window.innerWidth;
	var pageHeight = window.innerHeight;

	var newWidth = (pageWidth) - 400;
	var newHeight = pageHeight;

	mapFrame.style.width = newWidth + "px";
	mapFrame.style.height = newHeight + "px";
}

/*
 * Handles handles when mouse is moved
 */
function handleMouseMove(evt)
{
	if(isClicked)
	{
		var xCoor = evt.clientX - getLeft();
		var yCoor = evt.clientY - getTop();

		var deltaX = xOld - xCoor;
		var deltaY = yOld - yCoor;

		var oldLeft = getMapLeft();
		var oldTop = getMapTop();

		var newLeft = getMapLeft() - deltaX;
		var newTop = getMapTop() - deltaY;

		map.style.left = newLeft + "px";
		map.style.top = newTop + "px";

		xOld = xCoor;
		yOld = yCoor;

		mapFrame.style.cursor = "move";
	}
}

/*
 * Handles when mouse is clicked
 */
function handleMouseDown(evt)
{
	if (inFrame(evt.clientX,evt.clientY)) 
	{
		xOld = evt.clientX - getLeft();
		yOld = evt.clientY - getTop();
		isClicked = true;
		evt.preventDefault();
	}
	mapFrame.style.cursor = "move";
}

/*
 * Handles when mouse is released from a down click
 */
function handleMouseUp(evt)
{
	isClicked = false;
	mapFrame.style.cursor = "default";
}

/*
 * Handles when mouse is double clicked
 */
function handleDblClick(evt)
{
	if (inFrame(evt.clientX,evt.clientY)) 
	{
		var midptX = getWidth()/2;
		var midptY = getHeight()/2;

		var newX = getLeft() + midptX - evt.clientX;
		var newY = midptY - evt.clientY;

	  map.style.left = getMapLeft() + newX + "px";
		map.style.top = getMapTop() + newY + "px";
	}
}

/*
 * Move map up
 */
function moveUp() 
{
	var height = getHeight();
	var mapTop = getMapTop();
	var newTop = mapTop + (height/2);
	map.style.top = newTop + "px";
}

/*
 * Move map down
 */
function moveDown() 
{
	var height = getHeight();
	var mapTop = getMapTop();
	var newTop = mapTop - (height/2);
	map.style.top = newTop + "px";
}

/*
 * Move map left
 */
function moveLeft() 
{
	var width = getWidth();
	var mapLeft = getMapLeft();
	var newLeft = mapLeft + (width/2);
	map.style.left = newLeft + "px";
}

/*
 * Move map right
 */
function moveRight() 
{	
	var width = getWidth();
	var mapLeft = getMapLeft();
	var newLeft = mapLeft - (width/2);
	map.style.left = newLeft + "px";
}

/*
 * Zoom map in
 */
function zoomIn() 
{
	var fileName = map.src.substring(map.src.lastIndexOf('/') + 1);
	var xRatio = getMapCenterX() / getMapWidth();
	var yRatio = getMapCenterY() / getMapHeight();

	if(fileName === "map-s.gif")
	{
		map.src = mapsArray[2];
	}
	else if(fileName === "map-m.gif")
	{
		map.src = mapsArray[1];
	}
	else if(fileName === "map-l.gif")
	{
		map.src = mapsArray[0];
	}
	else {}

	var newX = getMapWidth()*xRatio;
	var newY = getMapHeight()*yRatio;
	var frameX = getWidth()/2;
	var frameY = getHeight()/2;
	map.style.left = frameX - newX + "px";
	map.style.top = frameY - newY + "px";
}

/*
 * Zoom map out
 */
function zoomOut() 
{	
	var fileName = map.src.substring(map.src.lastIndexOf('/') + 1);
	console.log("oldX: " + getMapCenterX());
	console.log("oldY: " + getMapCenterY());
	var xRatio = getMapCenterX() / getMapWidth();
	var yRatio = getMapCenterY() / getMapHeight();

	if(fileName === "map-xl.gif")
	{
		map.src = mapsArray[1];
	}
	else if(fileName === "map-l.gif")
	{
		map.src = mapsArray[2];
	}
	else if(fileName === "map-m.gif")
	{
		map.src = mapsArray[3];
	}
	else {}

	var newX = getMapWidth()*xRatio;
	var newY = getMapHeight()*yRatio;
	var frameX = getWidth()/2;
	var frameY = getHeight()/2;
	map.style.left = frameX - newX + "px";
	map.style.top = frameY - newY + "px";
}

// ****************** Helper functions ****************** //

/*
 * Returns true if the (x,y) coordinates are within the mapFrame, false otherwise.
 */
function inFrame(x,y) 
{
	return (x >= getLeft() && x <= getLeft() + getWidth() && y >= getTop() && y <= getTop() + getHeight());
}

function getHeight() 
{
	var height = parseInt(mapFrame.style.height);
	if(isNaN(height))
		height = 0;
	return height;
}

function getWidth() 
{	
	var width = parseInt(mapFrame.style.width);
	if(isNaN(width))
		width = 0;
	return width;
}

function getTop() 
{	
	var top = parseInt(mapFrame.style.top);
	if(isNaN(top))
		top = 0;
	return top + 70; 
}

function getLeft() 
{
	var left = parseInt(mapFrame.style.left);
	if(isNaN(left))
		left = 0;
	return left + 70;
}

function getMapLeft()
{
	var left = parseInt(map.style.left);
	if(isNaN(left))
		left = 0;
	return left;
}

function getMapTop()
{
	var top = parseInt(map.style.top);
	if(isNaN(top))
		top = 0;
	return top;
}

function getMapHeight() 
{
	var height = map.clientHeight;
	if(isNaN(height))
		height = 0;
	return height;
}

function getMapWidth() 
{	
	var width = map.clientWidth;
	if(isNaN(width))
		width = 0;
	return width;
}

// returns center x coordinate relative to map
function getMapCenterX()
{
	var frameX = getWidth()/2;
	var mapLeft = getMapLeft();
	return frameX - mapLeft;
}

// returns center y coordinate relative to map
function getMapCenterY()
{
	var frameY = getHeight()/2;
	var mapTop = getMapTop();
	return frameY - mapTop;	
}



