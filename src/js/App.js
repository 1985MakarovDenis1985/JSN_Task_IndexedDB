import React, {useEffect, useState, Fragment} from 'react';
import {HashRouter, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import GalleryBox from "./components/GalleryBox";
import AddImgAndInformationBox from "./components/AddImgAndInformationBox";
import {setImg} from "./redux/actions/actions";
import {dbTrue, dbFalse} from "./redux/actions/actions";
import {createDataBase, getAllImg} from "./indexedDB/db";


//----------------------------


function App() {

    const dbStore = useSelector(store => store.indexDB_reducer.db)
    const dispatch = useDispatch()


    createDataBase()
        .then(()=>{
            dispatch(dbTrue())
        })

    return (
        <div className="main_container">
            {dbStore == true ?
                <Fragment>
                    <AddImgAndInformationBox/>
                    <GalleryBox/>
                </Fragment>
                :
                <Fragment>
                    <h1>Waiting....</h1>
                </Fragment>
            }
        </div>
    );

}

export default App;




