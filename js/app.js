$(document).foundation();

$(document).ready(function(){
    $("canvas").mouseover(function(){
        SoundIntro.volume = 1.0;
        SoundBackground.volume = 1.0;
    });
    $("canvas").mouseout(function(){
        SoundIntro.volume = 0.0;
        SoundBackground.volume = 0.0;
    });
})