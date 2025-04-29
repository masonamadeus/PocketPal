(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"PodCube2025_atlas_1", frames: [[918,1741,451,96],[904,0,890,1739],[0,1741,916,96],[0,0,902,1739],[1676,1741,130,64],[1371,1741,303,64],[0,1839,1136,2]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_8 = function() {
	this.initialize(ss["PodCube2025_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["PodCube2025_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["PodCube2025_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["PodCube2025_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(img.CachedBmp_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2715,1753);


(lib.CachedBmp_3 = function() {
	this.initialize(ss["PodCube2025_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["PodCube2025_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["PodCube2025_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.T_List = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.008)").s().p("EhA5BA6MAAAiBzMCBzAAAMAAACBzg");
	this.shape.setTransform(415.35,415.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,830.7,830.7);


(lib.SC_MAIN = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ACTIONS
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(1,1,1).p("EBE6hE5MAAACJzMiJzAAAMAAAiJzg");
	this.shape.setTransform(440,440);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// overlay
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(3,1,1).p("Eg5rg8cMBzXAAAQCxAAAACxMAAABzXQAACxixAAMhzXAAAQixAAAAixMAAAhzXQAAixCxAAg");
	this.shape_1.setTransform(441.675,-274.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_3
	this.text = new cjs.Text("Transmissions", "48px 'Convection'", "#FFFFFF");
	this.text.lineHeight = 54;
	this.text.lineWidth = 280;
	this.text.alpha = 0.99607843;
	this.text.parent = this;
	this.text.setTransform(16.35,217.65);

	this.text_1 = new cjs.Text("Transmissions", "48px 'Convection'", "#FFFFFF");
	this.text_1.lineHeight = 54;
	this.text_1.lineWidth = 280;
	this.text_1.alpha = 0.99607843;
	this.text_1.parent = this;
	this.text_1.setTransform(16.35,274.65);

	this.text_2 = new cjs.Text("PodCube", "96px 'Do Hyeon'", "#FFFFFF");
	this.text_2.lineHeight = 98;
	this.text_2.lineWidth = 351;
	this.text_2.parent = this;
	this.text_2.setTransform(279.75,11.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text_2},{t:this.text_1},{t:this.text}]}).wait(1));

	// BACKDROP
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1D437A").s().p("EhEvBEwMAAAiJfMCJfAAAMAAACJfg");
	this.shape_2.setTransform(440,440);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.SC_MAIN, new cjs.Rectangle(-2,-663.1,884,1545.1), null);


(lib.RedLED = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AApgxQhgAIARBb");
	this.shape.setTransform(6.8168,5.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,1,1).p("AAWg8QA0AdgWA8QgpA7hEgy");
	this.shape_1.setTransform(8.777,6.5218);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF9696").s().p("Ag4AmQgRhaBggIQA0AdgWA8QgWAggeAAQgZAAgggXg");
	this.shape_2.setTransform(8.6439,6.5218);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[]},1).wait(66));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.6,15.6,14.299999999999999);


(lib.PodCubeScreen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0.498)").ss(1,1,1).p("EgK+ghWIxMYSA7qGGMAbUgpeEALnAjZIQk4i");
	this.shape.setTransform(217.75,311.475);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#131313").ss(5,1,1).p("EggBgbHQgGmIGChsMA0LgNIQGVhsgPGYMAAABH3QANEYjLA8Mg3TAOYQloBHgekZg");
	this.shape_1.setTransform(206.0391,309.8775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(0,0,0,0.498)").ss(1,1,1).p("A+U7kQARksF1h4MAxDgMgQFlhmgHEuMAAABHjQASEbjGAvMgzPANSQmdB2gHkWg");
	this.shape_2.setTransform(214.075,310.76);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(0.1,1,1).p("EgQfAgrIJ+igIAA6QIIMiGQLnjcCoptQBJmLhBlsQhAlrj7iaQkYi4qxDCIsYDZgAmh1EIAAPeIFghQQHih6AzlJQAzlKiMiSQiMiTkyBKg");
	this.shape_3.setTransform(246.7853,322.2283);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FAFAFA").s().p("Awa7tIMYjZQKxjCEYC4QD7CaBAFrQBBFshJGLQioJtrnDcIoMCGIAAaQIp+CggAhD2eIleBaIAAPeIFghQQHih6AzlJQAzlKiMiSQhdhiioAAQhTAAhmAZg");
	this.shape_4.setTransform(246.7853,322.2283);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#1768DA").s().p("EggLAs6MAAKhIBQgGmIGChsMA0LgNIQGVhsgPGYMAAABH3QANEYjLA8Mg3TAOYQhJAPg7AAQjqAAgYjhgEgZxAvLQBWAAB5giIADgBMAzPgNSQC1grAAjyIgBgtMAAAhHjIAAgFQACjcjDgBIgBAAIAAAAQg/ABhUAXIgGABIgDABMgxDAMgQl1B4gREsMAAABHjQAFDDDNAAIAAAAIAAAAgEgZxAvLQjNAAgFjDMAAAhHjQARksF1h4MAxDgMgIADgBIAGgBQBUgXA/gBIAAAAIABAAQDDABgCDcIAAAFMAAABHjIABAtQAADyi1ArMgzPANSIgDABQh5AihWAAIAAAAIAAAAgACV9LIsYDZMgAFA8YIJ/igIAA6QIIMiGQLnjcCnptQBJmLhAlrQhBlsj6iZQiJhajqAAQj2AAlhBjgAgJzJIFdhaQEyhJCNCSQCMCSgzFKQg0FKniB5IlfBQgA9D7bIAAAAg");
	this.shape_5.setTransform(206.0391,309.8775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.5,-2.5,417.1,624.8);


(lib.PodCubeContour = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0.498)").ss(1,1,1).p("EA9GgwVIGQBuQFCBwlCBYMhAYAQkEBHugnRMAAABRjApN67IGGBkQDHA9gJC9MAAABRPQgIDul0gwMg9QgPoAhZ6nIn0h4EBEwgqPMg+qAQGQjOA7AGC/MAAABRjQgLERGRhdMA7sgPeEg+zgorImGhkQi8goAIDIMAAABRPEgDHg+3Mg++AQkQlMBYCsBIIEsBG");
	this.shape.setTransform(459.0317,402.3958);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,920.1,806.8);


(lib.PodCubeBackdrop = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#131313").ss(10,1,1).p("EA9LgyFMgw7gMgQrZi+m3BaMg6NAO7QpXCMAEGVMAAABRPQAIGVGIBpMA9QAPoQFwBBGbhLMA9RgPoQFXhVAumeMgAKhRQQgOmMluheQk+hdhSgRg");
	this.shape.setTransform(470.4737,413.4501);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FAFAFA").s().p("EgGABAIMg9QgPoQmIhpgImUMAAAhRPQgEmVJXiNMA6NgO7QG3hZLZC9MAw7AMgQBSARE+BdQFuBeAOGNMAAKBRQQguGdlXBVMg9RAPoQjdAojPAAQi0AAirgeg");
	this.shape_1.setTransform(470.4737,413.4501);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-5,951,836.9);


(lib.PanelTop = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Contour
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0.498)").ss(1,1,1).p("AuNAUMgq+gK7A0dizI+en0Eg7NAUyIAA+TEg5LAWMMAq+AK8QBFgGAVhKIAA/QQAJjpEjhWMBDVgRMEg1lgPTMBFDgR0");
	this.shape.setTransform(385.05,213.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Outline_Fill
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(19,19,19,0.988)").ss(5,1,1).p("EA9LgVmMhGTASKQjBAugHDLIAAfQQgTCxirgbMgq+gK8QjHgqAJjQIAA8RQgEmQGKhkMBDZgRNg");
	this.shape_1.setTransform(391.5555,218.0787);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FAFAFA").s().p("EgPOAiDMgq+gK8QjHgqAJjQIAA8RQgEmQGKhkMBDZgRNMAw2AMfMhGTASKQjBAugHDLIAAfQQgRCZiCAAQgUAAgXgDg");
	this.shape_2.setTransform(391.5555,218.0787);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.5,-2.6,788.1,441.40000000000003);


(lib.PanelSq = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#131313").ss(5,1,1).p("AwTwgQAAkMEKBFIYfGPQEBBZgEDzIAAY6QARDakOgTI4fmPQgegGgagJQhYgggzhAQhDhTgEiKg");
	this.shape.setTransform(104.4004,127.0457);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AtEylIZiGcQCkA/AIDYIAAYSQAICXi0gSI59mpAvJwgIAAZi");
	this.shape_1.setTransform(103.69,127.0961);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.5,-2.5,213.8,259.1);


(lib.GreenLED2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("AAWg8QA0AdgWA8QgpA7hEgy");
	this.shape.setTransform(8.777,6.5218);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(0.1,1,1).p("AApgxQhgAIARBb");
	this.shape_1.setTransform(6.8168,5.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#9FFF96").s().p("Ag4AmQgRhaBggIQA0AdgWA8QgWAggeAAQgZAAgggXg");
	this.shape_2.setTransform(8.6439,6.5218);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[]},1).wait(71));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.6,15.6,14.299999999999999);


(lib.FloppyDrive = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#131313").ss(5,1,1).p("AA1TDQgUACgXgBQguACglgLQiOgmADjFIAA/YQACg+AVgpQAwhfCUAMQDXAPgJDrIAAfYQABCMh3AfQgSAFgUAC");
	this.shape.setTransform(21.29,122.0688);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(0.1,1,1).p("AAAipQgHAGgBARIAAEBQgCA0AlgEAAAipQgDAAgFABQgfAGAEA0IAADpQAAAsAjADQATAAAIgLAAAipQAkACAAA5IAADpQACAYgLAM");
	this.shape_1.setTransform(19.1666,122.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("ABNSxQACAAACAAQAFgDAGgEQBGgrALg2MAAAggiQgBhHgdg3Qgdg4hcgaQhbgahgBCQgDACgEAB");
	this.shape_2.setTransform(18.9,123.8175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CCCCCC").s().p("AgWB1IAAkBQABgRAIgHQAjADAAA4IAADpQACAZgLALIgFABQgfAAABgwg");
	this.shape_3.setTransform(20.5544,122.2679);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.5,-2.5,47.6,249.1);


(lib.DetailCircleIndent = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AAwBeQgJABgJgBQgfgHgYghQgWgjAAgoQAAgqAWgZQAEgCADgD");
	this.shape.setTransform(8.025,9.445);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(3,1,1).p("ABPAPQAAAqgXAYQgDADgEADQgVASgcgFQgggHgXghQgXgiAAgoQAAgqAXgYQAQgSAWgCQAIgBAJACQAhAGAXAiQAXAiAAAog");
	this.shape_1.setTransform(7.9,10.1243);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AAQBeQgggHgXghQgXgjAAgoQAAgqAXgZIAGgFQAIgBAKACQAfAGAYAiQAXAiAAAoQAAAqgXAYIgGAGIgIABIgKgBg");
	this.shape_2.setTransform(9.5,9.44);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,18.8,23.3);


(lib.ButtonOrange = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#131313").ss(3,1,1).p("AgUDPIARgFIB1geQBjgWgujBQgujChcAjIgnAJIhkAVQhKAdAEC+QARC0CPgUg");
	this.shape.setTransform(18.1248,20.4803);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(0.1,1,1).p("AgYjEQBpgVAkDUQAWB7gnAzAh8ivQB3gWAWDdQAVCVg3Aa");
	this.shape_1.setTransform(19.4967,20.7806);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("AhGizQBygUAWDMQAUCIg3Ap");
	this.shape_2.setTransform(12.4302,22.6318);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F56104").s().p("AAuAQQgljUhoAVIAogJQBbgjAuDCQAuDChjAVQAngzgWh7g");
	this.shape_3.setTransform(26.6327,18.6303);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.9,39.3,44.8);


(lib.Button = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#131313").ss(3,1,1).p("AgODNIAQgFIB2geQBQghgkizQgli0hcASIgnAJIhkAVQhKAdAEC+QARC0CPgUg");
	this.shape.setTransform(17.5007,20.6684);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(0.1,1,1).p("Ah8ivQB3gWAWDdQAVCVg3AaAgYjEQBpgVAkDUQAWB7gnAz");
	this.shape_1.setTransform(19.4967,20.7806);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("AhGizQBygUAWDMQAUCIg3Ap");
	this.shape_2.setTransform(12.4302,22.6318);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1768DA").s().p("AA0AOQgljUhoAVIAogJQBbgSAlC1QAkCzhQAgQAngzgWh7g");
	this.shape_3.setTransform(26.0086,18.8184);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,38,44.4);


(lib.SCREEN_MANAGER = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.004)").s().p("EhEvBEwMAAAiJfMCJfAAAMAAACJfg");
	this.shape.setTransform(440,440);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.SCREEN_MANAGER, new cjs.Rectangle(0,0,880,880), null);


(lib.PocketPalIndicator = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["rgba(255,255,255,0.439)","rgba(255,255,255,0)","rgba(255,255,255,0.024)"],[0,0.765,1],-0.7,-5,0,-0.7,-5,19.1).s().p("AhbBcQgmgnAAg1QAAg0AmgnQAngmA0AAQA2AAAmAmQAlAnABA0QgBA1glAnQgmAmg2AAQg0AAgngmg");
	this.shape.setTransform(13.15,13.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#33E532","#013401"],[0,1],-1.6,-2.1,0,-1.6,-2.1,11.9).s().p("AhOBOQgggggBguQABgtAgghQAhggAtgBQAvABAgAgQAgAhAAAtQAAAuggAgQggAigvgBQgtABghgig");
	this.shape_1.setTransform(12.8,12.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1_copy
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("AhXBXQgkgjAAg0QAAgzAkgkQAlgkAyAAQA0AAAjAkQAlAkAAAzQAAA0glAjQgjAlg0AAQgyAAglglg");
	this.shape_2.setTransform(12.95,13.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AhfBfQgngnAAg4QAAg3AngoQAognA3AAQA4AAAnAnQAoAoAAA3QAAA4goAnQgnAog4AAQg3AAgogog");
	this.shape_3.setTransform(13.5,13.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.PocketPalIndicator, new cjs.Rectangle(0,0,27,27), null);


(lib.PlayerIndentation = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#33302A").ss(1,1,1).p("AfW4hQCtAIgEC2MAAAArNQAADAjJgIMg+QgABQirgGAIjCMAABgq9QAAi+CtABg");
	this.shape.setTransform(218.3898,157.0676);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.PlayerIndentation, new cjs.Rectangle(-0.1,-0.9,437,316), null);


(lib.ScreenShine = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["rgba(255,255,255,0)","rgba(255,255,255,0.694)"],[0.667,0.882],1.4,-7.3,0,1.4,-7.3,735.6).s().p("EhAPBB0QhbAAABhwMAAAiAHQgBhwBbAAMCAfAAAQBaAAAABwMAAACAHQAABwhaAAgEhA7g/WMAAAB+tQAABvBaAAMB/FAAAQBZAAAAhvMAAAh+tQAAhuhZAAMh/FAAAQhaAAAABug");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FFFFFF","rgba(255,255,255,0)"],[0.463,0.596],1.4,-7.3,0,1.4,-7.3,735.6).s().p("EhAPBB0QhbAAABhwMAAAiAHQgBhwBbAAMCAfAAAQBaAAAABwMAAACAHQAABwhaAAgEhA7g/WMAAAB+tQAABvBaAAMB/FAAAQBZAAAAhvMAAAh+tQAAhuhZAAMh/FAAAQhaAAAABug");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ScreenShine, new cjs.Rectangle(-420.2,-421.2,840.5,842.4), null);


(lib.ScreenShadow = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(0,0,0,0.2)","rgba(0,0,0,0)"],[0,0.671],-31.4,15.7,-31.4,-11.7).s().p("EhD3gCeMCGaAAqQBVAAAAAbIAADbQAAAbhVAAMiGUAACg");
	this.shape.setTransform(-418.475,418.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["rgba(0,0,0,0.2)","rgba(0,0,0,0)"],[0,0.671],15.7,31.5,-11.7,31.5).s().p("EgB0hCiQAAhVAbAAIDcAAQAaAAAABVMAACCGUIk9AGg");
	this.shape_1.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ScreenShadow, new cjs.Rectangle(-852.8,-434.3,868.6999999999999,868.7), null);


(lib.ScreenMaskF5F3EB = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F5F3EB").s().p("EhGTBGUMAAAiMnMCMnAAAMAAACMngEhD0hBZMAAACC6QAABIAiAnQATAWAdAKQAOAGAQACIADABIAGAAIAdADIABAAIABAAIACAAMCC6AAAQCagBAAiaMAAAiC6IAAgIQgBgSgCgQIgEgVQgIgfgagYQgngkhKAAMiC6AAAQidAIADCSg");
	this.shape.setTransform(450,450);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ScreenMaskF5F3EB, new cjs.Rectangle(0,0,900,900), null);


(lib.ScreenLidRight = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F5F3EB").s().p("EhDmhC3QAngqBSgDMCC5AAAQBLAAAmAkQAaAXAIAgIAEAUQADAQABATIAAAIMAAACC6QAABMgkAqg");
	this.shape.setTransform(-0.025,0.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ScreenLidRight, new cjs.Rectangle(-432.7,-432.4,865.4,865.0999999999999), null);


(lib.ScreenLidLeft = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F5F3EB").s().p("EhBLBDjIgCAAIgBAAIgCAAIgcgCIgGAAIgDgBQgQgDgOgFQgdgLgTgVQgignAAhIMAAAiC6QgFg9Alg0MCGsCGfQgqAmhOAAg");
	this.shape.setTransform(0.1767,-0.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ScreenLidLeft, new cjs.Rectangle(-432.5,-432.5,865.4,864.6), null);


(lib.ScreenDefaultBackground = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#444444","#282828"],[0.435,1],0,0,0,0,0,609.4).s().p("EhE6BGUQhZAAAAhgMAAAiJnQAAgzAagYQAWgVApAAMCJ1AAAIANABQBMAHAABYMAAACJnQAABghZAAg");
	this.shape.setTransform(450,450);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ScreenDefaultBackground, new cjs.Rectangle(0,0,900,900), null);


(lib.ButtonSquareTop = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],-26.9,-28.3,0,-26.9,-28.3,174.3).s().p("AlpJMQhjAAg3gtQhCg3AAh6QAVlmgVl1QAAjeDcAAQFsAgFnggQB5AAA3BDQAsA3AABkQgWFxAWFqQAADejcAAQlqgZlpAZg");
	this.shape.setTransform(58.225,58.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,116.5,117.7);


(lib.DPadButtonMiddle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#82827B","#474644"],[0.714,0.961],0.5,-30.8,0,0.5,-30.8,143.3).s().p("AiULEQibgGgti9IimwBQAAjDDJAAIJzAAQDJAAAADDIimQBQgtC9ibAGg");
	this.shape.setTransform(0,-70.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-51.4,-141.5,102.9,141.5);


(lib.DPadButtonHole = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282828").s().p("AicLXQijgGgwjCIiuwdQAAjIDTAAIKVAAQDTAAAADIIiuQdQgvDCikAGg");
	this.shape.setTransform(-2.35,0,1,0.9942,0,0,0,0,72.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.5,-144.5,108.3,144.5);


(lib.ButtonVerticalSM = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		
		if (!this.initialized) {
			BehaviorDispenser.init(this,"Button")
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(5));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],-22.1,-31.7,0,-22.1,-31.7,111.3).s().p("AkHKEQivAAAAixQAWnagWnKQAAiyCvAAQEEATELgTQCvAAAACyQgXHcAXHIQAACxivAAQkLgfkEAfg");
	this.shape.setTransform(44.075,64.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],-21.8,-31.2,0,-21.8,-31.2,109.5).s().p("AkDJ6QisAAAAivQAWnRgWnEQAAivCsAAQEAATEGgTQCtAAAACvQgWHVAWHAQAACvitAAQkGgekAAeg");
	this.shape_1.setTransform(45.325,65.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],-21.7,-31.1,0,-21.7,-31.1,109.3).s().p("AkDJ4QirAAAAiuQAWnRgWnCQAAiuCrAAQEAASEGgSQCsAAAACuQgXHUAXG/QAACuisAAQkGgekAAeg");
	this.shape_2.setTransform(47.4,68.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.rf(["#82827B","#474644"],[0.714,0.961],0,0,0,0,0,79.2).s().p("AkYKoQi8AAAAi8IAAvYQAAi7C8AAIIxAAQC8AAAAC7IAAPYQAAC8i8AAg");
	this.shape_3.setTransform(45.85,66.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.rf(["#82827B","#474644"],[0.714,0.961],0,0,0,0,0,77.9).s().p("AkUKdQi5AAAAi5IAAvIQAAi4C5AAIIpAAQC4AAABC4IAAPIQgBC5i4AAg");
	this.shape_4.setTransform(47.05,67.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.rf(["#82827B","#474644"],[0.714,0.961],0,0,0,0,0,77.8).s().p("AkTKcQi5gBAAi5IAAvEQAAi4C5AAIInAAQC5AAAAC4IAAPEQAAC5i5ABg");
	this.shape_5.setTransform(48.25,70.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_3}]},1).wait(1));

	// Layer_1
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282828").s().p("AkeKyQjAAAAAi/IAAvmQAAi+DAAAII+AAQC/AAAAC+IAAPmQAAC/i/AAg");
	this.shape_6.setTransform(46.9,67.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1.2,95.8,138.1);


(lib.ButtonSmall = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		if (!this.initialized){
			BehaviorDispenser.init(this,"Button")
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(5));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],37.9,1.6,0,37.9,1.6,102.5).s().p("AnIEVQg/AAgtg9Qgsg+gBhUIABiLQAAhUAsg/QAtg8A/AAQHNAfHEggQA/ABAuA9QAsA+AABVIAACKQAABVguA+QgsA8g/ABQnBgxnQAwg");
	this.shape.setTransform(82.525,1.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],37.4,1.6,0,37.4,1.6,101.3).s().p("AnCESQg/AAgsg9Qgsg8gBhTIABiKQAAhTAsg/QAsg7A/AAQHHAfG/ggQA9ABAuA8QAsA+AABTIAACKQAABTgtA+QgtA7g9AAQm8gwnKAwg");
	this.shape_1.setTransform(81.2,1.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],36.6,1.5,0,36.6,1.5,99.1).s().p("Am4EMQg+AAgrg8Qgrg7gBhRIABiHQAAhRArg9QAsg6A9AAQG9AeG0geQA9AAAtA7QArA8AABSIgBCGQABBRgtA9QgrA6g9AAQmygvm/Avg");
	this.shape_2.setTransform(78.625,1.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.rf(["#82827B","#474644"],[0.714,0.961],-0.1,0,0,-0.1,0,79.7).s().p("AHZEmIuyAAQhBAAgvhBQgvhAABhaIgBiUQAAhbAvhBQAuhABCAAIOyAAQBCAAAvBAQAvBCAABaIgBCUQABBagvBBQguBBhCAAIgBgBg");
	this.shape_3.setTransform(80.4,1.2502);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.rf(["#82827B","#474644"],[0.714,0.961],-0.1,0,0,-0.1,0,78.8).s().p("AHTEjIumAAQhBAAguhBQgvg/ABhaIAAiRQAAhZAthCQAvg/BBAAIOnAAQBBAAAuBAQAvBBAABZIgBCRQAABaguBAQguBAhAAAIgCAAg");
	this.shape_4.setTransform(80.45,1.3002);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.rf(["#82827B","#474644"],[0.714,0.961],-0.1,0,0,-0.1,0,76.9).s().p("AHJEcIuRAAQg/AAgug+Qgug/ABhXIAAiOQAAhYAthAQAtg9BAgBIOSAAQA/ABAuA+QAtA/AABXIgBCPQAABXgtBAQgsA9hAAAIgBAAg");
	this.shape_5.setTransform(77.6,1.2002);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_3}]},1).wait(1));

	// Layer_1
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282828").s().p("AHkEuIvFAAQhCABgxhEQgvhAAAheIgBiYQAAhdAwhDQAwhCBDAAIPFgBQBCABAwBCQAvBCAABeIAACYQAABegwBBQgtBDhCAAIgCgBg");
	this.shape_6.setTransform(78.9,0.9516);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(14.4,-29.3,129.29999999999998,60.5);


(lib.EPISODEListBounds = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.996)").s().p("EhBJAIhIAAxBMCCTAAAIAARBg");
	this.shape.setTransform(416.95,54.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.EPISODEListBounds, new cjs.Rectangle(0,0,833.9,109.1), null);


(lib.PodCube = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Contour
	this.instance = new lib.PodCubeContour("synched",0);
	this.instance.setTransform(470.95,411.3,1,1,0,0,0,459,402.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Minor_Details
	this.instance_1 = new lib.RedLED("synched",0);
	this.instance_1.setTransform(73.95,421.4,1,1,0,0,0,8.6,7);

	this.instance_2 = new lib.GreenLED2("synched",0);
	this.instance_2.setTransform(50.5,418.55,1,1,0,0,0,8.6,7);

	this.instance_3 = new lib.DetailCircleIndent("synched",0);
	this.instance_3.setTransform(430.5,538.4,1,1,0,0,0,7.9,10.1);

	this.instance_4 = new lib.DetailCircleIndent("synched",0);
	this.instance_4.setTransform(390.4,528.5,1,1,0,0,0,7.9,10.1);

	this.instance_5 = new lib.DetailCircleIndent("synched",0);
	this.instance_5.setTransform(430.5,494.4,1,1,0,0,0,7.9,10.1);

	this.instance_6 = new lib.ButtonOrange("synched",0);
	this.instance_6.setTransform(124,613.8,1,1,0,0,0,17.5,20.7);

	this.instance_7 = new lib.Button("synched",0);
	this.instance_7.setTransform(124.5,682.45,1,1,0,0,0,17.5,20.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]}).wait(1));

	// Major_Details
	this.instance_8 = new lib.PodCubeScreen("synched",0);
	this.instance_8.setTransform(715.1,476.5,1,1,0,0,0,206.1,309.9);

	this.instance_9 = new lib.PanelTop("synched",0);
	this.instance_9.setTransform(470.45,233.15,1,1,0,0,0,391.5,218.2);

	this.instance_10 = new lib.PanelSq("synched",0);
	this.instance_10.setTransform(334.3,655.1,1,1,0,0,0,104.4,127);

	this.instance_11 = new lib.FloppyDrive("synched",0);
	this.instance_11.setTransform(63.65,567.2,1,1,0,0,0,21.3,122);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8}]}).wait(1));

	// Outline_Fill
	this.instance_12 = new lib.PodCubeBackdrop("synched",0);
	this.instance_12.setTransform(470.4,413.4,1,1,0,0,0,470.4,413.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-5,951,836.9);


(lib.Screen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_28 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(28).call(this.frame_28).wait(1));

	// Background
	this.instance = new lib.ScreenMaskF5F3EB();
	this.instance.setTransform(450,450,1,1,0,0,0,450,450);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(29));

	// shine
	this.instance_1 = new lib.ScreenShine();
	this.instance_1.setTransform(451.95,450.5,1.0055,1.0055);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(8).to({alpha:1},2).wait(19));

	// MASK (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EhBcBD4IgCAAIgCAAIgBAAIgdgCIgFgBIgEAAQgQgDgNgFQgegLgTgWQgigmAAhJMAAAiC5QgCiTCdgIMCC5AAAQBLAAAmAkQAaAYAIAfIAEAVQADAQABASIAAAJMAAACC5QAACbibAAg");
	mask.setTransform(450.273,450.375);

	// shadow
	this.instance_2 = new lib.ScreenShadow();
	this.instance_2.setTransform(868.95,450.35);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(4).to({_off:false},0).to({alpha:1},4).wait(21));

	// LID_L
	this.instance_3 = new lib.ScreenLidLeft();
	this.instance_3.setTransform(448.35,452.65);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4).to({scaleX:0.9881,scaleY:0.9881,x:448.45,y:465.3},4).wait(2).to({y:469.5},0).to({y:1327.7},18).wait(1));

	// LID_R
	this.instance_4 = new lib.ScreenLidRight();
	this.instance_4.setTransform(452,448.4);

	var maskedShapeInstanceList = [this.instance_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(4).to({scaleX:0.9881,scaleY:0.9881,x:464.65,y:448.5},4).wait(2).to({x:468.85},0).to({x:1327.05},18).wait(1));

	// DAMAGE
	this.instance_5 = new lib.CachedBmp_4();
	this.instance_5.setTransform(14.6,22.15,0.5,0.5);

	var maskedShapeInstanceList = [this.instance_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(29));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["rgba(249,249,249,0.149)","rgba(249,249,249,0.157)","rgba(0,0,0,0.169)"],[0,0,1],0,0,0,0,0,636.4).s().p("EhGTBGUMAAAiMnMCMnAAAMAAACMng");
	this.shape.setTransform(450,450);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(29));

	// vignette
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["rgba(0,0,0,0.059)","rgba(0,0,0,0.369)","rgba(0,0,0,0.498)"],[0.039,0.835,1],-8.9,-0.5,0,-8.9,-0.5,1217.5).s().p("EBAnBDdMiB4AAAIgCAAIgBAAIgCAAIggAAIgFgBIgCAAQACAAAAgBQABAAgBAAQAAAAgCAAQgCAAgCABIgCAAIgMgBQgcgCgcgMQgGgFgLgFMgAJiEeQAOiAB6gDMCELAALQASgBAKACQAPAWABARQAAARADAYIAAADMAAACDCQgECciUAAQgQAAgSgCg");
	this.shape_1.setTransform(452.5,453.0235);

	var maskedShapeInstanceList = [this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(29));

	// EDGES
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#474642").s().p("EhDiBDAMAAAiEFQAAiaCbAAMCEIAAAQAaAYAIAfQgdgCgpAAUhBNgBBhCeAAlQiDABAJC1UgASBCkAASAgaUAASAgaAAFAAYQgegLgTgVg");
	this.shape_2.setTransform(451.575,451.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#85837B").s().p("EhDiBBzMAAAiC6QgCiSCdgIMCC5AAAQBLAAAmAkMiEIAAAQibAAAACaMAAACEFQgignAAhIg");
	this.shape_3.setTransform(448.198,448.2);

	var maskedShapeInstanceList = [this.shape_2,this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(29));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,900,900);


(lib.DPadButtonUP = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop()
		
		if (!this.initialized){
			this.keybind = ["ArrowUp","w","W"]
			BehaviorDispenser.init(this,"Button")
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(5));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],-12.4,-32.3,0,-12.4,-32.3,182.9).s().p("AkqKkQi/AAAAi5QB8nrAhnpQAri0CUgGIEbAAQCkAaAeFBQAeFCB8HxQAAC5i+AAQksgkkqAkg");
	this.shape.setTransform(-3.275,69.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],-12,-31.2,0,-12,-31.2,177.1).s().p("AkhKOQi4AAAAizQB3nbAhnaQAqitCOgGIETAAQCeAYAdE3QAdE4B4HhQABCzi5AAQkigikhAig");
	this.shape_1.setTransform(-0.1,74.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape,p:{x:-3.275,y:69.55}}]}).to({state:[{t:this.shape,p:{x:-2.325,y:70.9}}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape,p:{x:-2.325,y:70.9}}]},1).to({state:[{t:this.shape,p:{x:-3.275,y:69.55}}]},1).wait(1));

	// Layer_2
	this.instance = new lib.DPadButtonMiddle("synched",0);
	this.instance.setTransform(-1.95,70.2,1.0233,0.9958,180,0,0,0.1,-69.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:-0.8,y:71.7},0).wait(1).to({regX:-0.1,scaleX:1.0026,scaleY:0.9757,x:0.55,y:73.7},0).wait(1).to({regX:0.1,scaleX:1.0233,scaleY:0.9958,x:-0.8,y:71.7},0).wait(1).to({x:-1.95,y:70.2},0).wait(1));

	// Layer_1
	this.instance_1 = new lib.DPadButtonHole("synched",0);
	this.instance_1.setTransform(-25.6,7.85,0.9913,0.9913,180,0,0,22.6,-6.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.5,1.3,107.4,143.29999999999998);


(lib.DPadButtonRIGHT = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop()
		if (!this.initialized){
			this.keybind = ["ArrowRight","D","d"]
			BehaviorDispenser.init(this,"Button")
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(5));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],-23.9,38.8,0,-23.9,38.8,113.6).s().p("AkqKkQi/AAAAi6QB8nqAhnpQAri0CUgGIEbAAQCkAZAeFCQAeFBB8HxQAAC6i+AAQksgkkqAkg");
	this.shape.setTransform(-4.975,78.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],-24.7,40.7,0,-24.7,40.7,115.6).s().p("AkqKkQi/AAAAi6QB8nqAhnpQArizCUgHIEbAAQCkAZAeFBQAeFCB8HxQAAC6i+AAQksgkkqAkg");
	this.shape_1.setTransform(-2.575,75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],-21.7,44.6,0,-21.7,44.6,117.2).s().p("AklKaQi9AAAAi3QB6njAhniQArixCSgGIEWAAQChAZAeE8QAdE+B7HpQAAC3i8AAQkmgkkmAkg");
	this.shape_2.setTransform(-0.1,72.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	// Layer_2
	this.instance = new lib.DPadButtonMiddle("synched",0);
	this.instance.setTransform(-2.7,74.05,1.0233,0.9958,180,0,0,0.1,-69.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:-1.3,y:72.65},0).wait(1).to({regX:0,scaleX:0.9861,scaleY:0.9597,x:0.55,y:70.55},0).wait(1).to({regX:0.1,scaleX:1.0233,scaleY:0.9958,x:-1.3,y:72.65},0).wait(1).to({x:-2.7,y:74.05},0).wait(1));

	// Layer_1
	this.instance_1 = new lib.DPadButtonHole("synched",0);
	this.instance_1.setTransform(-48.15,139.4,0.9906,0.9906,180,0,0,45.1,-138.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55.2,2.5,107.80000000000001,143.6);


(lib.DPadButtonLEFT = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop()
		if (!this.initialized){
			this.keybind = ["ArrowLeft","A","a"]
			BehaviorDispenser.init(this,"Button")
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(5));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],21,-27.3,0,21,-27.3,111.7).s().p("AkqKkQi/AAAAi5QB8nrAhnpQAri0CUgGIEbAAQCkAaAeFBQAeFCB8HxQAAC5i+AAQksgkkqAkg");
	this.shape.setTransform(3.225,69.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],22.6,-29.5,0,22.6,-29.5,114.5).s().p("AkqKkQi/AAAAi6QB8nqAhnpQAri0CUgGIEbAAQCkAZAeFBQAeFCB8HxQAAC6i+AAQksgkkqAkg");
	this.shape_1.setTransform(1.575,71.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],24,-30.8,0,24,-30.8,115.2).s().p("AkkKYQi8AAAAi2QB6niAgngQArixCRgGIEWAAQChAZAdE7QAdE9B6HoQAAC2i7AAQkmgkkkAkg");
	this.shape_2.setTransform(0.175,73.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	// Layer_2
	this.instance = new lib.DPadButtonMiddle("synched",0);
	this.instance.setTransform(0.15,70.2,1.0233,0.9958,180,0,0,0.1,-69.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:-0.8,y:71.35},0).wait(1).to({scaleX:1.0169,scaleY:0.9896,x:-2.15,y:72.6},0).wait(1).to({scaleX:1.0233,scaleY:0.9958,x:-0.8,y:71.35},0).wait(1).to({x:0.15,y:70.2},0).wait(1));

	// Layer_1
	this.instance_1 = new lib.DPadButtonHole("synched",0);
	this.instance_1.setTransform(29.2,9.9,0.9945,0.9945,180,0,0,-32.2,-8.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.3,1.3,107.8,143.7);


(lib.DPadButtonDN = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop()
		if (!this.initialized){
			this.keybind = ["ArrowDown","S","s"]
			BehaviorDispenser.init(this,"Button")
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(5));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],-18.2,-34.6,0,-18.2,-34.6,182.9).s().p("AiNKkQikgagelAQgelDh8nwQAAi6C+AAQErAkErgkQC/AAAAC6Qh8HpghHqQgrCziUAHg");
	this.shape.setTransform(-5.325,69.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],-24.3,-43.2,0,-24.3,-43.2,182.9).s().p("AiNKkQikgZgelBQgelCh8nxQAAi6C+AAQErAkErgkQC/AAAAC6Qh8HpghHqQgrCziUAHg");
	this.shape_1.setTransform(-3.575,71.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["#F5F3EB","#B5B3AD"],[0,0.733],-24.8,-45.5,0,-24.8,-45.5,181.4).s().p("AiKKfQihgZgdk/QgdlAh6ntQAAi4C7AAQEkAkElgkQC7AAAAC4Qh5HmggHmQgrCziRAGg");
	this.shape_2.setTransform(0.025,74.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	// Layer_2
	this.instance = new lib.DPadButtonMiddle("synched",0);
	this.instance.setTransform(-2.15,73.2,1.0233,0.9958,0,0,0,0.1,-69.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:-1.15,y:73.85},0).wait(1).to({regY:-69,scaleX:1.0027,scaleY:0.9884,x:0.75,y:76.2},0).wait(1).to({regY:-69.2,scaleX:1.0233,scaleY:0.9958,x:-1.15,y:73.85},0).wait(1).to({x:-2.15,y:73.2},0).wait(1));

	// Layer_1
	this.instance_1 = new lib.DPadButtonHole("synched",0);
	this.instance_1.setTransform(1.7,76.6,0.9884,0.9884,0,0,0,0,-69.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.9,1.2,107.8,143.70000000000002);


(lib.ButtonSquareYES = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {UP:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		
		if (!this.initialized) {
			this.keybind = ["Enter"];
			BehaviorDispenser.init(this,"Button")
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(10));

	// Layer_3
	this.instance = new lib.ButtonSquareTop("synched",0);
	this.instance.setTransform(7.55,6.2,0.9958,0.9958,0,0,0,7.8,6.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:6.6,regY:6.3,scaleX:0.9944,scaleY:0.9944,x:7.75,y:7.3},0).wait(1).to({x:8.45,y:8.15},0).wait(1).to({regX:20.6,regY:18.4,scaleX:0.9923,scaleY:0.9923,x:23.5,y:21.25},0).wait(1).to({x:24.9,y:22.7},0).wait(1).to({regY:18.5,scaleX:0.9777,scaleY:0.9777,x:27.15,y:24.65},0).wait(1).to({regY:18.4,scaleX:0.9923,scaleY:0.9923,x:24.9,y:22.7},0).wait(1).to({x:23.5,y:21.25},0).wait(1).to({regX:6.6,regY:6.3,scaleX:0.9944,scaleY:0.9944,x:8.45,y:8.15},0).wait(1).to({x:7.75,y:7.3},0).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#82827B","#474644"],[0.808,0.961],-4.8,-6.1,0,-4.8,-6.1,88.7).s().p("AmAJrQhqAAg6gvQhGg6AAiBIAAsBQAAjqDqAAIMBAAQCBAAA6BGQAvA6AABqIAAMBQAADqjqAAg");
	this.shape.setTransform(61.175,61.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#82827B","#474644"],[0.808,0.961],-4.9,-6.3,0,-4.9,-6.3,88.2).s().p("Al/JoQhoAAg5gwQhHg5AAiAIAAr+QAAjoDoAAIL/AAQB/AAA6BGQAvA6AABoIAAL+QAADpjoAAg");
	this.shape_1.setTransform(63.075,63.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["#82827B","#474644"],[0.808,0.961],-5,-6.3,0,-5,-6.3,87.7).s().p("Al9JlQhnAAg5gwQhGg4gBiAIAAr6QAAjnDnAAIL7AAQB+AAA5BGQAvA6ABBnIAAL6QAADojnAAg");
	this.shape_2.setTransform(63.45,63.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.rf(["#82827B","#474644"],[0.808,0.961],-4.9,-6.2,0,-4.9,-6.2,86.9).s().p("Al5JfQhnAAg5gvQhFg5AAh+IAAryQAAjlDlAAILzAAQB+AAA4BFQAvA5AABnIAALyQAADmjlAAg");
	this.shape_3.setTransform(64.025,64.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({x:61.775,y:62.225},0).wait(1).to({x:62.475,y:62.875},0).to({_off:true},1).wait(5).to({_off:false},0).wait(1).to({x:61.775,y:62.225},0).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282828").s().p("AmHJ3QhsAAg7gxQhIg6AAiEIAAsPQAAjvDvAAIMQAAQCDAAA7BIQAwA7AABsIAAMPQAADvjuAAg");
	this.shape_4.setTransform(62.35,62.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.7,-0.7,126.2,126.4);


(lib.ButtonSquareNO = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"UP":0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		
		if (!this.initialized) {
			this.keybind = ["Escape","\\",];
			BehaviorDispenser.init(this,"Button")
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(10));

	// Layer_3
	this.instance = new lib.ButtonSquareTop("synched",0);
	this.instance.setTransform(7.55,6.2,0.9958,0.9958,0,0,0,7.8,6.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:6.6,regY:6.3,scaleX:0.9944,scaleY:0.9944,x:7.75,y:7.3},0).wait(1).to({x:8.45,y:8.15},0).wait(1).to({regX:20.6,regY:18.4,scaleX:0.9923,scaleY:0.9923,x:23.5,y:21.25},0).wait(1).to({x:24.9,y:22.7},0).wait(1).to({regY:18.5,scaleX:0.9777,scaleY:0.9777,x:27.15,y:24.65},0).wait(1).to({regY:18.4,scaleX:0.9923,scaleY:0.9923,x:24.9,y:22.7},0).wait(1).to({x:23.5,y:21.25},0).wait(1).to({regX:6.6,regY:6.3,scaleX:0.9944,scaleY:0.9944,x:8.45,y:8.15},0).wait(1).to({x:7.75,y:7.3},0).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#82827B","#474644"],[0.808,0.961],-4.8,-6.1,0,-4.8,-6.1,88.7).s().p("AmAJrQhqAAg6gvQhGg6AAiBIAAsBQAAjqDqAAIMBAAQCBAAA6BGQAvA6AABqIAAMBQAADqjqAAg");
	this.shape.setTransform(61.175,61.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#82827B","#474644"],[0.808,0.961],-4.9,-6.3,0,-4.9,-6.3,88.2).s().p("Al/JoQhoAAg5gwQhHg5AAiAIAAr+QAAjoDoAAIL/AAQB/AAA6BGQAvA6AABoIAAL+QAADpjoAAg");
	this.shape_1.setTransform(63.075,63.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["#82827B","#474644"],[0.808,0.961],-5,-6.3,0,-5,-6.3,87.7).s().p("Al9JlQhnAAg5gwQhGg4gBiAIAAr6QAAjnDnAAIL7AAQB+AAA5BGQAvA6ABBnIAAL6QAADojnAAg");
	this.shape_2.setTransform(63.45,63.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.rf(["#82827B","#474644"],[0.808,0.961],-4.9,-6.2,0,-4.9,-6.2,86.9).s().p("Al5JfQhnAAg5gvQhFg5AAh+IAAryQAAjlDlAAILzAAQB+AAA4BFQAvA5AABnIAALyQAADmjlAAg");
	this.shape_3.setTransform(64.025,64.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({x:61.775,y:62.225},0).wait(1).to({x:62.475,y:62.875},0).to({_off:true},1).wait(5).to({_off:false},0).wait(1).to({x:61.775,y:62.225},0).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282828").s().p("AmHJ3QhsAAg7gxQhIg6AAiEIAAsPQAAjvDvAAIMQAAQCDAAA7BIQAwA7AABsIAAMPQAADvjuAAg");
	this.shape_4.setTransform(62.35,62.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.7,-0.7,126.2,126.4);


(lib._EPISODE = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"list-unselected":0,"list-selected":1,details:2};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// overlay_lines
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("EA5HgHbIG8AAIAAO6It9AAEg4YAHcInqAAIAAu6IXhAA");
	this.shape.setTransform(415.05,52.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#1D437A").ss(1,1,1).p("EA5HgHbIG8AAIAAO6It9AAEg4YAHcInqAAIAAu6IXhAA");
	this.shape_1.setTransform(415.05,52.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(29,67,122,0.996)").s().p("AhfC9IAAl5IABgCIC+C+Ii+C/g");
	this.shape_2.setTransform(803.675,53.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#1D437A").ss(1,1,1).p("EA5Lgt5IG8AAIAAO7EBAGAe+IAAO7I3hAAEhAFge0IAAu7IXhAAEg5JAt6Im8AAIAAvPMA2rAAAIAAG8");
	this.shape_3.setTransform(414.3,297.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(29,67,122,0.996)").s().p("AhfAAIC+i+IABABIAAF7IgBABg");
	this.shape_4.setTransform(22.475,63.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},1).to({state:[{t:this.shape_4},{t:this.shape_3}]},1).wait(1));

	// details_labels
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(12.25,492.9,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(663.4,549.55,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1();
	this.instance_2.setTransform(130.25,137.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},2).wait(1));

	// details_text
	this.guid = new cjs.Text("abracadabra", "10px 'Share Tech'", "#1D437A");
	this.guid.name = "guid";
	this.guid.textAlign = "center";
	this.guid.lineHeight = 13;
	this.guid.lineWidth = 295;
	this.guid.alpha = 0.99607843;
	this.guid.parent = this;
	this.guid.setTransform(509.55,578.55);

	this.instance_3 = new lib.PodCube("synched",0);
	this.instance_3.setTransform(172.25,263.65,0.1475,0.1475,0,0,0,470.5,413.6);

	this.text = new cjs.Text("PodCube Model:", "31px 'Do Hyeon'", "#1D437A");
	this.text.lineHeight = 33;
	this.text.lineWidth = 200;
	this.text.alpha = 0.99607843;
	this.text.parent = this;
	this.text.setTransform(72.35,333);

	this.model = new cjs.Text("podcube model text\nsecond line\nthird line", "28px 'Share Tech'", "#1D437A");
	this.model.name = "model";
	this.model.textAlign = "center";
	this.model.lineHeight = 34;
	this.model.lineWidth = 335;
	this.model.alpha = 0.99607843;
	this.model.parent = this;
	this.model.setTransform(172.25,365);

	this.location = new cjs.Text("Locale", "28px 'Share Tech'", "#1D437A");
	this.location.name = "location";
	this.location.textAlign = "center";
	this.location.lineHeight = 34;
	this.location.lineWidth = 781;
	this.location.alpha = 0.99607843;
	this.location.parent = this;
	this.location.setTransform(414.3,144.8);

	this.longDate = new cjs.Text("longDate", "28px 'Share Tech'", "#1D437A");
	this.longDate.name = "longDate";
	this.longDate.textAlign = "center";
	this.longDate.lineHeight = 34;
	this.longDate.lineWidth = 669;
	this.longDate.alpha = 0.99607843;
	this.longDate.parent = this;
	this.longDate.setTransform(414.3,6.7);

	this.tags = new cjs.Text("list, of, tags, for, episode", "28px 'Share Tech'", "#1D437A");
	this.tags.name = "tags";
	this.tags.lineHeight = 34;
	this.tags.lineWidth = 331;
	this.tags.alpha = 0.99607843;
	this.tags.parent = this;
	this.tags.setTransform(14,525.9);

	this.integrity = new cjs.Text("0000%", "38px 'Share Tech'", "#1D437A");
	this.integrity.name = "integrity";
	this.integrity.textAlign = "center";
	this.integrity.lineHeight = 45;
	this.integrity.lineWidth = 104;
	this.integrity.alpha = 0.99607843;
	this.integrity.parent = this;
	this.integrity.setTransform(739.1,509.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.integrity},{t:this.tags},{t:this.longDate},{t:this.location},{t:this.model},{t:this.text},{t:this.instance_3},{t:this.guid}]},2).wait(1));

	// Origin
	this.origin = new cjs.Text("Origin", "28px 'Share Tech'", "#FFFFFF");
	this.origin.name = "origin";
	this.origin.lineHeight = 34;
	this.origin.lineWidth = 1369;
	this.origin.alpha = 0.99607843;
	this.origin.parent = this;
	this.origin.setTransform(147.4,66.6);

	this.timeline.addTween(cjs.Tween.get(this.origin).wait(1).to({color:"#1D437A"},0).to({_off:true},1).wait(1));

	// Date
	this.date = new cjs.Text("00/00/0000", "28px 'Share Tech'", "#FFFFFF");
	this.date.name = "date";
	this.date.lineHeight = 34;
	this.date.alpha = 0.99607843;
	this.date.parent = this;
	this.date.setTransform(14,67);

	this.timeline.addTween(cjs.Tween.get(this.date).wait(1).to({color:"#1D437A"},0).wait(1).to({x:-179.35,y:66.6},0).wait(1));

	// Title
	this.title = new cjs.Text("Title", "48px 'Do Hyeon'", "#FFFFFF");
	this.title.name = "title";
	this.title.lineHeight = 50;
	this.title.lineWidth = 1504;
	this.title.alpha = 0.99607843;
	this.title.parent = this;
	this.title.setTransform(14,14);

	this.timeline.addTween(cjs.Tween.get(this.title).wait(1).to({color:"#1D437A"},0).wait(1).to({x:40.7,y:42.3,lineWidth:747},0).wait(1));

	// backdrops
	this.ListBounds = new lib.EPISODEListBounds();
	this.ListBounds.name = "ListBounds";
	this.ListBounds.setTransform(414.55,51.5,1,1,0,0,0,416.9,54.5);
	this.ListBounds.visible = false;

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(255,255,255,0.996)").s().p("EhBIAu4MAAAhdvMCCRAAAMAAABdvg");
	this.shape_5.setTransform(414.6,297.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ListBounds,p:{scaleY:1,y:51.5,visible:false}}]}).to({state:[{t:this.ListBounds,p:{scaleY:1.0087,y:52.8,visible:true}}]},1).to({state:[{t:this.shape_5}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-181.3,-3,1701.1,600.9);


(lib.SC_TRANSMISSIONS = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ACTIONS
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(1,1,1).p("EBE6hE5MAAACJzMiJzAAAMAAAiJzg");
	this.shape.setTransform(440,440);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.LISTVIEW = new lib.T_List("synched",0);
	this.LISTVIEW.name = "LISTVIEW";
	this.LISTVIEW.setTransform(51.65,71.95,0.9228,0.9228,0,0,0,0.1,0.1);

	this.instance = new lib._EPISODE();
	this.instance.setTransform(428.45,-373.8,1,1,0,0,0,402.9,72.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.LISTVIEW}]}).wait(1));

	// BACKDROP
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1D437A").s().p("EhEvBEwMAAAiJfMCJfAAAMAAACJfg");
	this.shape_1.setTransform(440,440);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.SC_TRANSMISSIONS, new cjs.Rectangle(-2,-449,1547.4,1331), null);


(lib.REGION3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(102,255,204,0)").s().p("EgjJBGUMAAAiMnMBGTAAAMAAACMng");
	this.shape.setTransform(225,450);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.ButtonSmall();
	this.instance.setTransform(429.65,192.9,1,1,-135.0006);

	this.instance_1 = new lib.ButtonSmall();
	this.instance_1.setTransform(277.05,192.9,1,1,-135.0006);

	this.BTN_TRANSMISSIONS = new lib.ButtonSmall();
	this.BTN_TRANSMISSIONS.name = "BTN_TRANSMISSIONS";
	this.BTN_TRANSMISSIONS.setTransform(124.45,192.9,1,1,-135.0006);

	this.instance_2 = new lib.PocketPalIndicator();
	this.instance_2.setTransform(352.95,17.95,0.5259,0.5259,0,0,0,0.1,0);

	this.BTN_NO = new lib.ButtonSquareNO();
	this.BTN_NO.name = "BTN_NO";
	this.BTN_NO.setTransform(257.55,476.5,1.0874,1.0874,0,0,0,0.1,0.3);

	this.BTN_YES = new lib.ButtonSquareYES();
	this.BTN_YES.name = "BTN_YES";
	this.BTN_YES.setTransform(60,659.25,1.0874,1.0874,0,0,0,0.2,0.3);

	this.instance_3 = new lib.CachedBmp_8();
	this.instance_3.setTransform(223.1,831.9,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_7();
	this.instance_4.setTransform(-1.5,7.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.BTN_YES},{t:this.BTN_NO},{t:this.instance_2},{t:this.BTN_TRANSMISSIONS},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.REGION3, new cjs.Rectangle(-1.5,0,451.5,900), null);


(lib.REGION2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// region_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(102,255,204,0)").s().p("EhGTBGUMAAAiMnMCMnAAAMAAACMng");
	this.shape.setTransform(225,450,0.5,1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.BTN_RIGHT = new lib.DPadButtonRIGHT();
	this.BTN_RIGHT.name = "BTN_RIGHT";
	this.BTN_RIGHT.setTransform(417.45,629.5,0.9891,0.9891,90,0,0,0.1,-0.2);

	this.BTN_LEFT = new lib.DPadButtonLEFT();
	this.BTN_LEFT.name = "BTN_LEFT";
	this.BTN_LEFT.setTransform(21.75,628.3,0.9891,0.9891,-90,0,0,-0.1,-0.1);

	this.BTN_DOWN = new lib.DPadButtonDN();
	this.BTN_DOWN.name = "BTN_DOWN";
	this.BTN_DOWN.setTransform(177.2,688.2,0.9891,0.9891,0,0,0,-43.5,7.1);

	this.BTN_UP = new lib.DPadButtonUP();
	this.BTN_UP.name = "BTN_UP";
	this.BTN_UP.setTransform(220.15,431.1,0.9891,0.9891);

	this.instance = new lib.PlayerIndentation();
	this.instance.setTransform(228.3,214.85,1,1,0,0,0,218.4,157.1);
	this.instance.alpha = 0.5117;

	this.BTN_PPLAY = new lib.ButtonVerticalSM();
	this.BTN_PPLAY.name = "BTN_PPLAY";
	this.BTN_PPLAY.setTransform(131.4,250.35,0.8275,0.8275,0,0,0,0,0.1);
	new cjs.ButtonHelper(this.BTN_PPLAY, 0, 1, 2, false, new lib.ButtonVerticalSM(), 3);

	this.BTN_PBACK = new lib.ButtonVerticalSM();
	this.BTN_PBACK.name = "BTN_PBACK";
	this.BTN_PBACK.setTransform(17.95,250.35,0.8275,0.8275,0,0,0,0,0.1);
	new cjs.ButtonHelper(this.BTN_PBACK, 0, 1, 2, false, new lib.ButtonVerticalSM(), 3);

	this.BTN_PFWD = new lib.ButtonVerticalSM();
	this.BTN_PFWD.name = "BTN_PFWD";
	this.BTN_PFWD.setTransform(244.85,250.35,0.8275,0.8275,0,0,0,0,0.1);
	new cjs.ButtonHelper(this.BTN_PFWD, 0, 1, 2, false, new lib.ButtonVerticalSM(), 3);

	this.BTN_PQUE = new lib.ButtonVerticalSM();
	this.BTN_PQUE.name = "BTN_PQUE";
	this.BTN_PQUE.setTransform(358.45,250.35,0.8275,0.8275,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.BTN_PQUE, 0, 1, 2, false, new lib.ButtonVerticalSM(), 3);

	this.instance_1 = new lib.CachedBmp_6();
	this.instance_1.setTransform(58.9,2.05,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_5();
	this.instance_2.setTransform(5.15,7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.BTN_PQUE},{t:this.BTN_PFWD},{t:this.BTN_PBACK},{t:this.BTN_PPLAY},{t:this.instance},{t:this.BTN_UP},{t:this.BTN_DOWN},{t:this.BTN_LEFT},{t:this.BTN_RIGHT}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.REGION2, new cjs.Rectangle(0,0,516.9,900), null);


(lib.REGION1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"screen opens at 30":0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// SCREENCOVER
	this.mainscreen = new lib.Screen();
	this.mainscreen.name = "mainscreen";
	this.mainscreen.setTransform(450,450,1,1,0,0,0,450,450);

	this.timeline.addTween(cjs.Tween.get(this.mainscreen).wait(1));

	// SCREENMANAGER
	this.screenManager = new lib.SCREEN_MANAGER();
	this.screenManager.name = "screenManager";
	this.screenManager.setTransform(450.9,450.9,1,1,0,0,0,440.9,440.9);

	this.timeline.addTween(cjs.Tween.get(this.screenManager).wait(1));

	// BACKDROP
	this.instance = new lib.ScreenDefaultBackground();
	this.instance.setTransform(9.05,9.05,0.98,0.98);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// SPACEHOLDER
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,102,204,0)").s().p("EhGTBGUMAAAiMnMCMnAAAMAAACMng");
	this.shape.setTransform(450,450);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.REGION1, new cjs.Rectangle(0,0,1372.1,900), null);


// stage content:
(lib.PocketPal = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		MSG.publish('Ready-Animate', null);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// REGIONS
	this.region_3 = new lib.REGION3();
	this.region_3.name = "region_3";
	this.region_3.setTransform(1350,0);

	this.region_2 = new lib.REGION2();
	this.region_2.name = "region_2";

	this.region_1 = new lib.REGION1();
	this.region_1.name = "region_1";
	this.region_1.setTransform(451,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.region_1},{t:this.region_2},{t:this.region_3}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(900,450,923.0999999999999,450);
// library properties:
lib.properties = {
	id: 'F6615815F9884A46B3D7FC8DF2784958',
	width: 1800,
	height: 900,
	fps: 24,
	color: "#F5F3EB",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_4.png", id:"CachedBmp_4"},
		{src:"images/PodCube2025_atlas_1.png", id:"PodCube2025_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['F6615815F9884A46B3D7FC8DF2784958'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;