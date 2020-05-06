import React from 'react';

const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

const noticeStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const Notification = ({ error, notice }) => {
    if (error === null && notice === null){
        return null
    } else if (error){
        return (
            <div style={errorStyle}> {error} </div>
        )
    } else {
        return (
            <div style={noticeStyle}> {notice} </div>
        )
    }       
}

export default Notification