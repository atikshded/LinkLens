function Badge({ children }) {

    return (

        <span
            className="
                inline-flex
                items-center
                rounded-full
                bg-green-500/20
                text-green-400
                text-xs
                px-3
                py-1
            "
        >

            {children}

        </span>

    );

}

export default Badge;