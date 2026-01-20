'use client';

import css from "../SearchBox/SearchBox.module.css";

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void; 
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        onChange(search)
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