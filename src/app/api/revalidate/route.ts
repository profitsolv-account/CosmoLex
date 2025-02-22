import { NextResponse } from 'next/server';
import {revalidateTag} from 'next/cache';


export async function POST() {
    try {
        revalidateTag('global-cache')
        return NextResponse.json({ revalidated: true, message: 'All cache cleared 2' });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}