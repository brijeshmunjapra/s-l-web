import React from 'react'
import "./Award.scss"
import award from "../../../assets/award.png"

const Award = () => {
    return (
        <>
            <section className="award">
                <h1>
                    AWARD-WINNING PHOTOGRAPHY AND CINEMATOGRAPHY
                </h1>   
                <div className="Award_images">
                    <img src={award} alt="" />
                    <img src={award} alt="" />
                    <img src={award} alt="" />
                    <img src={award} alt="" />
                </div>
            </section>
        </>
    )
}

export default Award