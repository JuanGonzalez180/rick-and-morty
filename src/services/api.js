export const fetchCharacters = async () => {
    // await new Promise( (resolve) => {
    //     setTimeout(() => {
    //         resolve(true);
    //     }, 2000);
    // });

    const response = await fetch('https://rickandmortyapi.com/api/character/?page=19');

    if (!response.ok) {
        throw new Error('Error fetching characters');
    }
    return await response.json();
};
