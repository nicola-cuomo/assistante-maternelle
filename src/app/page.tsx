"use client"

import ModalWindow, { SelectedTime } from '@/components/modal';
import React, { useState } from 'react';

type EventType = 'selle' | 'repa' | 'sieste'

type Event = {
  id: string
  type: EventType
  description: string
  selectedTime: SelectedTime
}

function getEventTime(event: Event) {
  return `${event.selectedTime.selectedHour}:${event.selectedTime.selectedMinute}`
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const [isModalOpen, setIsModelOpen] = useState(false)
  const [onSave, setOnSave] = useState(() => (selectedTime: SelectedTime) => { });
  const [selectedTime, setSelectedTime] = useState<SelectedTime | undefined>(undefined)

  function addEvent(type: EventType) {
    return () => {
      setOnSave(() => (selectedTime: SelectedTime) => onAddNewEvent(selectedTime, type));
      setIsModelOpen(true);
    }
  }

  function updateEvent(id: string) {
    return () => {
      const selectedTime = events.find((event) => event.id === id)?.selectedTime;
      if (!selectedTime) {
        return;
      }
      setOnSave(() => (selectedTime: SelectedTime) => onUpdateEvent(selectedTime, id));
      setIsModelOpen(true);
      setSelectedTime({
        selectedHour: selectedTime.selectedHour,
        selectedMinute: selectedTime.selectedMinute,
      })
    }
  }

  function onRequestClose() {
    setIsModelOpen(false);
    setSelectedTime(undefined);
  }

  function onAddNewEvent({ selectedHour, selectedMinute }: SelectedTime, eventType: EventType) {
    const newEvent: Event = {
      id: crypto.getRandomValues(new Uint32Array(1))[0].toString(),
      type: eventType,
      description: eventType,
      selectedTime: {
        selectedHour,
        selectedMinute,
      }
    }
    setEvents([...events, newEvent])
    setIsModelOpen(false);
  }

  function onUpdateEvent({ selectedHour, selectedMinute }: SelectedTime, id: string) {
    const newEvents = events.map((event) => {
      if (event.id === id) {
        return {
          ...event,
          selectedTime: {
            selectedHour,
            selectedMinute,
          }
        }
      }
      return event;
    })
    setEvents(newEvents)
    setIsModelOpen(false);
    setSelectedTime(undefined);
  }

  return (
    <>
      <ModalWindow isOpen={isModalOpen} onRequestClose={onRequestClose} onSave={onSave} selectedTime={selectedTime} />
      <div className="flex gap-2">
        <button onClick={addEvent('selle')} className="relative top-0 right-0 p-2 text-gray-500 bg-white rounded-full shadow-md hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Adjute selle
        </button>
        <button onClick={addEvent('repa')} className="relative top-0 right-0 p-2 text-gray-500 bg-white rounded-full shadow-md hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Adjute repa
        </button>
        <button onClick={addEvent('sieste')} className="relative top-0 right-0 p-2 text-gray-500 bg-white rounded-full shadow-md hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Adjute sieste
        </button>
      </div>
      <div className="relative w-64 h-64">
        <ul className="flex flex-col items-center justify-center space-y-4">
          {events.map((event) => (
            <li key={event.id} onClick={updateEvent(event.id)}>
              <div className="flex items-center justify-center p-4 gap-2 bg-white rounded-lg shadow-md">
                <p className="text-xl font-medium text-center text-gray-700">
                  {event.description}
                </p>
                <p className="text-sm font-normal text-center text-gray-400">
                  {getEventTime(event)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
