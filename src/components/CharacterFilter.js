import React, { useState, useEffect } from 'react';
import { HiAdjustments } from "react-icons/hi";
import { Color } from '../styles';

export const CharacterFilter = (props) => {
    const _props = {
        ...props
    }
    const [search, setSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [statusFilter, setStatusFilter] = useState('All');
    const [genderFilter, setGenderFilter] = useState('All');
    const [specieFilter, setSpecieFilter] = useState('All');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        sendGenderFilter();
    }, [search]);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const applyFilters = () => {
        setShowDropdown(false);
        sendGenderFilter();
    };

    const sendGenderFilter = () => {
        _props.setFilters(
            {
                search,
                status: statusFilter,
                gender: genderFilter,
                specie: specieFilter,
            }
        )
    }

    return (
        <div className="relative w-full">
            <div className="flex items-center border border-gray-300 rounded-md p-2">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search characters"
                    className="flex-grow outline-none px-2"
                />
                <button
                    onClick={toggleDropdown}
                    className="text-gray-600 p-1 hover:text-gray-800 rounded-sm"
                    style={{ backgroundColor: Color.primary100 }}
                >
                    <HiAdjustments style={{ color: Color.primary700 }}/>
                </button>
            </div>

            {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-full border border-gray-300 bg-white rounded-md shadow-lg p-4 overflow-x-auto">
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Status</h3>
                        <div className="flex space-x-2">
                            {['All', 'Alive', 'Dead'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-3 py-1 border rounded-md ${statusFilter !== status ?? 'bg-white-100 text-gray-800'}`}
                                    style={{ 
                                        backgroundColor: statusFilter === status ? Color.primary100 : 'inherit', 
                                        color: statusFilter === status ? Color.primary700 : 'inherit' 
                                    }}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Specie</h3>
                        <div className="flex space-x-2">
                            {['All', 'Alien', 'Human', 'Humanoid'].map(specie => (
                                <button
                                    key={specie}
                                    onClick={() => setSpecieFilter(specie)}
                                    className={`px-3 py-1 border rounded-md ${specieFilter !== specie ?? 'bg-white-100 text-gray-800'}`}
                                    style={{ 
                                        backgroundColor: specieFilter === specie ? Color.primary100 : 'inherit', 
                                        color: specieFilter === specie ? Color.primary700 : 'inherit' 
                                    }}
                                >
                                    {specie}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Gender</h3>
                        <div className="flex space-x-2">
                            {['All', 'Male', 'Female', 'unknown'].map(gender => (
                                <button
                                    key={gender}
                                    onClick={() => setGenderFilter(gender)}
                                    className={`px-3 py-1 border rounded-md ${genderFilter !== gender ?? 'bg-white-100 text-gray-800'}`}
                                    style={{ 
                                        backgroundColor: genderFilter === gender ? Color.primary100 : 'inherit', 
                                        color: genderFilter === gender ? Color.primary700 : 'inherit' 
                                    }}
                                >
                                    {gender}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={applyFilters}
                        className="w-full mt-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        style={{ backgroundColor: Color.primary700 }}
                    >
                        Filter
                    </button>
                </div>
            )}
        </div>
    );
};
