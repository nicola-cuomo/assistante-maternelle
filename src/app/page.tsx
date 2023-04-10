"use client"

import getItemTime from '@/components/getItemTime';
import { Item, ItemType, SelectedTime, itemTypeBackgroundColors, itemTypes } from '@/components/item.type';
import ModalWindow from '@/components/modal';
import Notebook from '@/components/notebook';
import { useState } from 'react';

export default function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [isModalOpen, setIsModelOpen] = useState(false)
  const [onSave, setOnSave] = useState(() => (selectedTime: SelectedTime) => { });
  const [selectedTime, setSelectedTime] = useState<SelectedTime | undefined>(undefined)
  const sortedItems = items.sort((a, b) => {
    const aTime = getItemTime(a)
    const bTime = getItemTime(b)
    return aTime.localeCompare(bTime)
  })

  function addItem(type: ItemType) {
    return () => {
      setOnSave(() => (selectedTime: SelectedTime) => onAddNewItem(selectedTime, type));
      setIsModelOpen(true);
    }
  }

  function updateItem(id: string) {
    const selectedTime = items.find((item) => item.id === id)?.selectedTime;
    if (!selectedTime) {
      return;
    }
    setOnSave(() => (selectedTime: SelectedTime) => onUpdateItem(selectedTime, id));
    setIsModelOpen(true);
    setSelectedTime({
      selectedHour: selectedTime.selectedHour,
      selectedMinute: selectedTime.selectedMinute,
    })
  }

  function onRequestClose() {
    setIsModelOpen(false);
    setSelectedTime(undefined);
  }

  function onAddNewItem({ selectedHour, selectedMinute }: SelectedTime, itemType: ItemType) {
    const newItem: Item = {
      id: crypto.getRandomValues(new Uint32Array(1))[0].toString(),
      type: itemType,
      description: itemType,
      selectedTime: {
        selectedHour,
        selectedMinute,
      }
    }
    setItems([...items, newItem])
    setIsModelOpen(false);
  }

  function onUpdateItem({ selectedHour, selectedMinute }: SelectedTime, id: string) {
    const newItem = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          selectedTime: {
            selectedHour,
            selectedMinute,
          }
        }
      }
      return item;
    })
    setItems(newItem)
    setIsModelOpen(false);
    setSelectedTime(undefined);
  }

  function onDeleteItem(id: string) {
    const newItem = items.filter((item) => item.id !== id)
    setItems(newItem)
  }

  return (
    <>
      {isModalOpen && <ModalWindow isOpen={isModalOpen} onRequestClose={onRequestClose} onSave={onSave} selectedTime={selectedTime} />}
      <div className="flex gap-2">
        {itemTypes.map((itemType) => (
          <button key={itemType} onClick={addItem(itemType)} className={`"relative capitalize top-0 right-0 p-2 text-gray-500 rounded-full shadow-md hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" ${itemTypeBackgroundColors[itemType]}`}>
            {itemType}
          </button>
        ))}
      </div>
      <div className="relative w-64 h-64 mt-3">
        <Notebook items={sortedItems} onDelete={onDeleteItem} onUpdate={updateItem} />
      </div>
    </>
  )
}
