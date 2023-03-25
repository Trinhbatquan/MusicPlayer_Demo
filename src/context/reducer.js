const SET_USER = 'setUser';
const SET_ALL_USERS = 'setAllUsers';
const SET_ALL_SONGS = 'setAllSongs';
const SET_ALL_ALBUMS = 'setAllAlbums';
const SET_ALL_ARTISTS = 'setAllArtists';

//filter
const SET_FILTER_TERM = 'SET_FILTER_TERM';
const SET_ARTIST_FILTER = 'SET_ARTIST_FILTER';
const SET_LANGUAGE_FILTER = 'SET_LANGUAGE_TERM';
const SET_ALBUM_FILTER = 'SET_ALBUM_FILTER';

const SET_ALERT_TYPE = 'setAlertType'

//filter
const FILTER_SONGS_SEARCH = 'filterSongBySearch'

//music player
const SET_IS_PLAYING = 'setIsPlaying'
const SET_SONG_INDEX = 'setSongIndex'


const setUser = (payload) => {
    return {
        type: SET_USER,
        payload
    }
}

const setAllUsers = (payload) => {
    return {
        type: SET_ALL_USERS,
        payload
    }
}

const setAllSongs = (payload) => {
    return {
        type: SET_ALL_SONGS,
        payload
    }
}

const setAllAlbums = (payload) => {
    return {
        type: SET_ALL_ALBUMS,
        payload
    }
}

const setAllArtists = (payload) => {
    return {
        type: SET_ALL_ARTISTS,
        payload
    }
}

const setFilterTerm = (payload) => {
    return {
        type: SET_FILTER_TERM,
        payload
    }
}

const setArtistFilter = (payload) => {
    return {
        type: SET_ARTIST_FILTER,
        payload
    }
}

const setLanguageFilter = (payload) => {
    return {
        type: SET_LANGUAGE_FILTER,
        payload
    }
}

const setAlbumFilter = (payload) => {
    return {
        type: SET_ALBUM_FILTER,
        payload
    }
}


const setAlertType = (payload) => {
    return {
        type: SET_ALERT_TYPE,
        payload
    }
}

const filterSongBySearch = (payload) => {
    return {
        type: FILTER_SONGS_SEARCH,
        payload
    }
}

const setIsPlayingSong  = (payload) => {
    return {
        type: SET_IS_PLAYING,
        payload
    }
}

const setSongIndex = (payload) => {
    return {
        type: SET_SONG_INDEX,
        payload
    }
}



const reducer = (state, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            }
            case SET_ALL_SONGS:
            return {
                ...state,
                allSongs: action.payload
            }
            case SET_ALL_ARTISTS:
            return {
                ...state,
                allArtists: action.payload
            }
            case SET_ALL_ALBUMS:
            return {
                ...state,
                allAlbums: action.payload
            }

            //filter case
            case SET_FILTER_TERM:
                return {
                    ...state,
                    filterTerm: action.payload
                }

            case SET_ARTIST_FILTER:
                return {
                    ...state,
                    artistFilter: action.payload
                }

            case SET_LANGUAGE_FILTER:
                return {
                    ...state,
                    languageFilter: action.payload
                }

            case SET_ALBUM_FILTER:
                return {
                    ...state,
                    albumFilter: action.payload
                }

            case SET_ALERT_TYPE:
                return {
                    ...state,
                    alertType: action.payload
                }

            case FILTER_SONGS_SEARCH:
                 const prevSongs = [...state.allSongs];
                 console.log({prevSongs})
                 const newSongs = prevSongs.filter((song) => {
                    return song.name.toLowerCase().includes(action.payload.toLowerCase());
                 })
                 console.log({newSongs})
                 return {
                    ...state,
                    filterSongsBySearch: newSongs
                 }

            case SET_IS_PLAYING:
            return {
                ...state,
                isPlayingSong: action.payload
            }


            case SET_SONG_INDEX:
                return {
                    ...state,
                    songIndex: action.payload
                }

        default:
            throw new Error("Invalid action");
    }
  
}

export {setUser, setAllSongs, setAllAlbums, setAllArtists, setAllUsers, 
    setAlbumFilter,setArtistFilter, setFilterTerm, setLanguageFilter, 
    setAlertType,setIsPlayingSong, setSongIndex, filterSongBySearch}
export default reducer
