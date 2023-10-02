<?php

namespace App\Http\Middleware;

use Closure;

class CheckUserType
{
    public function handle($request, Closure $next, $userType)
    {
        if (auth()->user()->user_type !== $userType) {
            abort(403, 'Unauthorized');
        }

        return $next($request);
    }
}
