import React, {Fragment} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {dbTrue} from "./redux/actions/actions";
import {createDataBase} from "./indexedDB/db";


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




