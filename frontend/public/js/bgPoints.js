(function() {
  let width,
    height,
    canvas,
    ctx,
    points,
    target,
    animateHeader = true;
  let pointDistance = 45;
  let pointRadius = 2;
  let raf;

  // Main
  initHeader();
  initAnimation();
  addListeners();

  function initHeader() {
    width = window.innerWidth;
    height = window.innerHeight;
    target = {};

    canvas = document.getElementById("background-canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    // create points
    initPoints();
  }

  // Event handling
  function addListeners() {
    if (!("ontouchstart" in window)) {
      window.addEventListener("mousemove", mouseMove);
    }
    window.addEventListener("resize", resize);
  }

  function initAnimation() {
    animate();
  }

  function animate() {
    if (animateHeader) {
      drawPoints();
    }
    requestAnimationFrame(animate);
  }

  function mouseMove(e) {
    let posx = (posy = 0);
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    target.x = posx;
    target.y = posy;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    for (let i in points) {
      TweenLite.killTweensOf(points[i]);
    }

    initPoints();
  }

  function initPoints() {
    // create points
    points = [];
    for (let x = 0; x <= width / pointDistance; x++) {
      for (let y = 0; y < height / pointDistance; y++) {
        let px = x * pointDistance;
        let py = y * pointDistance;
        let p = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    // for each point find the 5 closest points
    for (let i = 0; i < points.length; i++) {
      let closest = [];
      let p1 = points[i];
      for (let j = 0; j < points.length; j++) {
        let p2 = points[j];
        if (!(p1 == p2)) {
          let placed = false;
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] == undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // assign a circle to each point
    for (let i in points) {
      let c = new Circle(points[i], pointRadius, "rgba(255,255,255,0.3)");
      points[i].circle = c;
    }

    for (let i in points) {
      shiftPoint(points[i]);
    }
  }

  function drawPoints() {
    ctx.clearRect(0, 0, width, height);

    for (let i in points) {
      if (target) {
        if (Math.abs(getDistance(target, points[i])) < 4000) {
          points[i].opacity = 0.3;
          points[i].circle.opacity = 1;
        } else if (Math.abs(getDistance(target, points[i])) < 20000) {
          points[i].opacity = 0.1;
          points[i].circle.opacity = 1;
        } else if (Math.abs(getDistance(target, points[i])) < 40000) {
          points[i].opacity = 0.02;
          points[i].circle.opacity = 0.8;
        } else {
          points[i].opacity = 0;
          points[i].circle.opacity = 0.7;
        }
      }

      points[i].circle.color = "rgba(255,255,255,1)";

      drawLines(points[i]);
      points[i].circle.draw();
    }
  }

  function shiftPoint(p) {
    TweenLite.to(p, 1 + 1 * Math.random(), {
      x: p.originX + Math.random() * (pointDistance / 2),
      y: p.originY + Math.random() * (pointDistance / 2),
      ease: Circ.easeInOut,
      onComplete: function() {
        shiftPoint(p);
      }
    });
  }

  function drawLines(p) {
    if (target) {
      for (let i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = "rgba(255,255,255," + p.opacity + ")";
        ctx.stroke();
      }
    }
  }

  function Circle(pos, rad, color) {
    let _this = this;

    (function() {
      _this.pos = pos || null;
      _this.radius = rad || null;
      _this.color = color || null;
    })();

    this.draw = function() {
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "rgba(255,255,255," + _this.opacity + ")";
      ctx.fill();
    };
  }

  function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }
})();
