/*
marker handler
*/
function getMousePos(canvas, evt) {
        var rect;
        rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
RenderHandler=function(context)
{
  this.ctx=context;
  this.renderList=[];
}
RenderHandler.prototype.setViewWidth=function(width)
{
  this.vWidth=width;
}
RenderHandler.prototype.setViewHeight=function(height)
{
  this.vHeight=height;
}
RenderHandler.prototype.setMarkerList=function(markerList)
{
  this.markerList=markerList;
}
RenderHandler.prototype.getRenderList=function()
{
  return this.renderList;
}
RenderHandler.prototype.addRenderElement=function(shape)
{
  //add the shape:
  this.renderList.push(shape);
}
RenderHandler.prototype.findSelectedShape=function(x,y)
{
 var element=-1;
 var list=renderObject.renderList;
 for(var i=0;i<list.length;i++)
 {
   var pose=list[i].findMinMaxOfThePolygon();
   if(x>pose.xmin && x<pose.xmax && pose.ymin<y && pose.ymax>y )
   {
      element=i;
   }
 }
 return element;
}
RenderHandler.prototype.drawRenderElements=function(renderObject)
{
  var i;
  var ctx=renderObject.ctx;
  var list=renderObject.renderList;
  ctx.clearRect(0, 0, renderObject.vWidth, renderObject.vHeight);
  for(i=0;i<list.length;i++)
  {
    renderObject.drawShape(list[i],renderObject);
  }
}
RenderHandler.prototype.drawShape=function(shape,renderObject)
{
  var i;
  var ctx=renderObject.ctx;
  var list=shape.markerList;


	for(var i=0;i<list.length;i++)
	{
		if(i+1<list.length)
		{
			renderObject.drawLine(list[i].getX(),list[i].getY(),list[i+1].getX(),list[i+1].getY());
		}
		if(i+1==list.length)
		{
			renderObject.drawLine(list[i].getX(),list[i].getY(),list[0].getX(),list[0].getY());
		}
		renderObject.drawCircle(list[i]);
		renderObject.drawNumber(i,list[i].getX(),list[i].getY());
		ctx.fill();
	}

}

RenderHandler.prototype.drawMarkers=function(renderObject)
{
	var i;
	var ctx=renderObject.ctx;
	var list=renderObject.markerList;
	ctx.clearRect(0, 0, renderObject.vWidth, renderObject.vHeight);

	for(i=0;i<list.length;i++)
	{
		if(i+1<list.length)
		{
			renderObject.drawLine(list[i].getX(),list[i].getY(),list[i+1].getX(),list[i+1].getY());
		}
		if(i+1==list.length)
		{
			renderObject.drawLine(list[i].getX(),list[i].getY(),list[0].getX(),list[0].getY());
		}
		renderObject.drawCircle(list[i]);
		renderObject.drawNumber(i,list[i].getX(),list[i].getY());
		ctx.fill();
	}
}
RenderHandler.prototype.drawNumber=function(number,x,y)
{
	var offsetx=0
	var offsety=10;
	this.fillStyle = "blue";
	this.ctx.font = "bold 12px Arial";
	this.ctx.fillText(""+number+"", x, y-offsety);
}
RenderHandler.prototype.drawLine=function(x1,y1,x2,y2)
{
	this.ctx.beginPath();
	this.ctx.moveTo(x1,y1);
	this.ctx.lineTo(x2,y2);
	this.ctx.stroke();
	this.ctx.closePath();
}
RenderHandler.prototype.drawCircle=function(marker)
{
  this.ctx.fillStyle=marker.getColor();
  var startPoint = (Math.PI/180)*0;
  var endPoint = (Math.PI/180)*360;
  this.ctx.beginPath();
  this.ctx.arc(marker.getX(),marker.getY(),marker.getRadius(),startPoint,endPoint,true);
  this.ctx.closePath();
}
Shape=function()
{
	this.markerOffsetX=7;
	this.markerOffsetY=7;
	this.markerList=new Array();
	this.selectedIndex=-1;

}
Shape.prototype.createRectangle=function(x,y,width,height)
{
  this.addMarker(x,y);
  this.addMarker(x+width,y);
  this.addMarker(x+width,y+height);
  this.addMarker(x,y+height);
}
Shape.prototype.addMarker=function(x,y)
{
	var marker=new Marker(x,y);
	this.markerList.push(marker);
}
Shape.prototype.addMarker=function(x,y,index,list_length)
{
	var marker=new Marker(x,y);
  if(index<list_length-1)
  {
	this.markerList.splice(index+1,0,marker);
  }
  else
  {
    this.markerList.push(marker);
  }
}
Shape.prototype.deleteMarker=function(index)
{
	if(index!=-1)
	{
	this.markerList.splice(index,1);
	console.log("element" +index+ "Deleted");
	}
}
/*
* moves to absolute position
*/
Shape.prototype.moveTo=function(x,y)
{
  //calculate gravity center:
  var offsets=this.findMinMaxOfThePolygon();
  var xcenter=(offsets.xmin+offsets.xmax)/this.markerList.length;
  var ycenter =(offsets.ymin+offsets.ymax)/this.markerList.length;
  //calculate the relative distance to the target point
  var xmove=x-xcenter
  var ymove=y-ycenter
  for(var i=0;i<this.markerList.length;i++)
	{
	   this.markerList[i].setX(this.markerList[i].getX()+xmove);
     this.markerList[i].setY(this.markerList[i].getY()+ymove);
	}
}
Shape.prototype.printSelected=function(index)
{
  for(var i=0;i<this.markerList.length;i++)
  {
    this.markerList[i].setSelected();
  }
}
Shape.prototype.deselect=function(index)
{
  for(var i=0;i<this.markerList.length;i++)
  {
    this.markerList[i].setNotSelected();
  }
}
Shape.prototype.findMarker=function(x,y)
{
 var i=0;
 var index=-1;
 var offsetX;
 var offsetY;
	for(i=0;i<this.markerList.length;i++)
	{
		offsetX=Math.abs(this.markerList[i].getX()-x);
		offsetY=Math.abs(this.markerList[i].getY()-y);
		if((offsetX<this.markerOffsetX) && (offsetY<this.markerOffsetY))
		{
			index=i;
		}

	}
	return index;
}
Shape.prototype.findMinMaxOfThePolygon=function()
{
  //var min=;
  //var max=this.markerList[0];
  var xmin=this.markerList[0].x;
  var xmax=this.markerList[0].x;
  var ymin=this.markerList[0].y;
  var ymax=this.markerList[0].y;
  for(i=1;i<this.markerList.length;i++)
	{
      var xvalue=this.markerList[i].x;
      var yvalue=this.markerList[i].y;
      if(xvalue < xmin)
      {
        xmin=xvalue;
      }
      if(yvalue < ymin)
      {
        ymin=yvalue;
      }
      if(xvalue > xmax)
      {
        xmax=xvalue;
      }
      if(yvalue > ymax)
      {
        ymax=yvalue;
      }
  }
  return {
       xmin:xmin,
       ymin:ymin,
       xmax:xmax,
       ymax:ymax
       }
}
Shape.prototype.pick=function(x,y)
{
  var result=this.findMinMaxOfThePolygon()
  if(x>smin.x && x<smax.x && y > smin.y && y < smax.y)
  {
      return true;
  }
  return false;
}
Shape.prototype.addNewSelectedMarker=function(x,y,r_handler)
{
	var i=0;
	var face0=-1;
	var face1=-1;
	var minDistance=-1;
	var p0,p1;
	var listLength=this.markerList.length;
	for(i=0;i<listLength;i++)
	{
		p0=this.markerList[i];
		if(i<listLength-1)
		{

			p1=this.markerList[i+1];
		}
		else
		{
			p1=this.markerList[0];
		}
		//distance=calculateMinDistance(p0,p1,x,y);
    distance=calcDistanceToLine(p0,p1,x,y,r_handler);
		console.log("distance face "+i+ ":"+distance);
		if(i==0) {
		minDistance=distance;
		face0=0;
		}
		else
		{
			if(distance<minDistance)
			{
				minDistance=distance;
				face0=i;
				face1=i+1;
			}
		}

	}
	console.log("MIN DISTANCE face "+face0+" D:"+minDistance);
	this.addMarker(x,y,face0,listLength);
}
Shape.prototype.setMarkerPos=function(index,x,y)
{
	this.markerList[index].setX(x);
	this.markerList[index].setY(y);
}
Shape.prototype.setSelected=function(index)
{
	var i=0;
	for(i=0;i<this.markerList.length;i++)
	{
		if(index==i)
		{
		this.markerList[i].setSelected();
		this.selectedIndex=index;
		}
		else
		{
		this.markerList[i].setNotSelected();
		this.selectedIndex=index;
		}
	}
}
Shape.prototype.getSelectedIndex=function()
{
	return this.selectedIndex;
}
Shape.prototype.getList=function()
{
	return this.markerList;
}
Marker=function(x,y)
{
	this.x=x;
	this.y=y;
	this.color="rgb(0,0,0)";
	this.radius=7;
	this.selected=false;
}
Marker.prototype.setNotSelected=function()
{
	this.color="rgb(0,0,0)";
	this.selected=false;
}
Marker.prototype.setSelected=function()
{
	this.color="rgb(255,0,0)";
	this.selected=true;
}
Marker.prototype.getColor=function()
{
	return this.color;
}
Marker.prototype.getX=function()
{
	return this.x;
}
Marker.prototype.getY=function()
{
	return this.y;
}
Marker.prototype.setX=function(x)
{
	this.x=x;
}
Marker.prototype.setY=function(y)
{
	this.y=y;
}
Marker.prototype.getRadius=function()
{
return this.radius;
}
function makeLineVector(marker0,marker1)
{
    //calculate cross product (producto vectorial)
	var vax=marker0.getX()-marker1.getX();
	var vay=marker1.getY()-marker0.getY();
	//the vector has to be normalized (vector unitario)
	var module=Math.sqrt(Math.pow(vax,2)+Math.pow(vay,2));
	var da=(marker0.getX()*marker1.getY())-(marker0.getY()*marker1.getX());
	return {
			 vx:vax/module,
			 vy:vay/module,
			 d:da/module
		   }
}
function calcDistanceToLine(marker0,marker1,x,y,r_handler)
{
  //calculate mid point
  var midx=(marker1.getX()+marker0.getX())/2;
  var midy=(marker1.getY()+marker0.getY())/2;

  var vx=midx-x;
  var vy=midy-y;

  	var module=Math.sqrt(Math.pow(vx,2)+Math.pow(vy,2));
    return module;
}
function calculateMinDistance(marker0,marker1,x,y)
{
	var vector=makeLineVector(marker0,marker1);
	distance=Math.abs((vector.vx*x) + (vector.vy*y) + (vector.d*1));
	return distance;
	//calculate scalar product:
}
