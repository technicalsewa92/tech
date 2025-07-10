import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AddReviewButton({productId,currentUserId,handleOpenDialog}:any) {
    const [commentsData, setCommentsData] = useState([]);
    const [userHasCommented, setUserHasCommented] = useState(false);
    useEffect(() => {
        const fetchComments = async () => {
          try {
            const fdata = new FormData();
            fdata.append("product", productId);
    
            const response = await axios.post(
              `https://www.technicalsewa.com/techsewa/publiccontrol/publicreview/getPreviewByProduct`,
              fdata
            );
    
            const comments = response.data;
            setCommentsData(comments);
    
            const userCommentExists = comments.some((comment:any) => comment.done_by === currentUserId);
            setUserHasCommented(userCommentExists);
         
          } catch (error) {
           console.log(error)
          }
        };
    
       
    
        fetchComments();
      }, [productId, currentUserId]);
  return (
    <div>

{!userHasCommented && (
                <div>
                  <p
                    onClick={handleOpenDialog}
                    className="text-blue-600 cursor-pointer"
                  >
                    Add Review
                  </p>
                </div>
              )}
    </div>
  )
}
