import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient();

// Iniciar sesión con GitHub
const signInWithGithub = async () => {
    try {
        const res = await authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
        });

        if (res?.data) {
            return { success: true, data: res.data };
        } else {
            return { success: false, message: "No se recibió una respuesta válida de GitHub" };
        }
    } catch (error) {
        console.error("Error al iniciar sesión con GitHub:", error);
        return { success: false, message: "Error en la autenticación con GitHub" };
    }
};

// Iniciar sesión con Google
const signInWithGoogle = async () => {
    try {
        const res = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (res?.data) {
            return { success: true, data: res.data };
        } else {
            return { success: false, message: "No se recibió una respuesta válida de Google" };
        }
    } catch (error) {
        console.error("Error al iniciar sesión con Google:", error);
        return { success: false, message: "Error en la autenticación con Google" };
    }
};

// Cerrar sesión
const signOut = async () => {
    try {
        await authClient.signOut(); // Intentar cerrar sesión sin hacer una petición a la API
        return { success: true };
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        return { success: false, message: "Error al cerrar sesión" };
    }
};


export { signInWithGithub, signInWithGoogle, signOut };
