<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <title>Portfolio</title>
    @angular('browser', ['styles.css'])
</head>

<body>
    <app-root></app-root>
    @angular('browser', ['polyfills.js', 'main.js'])
</body>

</html>
