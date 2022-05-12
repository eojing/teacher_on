$(function(){

  const $indicator = $('section > .slides > .slides-pagination > li > a')
  const $container = $('section > .slides > .slides-container');
  const $btnPrev = $('section > .slides > a.prev');
  const $btnNext = $('section > .slides > a.next');

  let nowIdx = 0;
  let intervalKey = null;
  let lock = false;


  $indicator.on('click',function(evt){
    evt.preventDefault();

    nowIdx = $indicator.index(this);

    $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');

    $container.stop().animate({
      left : -(100 * (nowIdx+4)) + "%"
    })
  });


  $btnNext.on('click',function(evt){
    evt.preventDefault();

  
 
    if(nowIdx<3){
           nowIdx++;
 
    }else{
           nowIdx = 0;
    }
    
    // console.log(nowIdx);

    $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');

    $container.stop().animate({
      left : "-500%"
    },400,function(){
      $('section > .slides > .slides-container > p').first().appendTo($container);
      $container.css({
        left : "-400%"
      });
    });
  });


  $btnPrev.on('click',function(evt){
    evt.preventDefault();

    if(nowIdx>0){
      nowIdx--;
    }else{
      nowIdx=3;
    }
    $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');

    $container.stop().animate({
      left : "-300%"
    },400,function(){
      $('section > .slides > .slides-container > p').last().prependTo($container);
      $container.css({
        left : "-400%"
      })
    });

  });

  slidingTimer();

  //자동 슬라이딩 타미머 함수 정의//
  function slidingTimer(){
  autoPlay = setInterval(function(){
  
  $btnNext.trigger('click');
  
  },3000);
  }

  $container.on('mouseenter',function(){
    clearInterval(autoPlay)
  });

  $container.on('mouseleave',function(){
    slidingTimer();
  })

});