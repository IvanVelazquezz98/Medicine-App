import React, { useEffect, useState } from "react";
import { getComments } from "../../Redux-actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./comments.css";

function Comments() {
  let dispatch = useDispatch();
  const userComment = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(getComments());
  }, []);

  let topComments = userComment.filter(
    (e) => parseInt(e.rating) > 8 && e.userEmail !== null
  );

  let top4Comments = [];

  for (var i = 0; i > 3; i++) {
    top4Comments.push(topComments[i]);
  }
  //console.log("top coments", topComments);
  //console.log("top 4 coments", top4Comments);

  return (
    <div className="commentsContainer">
      <div className="tituloComments">Los comentarios más valorados.</div>
    

      {topComments
        ? top4Comments.map((e) => {
            <>
              <div className="divCOmments">
                <div className="puntaje">Puntaje: {e.rating}</div>
                <div className="comentario">"{e.comments}"</div>
                <div className="emailComment">{e.userEmail}</div>
              </div>
            </>;
          })
        : null}
    </div>
  );
}

export default Comments;
