<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <title>Portfolio</title>
    <link rel="stylesheet" href="/build/styles.css">
</head>

<body>
    <app-root></app-root>
    @foreach(['runtime.js', 'polyfills.js', 'vendor.js', 'main.js'] as $file)
    @if ($file = collect(glob('build/' . str($file)->replaceLast('.', '*')))->first())
    <script type="module" src="{{ $file }}"></script>
    @endif
    @endforeach
</body>

</html>
