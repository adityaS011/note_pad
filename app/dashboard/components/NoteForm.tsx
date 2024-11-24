import React from 'react';
import { Lists } from '../Dashboard';

const NoteForm = ({
  list,
  onSave,
  onDelete,
  currentList,
  setCurrentList,
}: {
  list: Lists | null;
  onSave: (list: Lists) => void;
  onDelete?: () => void;
  currentList: Lists;
  setCurrentList: (val: Lists) => void;
}) => {
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setCurrentList({ ...currentList, description: e.target.innerHTML });
  };

  const handleSave = () => {
    onSave(currentList);
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
  };

  return (
    <div className='flex flex-col gap-2 md:mx-12'>
      <div className='relative px-8 mt-6 '>
        <div
          contentEditable
          onBlur={handleDescriptionChange}
          className='border bg-gray-50 px-3 py-2 rounded md:min-h-[600px] h-[500px] overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-50'
          dangerouslySetInnerHTML={{ __html: currentList.description }}
        ></div>
      </div>

      <div className='flex gap-2 px-8 mx-auto w-full justify-center'>
        <button
          onClick={handleSave}
          className='bg-blue-500 text-white px-8  hover:bg-blue-600 py-2 rounded'
        >
          Save
        </button>
        {onDelete && (
          <button
            onClick={handleDelete}
            className='bg-red-500  text-white px-8 py-2 rounded'
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteForm;
