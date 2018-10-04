function loop()
{
	window.game.update();
	requestAnimationFrame(loop);
}

class Game
{
	constructor()
	{
		this.canvasElem = document.createElement("canvas");
		this.canvasElem.width = 800;
		this.canvasElem.height = 600;
		
		this.worldSpaceMatrix = new M3x3();
		
		this.gl = this.canvasElem.getContext("webgl2");
		this.gl.clearColor(1.0, 0.6, 0.2, 0.0);
		
		document.body.appendChild(this.canvasElem);
		
		let vs = document.getElementById("vs_01").innerHTML;
		let fs = document.getElementById("fs_01").innerHTML;
		
		this.sprite_walk = new Sprite(this.gl, "img/skellywalk.png", vs, fs, {width:22, height:32});
		this.sprite_walk_pos = new Point();
		this.sprite_walk_frame = new Point();
	
		this.sprite_death = new Sprite(this.gl, "img/skellydeath.png", vs, fs, {width:33, height:31});
		this.sprite_death_pos = new Point();
		this.sprite_death_frame = new Point();
		
		this.sprite_attack = new Sprite(this.gl, "img/skellyattack.png", vs, fs, {width:43, height:36});
		this.sprite_attack_pos = new Point();
		this.sprite_attack_frame = new Point();
		
		this.sprite_hit = new Sprite(this.gl, "img/skellyhit.png", vs, fs, {width:30, height:32});
		this.sprite_hit_pos = new Point();
		this.sprite_hit_frame = new Point();
		
		this.sprite_idle = new Sprite(this.gl, "img/skellyidle.png", vs, fs, {width:24, height:32});
		this.sprite_idle_pos = new Point();
		this.sprite_idle_frame = new Point();
		
		this.sprite_react = new Sprite(this.gl, "img/skellyreact.png", vs, fs, {width:22, height:32});
		this.sprite_react_pos = new Point();
		this.sprite_react_frame = new Point();
	}
	
	resize(x,y)
	{
		this.canvasElem.width = x;
		this.canvasElem.height = y;
		
		let wRatio = x / (y/240);
		this.worldSpaceMatrix = new M3x3().transition(-1, 1).scale(2/wRatio, -2/240);
	}
	
	update()
	{
		this.gl.viewport(0,0, this.canvasElem.width, this.canvasElem.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		
		this.sprite_walk_frame.x = (new Date() * 0.02) % 13;
		this.sprite_walk_pos.x = (this.sprite_walk_pos.x + 0.42) % 128;
		this.sprite_walk_pos.y = 50;
		this.sprite_walk.render(this.sprite_walk_pos, this.sprite_walk_frame);
		
		this.sprite_death_frame.x = (new Date() * 0.01) % 15;
		this.sprite_death_pos.y = 5;
		this.sprite_death.render(this.sprite_death_pos, this.sprite_death_frame);
		
		this.sprite_attack_frame.x = (new Date() * 0.01) % 15;
		this.sprite_attack_pos.x = 50;
		this.sprite_attack.render(this.sprite_attack_pos, this.sprite_attack_frame);
		
		this.sprite_hit_frame.x = (new Date() * 0.01) % 8;
		this.sprite_hit_pos.x = 100;
		this.sprite_hit_pos.y = 5;
		this.sprite_hit.render(this.sprite_hit_pos, this.sprite_hit_frame);
		
		this.sprite_idle_frame.x = (new Date() * 0.01) % 11;
		this.sprite_idle_pos.x = 150;
		this.sprite_idle_pos.y = 5;
		this.sprite_idle.render(this.sprite_idle_pos, this.sprite_idle_frame);
		
		this.sprite_react_frame.x = (new Date() * 0.005) % 4;
		this.sprite_react_pos.x = 200;
		this.sprite_react_pos.y = 5;
		this.sprite_react.render(this.sprite_react_pos, this.sprite_react_frame);
		
		this.gl.flush();
	}
}