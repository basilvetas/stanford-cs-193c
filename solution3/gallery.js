"use strict";

var photoArray = [
  {filename: "memchu.jpg",
    caption: "Stanford Memorial Church - the church used to have an 80' bell tower, which fell in the 1906 earthquake."},
  {filename: "quad.jpg",
    caption: "The Stanford Quad"},
  {filename: "hoop.jpg",
    caption: "The <i>Red Hoop Fountain</i> with Green Library in the background."},
  {filename: "memorial-court.jpg",
    caption: "Memorial Court (in the front of the Quad) with Rodin's <i>Burghers of Calais</i> statues."},
  {filename: "gates.jpg",
    caption: "The Gates Building - home of Stanford Computer Science."},
  {filename: "stone-river.jpg",
    caption: "The Stone River statue near the Cantor Arts Center (Stanford's own art museum)."},
];

var currentIndex = 0; // since default image is memchu.jpg (at index 0 of array), set initial index to 0

/*
 * Move to next photo in gallery.
 */
function nextImg() 
{
  changeImg(++currentIndex); 
}

/*
 * Move to previous photo in gallery.
 */
function previousImg() 
{
  changeImg(--currentIndex);
}

window.addEventListener("resize",handleResize,false);

/*
 * Resize the gallery when the window is resized
 */
function handleResize(evt)
{ 
  var gallery = document.getElementById("photoSection"); 
  var pageWidth = window.innerWidth;

  var newWidth = (pageWidth*2)/3;
  var newHeight = gallery.clientHeight;
  var leftMargin = (newWidth*(-1))/2; // adjust backward by half the width
  var topMargin = (newHeight*(-1))/2; // adjust backward by half the height

  gallery.style.width = newWidth + "px";
  gallery.style.marginLeft = leftMargin + "px";
  gallery.style.marginTop = topMargin + "px";  
}

/*
 * Helper method to change to next or previous photo in gallery.
 * Invariant: parameter i should always be a integer.
 */
function changeImg(i) 
{
  // if we are at the first photo, loop back to the last
  if(i < 0)
  {
    i = photoArray.length-1;
    currentIndex = i;
  }

  // if we are at the last photo, loop back to the first
  if(i > photoArray.length-1)
  {
    i = 0;
    currentIndex = i;
  }

  document.getElementById("photo").setAttribute("src",photoArray[i].filename);
  document.getElementById("caption").innerHTML = photoArray[i].caption;
}