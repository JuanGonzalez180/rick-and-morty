import React, { useState, useEffect } from "react";

import { fetchCharacters } from "../services/api";

import { useItemContext } from "../context/ItemContext";
import { CharacterItem } from "./CharacterItem";
import { CharacterFilter } from "./CharacterFilter";

import { HiSwitchVertical } from "react-icons/hi";
import { Color } from "../styles";

export const CharacterList = (props) => {
  const _props = {
    ...props,
  };

  const { characters, setCharacters } = useItemContext();
  const [loading, setLoading] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);
  const [filters, setFilters] = useState({
        search: '',
        status: 'All',
        gender: 'All',
        specie: 'All',
  });

  const loadCharacters = async () => {
    setLoading(true);

    try {
      const data = await fetchCharacters();
      setCharacters(data.results);
    } catch (error) {
      console.error("Error fetching characters: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  const toggleStarred = (id) => {
    setCharacters(
      characters.map((character) =>
        character.id === id
          ? { ...character, isStarred: !character.isStarred }
          : character
      )
    );
  };

  const toggleSort = () => {
    setSortAsc(!sortAsc);
  };

  let charactersFilters = characters;

  charactersFilters = characters.filter((character) => {
    return (
      (!filters.search || character.name.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.status === "All" || character.status === filters.status) &&
      (filters.specie === "All" || character.species === filters.specie) &&
      (filters.gender === "All" || character.gender === filters.gender)
    );
  });

  const sortedCharacters = charactersFilters
    ? [...charactersFilters].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return sortAsc ? -1 : 1;
        if (nameA > nameB) return sortAsc ? 1 : -1;
        return 0;
      })
    : [];

  const starredCharacters = sortedCharacters?.filter(
    (character) => character.isStarred
  );
  const otherCharacters = sortedCharacters?.filter(
    (character) => !character.isStarred
  );

  const filtersView = () => {
    const countFilter = Object.entries(filters).reduce((count, [key, value]) => {
        if (key === 'search' && value) return count + 1;
        if ((key === 'specie' || key === 'status' || key === 'gender') && value !== 'All') return count + 1;
        return count;
      }, 0);

    if(!countFilter)
        return <></>;

    return (
        <div 
            className="flex flex-row items-center justify-between w-full px-2">
          <div className="text-blue-700"><strong>{charactersFilters.length} Results</strong></div>
          <div>
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                {countFilter} Filter
            </span>
          </div>
        </div>
    );
  }

  const itemsRickAndMorty = () => {
    return (
      <>
        <button
          onClick={toggleSort}
          className="flex flex-row items-center justify-between w-full"
          style={styles.listType}
        >
          <div>SORT ASC/DESC</div>
          <HiSwitchVertical
            style={{ color: Color.primary700, fontSize: 16 }}
          />
        </button>

        {filtersView()}

        <div>
          <h2 style={styles.listType}>
            Starred Characters ({starredCharacters?.length})
          </h2>
          <ul>
            {starredCharacters?.map((character) => (
              <CharacterItem
                character={character}
                key={character.id}
                toggleStarred={toggleStarred}
                onSelectCharacter={_props.onSelectCharacter}
                selected={_props.character?.id === character.id}
              />
            ))}
          </ul>
        </div>
        <div>
          <h2 style={styles.listType}>
            Characters ({otherCharacters?.length})
          </h2>
          <ul>
            {otherCharacters?.map((character) => (
              <CharacterItem
                character={character}
                key={character.id}
                toggleStarred={toggleStarred}
                onSelectCharacter={_props.onSelectCharacter}
                selected={_props.character?.id === character.id}
              />
            ))}
          </ul>
        </div>
      </>
    );
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Rick and Morty List</h1>

      <CharacterFilter setFilters={setFilters} />

      {loading ? (
        <div>
          {[0, 1, 2, 3, 4, 5]?.map((item) => (
            <CharacterItem key={item} skeleton={true} />
          ))}
        </div>
      ) : (
        itemsRickAndMorty()
      )}
    </div>
  );
};

const styles = {
  listType: {
    textTransform: "uppercase",
    color: Color.textSecondary,
    fontSize: 12,
    fontWeight: 700,
    margin: "12px 0",
    paddingLeft: 10,
    paddingRight: 10,
  },
};
