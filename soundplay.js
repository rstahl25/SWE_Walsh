let mySound = loadSound('Songs/Fluttery Sledge - 100 BPM - 1 - Drums - VapourTrail_100_FullDrums.wav');

function soundPlay() {
    soundFormats('wav');
    if(mySound.isLoaded())
    {
        mySound.play();
    }
}