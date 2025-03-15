import { authClient, signOut } from "../lib/auth-client";

export default function SignOut() {
    const handleSignOut = async () => {
        try {
            document.cookie = "better-auth-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Borra la cookie
            await authClient.signOut(); 
            window.location.href = "/"; // Redirige al login
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };
    

    return (
        <button className="btn btn-soft btn-info" onClick={handleSignOut}>
            Cerrar sesión
        </button>
    );
}
