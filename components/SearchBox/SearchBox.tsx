'use client';

import { useRouter } from "next/navigation";
import css from "../SearchBox/SearchBox.module.css";

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void; 
}

export default function SearchBox({ value }: SearchBoxProps) {
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        router.push(`/notes/filter/all/${search}`);
    };
    
    return (
        <input
            className={css.input}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Search notes"
        />
    );
};



