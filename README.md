#BasicPolyCreator
##Introduction
This project is based on canvas HTML5 basic poligon drawing. 

## Features: 

* add marker. 
* delete marker.
* find marker. 
* move marker. 

## Samples: 

* index1.html -> control, move, add markers statically using code
* index2.html -> add,remove,move and add markers statically using mouse button events

### 3rdParty libraries: 

* twitter bootstrap (only for the css visualization), better look :).



## It works on: 
Google chrome Versión 31.0.1650.57 m 
firefox 


## Instalation: 
* if you haven't apache server, please install (Xammp, MAMAP, XAMPP, apache server 2.0)
* just copy canvasHTML folder. 

## Code Usage:

```
  var canvasDiv="viewport";
  var canvasContext;
  var canvasObject;
  var markerObject; 
  var mouseDown=false;
 $(document).ready(function()
  {
  
  	//get canvas context:
	canvasContext=document.getElementById(canvasDiv).getContext("2d");
	Create Marker handler:
	markerObject=new MarkerHandler();
	//create rendering scene:
	renderObject=new RenderHandler(canvasContext);
	
	canvasObject=document.getElementById(canvasDiv);
	renderObject.setViewWidth(canvasObject.width);
	renderObject.setViewHeight(canvasObject.height);
	markerObject.addMarker(50,50);
	markerObject.addMarker(50,100);
	markerObject.addMarker(100,100);
	markerObject.addMarker(100,50);
	renderObject.setMarkerList(markerObject.getList()); 

   });
```
### ISSUES:
* delete Point: when some marker is deleted, the dropdown menu doesn't stop de propagation.
* add New Point: id doesn't work fine, when some marker is added it isn't always added between 2 nearest markers.
## Authors
Unai Elordi
