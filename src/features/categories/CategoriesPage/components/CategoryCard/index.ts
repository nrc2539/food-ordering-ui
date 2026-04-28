"use client";

import CategoryCard from "./CategoryCard";
import { withCategoryCard } from "./withCategoryCard";

const ConnectedCategoryCard = withCategoryCard(CategoryCard);

export { ConnectedCategoryCard as CategoryCard };
