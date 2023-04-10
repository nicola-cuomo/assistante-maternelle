"use client"

import { Item, ItemType, itemTypeBackgroundColors, itemTypes } from '@/components/item.type';
import ModalWindow, { ItemProps, ModalWindowProps } from '@/components/modal';
import Notebook from '@/components/notebook';
import { useReducer, useState, useMemo } from 'react';




export default function Home() {
  const initialModalConf = {
    isOpen: false,
    onRequestClose,
    onSave: () => { },
    itemType: itemTypes[0]
  }
  const [modalConf, updateModalConf] = useReducer((prev: ModalWindowProps, next: Partial<ModalWindowProps>) => {
    return {
      ...prev,
      ...next
    }
  }, initialModalConf);
  const [items, setItems] = useState<Item[]>([])
  const sortedItems = useMemo(() =>
    items.sort((a, b) => {
      return a.time.localeCompare(b.time)
    }), [items]
  )

  function addItem(type: ItemType) {
    return () => {
      updateModalConf({
        isOpen: true,
        onSave: onAddNewItem,
        itemType: type,
      })
    }
  }

  function updateItem(id: string) {
    const item = items.find((item) => item.id === id);
    if (!item || !item.time) {
      return;
    }
    updateModalConf({
      isOpen: true,
      onSave: (onUpdateItem),
      time: item.time,
      biberonSize: item.biberonSize,
      itemId: item.id
    });
  }

  function onRequestClose() {
    updateModalConf(initialModalConf)
  }

  function onAddNewItem(item: ItemProps) {
    const newItem: Item = {
      id: crypto.getRandomValues(new Uint32Array(1))[0].toString(),
      ...item
    }
    setItems([...items, newItem])
    onRequestClose()
  }

  function onUpdateItem(item: ItemProps) {
    const newItemList = items.map((currentItem) => {
      if (currentItem.id === modalConf.itemId) {
        return {
          ...currentItem,
          ...item
        }
      }
      return currentItem;
    })
    setItems(newItemList)
    onRequestClose()
  }

  function deleteItem(id: string) {
    const newItem = items.filter((item) => item.id !== id)
    setItems(newItem)
  }

  return (
    <>
      {modalConf.isOpen && <ModalWindow {...modalConf} />}
      <div className="flex gap-2">
        {itemTypes.map((itemType) => (
          <button key={itemType} onClick={addItem(itemType)} className={`"relative capitalize top-0 right-0 p-2 text-gray-500 rounded-lg shadow-md hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" ${itemTypeBackgroundColors[itemType]}`}>
            {itemType}
          </button>
        ))}
      </div>
      <div className="relative w-64 h-64 mt-3">
        <Notebook items={sortedItems} onDelete={deleteItem} onUpdate={updateItem} />
      </div>
    </>
  )
}
