<?php

namespace App\Http\Middleware;

use Closure;

class CheckUserType
{
    public function handle($request, Closure $next, ...$types)
    {
        $user = $request->user();
        
        if ($user && in_array($user->type, $types)) {
            return $next($request);
        }

        return response()->json(['error' => 'Unauthorized.'], 403);
    }
}
