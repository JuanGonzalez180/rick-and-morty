import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { Color } from "../styles";

export const CharacterItem = (props) => {
  const _props = {
    ...props,
  };

  if( _props.skeleton ){
    return (
        <div
            style={styles.characterRow}
        >
            <div style={styles.characterIntern}>
                <Skeleton width={40} height={40} style={styles.image} />
                <div style={styles.details}>
                    <Skeleton width={70} height={10} />
                    <Skeleton width={40} height={10} />
                </div>
            </div>
        </div>
    )
  }

  const characterRowStyle = {
    ...styles.characterRow,
    backgroundColor: _props.selected ? Color.primary100 : 'transparent',
  };

  return (
    <li
      onClick={() => _props.onSelectCharacter?.(_props?.character)}
      style={characterRowStyle}
    >
        <div style={styles.characterIntern}>
            <img
                src={_props?.character.image}
                alt={_props?.character.name}
                style={styles.image}/>

            <div style={styles.details}>
                <h3 style={styles.title}>{_props?.character.name}</h3>
                <span style={styles.subtitle}>{_props?.character.species}</span>
            </div>
            <button
                onClick={(_e) => {
                    _props.toggleStarred?.(_props?.character.id);
                }}
                style={styles.heartButton}
            >
                {_props?.character.isStarred ? (
                    <HiHeart style={{ color: Color.secondary600 }} />
                ) : (
                    <HiOutlineHeart className="text-gray-400" />
                )}
            </button>
        </div>
    </li>
  );
};

const styles = {
  characterRow: {
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    cursor: 'pointer'
  },
  characterIntern: {
    display: "flex",
    alignItems: "center",
    borderTop: "2px solid #F6F6F6",
    paddingTop: 10,
    paddingBottom: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
  },
  subtitle: {
    fontSize: 14,
    color: Color.textSecondary,
  },
  details: {
    flexGrow: 1,
    paddingLeft: 20,
  },
  heartButton: {
    fontSize: 20,
    cursor: "pointer",
    background: "none",
    border: "none",
    outline: "none",
    padding: 5,
    backgroundColor: Color.white,
    borderRadius: 100
  },
};
