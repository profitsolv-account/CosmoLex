import { NextResponse } from 'next/server';
import client, {cacheOption} from "@/lib/apollo-client";
import {gql} from "@apollo/client";

const REVALIDATE_SECRET = 'rev-token-122';

const getRedirections = async () => {

    const { data } = await client.query({
        query: gql`
            query GetRedirections {
                redirections {
                    source
                    target
                    status
                    type
                }
            }
        `,
        fetchPolicy: cacheOption,
        context: {
            fetchOptions: {
                next: {
                    tags: ["redirects"],
                },
            },
        },
    });

    return data?.redirections || [];
};


export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const token = searchParams.get('secret');

    if (token !== REVALIDATE_SECRET) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const redirections = await getRedirections();
    return NextResponse.json({redirections});
}
