// ================== NAV DROPDOWN ==================
const part2 = document.querySelector('.part2');
const navbottom = document.querySelector('.navbottom');
let hideTimer = null;

function showDropdown() {
    clearTimeout(hideTimer);
    navbottom.classList.add('open');
}
function hideDropdown() {
    hideTimer = setTimeout(() => navbottom.classList.remove('open'), 800);
}

part2.addEventListener('mouseenter', showDropdown);
part2.addEventListener('mouseleave', hideDropdown);
navbottom.addEventListener('mouseenter', showDropdown);
navbottom.addEventListener('mouseleave', hideDropdown);


// ================== MOUSE CURSOR BUTTON ==================
const box          = document.querySelector('.page1-2');
const mouseDiv     = document.querySelector('.mouse-div');
const previewVideo = box.querySelector('video');
let isPlaying      = false;

box.addEventListener('mousemove', (e) => {
    const rect = box.getBoundingClientRect();
    mouseDiv.style.left = (e.clientX - rect.left) + 'px';
    mouseDiv.style.top  = (e.clientY - rect.top)  + 'px';
    // only show button when preview is playing, not during full video
    if (!isPlaying) mouseDiv.style.opacity = '1';
});

// mouse leaves — button stays at last position
box.addEventListener('mouseleave', () => {});


// ================== VIDEO SWAP ==================
box.addEventListener('click', () => {
    if (!isPlaying) {
        previewVideo.src   = 'https://files-support.com/static/la/la-reel.mp4';
        previewVideo.loop  = false;
        previewVideo.muted = false;
        // removed: previewVideo.style.objectFit = 'contain'
        previewVideo.play();
        mouseDiv.style.opacity      = '0';
        mouseDiv.style.pointerEvents = 'none';
        isPlaying = true;
    } else {
        resetToPreview();
    }
});

// auto-reset when full video ends
previewVideo.addEventListener('ended', () => {
    if (isPlaying) resetToPreview();
});

function resetToPreview() {
    previewVideo.pause();
    previewVideo.src             = 'https://files-support.com/static/la/showreel_preview_1920_v3.mp4';
    previewVideo.loop            = true;
    previewVideo.muted           = true;
    previewVideo.style.objectFit = 'cover'; // back to cover for preview
    previewVideo.play();
    mouseDiv.style.opacity       = '0';     // keep hidden until mouse re-enters
    mouseDiv.style.pointerEvents = 'none';
    isPlaying = false;
}