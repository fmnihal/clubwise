import axios, { Axios, AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { serverURL } from './libs/const';

export async function middleware(request:NextRequest) {
    const url = request.nextUrl;
    // Check if the request path matches /student/**/* or /admin/**/*
    const studentPathMatch = url.pathname.startsWith('/student');
    const adminPathMatch = url.pathname.startsWith('/admin');
    if (studentPathMatch) {
        try {
            await axios.get(serverURL + '/v1/api/auth/verify-student', {
                withCredentials: true,
                headers: {
                    Cookie: request.cookies.toString()
                }
            });
        } catch (error) {
            const loginUrl = new URL('/student/login', url.origin);
            return NextResponse.redirect(loginUrl);
        }
    } else if (adminPathMatch) {
        try {
            await axios.get(serverURL + '/v1/api/auth/verify-admin', {
                withCredentials: true,
                headers: {
                    Cookie: request.cookies.toString()
                }
            });
        } catch (error) {
            const loginUrl = new URL('/admin/login', url.origin);
            console.log((error as AxiosError).message)
            return NextResponse.redirect(loginUrl);
        }
    }

    // If no special handling is needed, continue with the request
    return NextResponse.next();
}

// Specify the paths that should use this middleware
export const config = {
    matcher: ['/student', '/admin', '/student/club/:path*', '/admin/club/:path*'],
};