<?php

namespace App\Http\Middleware;

use Closure;
use Error;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTokenIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        error_log("trong request , cu the trong field token ko bang");

        if($request->input("XSRF-TOKEN") != "eyJpdiI6ImVDTmM2NWdIMmVTNE44SlN2OTJKbXc9PSIsInZhbHVlIjoiUjgvN1VPamE3bDNZcWtJNXB3MUNuZkRQSkNiQUl6SzRlaHo5S2pFNGxhOEgwdE93OGhYeGlNazBibmZxQ2hITnBPbGFGM0MwMFRXdS9BY0Nzcjh5OVZ2aWRXb1ZGelM2dmJNUjVMOVpZWEFJY3lPdFNqdm5ZMVZqb2Q5SDBtakciLCJtYWMiOiI4MjZlZWI3YjM5MTllZjRhZmYzY2UwMzA1MmMwNzQ3N2MzMmFkMjkzYTZjZGE2MzZlMWEzZjk2Y2FkYWM0Zjc3IiwidGFnIjoiIn0%3D"){
            error_log("dung SXRF-TOKEN");
            // return redirect("listUser");
        }

        error_log(("co 1 resquest di qua day"));
        error_log($request->__tostring());
        error_log("------bbbbbbbbbbbbb----------------");
        error_log("cookie of request : ",$request->Cookie);  

        return $next($request);
    }
}
