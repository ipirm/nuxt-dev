var cursor = {
    data:{
        x:0,
        y:0,
        centerX:0,
        centerY:0, 
    },
};

document.addEventListener("DOMContentLoaded", function() {

    let gallery = document.getElementsByClassName('gallery')[0],
        customCursor = document.getElementsByClassName('custom-cursor')[0];

    cursor.data.centerX = customCursor.clientWidth / 2;
    cursor.data.centerY = customCursor.clientHeight / 2;

    gallery.addEventListener('mousemove', function(e){
        customCursor.style.top = e.clientY - gallery.getBoundingClientRect().top - cursor.data.centerX + 'px';
        customCursor.style.left = e.clientX - gallery.getBoundingClientRect().left - cursor.data.centerY + 'px';
        customCursor.style.opacity = 1;
    });

    gallery.addEventListener('mouseleave', function(){
        customCursor.style.opacity = 0;
    });

});