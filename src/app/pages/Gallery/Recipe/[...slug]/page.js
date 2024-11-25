import React from "react";
import { prisma } from "@/app/utils/db";
import { redirect } from "next/navigation";

const Page = async ({ params: { slug } }) => {
  const recipeSlug = String(slug);
  console.log(recipeSlug);
  
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeSlug },
  });
  if (!recipe) {
    return redirect("/");
  }

  return (
    <div>
        <p>{recipe.name}</p>
    </div>
  );
};

export default Page;