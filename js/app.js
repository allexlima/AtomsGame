$(document).foundation();

$(document).ready(function(){
    $("canvas").hover(
        function() {
            SoundIntro.volume = 0.6;
            SoundBackground.volume = 0.6;
            SoundExplosion.volume = 1.0;
            SoundUp.volume = 1.0;
            SoundLose.volume = 1.0;
        },
        function() {
            SoundIntro.volume = 0.0;
            SoundBackground.volume = 0.0;
            SoundExplosion.volume = 0.0;
            SoundUp.volume = 0.0;
            SoundLose.volume = 0.0;
        }
    )
})