import { CloudCog } from 'lucide-react';
import { useState, useEffect } from 'react';

function useDebounce(value, delay = 300) {
    const [debounceValue, setDebounceValue] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);

    return debounceValue;
}

export default useDebounce;