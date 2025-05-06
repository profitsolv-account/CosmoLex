export const SearchForm = () => {

    return <form className="relative z-10 flex gap-4">
        <input
            className="rounded-3xl w-full px-6 bg-[#f5f5ff]/50 border border-[#c8c8c8]/75 outline-none p-4"
            type="text"
            placeholder="Search Article Library"
        />
        <button
            className="bg-primary text-white rounded-full px-6 py-3.5 font-normal text-base w-[10rem] cursor-pointer transition duration-300 hover:bg-primary-dark"
        >Search</button>
    </form>
}