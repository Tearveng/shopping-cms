import {
  getShoppingAllItems,
  getShoppingAllItemsPublic,
  storageAllItems,
  type IShoppingAllItems,
} from "../../services/AllItemsService";
import { getImageUrl } from "../../services/BannerService";
import type { IState } from "../../stores/auth";
import type { ShoppingAllItems } from "../../types/ShoppingAllItems";
import type { DataItem } from "../ShoppingItems.vue";

export const adminfetchData = async (auth: IState) => {
  const data = [];
  const shoppingBanners = await getShoppingAllItems(`${auth.user?.id}`);
  for (const i of shoppingBanners) {
   const pre = await getSingleItem(i)
    data.push(pre);
    // dynamicValidateForm.editors.push(pre);
  }
  return data;
};

export const getSingleItem = async (item: IShoppingAllItems): Promise<DataItem> => {
  const { images, id, title, subtitle, condition, size, details, category_id, parent_key, price } = item;
  const imagesList = [];
  if (images && images.length > 0) {
    for (const img of images) {
      imagesList.push(await getImageByFileName(img));
    }
  }
  const pre = {
    id: id,
    key: `${id}`,
    title: title,
    subtitle: subtitle,
    condition: condition,
    size: size,
    details: details,
    category_id: `${category_id ?? ""}`,
    parent_key: `${parent_key ?? ""}`,
    price: price,
    fileList: imagesList,
  } as DataItem;
  // dynamicValidateForm.editors.push(pre);
  return pre;
};

export const getImageByFileName = async (img: Record<string, any>) => {
  const { id, fileName } = img;
  const tempImg = await getImageUrl(fileName, storageAllItems);
  return {
    uid: id,
    name: fileName,
    status: "done",
    url: tempImg,
    thumbUrl: tempImg,
  };
};

export const userfetchData = async (
  categoryIds: number[],
  checkParentKey: string[],
  page: number,
  limit: number,
) => {
  const data: { data: ShoppingAllItems[]; nextPage: number | undefined } = {
    data: [],
    nextPage: undefined,
  };
  await getShoppingAllItemsPublic({
    category_ids: categoryIds,
    parent_key: checkParentKey,
    limit: limit,
    page: page,
  })
    .then(async (editorPicks) => {
      console.log("editorPicks", editorPicks);
      for (const i of editorPicks.data) {
        const imagesList = [];
        if (i.images && i.images.length > 0) {
          for (const img of i.images) {
            const tempImg = await getImageUrl(
              img.fileName,
              `${storageAllItems}`,
            );
            imagesList.push({
              uid: img.id,
              name: img.fileName,
              status: "done",
              url: tempImg,
              thumbUrl: tempImg,
            });
          }
        }
        const pre = {
          id: i.id,
          key: new Date(`${i.created_at}`).getTime(),
          title: i.title,
          subtitle: i.subtitle,
          condition: i.condition,
          price: i.price,
          fileList: imagesList,
        } as ShoppingAllItems;
        data.data.push(pre);
      }
      data.nextPage = editorPicks.nextPage;
    })
    .catch(
      (err) => err,
      // (error.value = err instanceof Error ? err.message : "An error occurred")
    );
  return data;
};
