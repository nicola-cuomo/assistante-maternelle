import React from 'react';
import getItemTime from './getItemTime';
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
                            }}>{`${item.description} ${getItemTime(item)}`}</p>
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


{/* <ul className="flex flex-col items-center justify-center space-y-4">
    {events.sort((a, b) => {
        const aTime = getEventTime(a)
        const bTime = getEventTime(b)
        return aTime.localeCompare(bTime)
    }).map((event) => (
        <li key={event.id} onClick={updateEvent(event.id)} className='cursor-pointer'>
            <div className={`flex text-gray-700 hover:text-gray-500 items-center justify-center p-4 gap-2 bg-white rounded-lg shadow-md ${getBgColor(event.type)}`}>
                <p className="text-xl font-medium text-center ">
                    {event.description}
                </p>
                <p className="text-sm font-normal text-center">
                    {getEventTime(event)}
                </p>
            </div>
        </li>
    ))}
</ul> */}