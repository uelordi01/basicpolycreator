
# BasicPolyCreator
## Introduction
This project is based on canvas HTML5 basic poligon drawing.
## Features:

* add marker.
* delete marker.
* find marker.
* move marker.

## Samples:

* index1.html -> creates basic rectangle;
* index2.html -> creates many rectangles;
* index3.html -> Implemented picking function to edit the rectangle vertexes.
* index4.html -> It creates a new vertex  in the nearest segment when the user clicks on the canvas.
* index5.html -> Select the polygon between many polygons. Picking

### 3rdParty libraries:

* twitter bootstrap (only for the css visualization), better look :).



## It works on:
- Google Chrome Versión 31.0.1650.57 m
- Version 55.0.2883.87 (64-bit) ubuntu.
- Firefox

## Try it:
- [Demo Online](https://cdn.rawgit.com/uelordi01/basicpolycreator/master/index.html)

## Instalation:
* if you haven't apache server, please install (Xammp, MAMAP, XAMPP, apache server 2.0)
* just copy canvasHTML folder.

## Code Usage:

```
var canvasDiv="viewport";
var canvasContext; //canvas 2D context:
var canvasObject; //canvas dom element
var renderObject; //render class
$(document).ready(function()
{
canvasContext=document.getElementById(canvasDiv).getContext("2d");

//markerObject=new MarkerHandler();
cuadObject=new Shape();
renderObject=new RenderHandler(canvasContext);

canvasObject=document.getElementById(canvasDiv);

renderObject.setViewWidth(canvasObject.width);
renderObject.setViewHeight(canvasObject.height);
cuadObject.createRectangle(canvasObject.width/2-50,canvasObject.height/2-50,100,100);

renderObject.addRenderElement(cuadObject);
setInterval(render,10);
```
### ISSUES:
* delete Point: when some marker is deleted, the dropdown menu doesn't stop de propagation.
* add New Point: id doesn't work fine, when some marker is added it isn't always added between 2 nearest markers.
## Authors
Unai Elordi
