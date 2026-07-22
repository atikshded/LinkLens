function Card({ children, className = "" }) {

    return (

        <div
            className={`
                rounded-2xl
                bg-[#111827]
                border
                border-gray-800
                shadow-xl
                ${className}
            `}
        >

            {children}

        </div>

    );

}

export default Card;