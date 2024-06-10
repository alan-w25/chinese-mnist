import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-white p-6 shadow-md w-full top-0 fixed left-0 w-full z-10">
            <nav className="flex justify-between items-center">
                <Link href="/" className ="text-5xl font-bold">
                    Handwritten Chinese Digit MNIST Prediction
                </Link>
                <ul className="flex space-x-6 text-gray-700 text-xl">
                    <li><Link className="hover:underline" href="#learn">Learn</Link></li>
                    <li><Link className="hover:underline" href="#draw">Draw</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;