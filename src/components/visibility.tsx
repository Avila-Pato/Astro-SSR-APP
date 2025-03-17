import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { User } from "better-auth";
import type { AstroClientDirectives } from "astro";
import type { TImagePost } from "../lib/infer-type";
import { actions } from "astro:actions";

type ImagePostProps = {
    currentUser: User | null;
    imgData: TImagePost;
} & AstroClientDirectives;

export default function Visibility({ imgData, currentUser }: ImagePostProps) {
    const [isVisible, setIsVisible] = useState(imgData.visibility);

    useEffect(() => {
        setIsVisible(imgData.visibility);
    }, [imgData.visibility]);

    const handleToggleVisibility = async () => {
        if (!currentUser) return;

        const optimisticVisibility = !isVisible;
        setIsVisible(optimisticVisibility);

        try {
            const { data, error } = await actions.toggleVisibility({
                imageId: imgData.id!,
            });

            if (error) {
                // Revierte a la visibilidad original si el cambio falla
                setIsVisible(imgData.visibility);
                console.log(error);
            } else if (data?.success) {
                // Actualiza la visibilidad real si el cambio fue exitoso
                setIsVisible(data.visibility ?? imgData.visibility);
            }
        } catch (catchError) {
            // Fallback a la visibilidad original si el cambio falla
            setIsVisible(imgData.visibility);
            console.error(catchError);
        }
    };

    if (!currentUser || currentUser.id !== imgData.userId) {
        return null;
    }

    return (
        <div
            className="flex gap-2 items-center cursor-pointer hover:opacity-85 transition-all"
            onClick={handleToggleVisibility}
        >
            {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
            <p className={`text-sm font-bold ${isVisible ? "Public" : "Private"}`}>
    {isVisible ? "Public" : "Private"}
</p>
        </div>
    );
}