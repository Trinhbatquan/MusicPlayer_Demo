import axios from 'axios';

const projectUrl = "https://music-player-demo-three.vercel.app/"



//user
export const validateUser = async (token) => {
    try {
        const res =  await axios.get(`${projectUrl}api/users/login`, {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            }
                                        }
                                    
        );
        if (res && res?.data) {
            return res.data;
        }
    } catch (error){
        console.log("validateUser " + error)
    }
}

export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${projectUrl}api/users/getAll`);

        if (res && res?.data) {
            return res.data;
        }

    } catch (error) {
        console.log("getAllUsers" + error);
    }
}


export const changeUserRole = async (userId, role) => {
    try {
        const res = await axios.put(`${projectUrl}api/users/updateRole/${userId}`,
        {
           role: role
        }
        
        )
        return res.data;
    } catch (error) {
        console.log("updateRole" + error)
    }
}

export const removeUser = async(userId) => {
    try {
        const res = await axios.delete(`${projectUrl}api/users/delete/${userId}`);
        return res.data;

    } catch(error) {
        console.log("delete user" + error)
    }
}




//songs
export const getAllSongs = async () => {
    try {
        const res = await axios.get(`${projectUrl}api/songs/getAll`);

        if (res && res?.data) {
            return res.data;
        }

    } catch (error) {
        console.log("getAllSongs" + error);
    }
}

export const saveNewSong = async (newSong) => {
    try {

        const res = await axios.post(`${projectUrl}api/songs/save`, {
            ...newSong
        })

        if (res) {
            return res.data;
        }


        
    } catch (error) {
        console.log('save song' + error);
    }
}

export const deleteSong = async (id) => {
    try {
        const res = await axios.delete(`${projectUrl}api/songs/delete/${id}`);
        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log('delete song' + error)
    }
}




//artists
export const getAllArtists = async () => {
    try {
        const res = await axios.get(`${projectUrl}api/artists/getAll`);

        if (res && res?.data) {
            return res.data;
        }

    } catch (error) {
        console.log("getAllArtists" + error);
    }
}

export const saveNewArtist = async (newArtist) => {
    try {

        const res = await axios.post(`${projectUrl}api/artists/save`, {
            ...newArtist
        })

        if (res) {
            return res.data;
        }


        
    } catch (error) {
        console.log('save artist' + error);
    }
}

export const deleteArtist = async (id) => {
    try {
        const res = await axios.delete(`${projectUrl}api/artists/delete/${id}`);
        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log('delete artist' + error)
    }
}




//albums
export const getAllAlbums = async () => {
    try {
        const res = await axios.get(`${projectUrl}api/albums/getAll`);

        if (res && res?.data) {
            return res.data;
        }

    } catch (error) {
        console.log("getAllAlbums" + error);
    }
}

export const saveNewAlbum = async (newAlbum) => {
    try {

        const res = await axios.post(`${projectUrl}api/albums/save`, {
            ...newAlbum
        })

        if (res) {
            return res.data;
        }


        
    } catch (error) {
        console.log('save album' + error);
    }
}

export const deleteAlbum = async (id) => {
    try {
        const res = await axios.delete(`${projectUrl}api/albums/delete/${id}`);
        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log('delete album' + error)
    }
}

