import React from 'react'

const Follower = ({followers,color}) => {
  return (
    <>
    <div ><i class="fa-solid fa-users" style={{color:color}}></i> {followers} Followers</div>
    </>
  )
}

Follower.defaultProps={
   /* using defaultProps to set the color parameter a default value*/
    color:'red'
}

export default Follower