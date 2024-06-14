import Link from "next/link";
const Footer = () => (
    <footer className = "text-center p-4">
        <p>Copyright &copy; 
            
            <Link href="https://www.alan-wu.me" className="hover:underline"> Alan Wu </Link>
            
            {new Date().getFullYear()}</p>
    </footer>
);

export default Footer;