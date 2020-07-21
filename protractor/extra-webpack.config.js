var spriteSass = require('sprite-sass');

spriteSass({
    direction: 'horizontal',
    src: ["./src/assets/img/icons/**/*.{png,jpg}"],
    out: './src/assets/img/icons/sprite.png',
    gap: {
        vertical: 100,
        horizontal: 100
    }
});


// sprite.create({
//     src: './src/assets/img/icons/**/*.{png,jpg}',
//     out: './src/assets/img/icons/sprite.png',
//     style: './src/assets/scss/sprites.scss',
//     processor: 'sass',
//     'style-type': 'scss'
// }, function() {
//     console.log('done');
// });
