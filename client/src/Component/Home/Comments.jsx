import React, { useEffect, useState } from 'react'
import {getComments} from '../../Redux-actions/index'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function Comments() {

  let dispatch = useDispatch()
  const userComment = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(getComments())
  }, []);




   let topComments = userComment.filter((e) => parseInt(e.rating) > 8 && e.userEmail !== null   )

   let top4Comments= []

    for (var i = 0; i > 3 ; i++) {
    top4Comments.push(topComments[i]) 
    
 }
 console.log('top coments' , topComments)
 console.log('top 4 coments' , top4Comments)



  return (
        <div>
            { topComments ?  top4Comments.map((e) => {
                <div>
                    <h3>
                        {e.rating}
                    </h3>
                    <h2>
                        {e.comments}
                    </h2>
                    <h5>{e.userEmail}</h5>
                </div>
            }) : null}
        </div>
    
        

  )
}

export default Comments