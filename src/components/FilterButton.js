import React, {useState} from 'react'
import {IoChevronDown} from 'react-icons/io5'
import {motion} from 'framer-motion'
import { GetDataToContext } from '../context/providerContext';
import { setAlbumFilter, setArtistFilter, setFilterTerm, setLanguageFilter } from '../context/reducer';

const FilterButton = ({filterData, flag, type}) => {
    // const [filterName, setFilterName] = useState(null);
    const [filterMenu, setFilterMenu] = useState(false);

    const { state, dispatch} = GetDataToContext();


    const updateFilterName = (name) => {
        // setFilterName(name)
        setFilterMenu(false)

        if (flag === "Artists") {
            dispatch(setArtistFilter(name))
        }

        if (flag === "Albums") {
            dispatch(setAlbumFilter(name))
        }

        if (flag === "Language") {
            dispatch(setLanguageFilter(name))
        }

        if (flag === "Category") {
            dispatch(setFilterTerm(name))
        }
    }


  return (
    <div className='border border-gray-300 rounded-md my-4 px-1 relative cursor-pointer hover:border-gray-400'>

        <p className='text-base tracking-wide text-textColor flex items-center gap-2 my-1 mx-2'
            onClick={() => setFilterMenu(!filterMenu)}
        >
            {state[type] || flag}
            {/* {!filterName && flag} */}
            {/* {(state[type]) && filterName && (
                <>
                    {filterName.length > 15 ? `${filterName.slice(0,15)}...` : filterName}
                </>
            )} */}
            <IoChevronDown className={`text-base text-textColor duration-100 transition-all ease-in-out ${filterMenu ? "rotate-180" : "rotate-0"}`}
                
            />
        </p>

        {
            filterData && filterMenu && (
                <motion.div
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 50}}
                    className='w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll bg-gray-100 py-2 mt-1 flex flex-col rounded-md absolute top-8 left-0'
                >
                    {filterData?.map((data) => {
                        return <div key={data.name}
                                    className="flex items-center gap-2 px-4 my-1 hover:bg-gray-200"
                                    onClick={() => updateFilterName(data.name)}
                                >
                                    {
                                        (flag === "Albums" || flag === "Artists") && (
                                            <img src={data.picture} alt="None" 
                                                className='w-8 min-w-[32px] h-8 rounded-full object-cover'
                                            />
                                        )
                                    }
                                    <p className='w-full'>
                                        {data?.name?.length > 15 ? `${data.name.slice(0,15)}...` : data.name}
                                    </p>
                                </div>
                    })}
                </motion.div>
            )
        }

    </div>
  )
}

export default FilterButton
