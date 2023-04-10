import React, { useState } from 'react';
import Modal from 'react-modal';
import { ItemType } from './item.type';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 50,
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '450px',
        width: '100%',
        padding: '40px 30px',
        borderRadius: '5px',
    },
};

function getCurrentTime() {
    const date = new Date();
    return `${date.getHours().toString().padStart(2, '0')}:${(Math.floor(date.getMinutes() / 5) * 5).toString().padStart(2, '0')}`;
}

export type ItemProps = {
    time: string, biberonSize?: string, type: ItemType
}

export type ModalWindowProps = {
    isOpen: boolean;
    onRequestClose: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
    onSave: (item: ItemProps) => void;
    time?: string;
    itemType: ItemType;
    biberonSize?: string;
    itemId?: string;
};

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
const timeList = hours.map((hour) => minutes.map((minute) => `${hour}:${minute}`)).flat();
const biberonSizeList = Array.from({ length: 7 }, (_, i) => `${(++i * 30).toString()}ml`);

const ModalWindow = ({ isOpen, onRequestClose, onSave, time: selectedTime, itemType, biberonSize: selectedBiberonSize }: ModalWindowProps) => {
    const [time, setTime] = useState(selectedTime ?? getCurrentTime());
    const [biberonSize, setBiberonSize] = useState<string | undefined>(itemType === 'biberon' ? selectedBiberonSize ? selectedBiberonSize : biberonSizeList[0] : undefined);

    const handleSave = () => {
        onSave({ time, biberonSize, type: itemType });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Select Time"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-medium text-cyan-700">Select Time</h2>
                <button onClick={onRequestClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <form>
                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="hour" className="block text-sm font-medium text-gray-700">
                        Heure
                    </label>
                    <div className="relative">
                        <select
                            id="hour"
                            name="hour"
                            className="block appearance-none w-full py-2 px-3 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                            value={time}
                            onChange={(event) => { setTime(event.target.value) }}
                        >
                            {timeList.map((hour) => (
                                <option key={hour} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                    {itemType === 'biberon' && (
                        <div className="relative">
                            <select
                                id="biberonSize"
                                name="biberonSize"
                                className="block appearance-none w-full py-2 px-3 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                value={biberonSize}
                                onChange={(event) => { setBiberonSize(event.target.value) }}
                            >
                                {biberonSizeList.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default ModalWindow;
