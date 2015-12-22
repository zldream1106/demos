var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var container = $('.container');
var N = 6;
var runCnt = 0;
var transformTimer = null;
var timerInterval = 300;

// 恢复container的角度状态到初始状态
function resetContainer() {
  container.style.webkitTransform = '';
}

// 左侧控制组，单选
document.querySelector('.control').addEventListener('click', function(e) {
  var current = e.target;
  var previous = document.querySelector('.chosen');
  var btnId;

  if ([...current.classList].includes('control')) return;
  clearInterval(transformTimer);
  update(); // 应用配置

  if (current === previous) {} else {
    if (previous) {
      previous.classList.remove('chosen');
    }
    current.classList.add('chosen');
  }

  update(); // 应用配置
  switch (current.id) {
    case 'rotate':
      runCnt++;
      runRotate(runCnt, timerInterval);
      break;
    default:
      resetContainer();
      (previous && (previous.id === 'rotate')) ? runCnt++ : '';
      btnId = current.id.match(/c(\d+)/i)[1];
      container.className = 'container';
      container.classList.add('show' + btnId);
  }
});

// 右侧控制组，复选
$('.control-attribute').addEventListener('click', function(e) {
  var current = e.target;
  current.classList.toggle('chosen');
  var btnId;

  switch (current.id) {
    case 'attr-visibility':
      Array.from(container.querySelectorAll('.side')).forEach(function(el) {
        el.classList.toggle('visibility');
      });
      break;
    case 'attr-hideaxis':
      document.querySelector('.line-box').classList.toggle('hide');
      break;
    default:
      break;
  }
});

// 随机生成度数
function genRotateDeg() {
  var rX = Math.random() * 360;
  var rY = Math.random() * 360;
  var rZ = Math.random() * 360;
  return 'rotateX(' + rX + 'deg) rotateY(' + rY + 'deg) rotateZ(' + rZ + 'deg)';
  // return 'rotateX(' + rX + 'deg) rotateY(' + rY + 'deg)';
}

// 随机旋转立方体 
function runRotate(runCnt, interval = 300) {
  var transformText = '';
  timerInterval = interval;
  if (runCnt % 2) { // 转动开始
    transformTimer = setInterval(function() {
      transformText = 'translate3d(-50%, -50%, 0) ' + genRotateDeg();
      container.style.webkitTransform = transformText;
      container.style.transition = 'transform ' + (interval / 1000) + 's linear';
    }, interval);
  } else { // 转动结束
    clearInterval(transformTimer);
  }
}


function update () {
  var stage = $('.stage');
  var opts = $$('fieldset input');
  Array.from(opts).forEach(function(opt) {
    var value = opt.value;
    var matched = value.match(/\d+/);
    switch (opt.name) {
      case 'attr-perspective':
        stage.style.webkitPerspective = ( (matched && matched[0]) || 500) + 'px';
        break;
      case 'attr-perspective-origin-x':
      case 'attr-perspective-origin-y':
        var x = $('#attr-perspective-origin-x').value;
        var y = $('#attr-perspective-origin-y').value;
        stage.style.webkitPerspectiveOrigin = (( x && (x + 'px ')) || '50% ') + (($('#attr-perspective-origin-y').value + 'px') || '50%');
        break;
      case 'attr-rotate-interval':
        container.style.transition = 'transform ' + (value/1000 || 0.3) + 's linear';
      default:;
    }
  });
  
}

$('#update').addEventListener('click', function(e) {
  update();
});

$('#reset').addEventListener('click', function (e) {
  var me = e.target;
  var stage = $('.stage');
  var opts = $$('fieldset input');
  Array.from(opts).forEach( function (opt) {
    opt.value='';
  });
  stage.style.webkitPerspective = '500px';
  stage.style.webkitPerspectiveOrigin = '50% 50%';
  container.style.webkitTransition = 'transform 0.3s linear';
});
