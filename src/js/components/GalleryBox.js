import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {removeItem, getAllImg, removeAllCollection} from "../indexedDB/db";
import {setImg, removeImg, addCollection} from "../redux/actions/actions";

//----------------------------

function GalleryBox() {

    let per_page = 5;

    const images = useSelector(state => state.imgReducer.images)
    const copyGallery = useSelector(store => store.copyGalleryForSearch.images)
    const dispatch = useDispatch()
    const [pagLength, setPagLength] = useState([])

    const [fromSlice, setFromSlice] = useState(0)
    const [toSlice, setToSlice] = useState(per_page)


    const setPage = (e) => {
        setFromSlice(e.target.id * per_page)
        setToSlice(e.target.id * per_page + per_page)

        Array.from(document.getElementsByClassName("pag_item")).map((el, index)=>{
            el.classList.remove("pag_item_active")
            e.target.classList.add("pag_item_active")
        })
    }

    useEffect(() => {
        dispatch(addCollection(images))
        let temp = []
        for (let i = 0; i < Math.ceil(images.length/per_page); i++) {
            temp.push(i)
        }
        setPagLength(temp)
    }, [images])


    useEffect(() => {
        getAllImg()
            .then((data) => {
                data.map(el => {
                    if (el != data[data.length - 1]) {
                        dispatch(setImg(el))
                    }
                })
                return data
            })
    }, [])


    function remEl(e) {
        let arrImgBox = Array.from(document.getElementsByClassName("img_item"))

        arrImgBox.map((el, index) => {
            if (e.target.dataset.name == el.dataset.name) {
                removeItem(el.dataset.name)
                dispatch(removeImg(el.dataset.name))
                console.log(images)
            }
        })
    }


    /*
    imgLoad => working normal only before first reload page
     */
    function imgLoad(e) {
        function download(url, filename) {
            // Request
            fetch(url, {
                mode: 'no-cors' /*{mode:'cors'}*/
                // Callback
            }).then((transfer) => {
                // Return blob
                return transfer.blob();
                // Return data
            }).then((bytes) => {
                // Create an element
                let elm = document.createElement('a');
                // Add blob data to element
                elm.href = URL.createObjectURL(bytes);
                // Download blob data with certain extension
                elm.setAttribute('download', filename);
                elm.click()
            }).catch((error) => {
                console.log(error);
            })
        }

        download(e.target.dataset.src, e.target.dataset.name);
    }

    function activeImg_activeLine(e) {
        Array.from(document.getElementsByClassName("active_line")).map((el, index) => {
            el.style.background = "transparent"
            if (el.dataset.id == e.target.dataset.id) {
                el.style.background = "red"
            }
        })
    }

    function activeImg_moveLine(e) {
        Array.from(document.getElementsByClassName("move_line")).map((el, index) => {
            el.style.background = "transparent"
            if (el.dataset.id == e.target.dataset.id) {
                el.style.background = "grey"
            }
        })
    }

    function createInfoImg(e) {
        activeImg_activeLine(e)
        images.map(el => {
            if (el.name == e.target.dataset.name) {
                document.getElementById("img_info_name").innerText = el.name
                document.getElementById("nick_name").innerText = el.nickName
                document.getElementById("img_catch_phrase").innerText = el.catchPhrase
                document.getElementById("img_info_desc").innerText = el.desc
                document.getElementById("img_info_format").innerText = el.format
                document.getElementById("img_info_src").src = el.url
            }
        })
    }

    function search(e) {
        e.preventDefault()
        // dispatch(addCollection(images))
        let searchForm = document.getElementById("search");
        let searchRegExp = new RegExp(searchForm.value, ["i"]);
        let products = images.filter(el => searchRegExp.test(el.name));
        dispatch(addCollection(products))
        setFromSlice(0 * per_page)
        setToSlice(0 * per_page + per_page)
    }

    function clearAllCollection() {
        let conf = confirm("are you sure you to want delete all imagesForTest?")
        if (conf) {
            removeAllCollection()
            location.reload()
        } else return

    }

    return (

        <div className="images_gallery_container">
            <p className="gallery_box_title">ALL HEROES</p>
            <div className="search_removeAll_box">
                <form onChange={search} action="">
                    <input id="search" name="search" type="text"/>
                    <label htmlFor="search" className="labelForSearch" style={{marginLeft: "10px"}}>SEARCH</label>
                </form>
                <p className="count_item_in_db">Item in DB: {images.length}</p>
                <button className="btn_clear_db" onClick={clearAllCollection}>REMOVE ALL</button>
            </div>

            <div className="images_gallery_box">
                <div className="gallery_box">
                    {copyGallery.slice(fromSlice, toSlice).map((el, index) => (
                        <div className="img_item" data-name={el.name}
                             key={el.name + el.email + (Math.floor(Math.random() * Math.floor(1000)))}>
                            <img className="image" onClick={createInfoImg} onMouseOver={activeImg_moveLine}
                                 data-mimetype={el.type} data-id={index} data-name={el.name}
                                 data-size={el.size} src={el.url} alt=""/>
                            {/*<button onClick={imgLoad} data-name={el.name} data-src={el.url} id="download">download</button>*/}
                            <div className="active_line" data-id={index}></div>
                            <div className="move_line" data-id={index}></div>
                            <button className="btn_remove" data-name={el.name} onClick={remEl}>remove</button>
                        </div>
                    ))}
                </div>
                <div id='"pagination_box' className="pagination_box">
                    {pagLength.map((el)=> (
                                <div
                                    key={el}
                                    id={el}
                                    className="pag_item"
                                    onClick={setPage}
                                >{el}</div>
                            ))}
                </div>
            </div>
        </div>
    )
}

export default GalleryBox;