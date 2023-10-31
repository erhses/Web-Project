document.querySelectorAll('area').forEach(function(area) {
    area.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.2)';
    });

    area.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});
