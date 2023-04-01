<?php

namespace App\Providers;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Blade::directive('angular', function ($files) {
            $files = $files
                ? str($files)
                ->replace(['[', ']', '\'', '\"'], '')
                ->split('/\,/')
                   : ['styles.css', 'runtime.js', 'polyfills.js', 'vendor.js', 'main.js'];

            $files = collect($files)->map(fn ($f) => trim($f));

            return $files->map(function ($file) {
                if ($file = collect(glob('build/' . str($file)->replaceLast('.', '*')))->first()) {
                    if (str($file)->endsWith('css')) {
                        return "<?= '<link rel=\"stylesheet\" src=\"$file\">' ?>";
                    } else
                        return "<?= '<script type=\"module\" src=\"$file\"></script>' ?>";
                }

                return null;
            })->filter(fn ($f) => $f != null)->dd()->implode('');
        });
    }
}
