import React from 'react';
import { Item, ItemType, itemTypeBackgroundColors } from './item.type';

type Props = {
    items: Item[];
    onDelete: (id: string) => void;
    onUpdate: (id: string) => void;
};
const Notebook = ({ items, onDelete, onUpdate }: Props) => {
    return (
        <div className="w-full max-w-sm mx-auto bg-white rounded-md shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-300">
                {items.map((item) => (
                    <li key={item.id} className={`px-4 py-3 ${itemTypeBackgroundColors[item.type]}`}>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-800 cursor-pointer capitalize" onClick={() => {
                                onUpdate(item.id)
                            }}>{`${item.type} ${item.time} ${item.biberonSize ? item.biberonSize : ''}`}</p>
                            <button className="text-red-500 hover:text-red-700" onClick={() => onDelete(item.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notebook;