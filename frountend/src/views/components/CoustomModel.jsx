
import  { useState } from 'react';


const CoustomModel = ({onDataSubmit , buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setInputValue(''); 
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      
      <button className="btn btn-active btn-neutral h-10 mr-2 w-56" onClick={openModal} >
          {buttonText}
        </button>

      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-lg w-full mb-4"
                placeholder="Enter some text"
              />
              <div className="flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>onDataSubmit(inputValue)} >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoustomModel;