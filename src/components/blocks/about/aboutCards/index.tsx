import {Card} from "@/components/blocks/about/aboutCards/card";

export const AboutCards = () => {
    return <div className="relative">
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row justify-center items-center">
            <Card
                title="Who we are"
                description="A collection of best-in-class software solutions for professional services firms, allowing the freedom for growth and innovation."
                className="bg-green"
            />
            <Card
                title="What we do"
                description="Using a product-centric and customer-first approach, ProfitSolv collaborates with firms to offer better client services."
                className="bg-salmon"
            />
            <Card
                title="Why we do it"
                description="The mission of ProfitSolv is to support our client’s growth and profitability by solving their business problems with integrated, easy-to-use technology solutions."
                className="bg-yellow"
            />
        </div>
        <div className="absolute h-[30%] top-0 left-0 w-full bg-primary rounded-bl-[50px] md:rounded-bl-[100px] z-0" />
    </div>
}