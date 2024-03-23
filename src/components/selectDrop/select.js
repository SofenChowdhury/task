import React, { useEffect, useState } from 'react';
import '../selectDrop/select.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { FamilyRestroomTwoTone } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const Select = ({data,placeholder, icon}) => {

    const [isOpenSelect, setisOpenSelect] = useState(false);
    const [selectedIndex, setselectedIndex] = useState(0);
    const [selectedItem, setselectedItem] = useState(placeholder);

    const [listData, setListData] = useState(data);
    const [listData2, setListData2] = useState(data);

    // console.log('listDatabdscjadsbjhabsdchbdhbcadshbcjbdhabdavbbnnnnnnnnnnnnnnnnn');
    // console.log(listData);
    // console.log(data);

    const openSelect = () => {
        setisOpenSelect(!isOpenSelect);
    }

    const closeSelect = (index, name) => {
        setselectedIndex(index);
        setisOpenSelect(false);
        setselectedItem(name);
    }

    const filterList=(e)=>{
        const keyword = e.target.value.toLowerCase();
        
        const list = listData2.filter((item)=>{
            return item.toLowerCase().includes(keyword);
        })

        const list2 = list.filter((item, index) => list.indexOf(item) === index);

        setListData(list2)

    }

    return (
        <ClickAwayListener onClickAway={()=>setisOpenSelect(false)}>
            <div className='selectDropWrapper cursor position-relative'>
                {icon}
                <span className='openSelect' onClick={openSelect}>{selectedItem.length>14 ? selectedItem.substr(0,14)+'...' :  selectedItem} 
                <KeyboardArrowDownIcon className='arrow' /></span>
                {
                    isOpenSelect === true &&
                    <div className='selectDrop'>
                        <div className='searchField'>
                            <input type='text' placeholder='Search here...' onChange={filterList}/>
                        </div>
                        <ul className='searchResults'>
                        <li key={0} onClick={() => closeSelect(0, placeholder)} className={`${selectedIndex === 0 ? 'active' : ''}`}>{placeholder}</li> 
                        {
                            // !listData == undefined &&
                            data.map((item,index)=>{
                              
                                return(
                                    <div className='item' key={index} >
                                    {/* <Link to={`/cat/${item.toLowerCase()}`}> */}
                                    <Link to={'/'}>
                                        <li key={index+1} onClick={() => closeSelect(index+1, item)} className={`${selectedIndex === index+1 ? 'active' : ''}`}>{item}</li> 
                                    </Link>
                                    </div>
                                )
                            })
                        }

                          
                        </ul>
                    </div>
                }

            </div>
        </ClickAwayListener>

    )
}

export default Select;