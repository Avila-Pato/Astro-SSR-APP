import type { AstroClientDirectives } from "astro";
import type { Session, User } from "better-auth";
import  GithubSign  from "../components/github-sign"
import  GoogleSign  from "../components/google-sign"
import SignOut from "./sign-out";

import logo from "../assets/img/psyduck.png"


type NavProps = {
    sesh: {
        session: Session,
        user: User;
    } | null
} & AstroClientDirectives

export default function Nav({ sesh }: NavProps) {
    
    return (
        <nav className="py-6">
            <ul className="flex justify-between items-center">
                <li>
                    <a
                    className="hover:underline flex gap-2 items-center font-kalam text-base"
                     href="/">
                        <img className="w-10 h-10" src={logo.src} alt="Logo" width={100} height={100} />
                        <span>PsyDuck</span>
                    </a>
                </li>
                {!sesh ? < GithubSign /> : null}
                {!sesh ? <GoogleSign /> : null}
                {sesh ? (
                    <div className="flex items-center gap-6">
                        <a href="/dashboard" >
                         <img className="w-10 h-10 rounded-full" src={sesh.user.image!} alt="Image Perfil" />
                        </a>
                        <li>
                            <SignOut />
                        </li>
                    </div>
                ): null}
            </ul>
        </nav>
    )
}
