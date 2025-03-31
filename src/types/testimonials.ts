export type TestimonialType = {
    client: string;
    position: string;
    content: string;
    clientPicture: {
        altText: string;
        sourceUrl: string;
        mediaDetails: {
            width: number;
            height: number;
        }
    };
    location: string;
    videoUrl: string;
    extended: boolean;
    background: string;
    flipBackground: boolean;
    link: string;
    title: string;
}

export type CSTestimonial = {
    content: string;
    image: {
        altText: string;
        mediaDetails: {
            height: number;
            width: number;
        };
        sourceUrl: string;
    };
    location: string;
    rating: number;
    title: string;
}