import { getShoppingAllItems, getShoppingAllItemsPublic, storageAllItems } from "../../services/AllItemsService";
import { getImageUrl } from "../../services/BannerService";
import type { IState } from "../../stores/auth";
import type { ShoppingAllItems } from "../../types/ShoppingAllItems";
import type { DataItem } from "../ShoppingItems.vue";

export const adminfetchData = async (auth: IState) => {
    console.log("auth", auth)
    const data = []
    const shoppingBanners = await getShoppingAllItems(`${auth.user?.id}`);
    for (const i of shoppingBanners) {
        const imagesList = [];
        if (i.images && i.images.length > 0) {
            for (const img of i.images) {
                const tempImg = await getImageUrl(img.fileName, storageAllItems);
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
            key: `${i.id}`,
            title: i.title,
            subtitle: i.subtitle,
            condition: i.condition,
            size: i.size,
            details: i.details,
            category_id: `${i.category_id ?? ""}`,
            parent_key: `${i.parent_key ?? ""}`,
            price: i.price,
            fileList: imagesList,
        } as DataItem;
        data.push(pre);
        // dynamicValidateForm.editors.push(pre);
    }
    return data;
}

export const userfetchData = async (categoryIds: number[], checkParentKey: string[], page: number, limit: number) => {
    const data: { data: ShoppingAllItems[], nextPage: number | undefined } = {
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
            console.log("editorPicks", editorPicks)
            for (const i of editorPicks.data) {
                const imagesList = [];
                if (i.images && i.images.length > 0) {
                    for (const img of i.images) {
                        const tempImg = await getImageUrl(
                            img.fileName,
                            `${storageAllItems}`
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
            (err) => err
            // (error.value = err instanceof Error ? err.message : "An error occurred")
        )
    return data;
};


