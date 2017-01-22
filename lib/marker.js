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
RenderHandler.prototype.addRenderElement=function(shape)
{
  //add the shape:
  this.renderList.push(shape);
}
RenderHandler.prototype.findShape=function(x,y)
{
 var element=-1;
 var list=renderObject.renderList;
 for(i=0;i<list.length;i++)
 {
   var pose=list[i].findMinMaxOfThePolygon();
   if(x>pose.smin.x && x<pose.smax.x && pose.smin.y>y && pose.smax.y<y )
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
  var min=this.markerList[0];
  var max=this.markerList[0];
  for(i=0;i<this.markerList.length;i++)
	{
      var xvalue=this.markerList[i].x;
      var yvalue=this.markerList[i].y;
      if(min.x<xvalue)
      {
        min.setX(xvalue);
      }
      if(min.y<yvalue)
      {
        min.setY(yvalue);
      }
      if(max.x>xvalue)
      {
        max.setX(xvalue);
      }
      if(max.y>yvalue)
      {
        max.setY(yvalue);
      }
  }
  return
  {
    smin:min,
    smax:max
  }
}
Shape.prototype.isSelected=function(x,y)
{
  var result=this.findMinMaxOfThePolygon()
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
