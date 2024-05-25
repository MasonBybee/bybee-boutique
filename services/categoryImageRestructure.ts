function restructureCategory(data: any) {
  const categoryMap: Record<number, any> = {};

  data.forEach((row: any) => {
    const category = row.categories;
    const image = row.images;

    if (!categoryMap[category.id]) {
      categoryMap[category.id] = {
        ...category,
        images: [],
      };
    }

    if (image && image.id !== null) {
      const { inventoryId, ...imageWithoutInventoryId } = image;
      categoryMap[category.id].images.push(imageWithoutInventoryId);
    }
  });
  const categoriesWithImages = Object.values(categoryMap);
  return categoriesWithImages;
}

export default restructureCategory;
