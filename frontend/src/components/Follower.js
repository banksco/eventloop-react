import React from 'react'

const Follower = ({followers,color}) => {
  return (
    <>
    <div style={{color}}><i class="fa-solid fa-users"></i> {followers} Followers</div>
    </>
  )
}
Follower.defaultProps={
    color :"red"

}

export default Follower