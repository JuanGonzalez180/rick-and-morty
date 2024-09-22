import { useState } from "react";
import Modal from "react-modal";

import { ItemProvider } from '../context/ItemContext';
import { CharacterList, CharacterDetail } from "../components";
import { Color } from "../styles";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "70%"
  },
};

Modal.setAppElement("#root");

export const HomePage = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    if (window.innerWidth <= 1024) {
      openModal();
    }
  };

  return (
    <ItemProvider>
        <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-4">
            <div className="lg:w-1/4 w-full bg-white rounded shadow p-6">
                <CharacterList onSelectCharacter={handleCharacterSelect} character={selectedCharacter}/>
            </div>

            <div className="lg:w-3/4 w-full hidden lg:block bg-white rounded shadow p-4">
                {selectedCharacter ? (
                <CharacterDetail character={selectedCharacter} setSelectedCharacter={setSelectedCharacter}/>
                ) : (
                <p className="text-gray-500">
                    Selecciona un personaje para ver los detalles.
                </p>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
            >
                {selectedCharacter && <CharacterDetail character={selectedCharacter} setSelectedCharacter={setSelectedCharacter}/>}

                <div className="flex justify-center">
                    <button
                        onClick={closeModal}
                        className="mt-4 p-2 pl-4 pr-4 text-white rounded"
                        style={{ backgroundColor: Color.primary700 }}
                    >
                        Cerrar
                    </button>
                </div>
            </Modal>
        </div>
    </ItemProvider>
  );
};
