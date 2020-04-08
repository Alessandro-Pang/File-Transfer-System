var _$ = {};

_$.Particle = function(opt) {
    this.radius = 7;
    this.x = opt.x;
    this.y = opt.y;
    this.angle = opt.angle;
    this.speed = opt.speed;
    this.accel = opt.accel;
    this.decay = 0.01;
    this.life = 1;
};

_$.Particle.prototype.step = function(i) {
    this.speed += this.accel;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.angle += _$.PI / 64;
    this.accel *= 1.01;
    this.life -= this.decay;

    if (this.life <= 0) {
        _$.particles.splice(i, 1);
    }
};

_$.Particle.prototype.draw = function(i) {
    _$.ctx.fillStyle = _$.ctx.strokeStyle = 'hsla(' + (_$.tick + (this.life * 120)) + ', 100%, 60%, ' + this.life + ')';
    _$.ctx.beginPath();
    if (_$.particles[i - 1]) {
        _$.ctx.moveTo(this.x, this.y);
        _$.ctx.lineTo(_$.particles[i - 1].x, _$.particles[i - 1].y);
    }
    _$.ctx.stroke();

    _$.ctx.beginPath();
    _$.ctx.arc(this.x, this.y, Math.max(0.001, this.life * this.radius), 0, _$.TWO_PI);
    _$.ctx.fill();

    var size = Math.random() * 1.25;
    _$.ctx.fillRect(~~(this.x + ((Math.random() - 0.5) * 35) * this.life), ~~(this.y + ((Math.random() - 0.5) * 35) * this.life), size, size);
}

_$.step = function() {
    _$.particles.push(new _$.Particle({
        x: _$.width / 2 + Math.cos(_$.tick / 20) * _$.min / 2,
        y: _$.height / 2 + Math.sin(_$.tick / 20) * _$.min / 2,
        angle: _$.globalRotation + _$.globalAngle,
        speed: 0,
        accel: 0.01
    }));

    _$.particles.forEach(function(elem, index) {
        elem.step(index);
    });

    _$.globalRotation += _$.PI / 6;
    _$.globalAngle += _$.PI / 6;
};

_$.draw = function() {
    _$.ctx.clearRect(0, 0, _$.width, _$.height);

    _$.particles.forEach(function(elem, index) {
        elem.draw(index);
    });
};

_$.init = function() {
    _$.canvas = document.createElement('canvas');
    _$.ctx = _$.canvas.getContext('2d');
    _$.width = 300;
    _$.height = 300;
    _$.canvas.width = _$.width * window.devicePixelRatio;
    _$.canvas.height = _$.height * window.devicePixelRatio;
    _$.canvas.style.width = _$.width + 'px';
    _$.canvas.style.height = _$.height + 'px';
    _$.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    _$.min = _$.width * 0.5;
    _$.particles = [];
    _$.globalAngle = 0;
    _$.globalRotation = 0;
    _$.tick = 0;
    _$.PI = Math.PI;
    _$.TWO_PI = _$.PI * 2;
    _$.ctx.globalCompositeOperation = 'lighter';
    document.getElementById('loading').appendChild(_$.canvas);
    _$.loop();
};

_$.loop = function() {
    requestAnimationFrame(_$.loop);
    _$.step();
    _$.draw();
    _$.tick++;
};

_$.init();