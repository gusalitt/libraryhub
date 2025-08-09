import { useState, useMemo } from 'react';
import { bookCategories } from '@/data/mockData';

function useCategoriesWithIcon(categories = []) {
    return useMemo(() => {
        if (!categories?.length) return [];

        return categories.map((cat) => {
            const macth = bookCategories.find((b) => b.name.toLowerCase() === cat.name.toLowerCase());

            return {
                ...cat,
                icon: macth?.icon || '📁',
            }
        });
    }, [categories]);
}

export default useCategoriesWithIcon;