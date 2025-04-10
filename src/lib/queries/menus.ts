import {MenusList} from "@/types";
import {getFromCache, saveToCache} from "../cache/index";
import menu from '@/lib/cache/menu.json';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://cosmonew1.wpenginepowered.com';

export const getAllMenus = async (): Promise<MenusList> => {

     if (menu) {
         return menu as any;
     }

    const menusList: MenusList = {};
    try {
        const time = new Date().getTime();
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp-api-menus/v2/menus?cache=${time}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'max-age=3600',
            },
        });

        if (!response.ok) {
            return {};
        }

        const menus = await response.json();

        await Promise.all(
            menus.map(async (menu: any) => {
                const itemsResponse = await fetch(`${WORDPRESS_API_URL}/wp-json/wp-api-menus/v2/menus/${menu.ID}?cache=${time}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'max-age=3600',
                    },
                });
                if (!itemsResponse.ok) {
                    console.log(itemsResponse);
                    console.error(`Failed to fetch items for menu ${menu.ID}`);
                    return {
                        ...menu,
                        items: [],
                    };
                }
                const itemsResponseData = await itemsResponse.json();
                menusList[menu.slug] = {
                    name: menu.name,
                    slug: menu.slug,
                    items: itemsResponseData.items.map((item: any) => ({
                        url: item.url,
                        title: item.title,
                        description: item.description,
                        items: item.children ? item.children.map((item: any) => ({
                            url: item.url,
                            title: item.title,
                            description: item.description,
                        })) : []
                    }))
                }
            })
        );

        saveToCache('menu', menusList);

        return menusList;
    } catch (error) {
        console.error(error);
        return {};
    }
};