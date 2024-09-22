import { HiHeart, HiOutlineHeart } from "react-icons/hi";

import { useItemContext } from "../context/ItemContext";
import { Color } from "../styles";

export const CharacterDetail = (props) => {
  const _props = {
    ...props,
  };

  const { characters, setCharacters } = useItemContext();
  const character = characters.find((item) => item.id === _props.character.id);

  return (
    <div className="px-10">
      <span className="inline-flex" style={styles.imageContainer}>
        <img src={character.image} alt={character.name} style={styles.image} />

        <button
          onClick={(_e) => {
            setCharacters(
              characters.map((item) =>
                item.id === character.id
                  ? { ...item, isStarred: !item.isStarred }
                  : item
              )
            );
          }}
          style={styles.heartButton}
        >
          {character.isStarred ? (
            <HiHeart style={{ color: Color.secondary600 }} />
          ) : (
            <HiOutlineHeart className="text-gray-400" />
          )}
        </button>
      </span>

      <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
      <div className="flex-grow">
        <div className="flex flex-col border-b border-gray py-3">
          <span className="font-bold">Specie:</span>
          <span>{character?.species}</span>
        </div>
        <div className="flex flex-col border-b border-gray py-3">
          <span className="font-bold">Status:</span>
          <span>{character?.status}</span>
        </div>
        <div className="flex flex-col py-3">
          <span className="font-bold">Gender:</span>
          <span>{character?.gender}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  imageContainer: {
    width: "auto",
    position: "relative",
  },
  heartButton: {
    fontSize: 20,
    cursor: "pointer",
    background: "none",
    border: "none",
    outline: "none",
    padding: 5,
    backgroundColor: Color.white,
    borderRadius: 100,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    objectFit: "cover",
  },
};
