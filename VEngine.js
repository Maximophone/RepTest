var mouseReleased = false;
var mousePressed = false;
var mouseX = 0;
var mouseY = 0;
window.addEventListener("mouseup",function(e)
{
    console.log(e);
    mouseReleased = true;
    mouseX = e.x;
    mouseY = e.y;            
});
window.addEventListener("keydown",function(e)
{
    console.log(e);
    mousePressed = true;
    mouseX = e.x;
    mouseY = e.y;            
});

var MathLib;
(function(MathLib){   
    var Vect = (function(){     
        function Vect(x,y)
        {
            this.x=x;
            this.y=y;
        }
        Vect.prototype.toString = function(){
            return "(x:" + this.x + " y:" + this.y + ")";
        };
        Vect.prototype.negate = function(){
            return new Vect( -this.x , -this.y );
        };
        Vect.prototype.scale = function(scalar){
            return new Vect( this.x * scalar , this.y * scalar );
        };        
        Vect.prototype.add = function(v)
        {
            return new Vect( this.x + v.x , this.y + v.y );
        };
        Vect.prototype.addDirect = function(v)
        {
            this.x += v.x ;
            this.y += v.y ;
        };
        Vect.prototype.subDirect = function(v)
        {
            this.x -= v.x ;
            this.y -= v.y ;
        };
        Vect.prototype.sub = function(v)
        {
            return new Vect( this.x - v.x , this.y - v.y );
        };       
        Vect.prototype.reset = function(x,y)
        {
            this.x=x;
            this.y=y;
        };
        Vect.prototype.set = function(v)
        {
            this.x=v.x;
            this.y=v.y;
        };
        Vect.prototype.len = function()
        {
            return Math.sqrt(this.x*this.x + this.y*this.y);
        };
        Vect.prototype.normalize = function()
        {
            this.x=this.len()==0?0:this.x/this.len();
            this.y=this.len()==0?0:this.y/this.len();
        };
        Vect.prototype.normal = function()
        {
            return new Vect( this.y , -this.x );
        };
        Vect.prototype.dot = function(v)
        {
            return this.x * v.x + this.y * v.y;
        };
        Vect.prototype.crossProdV = function(v)
        {
            return this.x * v.y - this.y * v.x ;
        };
        Vect.prototype.crossProd = function(s)
        {
            return new Vect( s * this.y , -s * this.x );
        };
        Vect.Normalize = function(v)
        {
            return new Vect( v.x / v.len() , v.y / v.len() );
        };
        Vect.Add = function(v1,v2)
        {
            return new Vect( v1.x + v2.x , v1.y + v2.y );
        };
        Vect.Sub = function(v1,v2)
        {
            return new Vect( v1.x - v2.x , v1.y - v2.y );
        };
        Vect.getX = function(vectors)     
        {
            var l = vectors.length;
            var v = [];
            for(var i = 0; i<l; i++)
            {
                v.push(vectors[i].x);
            }
            return v;
        };   
        Vect.getY = function(vectors)     
        {
            var l = vectors.length;
            var v = [];
            for(var i = 0; i<l; i++)
            {
                v.push(vectors[i].y);
            }
            return v;
        };   
        Vect.Max = function(vectors,k)
        {
            var l = vectors.length;
            var v = [];
            var m;
            var i;
            if(k==1)
            {                
                m = vectors[0].x;
                for(i = 1; i<l; i++)
                {
                    m=vectors[i].x>m?vectors[i].x:m;
                }
                return m;
            }
            else if (k==2)
            {
                m = vectors[0].y;
                for(i = 1; i<l; i++)
                {
                    m=vectors[i].y>m?vectors[i].y:m;
                }
                return m;
            }
            else
            {
                throw "Call to MathLib.Vect.Max with invalid second argument";
            }
        };
        Vect.Min = function(vectors,k)
        {
            var l = vectors.length;
            var v = [];
            var m;
            var i;
            if(k==1)
            {                
                m = vectors[0].x;
                for(i = 1; i<l; i++)
                {
                    m=vectors[i].x<m?vectors[i].x:m;
                }
                return m;
            }
            else if (k==2)
            {
                m = vectors[0].y;
                for(i = 1; i<l; i++)
                {
                    m=vectors[i].y<m?vectors[i].y:m;
                }
                return m;
            }
            else
            {
                throw "Call to MathLib.Vect.Max with invalid second argument";
            }
        };
        Vect.CrossProdV = function(v1,v2)
        {
            return v1.x * v2.y - v1.y * v2.x ;
        };
        Vect.CrossProd = function(v , s)
        {
            return new Vect( s * v.y , -s * v.x );
        };
        Vect.projectShapeAxis = function(axis,points)
        {
            var minp = points[0].dot(axis);
            var maxp = minp;
            for(var i = 1; i<points.length; i++)
            {
                minp = points[i].dot(axis)<minp?points[i].dot(axis):minp;
                maxp = points[i].dot(axis)>maxp?points[i].dot(axis):maxp;
            }
            return [minp,maxp];
        };
        Vect.Copy = function(v)
        {
        	return new Vect(v.x,v.y);
        };
        return Vect;  
    })();    
    MathLib.Vect=Vect;    
    var Mat22 = (function(){
        function Mat22(m)
        {
            this.m=m;
        }
        Mat22.prototype.col1 = function()
        {
            return new Vect(this.m[0][0],this.m[1][0]);
        };
        Mat22.prototype.col2 = function()
        {
            return new Vect(this.m[0][1],this.m[1][1]);
        };
        Mat22.prototype.row1 = function()
        {
            return new Vect(this.m[0][0],this.m[0][1]);
        };
        Mat22.prototype.row2 = function()
        {
            return new Vect(this.m[1][0],this.m[1][1]);
        };
        Mat22.prototype.mulV = function(v)
        {
            return new Vect(this.m[0][0] * v.x + this.m[0][1] * v.y , this.m[1][0] * v.x + this.m[1][1] * v.y);
        };
        Mat22.Rotation = function(angle)
        {
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            return new Mat22([[c,-s],[s,c]]);
        };
        return Mat22;
    })();
    MathLib.Mat22 = Mat22;
    var List = (function(){
    	function List()
    	{

    	}
    	List.sum = function(list)
    	{
    		var currentSum = 0;
    		var l = list.length;
    		for(var k = 0; k<l; k++)
    		{
    			currentSum += list[k];
    		}
    		return currentSum;
    	};
    	List.mean = function(list)
    	{
    		return list.length==0?0:this.sum(list)/list.length;
    	};
    	return List;
    })();
    MathLib.List = List;
    MathLib.IntervalDistance = function(IA,IB)
    {
    	if(IA.x < IB.x) return IB.x - IA.y;
    	else return IA.x - IB.y;
    };
    MathLib.Sign = function(r)
    {
    	return r==0?0:r/Math.abs(r);
    };
})(MathLib || (MathLib = {}));
    

var VEngine;
(function(VEngine){
	var Vertex = (function(){
		function Vertex(vect,isDynamic,id)
		{
			this.pos = vect;
			this.lastPos = MathLib.Vect.Copy(vect);
			this.isDynamic = isDynamic;
            this.id = id;
		}
		Vertex.prototype.update = function(acc,dt)
		{
			if(this.isDynamic)
			{
				var diffPos = this.pos.sub(this.lastPos).add(acc.scale(dt*dt));
				this.lastPos.set(this.pos);
				this.pos.addDirect(diffPos);
			}
		};
		Vertex.prototype.draw = function(context)
		{
			var RAYON = 3;
			context.beginPath();
			context.arc(this.pos.x,this.pos.y,RAYON,0,2*Math.PI);
			context.stroke();
		};
		return Vertex;
	})();
	VEngine.Vertex = Vertex;
	var Constraint = (function(){
		function Constraint(v1,v2,id)
		{
			this.v1 = v1;
			this.v2 = v2;
			this.len = v2.pos.sub(v1.pos).len();
            this.id = id;
		}
		Constraint.prototype.update = function()
		{
			var currentLen = this.v2.pos.sub(this.v1.pos).len();
			var diffLen = currentLen - this.len;
			var vnorm2 = MathLib.Vect.Normalize(this.v2.pos.sub(this.v1.pos));
			var vnorm1 = MathLib.Vect.Normalize(this.v1.pos.sub(this.v2.pos));
			if(this.v1.isDynamic) this.v1.pos.addDirect(vnorm2.scale(this.v2.isDynamic?diffLen/2:diffLen));
			if(this.v2.isDynamic) this.v2.pos.addDirect(vnorm1.scale(this.v1.isDynamic?diffLen/2:diffLen));
		};
		Constraint.prototype.draw = function(context)
		{
			context.beginPath();
            context.moveTo(this.v1.pos.x,this.v1.pos.y);
            context.lineTo(this.v2.pos.x,this.v2.pos.y);          
            context.closePath();
            context.stroke();
		};
		return Constraint;
	})();
	VEngine.Constraint = Constraint;
	var Body = (function(){
		function Body(vertices,id)
		{
			this.vertices = vertices; //CAREFUL ! the order of vertices will determine the shape of the body
			this.center = this.computeCenter();
			this.isColliding = false;
            this.id=id;
		}
		Body.prototype.projectToAxis = function(v)
		{
			var min = v.dot(this.vertices[0].pos);
			var max = min;
			var l = this.vertices.length;
			for(var i = 1; i<l; i++)
			{
				min = Math.min(min, v.dot(this.vertices[i].pos));
				max = Math.max(max, v.dot(this.vertices[i].pos));
			}	
			return new MathLib.Vect(min,max);
		};
		Body.prototype.computeCenter = function()
		{
			var lX = [];
			var lY = [];
			for(var i = 0; i<this.vertices.length; i++)
			{
				lX.push(this.vertices[i].pos.x);
				lY.push(this.vertices[i].pos.y);
			}
			var vCenter = new MathLib.Vect(MathLib.List.mean(lX),MathLib.List.mean(lY));
			return vCenter;
		};
		Body.prototype.updateCenter = function()
		{
			delete this.center;
			this.center = this.computeCenter();
		};
		Body.prototype.getEdge = function(i)
		{
			return {
				v1: vertices[i%vertices.length],
				v2: vertices[(i+1)%vertices.length],
				Parent: this
			};
		};
		Body.prototype.draw = function(context)
		{
			var RAYON = 2;
			context.beginPath();
			context.arc(this.center.x,this.center.y,RAYON,0,2*Math.PI);
			context.fillStyle=this.isColliding?"#DDFF00":"#000060";
			context.stroke();
            context.fill();
		};
		return Body;
	})();
	VEngine.Body = Body;
	var Dev = (function(){
		function Dev(canvas,dt,speed)
		{
			this.canvas=canvas;
            this.context=this.canvas.getContext("2d"); 
            this.workingWidth = this.canvas.width;
            this.workingHeight = this.canvas.height;
            this.dt=dt;
            this.speed = speed
            this.gravity = new MathLib.Vect(0,0);
		}
		Dev.prototype.detectCollision = function(bodyA, bodyB, collision)
		{
			//var collision = {};
			bodyA.updateCenter();
			bodyB.updateCenter();
			var minDistance = 10000;
			for(var i = 0; i < bodyA.vertices.length + bodyB.vertices.length; i++)
			{
				var edge;
				if(i < bodyA.vertices.length) edge = bodyA.getEdge(i);
				else E = bodyB.getEdge(i - bodyA.vertices.length);
				var Axis = new MathLib.Vect(edge.v1.pos.y - edge.v2.pos.y , edge.v2.pos.x - edge.v1.pos.x);
				Axis.normalize();
				var minMaxA = bodyA.projectToAxis(Axis);
				var minMaxB = bodyB.projectToAxis(Axis);
				var dist = MathLib.IntervalDistance(minMaxA,minMaxB);
				if(dist>0)
				{
					return false;
				}
				else if(Math.abs(dist) < minDistance)
				{
					minDistance = Math.abs(dist);
					collision.Normal = Axis;
					collision.Edge = edge;
				}
			}
			collision.depth = minDistance;
			if(collision.Edge.Parent !== bodyB)
			{
				var tempBody = bodyB;
				bodyB = bodyA;
				bodyA = tempBody;
			}
			var sign = MathLib.Sign(collision.Normal.dot(bodyA.center.sub(bodyB.center)));
			if(sign !== 1) collision.Normal = collision.Normal.negate();
			var smallestDist = 10000;
			for(var j = 0 ; j < bodyA.vertices.length; j++)
			{
				var distance = collision.Normal.dot(bodyA.vertices[j].pos.sub(bodyB.center));
				if(distance<smallestDist)
				{
					smallestDist = distance;
					collision.vertice = bodyA.vertices[j];
				}
			}
			bodyA.isColliding = true;
            bodyB.isColliding = true;
			return true;
		};
        Dev.prototype.solveCollision = function(collision)
        {
            var V1 = collision.Edge.v1;
            var V2 = collision.Edge.v2;
            var collisionVector = collision.Normal.scale(collision.depth);
            var T;
            if(Math.abs())
                T = (collision.vertice.pos.x - collisionVector.x - V1.pos.x)/(V2.pos.x - V1.pos.x);
            else
                T = (collision.vertice.pos.y - collisionVector.y - V1.pos.y)/(V2.pos.y - V1.pos.y);
            var lambda = 1/(T*T + (1-T)*(1-T));
            //if(V1.isDynamic) V1.pos.subDirect(collisionVector.scale(V2.isDynamic?(1-T):1*lambda*collision.vertice.isDynamic?0.5:1));
            //if(V2.isDynamic) V2.pos.subDirect(collisionVector.scale(V1.isDynamic?T:1*lambda*collision.vertice.isDynamic?0.5:1));
            //if(collision.vertice.isDynamic) collision.vertice.pos.addDirect(collisionVector.scale(V1.isDynamic|V2.isDynamic?0.5:1));
            if(V1.isDynamic) V1.pos.subDirect(collisionVector.scale(V2.isDynamic?(1-T):1*lambda*collision.vertice.isDynamic?0.5:1));
            if(V2.isDynamic) V2.pos.subDirect(collisionVector.scale(V1.isDynamic?T:1*lambda*collision.vertice.isDynamic?0.5:1));
            if(collision.vertice.isDynamic) collision.vertice.pos.addDirect(collisionVector.scale(V1.isDynamic|V2.isDynamic?0.5:1));
        };
		Dev.prototype.physics = function(vertices,constraints,bodies)
		{
            T1=100
            for(var t = 0; t<T1; t++)
            {    
			 for(var i = 0; i<vertices.length; i++)
                {
                	vertices[i].update(this.gravity, this.dt/T1*this.speed);
                }
                for(var j = 0; j<constraints.length; j++)
                {
                	constraints[j].update();
                }
            //}
            //for(var t = 0; t<T1; t++)
            //{ 
                for(var k = 0; k<bodies.length; k++)
                {
                    bodies[k].isColliding=false;
                }
                for(var k1 = 0; k1<bodies.length; k1++)
                {
                	for(var k2=k1+1; k2<bodies.length; k2++)
                	{
                		var collision = {};
                		var bool = this.detectCollision(bodies[k1],bodies[k2],collision);
                       if(bool) this.solveCollision(collision);
                		//console.log('body ' + k1 + ' / body ' + k2 + ': ' + bool);
                	}
                }
            }
		};
		Dev.prototype.draw = function(vertices,constraints,bodies)
		{
			for(var i = 0; i<vertices.length; i++)
            {
            	vertices[i].draw(this.context);
            }
            for(var j = 0; j<constraints.length; j++)
            {
            	constraints[j].draw(this.context);
            }
            for(var k = 0; k<bodies.length; k++)
            {
            	bodies[k].draw(this.context);
            }
		};
		Dev.prototype.clear = function()
        {
            this.context.clearRect(0,0,this.workingWidth,this.workingHeight);
        };        
		return Dev;
	})();
	VEngine.Dev = Dev;
})(VEngine || (VEngine = {}));



var canvas;
var timer;
var vertices = [];
var constraints = [];
var bodies = [];
var debug = true;
init();
function init()
{
	window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(/* function */ callback){
                window.setTimeout(callback, 1000 / 60);
            };
    })();    
    canvas = document.getElementById("c");
    timer = 0;

    vertices[0]=new VEngine.Vertex(new MathLib.Vect(150,50),false,0);

    vertices[1]=new VEngine.Vertex(new MathLib.Vect(50,50),true,1);
    vertices[2]=new VEngine.Vertex(new MathLib.Vect(75,75),true,2);
    vertices[3]=new VEngine.Vertex(new MathLib.Vect(25,75),true,3);

    vertices[4]=new VEngine.Vertex(new MathLib.Vect(200,100),false,4);
    vertices[5]=new VEngine.Vertex(new MathLib.Vect(250,150),true,5);
    vertices[6]=new VEngine.Vertex(new MathLib.Vect(150,150),true,6);

    constraints[0] = new VEngine.Constraint(vertices[0],vertices[1],0);

    constraints[1] = new VEngine.Constraint(vertices[1],vertices[2],1);
    constraints[2] = new VEngine.Constraint(vertices[2],vertices[3],2);
    constraints[3] = new VEngine.Constraint(vertices[3],vertices[1],3);

    constraints[4] = new VEngine.Constraint(vertices[4],vertices[5],4);
    constraints[5] = new VEngine.Constraint(vertices[5],vertices[6],5);
    constraints[6] = new VEngine.Constraint(vertices[6],vertices[4],6);

    vertices[1].pos.

    //bodies[0] = new VEngine.Body([vertices[0]]);
    bodies[0] = new VEngine.Body([vertices[1],vertices[2],vertices[3]],0);
    bodies[1] = new VEngine.Body([vertices[4],vertices[5],vertices[6]],1);

    dev = new VEngine.Dev(canvas,1/60,1);    
    drawingLoop();    
}

function drawingLoop()
{
	
	if(debug)
	{
		if(mousePressed | timer < 10)
    	{
    	    dev.physics(vertices,constraints,bodies);
    	    mouseReleased = false;
            mousePressed = false;
    	}
    }
    else
    {
    	dev.physics(vertices,constraints,bodies);
    }
	dev.clear();
	dev.draw(vertices,constraints,bodies);

	timer++;
	if(timer==100000) return;
	else window.requestAnimFrame(drawingLoop);
}
