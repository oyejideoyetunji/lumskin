import React, { FC } from 'react'
import '../../styles/loader.css'


const LoadingCard: FC = () => {
    return (
        <div className="wrp">
        <div className="loader-card flex flex-col justify-between">
            <div className="img-area"></div>
            <div className="content1"></div>
            <div className="content2"></div>
        </div>\
        </div>
    )
}

export default LoadingCard