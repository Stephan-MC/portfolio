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
        Blade::directive('angular', function ($params) {
            [$project, $files] = str($params)->split('/\,/', 2);
            $project = str($project)->replace(['\'', '\"'], '');

            $files = $files
                ? str($files)
                ->replace(['[', ']', '\'', '\"'], '')
                ->split('/\,/')
                : ['styles.css', 'runtime.js', 'polyfills.js', 'vendor.js', 'main.js'];

            $files = collect($files)->map(fn ($f) => trim($f));

            return $files->map(function ($file) use ($project) {
                $path = null;

                if ($file = collect(glob(public_path("build/{$project}/*") . str($file)->replaceLast('.', '*')))->first()) {
                    $path = asset("build/{$project}/" . basename($file));
                    if (str($file)->endsWith('css')) {
                        return "<?= '<link rel=\"stylesheet\" href=\"$path\">' ?>";
                    } else
                        return "<?= '<script type=\"module\" src=\"$path\"></script>' ?>";
                }

                return null;
            })->filter(fn ($f) => $f != null)->implode('');
        });
    }
}
