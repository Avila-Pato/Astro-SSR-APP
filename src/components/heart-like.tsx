import { type TImagePost } from "../lib/infer-type";
import type { AstroClientDirectives } from "astro";
import { Heart } from "lucide-react";
import { actions } from "astro:actions";
import type { User } from "better-auth";
import { useState } from "react";

type ImagePostProps = {
    currentUser: User | null;
    imgData: TImagePost
} & AstroClientDirectives

export default function HeartLike({ imgData, currentUser }: ImagePostProps) {  
    const [likes, setLikes] = useState(imgData.likes);

    const handleLike = async () => {
        if(!currentUser) return

    const alreadyLiked = likes.some((like) => like.userId === currentUser.id);
    const optimisticLike = alreadyLiked
    ? likes.filter((like) => like.userId !== currentUser.id)
    : [...likes, {userId: currentUser.id, imageId: imgData.id}]


    //@ts-ignore
    setLikes(optimisticLike)

    try {
        const { data, error } = await actions.likeImage({
            imageId: imgData.id!,
        });
        if(error) {
            setLikes(imgData.likes)
            console.log(error)
        }
        if(data?.success) {
            //Dependiendo si esta sie stuvo like o no, se actualzia
            const updateLikes = alreadyLiked
            ? likes.filter((like) => like.userId !== currentUser.id)
            : [...likes, data.success];
            setLikes(updateLikes)
            console.log("los datos fueron actualizados")
        }
    } catch (error) {
        setLikes(imgData.likes)
    }

    }



    return (
        <div className={"flex items-center gap-2 cursor-pointer hover:opacity-85 transition-all"} > 
        <Heart
        onClick={handleLike}
        className={`${likes.some((like) => like.userId === currentUser?.id) ? "fill-red-600 stroke-red-600" : ""}`} 
        size={18}
        />
        <p className={`${likes.some((like) => like.userId === currentUser?.id) ? "text-red-600" : ""} text-sm font-bold`}>
            {likes.length}
        </p>
        
        </div>
    )
}