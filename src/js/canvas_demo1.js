
function randomColor() {
  var r = parseInt(256 * Math.random(), 10).toString(16);
  var g = parseInt(256 * Math.random(), 10).toString(16);
  var b = parseInt(256 * Math.random(), 10).toString(16);
  var color = '#' + r + g + b;
  // alert(color)
  return color
}

function clearCanvas(cv, ocv) {
  ocv.clearRect(0, 0, cv.width, cv.height)
}

function outCanvas(e, cv) {
  return (e.clientX > (cv.offsetLeft + cv.width)) || (e.clientX < cv.offsetLeft) || (e.clientY < cv.offsetTop) || (e.clientY > (cv.offsetTop + cv.height))
}

function handleDemo1() {
  var CV1 = document.querySelector('#c1');
  var oCV1 = CV1.getContext('2d');
  var btnClear = document.querySelector('.demo1 .clearc1');

  function start (type) {
    CV1.addEventListener(type, function(e) {
      oCV1.beginPath();
      oCV1.lineWidth = 3;
      oCV1.strokeStyle = randomColor();
      oCV1.moveTo(e.clientX - CV1.offsetLeft, e.clientY - CV1.offsetTop);
      CV1.addEventListener('mousemove', draw, false);
      CV1.addEventListener('mouseup', clear, false);
      CV1.addEventListener('touchmove', draw, false);
      CV1.addEventListener('touchend', clear, false);
    }, false);
  }
  function draw (e) {
    if (outCanvas(e, CV1)) {
      clear(CV1, oCV1);
    } else {
      oCV1.lineTo(e.clientX - CV1.offsetLeft, e.clientY - CV1.offsetTop);
      oCV1.stroke();
    }
  };

  function clear (e) {
    oCV1.closePath();
    CV1.removeEventListener('touchmove', draw, false);
    CV1.removeEventListener('touchend', clear, false);
    CV1.removeEventListener('mousemove', draw, false);
    CV1.removeEventListener('mouseup', clear, false);
  };

  start('touchstart');
  start('mousedown');

  btnClear.addEventListener('click', function(e) {
    clearCanvas(CV1, oCV1);
  });
}

function handleDemo2() {
  var CV2 = document.querySelector('#c2');
  var oCV2 = CV2.getContext('2d');
  var num = 1;
  var clock;
  document.querySelector('.demo2 .startc2').addEventListener('click', function (e) {
    clock && clearInterval(clock);
    oCV2.clearRect(0, 0, CV2.width, CV2.height);

    oCV2.fillRect(0, 0, 50, 50);
    clock = setInterval(function () {
      if ( (++num * 2) > CV2.width + CV2.offsetLeft) {
        num = 0;
        console.log(2)
      } else {
        console.log(1);
        oCV2.clearRect(0, 0, CV2.width, CV2.height);
        oCV2.fillRect(num * 2, num * 2, 50 + num, 50 + num);
      }
    }, 30);
  }, false);
}

handleDemo1();
handleDemo2();
    
