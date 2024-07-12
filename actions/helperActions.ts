import { Image } from "@/lib/schema/Image";
import { InventoryWithImages } from "@/lib/types";

export const convertToInventoryWithImages = (
  response: {
    inventory: {
      id: number;
      name: string;
      description: string;
      stock: number;
      unitPrice: string;
      categoryId: number;
    };
    images: Image | null;
  }[]
): InventoryWithImages[] => {
  const inventoryMap = new Map<number, InventoryWithImages>();

  response.forEach((row) => {
    const inventoryId = row.inventory.id;

    if (!inventoryMap.has(inventoryId)) {
      inventoryMap.set(inventoryId, {
        id: row.inventory.id,
        name: row.inventory.name,
        description: row.inventory.description,
        stock: row.inventory.stock,
        unitPrice: row.inventory.unitPrice,
        categoryId: row.inventory.categoryId,
        images: [],
      });
    }

    const inventory = inventoryMap.get(inventoryId);
    if (inventory && row.images) {
      inventory.images.push(row.images);
    }
  });
  const resp: InventoryWithImages[] = Array.from(inventoryMap.values());
  return resp;
};
