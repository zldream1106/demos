'use strict';

function randomColor() {
  var r = parseInt(256 * Math.random(), 10).toString(16);
  var g = parseInt(256 * Math.random(), 10).toString(16);
  var b = parseInt(256 * Math.random(), 10).toString(16);
  var color = '#' + r + g + b;
  // alert(color)
  return color;
}

function clearCanvas(cv, ocv) {
  ocv.clearRect(0, 0, cv.width, cv.height);
}

function outCanvas(e, cv) {
  return e.clientX > cv.offsetLeft + cv.width || e.clientX < cv.offsetLeft || e.clientY < cv.offsetTop || e.clientY > cv.offsetTop + cv.height;
}

function handleDemo1() {
  var CV1 = document.querySelector('#c1');
  var oCV1 = CV1.getContext('2d');
  var btnClear = document.querySelector('.demo1 .clearc1');

  function start(type) {
    CV1.addEventListener(type, function (e) {
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
  function draw(e) {
    if (outCanvas(e, CV1)) {
      clear(CV1, oCV1);
    } else {
      oCV1.lineTo(e.clientX - CV1.offsetLeft, e.clientY - CV1.offsetTop);
      oCV1.stroke();
    }
  };

  function clear(e) {
    oCV1.closePath();
    CV1.removeEventListener('touchmove', draw, false);
    CV1.removeEventListener('touchend', clear, false);
    CV1.removeEventListener('mousemove', draw, false);
    CV1.removeEventListener('mouseup', clear, false);
  };

  start('touchstart');
  start('mousedown');

  btnClear.addEventListener('click', function (e) {
    clearCanvas(CV1, oCV1);
  });
}

function handleDemo2() {
  var CV2 = document.querySelector('#c2');
  var oCV2 = CV2.getContext('2d');
  var btnClear = document.querySelector('.demo2 .clearc2');
  var num = 1;
  var clock;
  function reset() {
    num = 1;
    clock && window.clearInterval(clock);
    clearCanvas(CV2, oCV2);
  }
  document.querySelector('.demo2 .startc2').addEventListener('click', function (e) {
    reset();
    oCV2.clearRect(0, 0, CV2.width, CV2.height);

    oCV2.fillRect(0, 0, 50, 50);
    clock = window.setInterval(function () {
      if (++num * 2 > CV2.width + CV2.offsetLeft) {
        reset();
        console.log(2);
      } else {
        console.log(1);
        oCV2.clearRect(0, 0, CV2.width, CV2.height);
        oCV2.fillRect(num * 2, num * 2, 50 + num, 50 + num);
      }
    }, 30);
  }, false);
  btnClear.addEventListener('click', function (e) {
    reset();
  });
}

handleDemo1();
handleDemo2();
//# sourceMappingURL=data:application/json;base64,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R0FDUixFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ1YsVUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFTLENBQUMsRUFBRTtBQUM3QyxTQUFLLEVBQUUsQ0FBQTtHQUNSLENBQUMsQ0FBQztDQUNKOztBQUVELFdBQVcsRUFBRSxDQUFDO0FBQ2QsV0FBVyxFQUFFLENBQUMiLCJmaWxlIjoianMvY2FudmFzX2RlbW8xLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5mdW5jdGlvbiByYW5kb21Db2xvcigpIHtcbiAgdmFyIHIgPSBwYXJzZUludCgyNTYgKiBNYXRoLnJhbmRvbSgpLCAxMCkudG9TdHJpbmcoMTYpO1xuICB2YXIgZyA9IHBhcnNlSW50KDI1NiAqIE1hdGgucmFuZG9tKCksIDEwKS50b1N0cmluZygxNik7XG4gIHZhciBiID0gcGFyc2VJbnQoMjU2ICogTWF0aC5yYW5kb20oKSwgMTApLnRvU3RyaW5nKDE2KTtcbiAgdmFyIGNvbG9yID0gJyMnICsgciArIGcgKyBiO1xuICAvLyBhbGVydChjb2xvcilcbiAgcmV0dXJuIGNvbG9yXG59XG5cbmZ1bmN0aW9uIGNsZWFyQ2FudmFzKGN2LCBvY3YpIHtcbiAgb2N2LmNsZWFyUmVjdCgwLCAwLCBjdi53aWR0aCwgY3YuaGVpZ2h0KVxufVxuXG5mdW5jdGlvbiBvdXRDYW52YXMoZSwgY3YpIHtcbiAgcmV0dXJuIChlLmNsaWVudFggPiAoY3Yub2Zmc2V0TGVmdCArIGN2LndpZHRoKSkgfHwgKGUuY2xpZW50WCA8IGN2Lm9mZnNldExlZnQpIHx8IChlLmNsaWVudFkgPCBjdi5vZmZzZXRUb3ApIHx8IChlLmNsaWVudFkgPiAoY3Yub2Zmc2V0VG9wICsgY3YuaGVpZ2h0KSlcbn1cblxuZnVuY3Rpb24gaGFuZGxlRGVtbzEoKSB7XG4gIHZhciBDVjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYzEnKTtcbiAgdmFyIG9DVjEgPSBDVjEuZ2V0Q29udGV4dCgnMmQnKTtcbiAgdmFyIGJ0bkNsZWFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbW8xIC5jbGVhcmMxJyk7XG5cbiAgZnVuY3Rpb24gc3RhcnQgKHR5cGUpIHtcbiAgICBDVjEuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmdW5jdGlvbihlKSB7XG4gICAgICBvQ1YxLmJlZ2luUGF0aCgpO1xuICAgICAgb0NWMS5saW5lV2lkdGggPSAzO1xuICAgICAgb0NWMS5zdHJva2VTdHlsZSA9IHJhbmRvbUNvbG9yKCk7XG4gICAgICBvQ1YxLm1vdmVUbyhlLmNsaWVudFggLSBDVjEub2Zmc2V0TGVmdCwgZS5jbGllbnRZIC0gQ1YxLm9mZnNldFRvcCk7XG4gICAgICBDVjEuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhdywgZmFsc2UpO1xuICAgICAgQ1YxLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBjbGVhciwgZmFsc2UpO1xuICAgICAgQ1YxLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGRyYXcsIGZhbHNlKTtcbiAgICAgIENWMS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGNsZWFyLCBmYWxzZSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG4gIGZ1bmN0aW9uIGRyYXcgKGUpIHtcbiAgICBpZiAob3V0Q2FudmFzKGUsIENWMSkpIHtcbiAgICAgIGNsZWFyKENWMSwgb0NWMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9DVjEubGluZVRvKGUuY2xpZW50WCAtIENWMS5vZmZzZXRMZWZ0LCBlLmNsaWVudFkgLSBDVjEub2Zmc2V0VG9wKTtcbiAgICAgIG9DVjEuc3Ryb2tlKCk7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGNsZWFyIChlKSB7XG4gICAgb0NWMS5jbG9zZVBhdGgoKTtcbiAgICBDVjEucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZHJhdywgZmFsc2UpO1xuICAgIENWMS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGNsZWFyLCBmYWxzZSk7XG4gICAgQ1YxLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYXcsIGZhbHNlKTtcbiAgICBDVjEucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGNsZWFyLCBmYWxzZSk7XG4gIH07XG5cbiAgc3RhcnQoJ3RvdWNoc3RhcnQnKTtcbiAgc3RhcnQoJ21vdXNlZG93bicpO1xuXG4gIGJ0bkNsZWFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGNsZWFyQ2FudmFzKENWMSwgb0NWMSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEZW1vMigpIHtcbiAgdmFyIENWMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjMicpO1xuICB2YXIgb0NWMiA9IENWMi5nZXRDb250ZXh0KCcyZCcpO1xuICB2YXIgYnRuQ2xlYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVtbzIgLmNsZWFyYzInKTtcbiAgdmFyIG51bSA9IDE7XG4gIHZhciBjbG9jaztcbiAgZnVuY3Rpb24gcmVzZXQgKCkge1xuICAgIG51bSA9IDE7XG4gICAgY2xvY2sgJiYgd2luZG93LmNsZWFySW50ZXJ2YWwoY2xvY2spO1xuICAgIGNsZWFyQ2FudmFzKENWMiwgb0NWMik7XG4gIH1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbW8yIC5zdGFydGMyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIHJlc2V0KCk7XG4gICAgb0NWMi5jbGVhclJlY3QoMCwgMCwgQ1YyLndpZHRoLCBDVjIuaGVpZ2h0KTtcblxuICAgIG9DVjIuZmlsbFJlY3QoMCwgMCwgNTAsIDUwKTtcbiAgICBjbG9jayA9IHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoICgrK251bSAqIDIpID4gQ1YyLndpZHRoICsgQ1YyLm9mZnNldExlZnQpIHtcbiAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgY29uc29sZS5sb2coMilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKDEpO1xuICAgICAgICBvQ1YyLmNsZWFyUmVjdCgwLCAwLCBDVjIud2lkdGgsIENWMi5oZWlnaHQpO1xuICAgICAgICBvQ1YyLmZpbGxSZWN0KG51bSAqIDIsIG51bSAqIDIsIDUwICsgbnVtLCA1MCArIG51bSk7XG4gICAgICB9XG4gICAgfSwgMzApO1xuICB9LCBmYWxzZSk7XG4gIGJ0bkNsZWFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIHJlc2V0KClcbiAgfSk7XG59XG5cbmhhbmRsZURlbW8xKCk7XG5oYW5kbGVEZW1vMigpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
