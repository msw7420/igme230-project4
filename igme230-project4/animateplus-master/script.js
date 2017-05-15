const touch = "ontouchend" in window;
const mobile = matchMedia("(max-width: 740px)").matches;

const randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomColor = function() {
  const h = randomInt(0, 360);
  const s = randomInt(42, 98);
  const l = randomInt(42, 98);
  return "hsl(" + h + "," + s + "%," + l + "%)";
};

const svgNS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(svgNS, "svg");
svg.setAttribute("xmlns", svgNS);

const circles = [];
const totalCircles = 500;
for (var i = 0; i < totalCircles; i++) {
  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("xmlns", svgNS);
  circle.setAttribute("fill", randomColor());
  svg.appendChild(circle);
  circles.push(circle);
}
document.body.appendChild(svg);

const coordinates = new Map();
const setCoordinates = function(e) {
  var evt = e;
  if (touch) {
    e.preventDefault();
    evt = e.touches[0];
  }
  coordinates.set("x", evt.clientX);
  coordinates.set("y", evt.clientY);
};
document.addEventListener(touch ? "touchmove" : "mousemove", setCoordinates);

var currentIndex = -1;
const delta = mobile ? 150 : 300;
const radius = mobile ? 30 : 50;
const scaleIn = [0, radius];
const scaleOut = [radius, 0];
const duration = 400;

const animation = {
  start: function(e) {
    if (touch) {
      if (e.touches.length > 1) return;
      setCoordinates(e);
    }
    animation.id = requestAnimationFrame(animation.in);
  },
  end: function() {
    cancelAnimationFrame(animation.id);
  },
  circleZoom: function() {
    currentIndex = currentIndex < totalCircles - 1 ? ++currentIndex : 0;
    const params = new Map();
    params.set("el", [circles[currentIndex]]);
    params.set("cx", [coordinates.get("x"), coordinates.get("x") + randomInt(-delta, delta)]);
    params.set("cy", [coordinates.get("y"), coordinates.get("y") + randomInt(-delta, delta)]);
    params.set("r", scaleIn);
    params.set("duration", duration);
    params.set("easing", "easeOutCubic");
    params.set("complete", animation.out);
    animate(params);
  },
  in: function(e) {
    var i = touch ? 2 : 4;
    while (i--) animation.circleZoom();
    animation.id = requestAnimationFrame(animation.in);
  },
  out: function(el) {
    const params = new Map();
    params.set("el", el);
    params.set("r", scaleOut);
    params.set("easing", "easeInBack");
    params.set("duration", duration);
    animate(params);
  }
};

document.addEventListener(touch ? "touchstart" : "mousedown", animation.start);
document.addEventListener(touch ? "touchend" : "mouseup", animation.end);
