import react from "react";
import GalleryCard from "@/app/components/GalleryCard";
import SearchBar from "@/app/components/SearchBar";
import { getAuthSession } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";

const app = async () => {
    const session = await getAuthSession();
    const recipes = await prisma.recipe.findMany({
        where: { userId: String(session.user.id) },
      });

    return (
        <>
            <div>
                <SearchBar />
            </div>

            <div>
                <GalleryCard />
            </div>
        </>
    )
}
export default app;
